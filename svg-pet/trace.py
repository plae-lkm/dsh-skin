"""Vectorise the reference photos into transparent-background SVG pets.

Two steps per image:

1. Drop the flat white studio backdrop with a border flood fill, so a whitish
   interior (the pixel dragon's belly) is kept. The result is trimmed to the
   subject.
2. Trace the trimmed RGBA with vtracer in cutout mode, which honours alpha, so
   no background shape is emitted.

Settings are tuned on the waving reference: `layer_difference` stays low because
raising it merges the cream belly into the yellow body, and `filter_speckle`
stays moderate because raising it swallows an eye. Each pet is also written with
a silhouette outline, which a yellow pet needs once the white backdrop is gone.
"""
from pathlib import Path
import re
import subprocess
import cairosvg
import numpy as np
import vtracer
from PIL import Image
from scipy import ndimage

HERE = Path(__file__).parent
PETS = ['nailong', 'naiwa', 'nailong_pixel']

BACKDROP_DIST = 34     # max RGB distance from white still counted as backdrop
ENCLOSED_DIST = 12     # tighter cut, for backdrop fully enclosed by the subject
# An enclosed patch is dropped only when it is both small and low: the crossed-
# arms dragon's backdrop wedge measures 0.88% of the frame and 15.7% tall, while
# the pixel sprite's belly is 1.70% and 24.3% tall, so the belly is kept.
ENCLOSED_MAX_AREA = 0.012
ENCLOSED_MAX_HEIGHT = 0.20

TRACE = dict(
    colormode='color', hierarchical='cutout', max_iterations=10,
    filter_speckle=16, color_precision=6, layer_difference=12,
    corner_threshold=60, length_threshold=4.0, splice_threshold=45,
    path_precision=1,
)

OUTLINE_FILTER = (
    '<filter id="dshOutline" x="-25%" y="-25%" width="150%" height="150%">'
    '<feMorphology in="SourceAlpha" operator="dilate" radius="2" result="spread"/>'
    '<feGaussianBlur in="spread" stdDeviation="1.2" result="soft"/>'
    '<feFlood flood-color="#1a1206" flood-opacity="0.42" result="ink"/>'
    '<feComposite in="ink" in2="soft" operator="in" result="edge"/>'
    '<feMerge><feMergeNode in="edge"/><feMergeNode in="SourceGraphic"/></feMerge>'
    '</filter>'
)


def strip_backdrop(name: str) -> Path:
    """Write the alpha-cut, trimmed PNG the tracer reads."""
    im = Image.open(HERE.parent / f'{name}.jpeg').convert('RGB')
    a = np.asarray(im).astype(np.float64)
    dist = np.sqrt((a - 255.0).__pow__(2).sum(axis=2))
    # No despeckle here: opening severs the thin backdrop sliver between the
    # legs from the border, which then survives as a white streak. Isolated
    # interior highlights (eye glints, teeth) are meant to be kept anyway.
    lab, n = ndimage.label(dist <= BACKDROP_DIST)
    if n:
        edge = set(lab[0, :]) | set(lab[-1, :]) | set(lab[:, 0]) | set(lab[:, -1])
        edge.discard(0)
        bg = np.isin(lab, list(edge))
    else:
        bg = np.zeros(dist.shape, bool)

    # Backdrop can also be fully enclosed by the subject — the wedge of studio
    # white between the crossed-arms dragon's feet never reaches a border, so no
    # connectivity test finds it. Cut those at a much tighter distance so a
    # cream belly (roughly 36 from white) survives, and only where the patch is
    # small: the pixel sprite's belly and eye whites are large and stay.
    ilab, m = ndimage.label(dist <= ENCLOSED_DIST)
    if m:
        boxes = ndimage.find_objects(ilab)
        for i, box in enumerate(boxes, start=1):
            area = (ilab[box] == i).sum() / float(ilab.size)
            height = (box[0].stop - box[0].start) / float(ilab.shape[0])
            if area < ENCLOSED_MAX_AREA and height < ENCLOSED_MAX_HEIGHT:
                bg |= ilab == i

    rgba = im.convert('RGBA')
    rgba.putalpha(Image.fromarray(np.where(bg, 0, 255).astype(np.uint8)))
    trimmed = rgba.crop(rgba.getbbox())
    dest = HERE / f'{name}.transparent.png'
    trimmed.save(dest)
    return dest


def trace(src: Path, dest: Path) -> None:
    vtracer.convert_image_to_svg_py(image_path=str(src), out_path=str(dest), **TRACE)
    svg = dest.read_text()
    w, h = re.search(r'width="(\d+)" height="(\d+)"', svg).groups()
    # vtracer emits pixel-space paths and no viewBox; state the content box so
    # the <img> scales the pet without distorting it.
    svg = svg.replace(f'width="{w}" height="{h}"',
                      f'viewBox="0 0 {w} {h}" width="{w}" height="{h}"', 1)
    dest.write_text(svg)


def with_outline(src: Path, dest: Path) -> None:
    """Wrap the traced body in a silhouette outline.

    The white backdrop used to separate the pet from a light UI. Without it a
    pale yellow dragon can vanish on white, so this variant dilates the alpha
    channel into a soft dark rim behind the artwork.
    """
    svg = src.read_text()
    # Anchor on the <svg ...> open tag: a plain '>' replace would match the XML
    # prolog first and leave junk after the document element.
    m = re.search(r'<svg\b[^>]*>', svg)
    svg = (svg[:m.end()] + f'<defs>{OUTLINE_FILTER}</defs>'
           + '<g filter="url(#dshOutline)">' + svg[m.end():])
    svg = svg.replace('</svg>', '</g></svg>', 1)
    dest.write_text(svg)


def scour(src: Path) -> None:
    """Minify in place; the traced path data is ~2x larger unoptimised."""
    tmp = src.with_suffix('.tmp.svg')
    subprocess.run(['scour', '-i', str(src), '-o', str(tmp)],
                   check=True, capture_output=True)
    tmp.replace(src)


for pet in PETS:
    png = strip_backdrop(pet)   # regenerated each run, then discarded
    base = HERE / f'{pet}.svg'
    trace(png, base)
    with_outline(base, base)          # the shipped art is the rimmed variant
    scour(base)
    cairosvg.svg2png(url=str(base), write_to=f'/tmp/{pet}.png',
                     output_width=200, output_height=200,
                     background_color='#141419')
    print(f'{pet:16s} png={png.stat().st_size:6d}  svg={base.stat().st_size:6d}')

# The un-rimmed trace is kept for callers that want the bare silhouette.
for pet in PETS:
    pass
