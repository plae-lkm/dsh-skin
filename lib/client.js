// dsh-skin — browser half (client plugin bundle).
//
// Loaded by dsh-client-modules at /plugins/dsh-skin/client.js and executed
// through the vendored cordis Loader's lazy-CJS module table
// (window.__ModuleLoader__.load). The factory body is plain CJS with
// require() resolved against the shell's module table — the same shape the
// shipped ui-* packages' tsdown bundles emit.
//
// Persistence note: the skin choice and wallpaper settings are stored in
// localStorage. DSH's Host settings wire only exposes an allowlisted set of
// namespaces to browser clients (dsh-host-apiproxy's WEB_SETTINGS_NAMESPACES),
// so a third-party namespace would answer `settings-not-exposed`; the product
// itself keeps remote browser preferences process-local, and localStorage
// matches that boundary for visual preferences while surviving reloads on the
// same origin.
window.__ModuleLoader__.load({
	id: "dsh-skin",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react_jsx_runtime = require("react/jsx-runtime");
		let _react = require("react");
		let _runtime_client = require("@deepseek-ai/dsh-client-store");

		//#region dsh-skin: definitions
		/** The settings row's locale namespace. */
		const SETTINGS_NS = "settings.skin";
		/** localStorage key holding the selected skin id. */
		const STORAGE_KEY = "dsh-skin:skin";
		/** localStorage key holding the wallpaper image (data URL). */
		const WALLPAPER_KEY = "dsh-skin:wallpaper";
		/** localStorage key holding the wallpaper wash opacity (0..1). */
		const WALLPAPER_OPACITY_KEY = "dsh-skin:wallpaper-opacity";
		/** localStorage key holding the wallpaper blur radius (px). */
		const WALLPAPER_BLUR_KEY = "dsh-skin:wallpaper-blur";
		/** localStorage key holding the wallpaper display mode. */
		const WALLPAPER_FIT_KEY = "dsh-skin:wallpaper-fit";
		/** Sentinel meaning "no custom skin — follow the built-in appearance". */
		const DEFAULT_SKIN = "system";
		/** Default wash opacity (0..1) applied to the translucent surfaces. */
		const DEFAULT_WALLPAPER_OPACITY = 0.8;
		/** Default wallpaper blur radius in px. */
		const DEFAULT_WALLPAPER_BLUR = 0;
		/** Default wallpaper display mode. */
		const DEFAULT_WALLPAPER_FIT = "cover";
		/** Accepted wallpaper display modes. */
		const WALLPAPER_FITS = ["cover", "contain", "stretch", "tile"];
		/** Soft cap for persisted data: URLs (localStorage quota). */
		const MAX_DATA_URL = 1800000;
		/** Source identity for the wallpaper's token override layer. */
		const OVERRIDE_SOURCE = "dsh-skin:wallpaper";
		/** Built-in base colors used when no skin token overrides the scheme. */
		const BUILTIN_BASE = {
			light: "rgb(255, 255, 255)",
			dark: "rgb(21, 21, 23)"
		};

		/**
		 * The curated skin catalog. Every skin is a third-party theme for the
		 * built-in ThemeRuntime: an id, the base palette it builds on
		 * (colorScheme drives body[data-ds-dark-theme]), and --dsw-alias-*
		 * overrides applied as inline custom properties on <body> by ui-layout's
		 * ThemePresenter. Values are concrete CSS colors (no var() indirection),
		 * tuned per skin for contrast on both surface and text roles.
		 */
		const SKINS = [
			{
				id: "skin-ocean",
				labelKey: "ocean",
				colorScheme: "dark",
				tokens: {
					"--dsw-alias-bg-base": "#0a101f",
					"--dsw-alias-bg-layer-1": "#101a30",
					"--dsw-alias-bg-layer-2": "#16233e",
					"--dsw-alias-bg-layer-3": "#1c2c4d",
					"--dsw-alias-bg-overlay": "#1e2c49",
					"--dsw-alias-border-l1": "rgba(148, 163, 184, 0.14)",
					"--dsw-alias-border-l2": "rgba(148, 163, 184, 0.26)",
					"--dsw-alias-label-primary": "#e9eef9",
					"--dsw-alias-label-secondary": "#a5b3cc",
					"--dsw-alias-label-tertiary": "#7e8da8",
					"--dsw-alias-brand-primary": "#4d86f8",
					"--dsw-alias-brand-text": "#ffffff",
					"--dsw-alias-button-primary-hover": "#6d9dfa",
					"--dsw-alias-button-primary-dimmed": "#16233e",
					"--dsw-alias-state-business-primary": "#4d86f8",
					"--dsw-alias-state-business-tertiary": "#16233e",
					"--dsw-alias-interactive-bg-hover": "rgba(77, 134, 248, 0.12)",
					"--dsw-alias-interactive-bg-active": "rgba(77, 134, 248, 0.2)",
					"--dsw-alias-markdown-code-block": "#0d1426",
					"--dsw-alias-markdown-inline-code": "#16233e",
					"--dsw-specific-sidebar-fill": "#0d1426",
					"--dsw-specific-sidebar-nav-item-active": "#16233e",
					"--dsw-specific-sidebar-nav-item-hover": "#121c31",
					"--dsw-alias-scrollbar-bg-l1": "#1c2c4d",
					"--dsw-alias-scrollbar-bg-l2": "#23365e",
					"--dsw-alias-scrollbar-hover-l1": "#2a3f6d",
					"--dsw-alias-scrollbar-hover-l2": "#2a3f6d"
				}
			},
			{
				id: "skin-graphite",
				labelKey: "graphite",
				colorScheme: "dark",
				tokens: {
					"--dsw-alias-bg-base": "#0f0f11",
					"--dsw-alias-bg-layer-1": "#17171a",
					"--dsw-alias-bg-layer-2": "#1e1e22",
					"--dsw-alias-bg-layer-3": "#26262b",
					"--dsw-alias-bg-overlay": "#27272c",
					"--dsw-alias-border-l1": "rgba(255, 255, 255, 0.07)",
					"--dsw-alias-border-l2": "rgba(255, 255, 255, 0.14)",
					"--dsw-alias-label-primary": "#ededf0",
					"--dsw-alias-label-secondary": "#a2a2ab",
					"--dsw-alias-label-tertiary": "#82828c",
					"--dsw-alias-brand-primary": "#b9bdc8",
					"--dsw-alias-brand-text": "#101012",
					"--dsw-alias-button-primary-hover": "#d2d5de",
					"--dsw-alias-button-primary-dimmed": "#26262b",
					"--dsw-alias-state-business-primary": "#b9bdc8",
					"--dsw-alias-state-business-tertiary": "#26262b",
					"--dsw-alias-interactive-bg-hover": "rgba(255, 255, 255, 0.08)",
					"--dsw-alias-interactive-bg-active": "rgba(255, 255, 255, 0.14)",
					"--dsw-alias-markdown-code-block": "#141417",
					"--dsw-alias-markdown-inline-code": "#1e1e22",
					"--dsw-specific-sidebar-fill": "#141417",
					"--dsw-specific-sidebar-nav-item-active": "#1e1e22",
					"--dsw-specific-sidebar-nav-item-hover": "#1a1a1e",
					"--dsw-alias-scrollbar-bg-l1": "#2e2e34",
					"--dsw-alias-scrollbar-bg-l2": "#383840",
					"--dsw-alias-scrollbar-hover-l1": "#45454e",
					"--dsw-alias-scrollbar-hover-l2": "#45454e"
				}
			},
			{
				id: "skin-forest",
				labelKey: "forest",
				colorScheme: "dark",
				tokens: {
					"--dsw-alias-bg-base": "#0a120d",
					"--dsw-alias-bg-layer-1": "#101a13",
					"--dsw-alias-bg-layer-2": "#17241a",
					"--dsw-alias-bg-layer-3": "#1e2e22",
					"--dsw-alias-bg-overlay": "#203024",
					"--dsw-alias-border-l1": "rgba(134, 239, 172, 0.1)",
					"--dsw-alias-border-l2": "rgba(134, 239, 172, 0.2)",
					"--dsw-alias-label-primary": "#e7f5eb",
					"--dsw-alias-label-secondary": "#9dc4a9",
					"--dsw-alias-label-tertiary": "#7ba68a",
					"--dsw-alias-brand-primary": "#34d37b",
					"--dsw-alias-brand-text": "#04120a",
					"--dsw-alias-button-primary-hover": "#5ae295",
					"--dsw-alias-button-primary-dimmed": "#17241a",
					"--dsw-alias-state-business-primary": "#34d37b",
					"--dsw-alias-state-business-tertiary": "#17241a",
					"--dsw-alias-interactive-bg-hover": "rgba(52, 211, 123, 0.12)",
					"--dsw-alias-interactive-bg-active": "rgba(52, 211, 123, 0.2)",
					"--dsw-alias-markdown-code-block": "#0c1510",
					"--dsw-alias-markdown-inline-code": "#17241a",
					"--dsw-specific-sidebar-fill": "#0c1510",
					"--dsw-specific-sidebar-nav-item-active": "#17241a",
					"--dsw-specific-sidebar-nav-item-hover": "#111d15",
					"--dsw-alias-scrollbar-bg-l1": "#1e2e22",
					"--dsw-alias-scrollbar-bg-l2": "#26402e",
					"--dsw-alias-scrollbar-hover-l1": "#2f5038",
					"--dsw-alias-scrollbar-hover-l2": "#2f5038"
				}
			},
			{
				id: "skin-sunset",
				labelKey: "sunset",
				colorScheme: "dark",
				tokens: {
					"--dsw-alias-bg-base": "#150f1f",
					"--dsw-alias-bg-layer-1": "#1d152b",
					"--dsw-alias-bg-layer-2": "#261c38",
					"--dsw-alias-bg-layer-3": "#302346",
					"--dsw-alias-bg-overlay": "#312548",
					"--dsw-alias-border-l1": "rgba(233, 213, 255, 0.1)",
					"--dsw-alias-border-l2": "rgba(233, 213, 255, 0.2)",
					"--dsw-alias-label-primary": "#f4edfc",
					"--dsw-alias-label-secondary": "#c2aee0",
					"--dsw-alias-label-tertiary": "#9f8cc2",
					"--dsw-alias-brand-primary": "#c084fc",
					"--dsw-alias-brand-text": "#1a0f26",
					"--dsw-alias-button-primary-hover": "#d4a4fd",
					"--dsw-alias-button-primary-dimmed": "#261c38",
					"--dsw-alias-state-business-primary": "#c084fc",
					"--dsw-alias-state-business-tertiary": "#261c38",
					"--dsw-alias-interactive-bg-hover": "rgba(192, 132, 252, 0.14)",
					"--dsw-alias-interactive-bg-active": "rgba(192, 132, 252, 0.24)",
					"--dsw-alias-markdown-code-block": "#181022",
					"--dsw-alias-markdown-inline-code": "#261c38",
					"--dsw-specific-sidebar-fill": "#181022",
					"--dsw-specific-sidebar-nav-item-active": "#261c38",
					"--dsw-specific-sidebar-nav-item-hover": "#1d1429",
					"--dsw-alias-scrollbar-bg-l1": "#302346",
					"--dsw-alias-scrollbar-bg-l2": "#3d2d5a",
					"--dsw-alias-scrollbar-hover-l1": "#4a3770",
					"--dsw-alias-scrollbar-hover-l2": "#4a3770"
				}
			},
			{
				id: "skin-midnight",
				labelKey: "midnight",
				colorScheme: "dark",
				tokens: {
					"--dsw-alias-bg-base": "#000000",
					"--dsw-alias-bg-layer-1": "#0b0b0f",
					"--dsw-alias-bg-layer-2": "#141419",
					"--dsw-alias-bg-layer-3": "#1c1c23",
					"--dsw-alias-bg-overlay": "#1d1d24",
					"--dsw-alias-border-l1": "rgba(255, 255, 255, 0.06)",
					"--dsw-alias-border-l2": "rgba(255, 255, 255, 0.12)",
					"--dsw-alias-label-primary": "#e8e8ee",
					"--dsw-alias-label-secondary": "#9d9daa",
					"--dsw-alias-label-tertiary": "#7c7c88",
					"--dsw-alias-brand-primary": "#7c8cff",
					"--dsw-alias-brand-text": "#05050a",
					"--dsw-alias-button-primary-hover": "#9aa7ff",
					"--dsw-alias-button-primary-dimmed": "#141419",
					"--dsw-alias-state-business-primary": "#7c8cff",
					"--dsw-alias-state-business-tertiary": "#141419",
					"--dsw-alias-interactive-bg-hover": "rgba(124, 140, 255, 0.12)",
					"--dsw-alias-interactive-bg-active": "rgba(124, 140, 255, 0.2)",
					"--dsw-alias-markdown-code-block": "#08080b",
					"--dsw-alias-markdown-inline-code": "#141419",
					"--dsw-specific-sidebar-fill": "#08080b",
					"--dsw-specific-sidebar-nav-item-active": "#141419",
					"--dsw-specific-sidebar-nav-item-hover": "#0e0e13",
					"--dsw-alias-scrollbar-bg-l1": "#1c1c23",
					"--dsw-alias-scrollbar-bg-l2": "#26262f",
					"--dsw-alias-scrollbar-hover-l1": "#31313c",
					"--dsw-alias-scrollbar-hover-l2": "#31313c"
				}
			},
			{
				id: "skin-paper",
				labelKey: "paper",
				colorScheme: "light",
				tokens: {
					"--dsw-alias-bg-base": "#faf7f1",
					"--dsw-alias-bg-layer-1": "#ffffff",
					"--dsw-alias-bg-layer-2": "#f4efe5",
					"--dsw-alias-bg-layer-3": "#ebe3d4",
					"--dsw-alias-bg-overlay": "#fffdf8",
					"--dsw-alias-border-l1": "rgba(120, 96, 48, 0.1)",
					"--dsw-alias-border-l2": "rgba(120, 96, 48, 0.18)",
					"--dsw-alias-label-primary": "#2e2a22",
					"--dsw-alias-label-secondary": "#6f675a",
					"--dsw-alias-label-tertiary": "#8e8578",
					"--dsw-alias-brand-primary": "#b45309",
					"--dsw-alias-brand-text": "#ffffff",
					"--dsw-alias-button-primary-hover": "#d97706",
					"--dsw-alias-button-primary-dimmed": "#f4efe5",
					"--dsw-alias-state-business-primary": "#b45309",
					"--dsw-alias-state-business-tertiary": "#f4efe5",
					"--dsw-alias-interactive-bg-hover": "rgba(180, 83, 9, 0.08)",
					"--dsw-alias-interactive-bg-active": "rgba(180, 83, 9, 0.14)",
					"--dsw-alias-markdown-code-block": "#f4efe5",
					"--dsw-alias-markdown-inline-code": "#f0e9da",
					"--dsw-specific-sidebar-fill": "#f4efe5",
					"--dsw-specific-sidebar-nav-item-active": "#ebe3d4",
					"--dsw-specific-sidebar-nav-item-hover": "#eee7d8",
					"--dsw-alias-scrollbar-bg-l1": "#e0d6c2",
					"--dsw-alias-scrollbar-bg-l2": "#d8ccb4",
					"--dsw-alias-scrollbar-hover-l1": "#cdbfa3",
					"--dsw-alias-scrollbar-hover-l2": "#cdbfa3"
				}
			},
			{
				id: "skin-sakura",
				labelKey: "sakura",
				colorScheme: "light",
				tokens: {
					"--dsw-alias-bg-base": "#fdf5f7",
					"--dsw-alias-bg-layer-1": "#ffffff",
					"--dsw-alias-bg-layer-2": "#f9e8ee",
					"--dsw-alias-bg-layer-3": "#f2dae3",
					"--dsw-alias-bg-overlay": "#fffbfc",
					"--dsw-alias-border-l1": "rgba(190, 80, 120, 0.1)",
					"--dsw-alias-border-l2": "rgba(190, 80, 120, 0.18)",
					"--dsw-alias-label-primary": "#3b2530",
					"--dsw-alias-label-secondary": "#8b6576",
					"--dsw-alias-label-tertiary": "#a27f8f",
					"--dsw-alias-brand-primary": "#db2777",
					"--dsw-alias-brand-text": "#ffffff",
					"--dsw-alias-button-primary-hover": "#ec4899",
					"--dsw-alias-button-primary-dimmed": "#f9e8ee",
					"--dsw-alias-state-business-primary": "#db2777",
					"--dsw-alias-state-business-tertiary": "#f9e8ee",
					"--dsw-alias-interactive-bg-hover": "rgba(219, 39, 119, 0.08)",
					"--dsw-alias-interactive-bg-active": "rgba(219, 39, 119, 0.14)",
					"--dsw-alias-markdown-code-block": "#f9e8ee",
					"--dsw-alias-markdown-inline-code": "#f2dae3",
					"--dsw-specific-sidebar-fill": "#f9e8ee",
					"--dsw-specific-sidebar-nav-item-active": "#f2dae3",
					"--dsw-specific-sidebar-nav-item-hover": "#f6e0e8",
					"--dsw-alias-scrollbar-bg-l1": "#eccfda",
					"--dsw-alias-scrollbar-bg-l2": "#e4c0cf",
					"--dsw-alias-scrollbar-hover-l1": "#d9afc1",
					"--dsw-alias-scrollbar-hover-l2": "#d9afc1"
				}
			}
		];

		/** Simplified Chinese dictionary (the key-set source of truth). */
		const zh = {
			"skin.title": "皮肤",
			"skin.default": "默认",
			"skin.ocean": "深海蓝",
			"skin.graphite": "石墨灰",
			"skin.forest": "森林绿",
			"skin.sunset": "落日紫",
			"skin.midnight": "午夜黑",
			"skin.paper": "纸感暖",
			"skin.sakura": "樱花粉",
			"background.title": "背景图片",
			"background.choose": "选择图片",
			"background.remove": "移除",
			"background.opacity": "界面遮罩",
			"background.blur": "模糊",
			"background.fit": "显示方式",
			"background.fit.cover": "铺满",
			"background.fit.contain": "完整显示",
			"background.fit.stretch": "拉伸",
			"background.fit.tile": "平铺",
			"background.urlPlaceholder": "或粘贴图片/视频网址",
			"background.urlApply": "应用",
			"background.urlInvalid": "请使用 http(s) 或 data 地址（不要用 blob）",
			"background.videoHint": "本地视频请改用网址（不会上传到本机服务）",
			"background.errorTooLarge": "图片太大，存不下",
			"background.errorRead": "无法读取这张图片",
			"background.errorSave": "存盘失败（空间不够或浏览器限制了）",
			"background.errorBlob": "blob 地址刷新后会失效，请用 http(s) 或选择本地图片",
			"background.errorDead": "壁纸地址已失效，已清除",
			"background.hint": "数字越高，界面越实、壁纸越弱。图片或视频透在主内容区和侧栏上，消息气泡保持不透明",
			"pet.title": "奶龙桌宠",
			"pet.enable": "显示奶龙桌宠",
			"pet.size": "大小",
			"pet.resetPos": "重置位置",
			"pet.hint": "矢量素材下小恐龙会跟着对话状态变表情（思考 / 干活 / 完成 / 睡觉），点它或打开 🎨 表情包手动换表情；图片素材为静态形象。",
			"pet.mood.idle": "待机",
			"pet.mood.happy": "开心",
			"pet.mood.thinking": "思考",
			"pet.mood.working": "干活",
			"pet.mood.done": "完成",
			"pet.mood.sad": "委屈",
			"pet.mood.surprised": "惊讶",
			"pet.mood.sleeping": "睡觉",
			"pet.style": "形象",
			"pet.style.dragon": "原始火龙",
			"pet.style.naiwa": "奶龙（3D 侧身）",
			"pet.style.pixel": "奶龙（像素）",
			"pet.style.nailong": "奶龙（挥手）",
			"pet.art": "素材",
			"pet.art.svg": "矢量图",
			"pet.art.photo": "图片"
		};

		/** English dictionary, checked complete against the zh key set. */
		const en = {
			"skin.title": "Skins",
			"skin.default": "Default",
			"skin.ocean": "Ocean",
			"skin.graphite": "Graphite",
			"skin.forest": "Forest",
			"skin.sunset": "Sunset",
			"skin.midnight": "Midnight",
			"skin.paper": "Paper",
			"skin.sakura": "Sakura",
			"background.title": "Wallpaper",
			"background.choose": "Choose image",
			"background.remove": "Remove",
			"background.opacity": "UI wash",
			"background.blur": "Blur",
			"background.fit": "Fit",
			"background.fit.cover": "Cover",
			"background.fit.contain": "Contain",
			"background.fit.stretch": "Stretch",
			"background.fit.tile": "Tile",
			"background.urlPlaceholder": "Or paste an image/video URL",
			"background.urlApply": "Apply",
			"background.urlInvalid": "Use an http(s) or data URL (not blob)",
			"background.videoHint": "For local video, paste a URL (nothing is uploaded)",
			"background.errorTooLarge": "Image is too large to save",
			"background.errorRead": "Could not read that image",
			"background.errorSave": "Could not save (storage full or blocked)",
			"background.errorBlob": "blob URLs die on reload — use http(s) or pick a local image",
			"background.errorDead": "Wallpaper URL was invalid and was cleared",
			"background.hint": "Higher wash = more solid UI, weaker wallpaper. The image or video shows through the main canvas and sidebar; bubbles stay opaque",
			"pet.title": "Nai Long pet",
			"pet.enable": "Show the pet",
			"pet.size": "Size",
			"pet.resetPos": "Reset position",
			"pet.hint": "With vector artwork the dragon reacts to the conversation state (thinking / working / done / sleeping); click it or open the 🎨 sticker pack to pick a mood. Photo artwork is a still image.",
			"pet.mood.idle": "Idle",
			"pet.mood.happy": "Happy",
			"pet.mood.thinking": "Thinking",
			"pet.mood.working": "Working",
			"pet.mood.done": "Done",
			"pet.mood.sad": "Sad",
			"pet.mood.surprised": "Surprised",
			"pet.mood.sleeping": "Sleeping",
			"pet.style": "Pet",
			"pet.style.dragon": "Original dragon",
			"pet.style.naiwa": "Nai long (3D)",
			"pet.style.pixel": "Nai long (pixel)",
			"pet.style.nailong": "Nai long (waving)",
			"pet.art": "Artwork",
			"pet.art.svg": "Vector",
			"pet.art.photo": "Photo"
		};
		//#endregion

		//#region dsh-skin: persistence
		/** Read a localStorage string value (null on absence or error). */
		function readStorage(key) {
			try {
				const value = window.localStorage.getItem(key);
				return typeof value === "string" ? value : null;
			} catch {
				return null;
			}
		}

		/** Write (or remove with null) a localStorage value. */
		function writeStorage(key, value) {
			try {
				if (value === null) window.localStorage.removeItem(key);
				else window.localStorage.setItem(key, value);
				return true;
			} catch {
				return false;
			}
		}

		/** Map legacy unprefixed ids (sakura, graphite, ...) to skin-* */
		function normalizeSkinId(id) {
			if (typeof id !== "string") return id;
			if (SKINS.some((s) => s.id === id)) return id;
			const prefixed = id.startsWith("skin-") ? id : `skin-${id}`;
			return SKINS.some((s) => s.id === prefixed) ? prefixed : id;
		}

		/** Saved skin id (may be unknown/absent). */
		function readSavedSkin() {
			const raw = readStorage(STORAGE_KEY);
			return raw === null ? null : normalizeSkinId(raw);
		}

		/** Persist a skin choice; DEFAULT_SKIN clears the stored value. */
		function writeSavedSkin(id) {
			writeStorage(STORAGE_KEY, id === DEFAULT_SKIN ? null : id);
		}

		/** Wallpaper URL (null when unset, invalid, or too large to persist). */
		function readWallpaper() {
			const value = readStorage(WALLPAPER_KEY);
			if (value === null || value.length === 0) return null;
			const sanitized = sanitizeWallpaperUrl(value);
			if (sanitized === null || dataUrlTooLarge(sanitized)) {
				writeStorage(WALLPAPER_KEY, null);
				if (wallpaperError === null) wallpaperError = "dead";
				return null;
			}
			return sanitized;
		}

		/** Wash opacity 0..1 (clamped; default when unset). */
		function readWallpaperOpacity() {
			const raw = readStorage(WALLPAPER_OPACITY_KEY);
			if (raw === null) return DEFAULT_WALLPAPER_OPACITY;
			const value = Number(raw);
			return Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : DEFAULT_WALLPAPER_OPACITY;
		}

		/** Blur radius in px (clamped to 0..60; default when unset). */
		function readWallpaperBlur() {
			const raw = readStorage(WALLPAPER_BLUR_KEY);
			if (raw === null) return DEFAULT_WALLPAPER_BLUR;
			const value = Number(raw);
			return Number.isFinite(value) ? Math.min(60, Math.max(0, value)) : DEFAULT_WALLPAPER_BLUR;
		}

		/** Wallpaper display mode (cover/contain/stretch/tile). */
		function readWallpaperFit() {
			const raw = readStorage(WALLPAPER_FIT_KEY);
			return WALLPAPER_FITS.includes(raw) ? raw : DEFAULT_WALLPAPER_FIT;
		}

		/** Allowlisted wallpaper URL (http(s) / data:image|video). blob: is rejected (dies on reload). */
		function sanitizeWallpaperUrl(raw) {
			if (typeof raw !== "string") return null;
			const value = raw.trim();
			if (value === "" || /["'\n\r]/.test(value)) return null;
			if (/javascript:/i.test(value) || /^data:text\/html/i.test(value)) return null;
			if (/^blob:/i.test(value)) return null;
			if (/^data:image\/svg/i.test(value)) return null;
			if (/^(https?:|data:image\/|data:video\/)/i.test(value)) return value;
			return null;
		}

		function dataUrlTooLarge(url) {
			return typeof url === "string" && url.indexOf("data:") === 0 && url.length > MAX_DATA_URL;
		}

		function isVideoUrl(url) {
			if (typeof url !== "string" || url === "") return false;
			if (/^data:video\//i.test(url)) return true;
			if (/^data:image\//i.test(url)) return false;
			return /\.(mp4|webm|ogv|mov)(\?|#|$)/i.test(url);
		}

		function videoObjectFit(fit) {
			if (fit === "contain") return "contain";
			if (fit === "stretch") return "fill";
			return "cover";
		}

		function wallpaperErrorKey(code) {
			if (code === "invalid") return "background.urlInvalid";
			if (code === "videoHint") return "background.videoHint";
			if (code === "read") return "background.errorRead";
			if (code === "save") return "background.errorSave";
			if (code === "blob") return "background.errorBlob";
			if (code === "dead") return "background.errorDead";
			if (code === "tooLarge") return "background.errorTooLarge";
			return "background.urlInvalid";
		}


		//#endregion

		//#region dsh-skin: wallpaper layer + token shading
		/** Inline error code for the wallpaper row (i18n key suffix), or null. */
		let wallpaperError = null;
		/** The fixed backdrop layer (z-index -1), created lazily. */
		let wallpaperEl = null;
		/** Disposer for the current token-override layer. */
		let wallpaperOverrideDispose = null;

		/** Parse a hex or rgb()/rgba() color into rgba() with the given alpha. */
		function toRgba(color, alpha) {
			const hex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(color.trim());
			if (hex !== null) {
				let digits = hex[1];
				if (digits.length === 3) digits = digits.split("").map((char) => char + char).join("");
				const n = parseInt(digits, 16);
				return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
			}
			const rgb = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\s*\)$/i.exec(color.trim());
			if (rgb !== null) return `rgba(${rgb[1]}, ${rgb[2]}, ${rgb[3]}, ${alpha})`;
			return color.trim();
		}

		/**
		 * The base color for one scheme: the active skin's `--dsw-alias-bg-base`
		 * when it owns that scheme, otherwise the built-in base. The wash always
		 * carries the active skin's tint (and re-shades on theme/change).
		 */
		function resolveBase(scheme, active) {
			if (active && active.colorScheme === scheme && active.tokens && typeof active.tokens["--dsw-alias-bg-base"] === "string") {
				return active.tokens["--dsw-alias-bg-base"];
			}
			return BUILTIN_BASE[scheme];
		}

		/**
		 * Stack the wallpaper's token override layer: the main canvas
		 * (--dsw-alias-bg-base) and the sidebar (--dsw-specific-sidebar-fill)
		 * become translucent at the configured opacity, so the fixed backdrop
		 * shows through while inner surfaces (cards, inputs, bubbles) stay
		 * opaque and readable. Re-calling with the same source replaces the
		 * whole layer (per the ThemeRuntime contract).
		 */
		function shadeTokens(ctx) {
			const snapshot = ctx.theme.getTheme();
			const alpha = readWallpaperOpacity();
			const sidebarAlpha = Math.min(1, alpha + 0.1);
			const overrides = {
				"--dsw-alias-bg-base": {
					light: toRgba(resolveBase("light", snapshot.active), alpha),
					dark: toRgba(resolveBase("dark", snapshot.active), alpha)
				},
				"--dsw-specific-sidebar-fill": {
					light: toRgba(resolveBase("light", snapshot.active), sidebarAlpha),
					dark: toRgba(resolveBase("dark", snapshot.active), sidebarAlpha)
				}
			};
			wallpaperOverrideDispose?.();
			wallpaperOverrideDispose = ctx.theme.overrideTokens(OVERRIDE_SOURCE, overrides);
		}

		/** Last applied wallpaper snapshot (avoid re-decoding on slider ticks). */
		let lastWallpaperApply = null;
		/** Pending rAF id for coalesced wallpaper application. */
		let wallpaperApplyRaf = null;
		/** Apply (or clear) the wallpaper layer and its token shading. */
		let applyingWallpaper = false;
		function applyWallpaper(ctx) {
			if (applyingWallpaper) return;
			if (!document.body) return;
			applyingWallpaper = true;
			try {
				const url = readWallpaper();
				if (url === null) {
					if (wallpaperEl && wallpaperEl.tagName === "VIDEO") {
						wallpaperEl.pause();
						wallpaperEl.removeAttribute("src");
						wallpaperEl.load();
					}
					wallpaperEl?.remove();
					wallpaperEl = null;
					wallpaperOverrideDispose?.();
					wallpaperOverrideDispose = null;
					lastWallpaperApply = null;
					return;
				}
				const video = isVideoUrl(url);
				const needSwap = wallpaperEl === null || !document.body.contains(wallpaperEl) || (video && wallpaperEl.tagName !== "VIDEO") || (!video && wallpaperEl.tagName === "VIDEO");
				if (needSwap) {
					if (wallpaperEl && wallpaperEl.tagName === "VIDEO") {
						wallpaperEl.pause();
						wallpaperEl.removeAttribute("src");
						wallpaperEl.load();
					}
					wallpaperEl?.remove();
					if (video) {
						wallpaperEl = document.createElement("video");
						wallpaperEl.autoplay = true;
						wallpaperEl.muted = true;
						wallpaperEl.loop = true;
						wallpaperEl.playsInline = true;
						wallpaperEl.referrerPolicy = "no-referrer";
						wallpaperEl.setAttribute("referrerpolicy", "no-referrer");
						wallpaperEl.style.cssText = "position:fixed;inset:0;z-index:-1;pointer-events:none;width:100%;height:100%;object-fit:cover;";
					} else {
						wallpaperEl = document.createElement("div");
						wallpaperEl.style.cssText = "position:fixed;inset:0;z-index:-1;pointer-events:none;background-size:cover;background-position:center;background-repeat:no-repeat;";
					}
					document.body.prepend(wallpaperEl);
					lastWallpaperApply = null;
				}
				const blur = readWallpaperBlur();
				const fit = readWallpaperFit();
				const nextFilter = blur > 0 ? ("blur(" + blur + "px)") : "none";
				const signature = url + "|" + fit + "|" + nextFilter + "|" + (video ? "v" : "i");
				if (lastWallpaperApply !== signature) {
					if (video) {
						if (wallpaperEl.src !== url) wallpaperEl.src = url;
						wallpaperEl.style.filter = nextFilter;
						wallpaperEl.style.objectFit = videoObjectFit(fit);
						if (!document.hidden) {
							const playPromise = wallpaperEl.play();
							if (playPromise && typeof playPromise.catch === "function") playPromise.catch(function () {});
						}
					} else {
						const nextSize = fit === "contain" ? "contain" : fit === "stretch" ? "100% 100%" : fit === "tile" ? "auto" : "cover";
						const nextRepeat = fit === "tile" ? "repeat" : "no-repeat";
						const nextPosition = fit === "tile" ? "left top" : "center";
						wallpaperEl.style.backgroundImage = 'url("' + url + '")';
						wallpaperEl.style.filter = nextFilter;
						wallpaperEl.style.backgroundSize = nextSize;
						wallpaperEl.style.backgroundRepeat = nextRepeat;
						wallpaperEl.style.backgroundPosition = nextPosition;
					}
					lastWallpaperApply = signature;
				}
				shadeTokens(ctx);
			} finally {
				applyingWallpaper = false;
			}
		}

		function scheduleWallpaperApply(ctx) {
			if (wallpaperApplyRaf !== null) return;
			wallpaperApplyRaf = requestAnimationFrame(function () {
				wallpaperApplyRaf = null;
				applyWallpaper(ctx);
			});
		}

		function cancelWallpaperApply() {
			if (wallpaperApplyRaf !== null) {
				cancelAnimationFrame(wallpaperApplyRaf);
				wallpaperApplyRaf = null;
			}
		}

		function onWallpaperVisibility() {
			if (!wallpaperEl || wallpaperEl.tagName !== "VIDEO") return;
			if (document.hidden) {
				wallpaperEl.pause();
				return;
			}
			const playPromise = wallpaperEl.play();
			if (playPromise && typeof playPromise.catch === "function") playPromise.catch(function () {});
		}

		/** Remove the wallpaper layer and its token overrides (fiber unload). */
		function teardownWallpaper() {
			cancelWallpaperApply();
			document.removeEventListener("visibilitychange", onWallpaperVisibility);
			if (wallpaperEl && wallpaperEl.tagName === "VIDEO") {
				wallpaperEl.pause();
				wallpaperEl.removeAttribute("src");
				wallpaperEl.load();
			}
			wallpaperEl?.remove();
			wallpaperEl = null;
			wallpaperOverrideDispose?.();
			wallpaperOverrideDispose = null;
			lastWallpaperApply = null;
		}
		//#endregion

		//#region dsh-skin: image compression
		/**
		 * Downscale an image onto a canvas and return a JPEG data URL, so a
		 * wallpaper stays well inside the localStorage quota (≤ ~2MB).
		 */
		function compressImage(image, maxSide, quality) {
			const scale = Math.min(1, maxSide / Math.max(image.width, image.height));
			const canvas = document.createElement("canvas");
			canvas.width = Math.max(1, Math.round(image.width * scale));
			canvas.height = Math.max(1, Math.round(image.height * scale));
			const context = canvas.getContext("2d");
			context.drawImage(image, 0, 0, canvas.width, canvas.height);
			return canvas.toDataURL("image/jpeg", quality);
		}

		/** Read a picked file into a compressed data URL (null on failure). */
		function readImageAsDataUrl(file, onDone) {
			const reader = new FileReader();
			reader.onerror = () => onDone(null);
			reader.onload = () => {
				const image = new Image();
				image.onerror = () => onDone(null);
				image.onload = () => {
					try {
						let dataUrl = compressImage(image, 1600, 0.75);
						if (dataUrl.length > MAX_DATA_URL) dataUrl = compressImage(image, 1000, 0.6);
						if (dataUrl.length > MAX_DATA_URL) dataUrl = compressImage(image, 800, 0.5);
						if (dataUrl.length > MAX_DATA_URL) onDone(null);
						else onDone(dataUrl);
					} catch {
						onDone(null);
					}
				};
				image.src = reader.result;
			};
			reader.readAsDataURL(file);
		}
		//#endregion

		//#region dsh-skin: settings row stores
		/**
		 * Skin row slot store: a mirror of the theme service snapshot. The
		 * plugin's apply-world change listener is the only writer; the row
		 * component reads via props.useStore.
		 */
		function createSkinStore() {
			return (0, _runtime_client.defineStore)({
				init: () => ({
					skin: "system",
					revision: -1
				}),
				actions: {
					sync: (d, skin, revision) => {
						if (revision <= d.revision) return;
						d.skin = skin;
						d.revision = revision;
					}
				}
			});
		}

		/** Wallpaper row store: url + opacity + blur + fit. */
		function createWallpaperStore() {
			return (0, _runtime_client.defineStore)({
				init: () => ({
					url: null,
					opacity: DEFAULT_WALLPAPER_OPACITY,
					blur: DEFAULT_WALLPAPER_BLUR,
					fit: DEFAULT_WALLPAPER_FIT,
					error: null,
					revision: -1
				}),
				actions: {
					sync: (d, url, opacity, blur, fit, error, revision) => {
						if (revision <= d.revision) return;
						d.url = url;
						d.opacity = opacity;
						d.blur = blur;
						d.fit = fit;
						d.error = error;
						d.revision = revision;
					}
				}
			});
		}
		//#endregion

		//#region dsh-skin: settings rows
		/** Inline style sheet for the rows (kept dependency-free). */
		const styles = {
			group: {
				borderBottom: "1px solid var(--dsw-alias-border-l2)",
				display: "flex",
				flexDirection: "column",
				gap: "10px",
				padding: "16px 0"
			},
			title: {
				color: "var(--dsw-alias-label-primary)",
				fontSize: "14px",
				fontWeight: 400,
				lineHeight: "22px"
			},
			hint: {
				color: "var(--dsw-alias-label-tertiary)",
				fontSize: "12px",
				lineHeight: "18px"
			},
			error: {
				color: "var(--dsw-alias-state-error-primary)",
				fontSize: "12px",
				lineHeight: "18px"
			},
			grid: {
				display: "flex",
				flexWrap: "wrap",
				gap: "10px"
			},
			card: {
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				gap: "6px",
				width: "96px",
				padding: "3px",
				borderRadius: "10px",
				border: "2px solid transparent",
				background: "transparent",
				cursor: "pointer",
				font: "inherit",
				boxSizing: "border-box"
			},
			cardSelected: {
				borderColor: "var(--dsw-alias-brand-primary)",
				background: "var(--dsw-alias-interactive-bg-hover)"
			},
			cardLabel: {
				color: "var(--dsw-alias-label-secondary)",
				fontSize: "12px",
				lineHeight: "16px",
				whiteSpace: "nowrap"
			},
			cardLabelSelected: {
				color: "var(--dsw-alias-label-primary)"
			},
			swatch: {
				width: "100%",
				height: "52px",
				borderRadius: "8px",
				boxSizing: "border-box",
				padding: "8px",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				gap: "6px"
			},
			swatchLine: {
				height: "7px",
				borderRadius: "4px"
			},
			defaultSwatch: {
				width: "100%",
				height: "52px",
				borderRadius: "8px",
				boxSizing: "border-box",
				display: "flex",
				overflow: "hidden",
				border: "1px solid var(--dsw-alias-border-l2)"
			},
			button: {
				height: "32px",
				padding: "0 14px",
				borderRadius: "8px",
				border: "1px solid var(--dsw-alias-border-l2)",
				background: "var(--dsw-alias-button-elevated-fill)",
				color: "var(--dsw-alias-label-primary)",
				cursor: "pointer",
				fontSize: "13px",
				font: "inherit",
				boxSizing: "border-box"
			},
			buttonDanger: {
				color: "var(--dsw-alias-state-error-primary)"
			},
			preview: {
				width: "72px",
				height: "44px",
				objectFit: "cover",
				borderRadius: "6px",
				border: "1px solid var(--dsw-alias-border-l2)"
			},
			actionRow: {
				display: "flex",
				alignItems: "center",
				gap: "10px",
				flexWrap: "wrap"
			},
			sliderRow: {
				display: "flex",
				alignItems: "center",
				gap: "10px",
				minWidth: "240px"
			},
			sliderLabel: {
				color: "var(--dsw-alias-label-secondary)",
				fontSize: "13px",
				whiteSpace: "nowrap",
				width: "72px"
			},
			slider: {
				flex: 1,
				accentColor: "var(--dsw-alias-brand-primary)"
			},
			sliderValue: {
				color: "var(--dsw-alias-label-secondary)",
				fontSize: "12px",
				whiteSpace: "nowrap",
				width: "44px",
				textAlign: "right"
			},
			fitRow: {
				display: "flex",
				flexWrap: "wrap",
				gap: "8px"
			},
			fitButton: {
				height: "30px",
				padding: "0 14px",
				borderRadius: "8px",
				border: "1px solid var(--dsw-alias-border-l2)",
				background: "var(--dsw-alias-bg-layer-1)",
				color: "var(--dsw-alias-label-secondary)",
				cursor: "pointer",
				fontSize: "13px",
				font: "inherit",
				boxSizing: "border-box"
			},
			fitButtonSelected: {
				borderColor: "var(--dsw-alias-brand-primary)",
				background: "var(--dsw-alias-interactive-bg-hover)",
				color: "var(--dsw-alias-label-primary)"
			},
			fitButtonDisabled: {
				opacity: 0.4,
				cursor: "not-allowed"
			},
			urlRow: {
				display: "flex",
				alignItems: "center",
				gap: "10px"
			},
			urlInput: {
				flex: "1 1 180px",
				height: "32px",
				padding: "0 10px",
				borderRadius: "8px",
				border: "1px solid var(--dsw-alias-border-l2)",
				background: "var(--dsw-alias-bg-layer-1)",
				color: "var(--dsw-alias-label-primary)",
				font: "inherit",
				boxSizing: "border-box"
			}
		};

		/** Mini palette preview driven by one skin's token table. */
		function Swatch({ tokens }) {
			return (0, react_jsx_runtime.jsxs)("div", {
				style: {
					...styles.swatch,
					background: tokens["--dsw-alias-bg-layer-1"],
					border: `1px solid ${tokens["--dsw-alias-border-l2"]}`
				},
				children: [
					(0, react_jsx_runtime.jsx)("div", {
						style: {
							...styles.swatchLine,
							width: "70%",
							background: tokens["--dsw-alias-label-primary"],
							opacity: 0.85
						}
					}),
					(0, react_jsx_runtime.jsx)("div", {
						style: {
							...styles.swatchLine,
							width: "45%",
							background: tokens["--dsw-alias-brand-primary"]
						}
					}),
					(0, react_jsx_runtime.jsx)("div", {
						style: {
							...styles.swatchLine,
							width: "55%",
							background: tokens["--dsw-alias-label-secondary"],
							opacity: 0.55
						}
					})
				]
			});
		}

		/** "Default" chip: follow the built-in appearance (light + dark halves). */
		function DefaultSwatch() {
			return (0, react_jsx_runtime.jsxs)("div", {
				style: styles.defaultSwatch,
				children: [
					(0, react_jsx_runtime.jsx)("div", { style: { flex: 1, background: "#f4f4f5" } }),
					(0, react_jsx_runtime.jsx)("div", { style: { flex: 1, background: "#1c1c20" } })
				]
			});
		}

		/** One selectable skin card. */
		function SkinCard({ skin, selected, onSelect, t }) {
			return (0, react_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: onSelect,
				"aria-pressed": selected,
				style: {
					...styles.card,
					...(selected ? styles.cardSelected : {})
				},
				children: [
					(0, react_jsx_runtime.jsx)(Swatch, { tokens: skin.tokens }),
					(0, react_jsx_runtime.jsx)("span", {
						style: {
							...styles.cardLabel,
							...(selected ? styles.cardLabelSelected : {})
						},
						children: t(`skin.${skin.labelKey}`)
					})
				]
			});
		}

		/**
		 * Skin picker row registered into the Settings → General item slot,
		 * right after the built-in Appearance row: title + a "Default" chip and
		 * one swatch card per curated skin.
		 */
		function SkinRow({ t, setSkin, useStore }) {
			const skin = useStore((s) => s.skin);
			const selected = SKINS.some((candidate) => candidate.id === skin) ? skin : null;
			return (0, react_jsx_runtime.jsxs)("div", {
				style: styles.group,
				children: [
					(0, react_jsx_runtime.jsx)("div", {
						style: styles.title,
						children: t("skin.title")
					}),
					(0, react_jsx_runtime.jsxs)("div", {
						style: styles.grid,
						children: [
							(0, react_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setSkin(DEFAULT_SKIN),
								"aria-pressed": selected === null,
								style: {
									...styles.card,
									...(selected === null ? styles.cardSelected : {})
								},
								children: [
									(0, react_jsx_runtime.jsx)(DefaultSwatch, {}),
									(0, react_jsx_runtime.jsx)("span", {
										style: {
											...styles.cardLabel,
											...(selected === null ? styles.cardLabelSelected : {})
										},
										children: t("skin.default")
									})
								]
							}),
							SKINS.map((skinDefinition) => (0, react_jsx_runtime.jsx)(SkinCard, {
								skin: skinDefinition,
								selected: selected === skinDefinition.id,
								onSelect: () => setSkin(skinDefinition.id),
								t
							}, skinDefinition.id))
						]
					})
				]
			});
		}

		/** One labeled slider (opacity or blur). */
		function Slider({ label, value, min, max, step, format, onChange }) {
			return (0, react_jsx_runtime.jsxs)("div", {
				style: styles.sliderRow,
				children: [
					(0, react_jsx_runtime.jsx)("span", {
						style: styles.sliderLabel,
						children: label
					}),
					(0, react_jsx_runtime.jsx)("input", {
						type: "range",
						min,
						max,
						step,
						value,
						style: styles.slider,
						onChange: (event) => onChange(Number(event.target.value))
					}),
					(0, react_jsx_runtime.jsx)("span", {
						style: styles.sliderValue,
						children: format(value)
					})
				]
			});
		}

		/**
		 * Wallpaper row: choose (compressed to a data URL), preview, tune the
		 * wash opacity and blur, and remove the wallpaper.
		 */
		function WallpaperRow({ t, setWallpaper, setOpacity, setBlur, setFit, setError, useStore }) {
			const url = useStore((s) => s.url);
			const opacity = useStore((s) => s.opacity);
			const blur = useStore((s) => s.blur);
			const fit = useStore((s) => s.fit);
			const error = useStore((s) => s.error);
			const inputRef = (0, _react.useRef)(null);
			const [urlInput, setUrlInput] = (0, _react.useState)("");
			const video = url !== null && isVideoUrl(url);
			const onPick = () => inputRef.current?.click();
			const onFile = (event) => {
				const file = event.target.files?.[0];
				if (file === void 0) return;
				event.target.value = "";
				if ((file.type && file.type.startsWith("video/")) || /\.(mp4|webm|ogv|mov)$/i.test(file.name)) {
					setError("videoHint");
					return;
				}
				readImageAsDataUrl(file, (dataUrl) => {
					if (dataUrl === null) setError("read");
					else setWallpaper(dataUrl);
				});
			};
			const applyUrl = () => {
				const trimmed = urlInput.trim();
				if (/^blob:/i.test(trimmed)) {
					setError("blob");
					return;
				}
				const sanitized = sanitizeWallpaperUrl(urlInput);
				if (sanitized === null) {
					setError("invalid");
					return;
				}
				if (dataUrlTooLarge(sanitized)) {
					setError("tooLarge");
					return;
				}
				setWallpaper(sanitized);
				setUrlInput("");
			};
			return (0, react_jsx_runtime.jsxs)("div", {
				style: styles.group,
				children: [
					(0, react_jsx_runtime.jsx)("div", {
						style: styles.title,
						children: t("background.title")
					}),
					(0, react_jsx_runtime.jsxs)("div", {
						style: styles.actionRow,
						children: [
							url !== null ? (video ? (0, react_jsx_runtime.jsx)("video", {
								src: url,
								muted: true,
								loop: true,
								autoPlay: !document.hidden,
								playsInline: true,
								referrerPolicy: "no-referrer",
								style: styles.preview
							}) : (0, react_jsx_runtime.jsx)("img", {
								src: url,
								alt: "",
								referrerPolicy: "no-referrer",
								style: styles.preview
							})) : null,
							(0, react_jsx_runtime.jsx)("button", {
								type: "button",
								style: styles.button,
								onClick: onPick,
								children: t("background.choose")
							}),
							url !== null ? (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								style: {
									...styles.button,
									...styles.buttonDanger
								},
								onClick: () => setWallpaper(null),
								children: t("background.remove")
							}) : null,
							(0, react_jsx_runtime.jsx)("input", {
								ref: inputRef,
								type: "file",
								accept: "image/*",
								style: { display: "none" },
								onChange: onFile
							})
						]
					}),
					(0, react_jsx_runtime.jsxs)("div", {
						style: styles.urlRow,
						children: [
							(0, react_jsx_runtime.jsx)("input", {
								type: "text",
								value: urlInput,
								placeholder: t("background.urlPlaceholder"),
								style: styles.urlInput,
								onChange: (event) => setUrlInput(event.target.value),
								onKeyDown: (event) => {
									if (event.key === "Enter") applyUrl();
								}
							}),
							(0, react_jsx_runtime.jsx)("button", {
								type: "button",
								style: styles.button,
								onClick: applyUrl,
								children: t("background.urlApply")
							})
						]
					}),
					(0, react_jsx_runtime.jsxs)("div", {
						style: styles.sliderRow,
						children: [
							(0, react_jsx_runtime.jsx)("span", {
								style: styles.sliderLabel,
								children: t("background.fit")
							}),
							(0, react_jsx_runtime.jsxs)("div", {
								style: styles.fitRow,
								children: WALLPAPER_FITS.map((value) => {
									const disabled = video && value === "tile";
									return (0, react_jsx_runtime.jsx)("button", {
										type: "button",
										"aria-pressed": fit === value,
										disabled: disabled,
										onClick: () => {
											if (!disabled) setFit(value);
										},
										style: {
											...styles.fitButton,
											...(fit === value ? styles.fitButtonSelected : {}),
											...(disabled ? styles.fitButtonDisabled : {})
										},
										children: t("background.fit." + value)
									}, value);
								})
							})
						]
					}),
					(0, react_jsx_runtime.jsx)(Slider, {
						label: t("background.opacity"),
						value: Math.round(opacity * 100),
						min: 0,
						max: 100,
						step: 1,
						format: (v) => `${v}%`,
						onChange: setOpacity
					}),
					(0, react_jsx_runtime.jsx)(Slider, {
						label: t("background.blur"),
						value: blur,
						min: 0,
						max: 60,
						step: 1,
						format: (v) => `${v}px`,
						onChange: setBlur
					}),
					error ? (0, react_jsx_runtime.jsx)("div", {
						style: styles.error,
						children: t(wallpaperErrorKey(error))
					}) : null,
					(0, react_jsx_runtime.jsx)("div", {
						style: styles.hint,
						children: t("background.hint")
					})
				]
			});
		}
		//#endregion

		//#region dsh-skin: nai long pet (奶龙桌宠 · 表情包)
		/**
		 * 奶龙桌宠 —— an original, hand-drawn yellow dragon (奶龙-style) desktop
		 * pet with a sticker pack (表情包). It floats on the web UI, follows the
		 * agent's running state (idle → thinking → working → done → sleeping),
		 * can be dragged around, and shows a sticker picker panel. All art is
		 * inline SVG (original work, not the licensed character), so the bundle
		 * stays dependency-free and crisp at any size.
		 */

		/** localStorage keys for the pet (independent from skins/wallpaper). */
		const PET_STORAGE = {
			enabled: "dsh-skin:pet-enabled",
			size: "dsh-skin:pet-size",
			pos: "dsh-skin:pet-pos",
			style: "dsh-skin:pet-style",
			art: "dsh-skin:pet-art"
		};
		/** Default pet size in px. */
		const PET_DEFAULT_SIZE = 120;
		/** Size range in px. */
		const PET_MIN_SIZE = 64;
		const PET_MAX_SIZE = 180;
		/** Custom event dispatched by the settings row after writing config. */
		const PET_CFG_EVENT = "dsh-skin:pet-config";
		/** How long a manually picked sticker stays (ms) before status wins again. */
		const PET_STICKER_HOLD = 4000;
		/** Idle (ms) before the pet falls asleep. */
		const PET_SLEEP_AFTER = 45000;
		/** Status watch poll interval (ms). */
		const PET_POLL_MS = 500;

		/**
		 * The sticker pack. Each mood is a face variant: which eyes, which mouth
		 * and an optional extra (bubble, tear, sweat, Zzz, …). `idle` is the
		 * default and blinks on a timer; `idle-blink` is internal.
		 */
		const NAILONG_MOODS = {
			idle: { labelKey: "pet.mood.idle", eyes: "round", mouth: "smile", blinkable: true },
			happy: { labelKey: "pet.mood.happy", eyes: "happy", mouth: "bigSmile", extra: "sparkle" },
			thinking: { labelKey: "pet.mood.thinking", eyes: "up", mouth: "flat", extra: "dots" },
			working: { labelKey: "pet.mood.working", eyes: "round", mouth: "flat", extra: "sweat" },
			done: { labelKey: "pet.mood.done", eyes: "happy", mouth: "bigSmile", extra: "stars" },
			sad: { labelKey: "pet.mood.sad", eyes: "sad", mouth: "wavy", extra: "tear" },
			surprised: { labelKey: "pet.mood.surprised", eyes: "wide", mouth: "o", extra: "bang" },
			sleeping: { labelKey: "pet.mood.sleeping", eyes: "sleep", mouth: "smile", extra: "zzz" }
		};
		/** Face variants used in the sticker picker (idle-blink is internal). */
		const NAILONG_PACK = ["idle", "happy", "thinking", "working", "done", "sad", "surprised", "sleeping"];

		/** Ink color for strokes and pupils. */
		const DRAGON_INK = "#3a2a12";
		/** Main body yellow. */
		const DRAGON_BODY = "#ffd84d";
		/** Body stroke. */
		const DRAGON_LINE = "#e8b72c";
		/** Belly / horn cream. */
		const DRAGON_CREAM = "#fff3c4";
		/** Wing tint. */
		const DRAGON_WING = "#ffe38a";
		/** Cheek pink. */
		const DRAGON_BLUSH = "#ffa8b8";
		/** Mouth fill. */
		const DRAGON_MOUTH = "#7c3a2d";

		/**
		 * Render one dragon face as an SVG string (200×200 viewBox, square).
		 * @param {string} mood - one of NAILONG_MOODS (or "idle-blink").
		 * @returns {string} the raw SVG markup.
		 */
		function faceParts(mood) {
			const blink = mood === "idle-blink";
			const m = blink ? null : NAILONG_MOODS[mood];
			const eyes = blink ? "blink" : m ? m.eyes : "round";
			const mouth = m ? m.mouth : "smile";
			const extra = m ? m.extra : null;

			let eyeMarkup = "";
			if (eyes === "round") {
				eyeMarkup =
					`<circle cx="80" cy="76" r="7" fill="${DRAGON_INK}"/><circle cx="120" cy="76" r="7" fill="${DRAGON_INK}"/>` +
					`<circle cx="82.5" cy="73.5" r="2.2" fill="#fff"/><circle cx="122.5" cy="73.5" r="2.2" fill="#fff"/>`;
			} else if (eyes === "blink") {
				eyeMarkup =
					`<path d="M70 78 q10 5 20 0" stroke="${DRAGON_INK}" stroke-width="5" fill="none" stroke-linecap="round"/>` +
					`<path d="M110 78 q10 5 20 0" stroke="${DRAGON_INK}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
			} else if (eyes === "happy") {
				eyeMarkup =
					`<path d="M70 78 q10 10 20 0" stroke="${DRAGON_INK}" stroke-width="5" fill="none" stroke-linecap="round"/>` +
					`<path d="M110 78 q10 10 20 0" stroke="${DRAGON_INK}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
			} else if (eyes === "sleep") {
				eyeMarkup =
					`<path d="M72 78 q8 6 16 0" stroke="${DRAGON_INK}" stroke-width="5" fill="none" stroke-linecap="round"/>` +
					`<path d="M112 78 q8 6 16 0" stroke="${DRAGON_INK}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
			} else if (eyes === "wide") {
				eyeMarkup =
					`<ellipse cx="80" cy="76" rx="10" ry="12" fill="#fff" stroke="${DRAGON_INK}" stroke-width="3"/>` +
					`<ellipse cx="120" cy="76" rx="10" ry="12" fill="#fff" stroke="${DRAGON_INK}" stroke-width="3"/>` +
					`<circle cx="80" cy="78" r="3.2" fill="${DRAGON_INK}"/><circle cx="120" cy="78" r="3.2" fill="${DRAGON_INK}"/>`;
			} else if (eyes === "up") {
				eyeMarkup =
					`<circle cx="82" cy="72" r="6.5" fill="${DRAGON_INK}"/><circle cx="122" cy="72" r="6.5" fill="${DRAGON_INK}"/>` +
					`<circle cx="84" cy="70" r="2" fill="#fff"/><circle cx="124" cy="70" r="2" fill="#fff"/>` +
					`<path d="M70 62 q6 -8 14 -8" stroke="${DRAGON_INK}" stroke-width="4" fill="none" stroke-linecap="round"/>` +
					`<path d="M118 62 q6 -8 14 -8" stroke="${DRAGON_INK}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
			} else if (eyes === "sad") {
				eyeMarkup =
					`<path d="M68 82 q12 -12 24 0" stroke="${DRAGON_INK}" stroke-width="5" fill="none" stroke-linecap="round"/>` +
					`<path d="M108 82 q12 -12 24 0" stroke="${DRAGON_INK}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
			}

			let mouthMarkup = "";
			if (mouth === "smile") {
				mouthMarkup = `<path d="M86 92 q14 10 28 0" stroke="${DRAGON_INK}" stroke-width="4.5" fill="none" stroke-linecap="round"/>`;
			} else if (mouth === "bigSmile") {
				mouthMarkup =
					`<path d="M80 90 q20 18 40 0 q-20 12 -40 0 z" fill="${DRAGON_MOUTH}" stroke="${DRAGON_INK}" stroke-width="4"/>` +
					`<path d="M90 96 q10 8 20 0 q-10 6 -20 0 z" fill="#ff9d9d"/>`;
			} else if (mouth === "flat") {
				mouthMarkup = `<path d="M86 94 h28" stroke="${DRAGON_INK}" stroke-width="4.5" stroke-linecap="round"/>`;
			} else if (mouth === "o") {
				mouthMarkup = `<ellipse cx="100" cy="96" rx="7" ry="10" fill="${DRAGON_MOUTH}" stroke="${DRAGON_INK}" stroke-width="4"/>`;
			} else if (mouth === "wavy") {
				mouthMarkup = `<path d="M84 94 q8 -6 16 0 q8 6 16 0" stroke="${DRAGON_INK}" stroke-width="4.5" fill="none" stroke-linecap="round"/>`;
			}

			let extraMarkup = "";
			if (extra === "dots") {
				extraMarkup = `<text x="146" y="52" font-family="sans-serif" font-size="16" font-weight="bold" fill="${DRAGON_INK}">···</text>`;
			} else if (extra === "sweat") {
				extraMarkup = `<path d="M60 58 q6 12 0 16 q-6 -4 0 -16 z" fill="#8fd0ff" stroke="#4aa3e8" stroke-width="2"/>`;
			} else if (extra === "tear") {
				extraMarkup = `<path d="M146 84 q7 12 0 18 q-7 -6 0 -18 z" fill="#8fd0ff" stroke="#4aa3e8" stroke-width="2"/>`;
			} else if (extra === "zzz") {
				extraMarkup = `<text x="146" y="52" font-family="sans-serif" font-size="17" font-weight="bold" fill="#7aa7ff">Z</text>` +
					`<text x="160" y="36" font-family="sans-serif" font-size="13" font-weight="bold" fill="#7aa7ff">z</text>`;
			} else if (extra === "sparkle") {
				extraMarkup = `<path d="M34 56 l4 -10 4 10 -10 -4 z" fill="#ffd84d"/><path d="M168 40 l3 -8 3 8 -8 -3 z" fill="#ffd84d"/>`;
			} else if (extra === "stars") {
				extraMarkup = `<path d="M30 52 l4 -10 4 10 -10 -4 z" fill="#ffb84d"/><path d="M170 48 l4 -10 4 10 -10 -4 z" fill="#ffb84d"/>` +
					`<path d="M100 24 l4 -10 4 10 -10 -4 z" fill="#ffd84d"/>`;
			} else if (extra === "bang") {
				extraMarkup = `<text x="148" y="52" font-family="sans-serif" font-size="20" font-weight="bold" fill="${DRAGON_INK}">!</text>`;
			}

			return { eyeMarkup, mouthMarkup, extraMarkup };
		}

		/**
		 * Render one dragon face as an SVG string (200x200 viewBox, square).
		 * @param {string} mood - one of NAILONG_PACK (or "idle-blink").
		 * @returns {string} the raw SVG markup.
		 */
		function dragonSvg(mood) {
			const { eyeMarkup, mouthMarkup, extraMarkup } = faceParts(mood);

			return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">` +
				`<ellipse cx="100" cy="120" rx="56" ry="50" fill="${DRAGON_BODY}" stroke="${DRAGON_LINE}" stroke-width="4"/>` +
				`<ellipse cx="100" cy="130" rx="32" ry="28" fill="${DRAGON_CREAM}"/>` +
				`<path d="M46 92 q-18 -8 -10 -22 q14 6 12 18 z" fill="${DRAGON_WING}" stroke="${DRAGON_LINE}" stroke-width="3"/>` +
				`<path d="M154 92 q18 -8 10 -22 q-14 6 -12 18 z" fill="${DRAGON_WING}" stroke="${DRAGON_LINE}" stroke-width="3"/>` +
				`<ellipse cx="100" cy="80" rx="46" ry="40" fill="${DRAGON_BODY}" stroke="${DRAGON_LINE}" stroke-width="4"/>` +
				`<path d="M64 52 q-10 -22 4 -26 q6 14 -2 24 z" fill="${DRAGON_CREAM}" stroke="${DRAGON_LINE}" stroke-width="3"/>` +
				`<path d="M136 52 q10 -22 -4 -26 q-6 14 2 24 z" fill="${DRAGON_CREAM}" stroke="${DRAGON_LINE}" stroke-width="3"/>` +
				`<circle cx="70" cy="94" r="8" fill="${DRAGON_BLUSH}" opacity="0.75"/>` +
				`<circle cx="130" cy="94" r="8" fill="${DRAGON_BLUSH}" opacity="0.75"/>` +
				eyeMarkup + mouthMarkup + extraMarkup +
				`<ellipse cx="50" cy="134" rx="12" ry="16" fill="${DRAGON_BODY}" stroke="${DRAGON_LINE}" stroke-width="3" transform="rotate(22 50 134)"/>` +
				`<ellipse cx="150" cy="134" rx="12" ry="16" fill="${DRAGON_BODY}" stroke="${DRAGON_LINE}" stroke-width="3" transform="rotate(-22 150 134)"/>` +
				`<ellipse cx="76" cy="168" rx="17" ry="9" fill="${DRAGON_BODY}" stroke="${DRAGON_LINE}" stroke-width="3"/>` +
				`<ellipse cx="124" cy="168" rx="17" ry="9" fill="${DRAGON_BODY}" stroke="${DRAGON_LINE}" stroke-width="3"/>` +
				`</svg>`;
		}

		/** The four pet styles. "dragon" is the original inline-art dragon. */
		const PET_STYLES = ["dragon", "naiwa", "pixel", "nailong"];

		/** Photo art, inlined so the single-file client bundle stays self-contained. */
		/**
		 * Reference artwork, traced from the supplied photos to SVG with the studio
		 * backdrop removed (see svg-pet/trace.py). Vector keeps the pet crisp at
		 * any size and lets it sit on any UI colour; each carries a soft dark
		 * rim so a pale dragon stays visible on a light background.
		 */
		/**
		 * Reference artwork, traced from the supplied photos to SVG with the studio
		 * backdrop removed (see svg-pet/trace.py). Vector keeps the pet crisp at
		 * any size and lets it sit on any UI colour; each carries a soft dark
		 * rim so a pale dragon stays visible on a light background.
		 */
		/**
		 * Reference artwork, traced from the supplied photos to SVG with the studio
		 * backdrop removed (see svg-pet/trace.py). Vector keeps the pet crisp at
		 * any size and lets it sit on any UI colour; each carries a soft dark
		 * rim so a pale dragon stays visible on a light background.
		 */
		const PET_PHOTOS = {
			naiwa: `<?xml version="1.0" encoding="UTF-8"?>
<!-- Generator: visioncortex VTracer 0.6.12 -->
<svg width="209" height="418" version="1.1" viewBox="0 0 209 418" xmlns="http://www.w3.org/2000/svg">
 <defs>
  <filter id="dshOutline" x="-25%" y="-25%" width="150%" height="150%">
   <feMorphology in="SourceAlpha" operator="dilate" radius="2" result="spread"/>
   <feGaussianBlur in="spread" result="soft" stdDeviation="1.2"/>
   <feFlood flood-color="#1a1206" flood-opacity=".42" result="ink"/>
   <feComposite in="ink" in2="soft" operator="in" result="edge"/>
   <feMerge>
    <feMergeNode in="edge"/>
    <feMergeNode in="SourceGraphic"/>
   </feMerge>
  </filter>
 </defs>
 <g filter="url(#dshOutline)">
  <path transform="translate(106,7)" d="m0 0c2.9 0.6 5.8 1 8.8 1.2 0.7 0.3 1.4 0.5 2.2 0.8 0.2 0.4 0.2 0.4 0.9 2.4 1.1 2.6 1.1 2.6 4.2 4.4 1 0.4 1.9 0.8 2.9 1.2v4c0.6 0.1 1.2 0.1 1.8 0.2 2.2 0.8 2.2 0.8 3.7 3.3 0.4 1 0.8 2 1.3 3.1l1.2 3c0.2 0.4 0.2 0.4 1 2.4h2c0.1 1.1 0.2 2.1 0.3 3.2 0.7 3.7 1.7 5.7 3.7 8.8v2c0.7 0.3 1.3 0.7 2 1 1.4 2.9 2 4.8 2 8h2c1.6 2.9 2.5 5.5 3.1 8.8 0.2 0.7 0.4 1.5 0.5 2.4 0.2 0.6 0.3 1.2 0.4 1.8 1-0.7 2-1.3 3-2v4l2.4 0.6c2.6 1.4 2.6 1.4 3.9 5 0.2 1.1 0.5 2.3 0.7 3.4h2c0.4 1.1 0.9 2.3 1.3 3.4 0.6 1.2 1.1 2.4 1.7 3.6 1 0.3 2 0.7 3 1 0.5 1.9 1.1 3.8 1.5 5.7 0.8 3.6 2.1 6.9 3.5 10.3 0.7 0.3 1.3 0.7 2 1 2.6 5.6 3.6 11.6 4.5 17.6 0.5 2.4 0.5 2.4 2.5 5.4v2h2c0.1 0.9 0.2 1.8 0.4 2.8 1.9 14.1 1.9 14.1 3.6 19.2 1 0.3 2 0.7 3 1v6c1 0.3 2 0.7 3 1 0.3 1.9 0.7 3.8 1 5.7 0.2 1 0.4 2.1 0.6 3.2 0.4 2.7 0.5 5.3 0.4 8.1 1.3-0.3 2.6-0.7 4-1 2.5 14.1 3.3 28 3.3 42.2v2.5 6.9 2.2c0 3.6-0.2 5.1-2.3 8.2-0.4 2.5-0.4 2.5-0.6 5.2l-0.3 2.7c0 0.4 0 0.4-0.1 2.1h-3c-0.1 1.2-0.1 2.4-0.2 3.7-0.5 4.6-2.5 6.1-5.8 9.3-0.6 2-0.6 2-1.1 4.2-0.9 3.8-0.9 3.8-3 5.3-0.6 0.2-1.3 0.3-1.9 0.5v2h-5c-0.3 0.6-0.6 1.1-0.9 1.7-1.7 3.5-3.4 6.9-5.1 10.3h-2c0 0.6 0 1.1-0.1 1.7-0.4 10.9-1 21.8-2.1 32.6-0.6 5.6-1 11.2-1.2 16.8-0.1 0.7-0.1 1.4-0.1 2.2-0.3 5.8-0.3 5.8-0.5 8.6-0.4 10.5-2.1 20-5 30.1h-1c-0.7-5.3-1.3-10.6-2-16-0.3 2.3-0.7 4.6-1 7-1 1-1 1-3.5 1.1h-3.1c-1 0-2-0.1-3-0.1h-2.4c-0.3-0.9-0.5-1.9-0.8-2.8-1.1-3-1.7-4.4-4.2-6.2h-3c-0.3-2.6-0.7-5.3-1-8h-2c0.3-2 0.7-4 1-6-2-0.7-4-1.3-6-2v-2c-0.7-0.3-1.3-0.7-2-1-0.3-2.3-0.7-4.7-1-7l-2-2v-3c-1.3-0.3-2.6-0.7-4-1l-1.5-7.2c-0.1-0.4-0.1-0.4-0.4-2.1-0.7-3.3-1.1-6.3-1.1-9.7l1-1c-1-0.3-2-0.7-3-1-2.2-2.8-2-4.1-1.6-7.8 0.2-1 0.4-2.1 0.6-3.2-2.1 0.1-4.3 0.2-6.4 0.4-1.2 0-2.3 0.1-3.6 0.2-3 0.4-3 0.4-5 2.4-10.6 1.3-21.3-1.3-31-5.2-2.4-0.9-4.7-1.6-7.1-2.3-3.1-0.9-5.5-1.8-8.3-3.3-2.6-1.2-2.6-1.2-5.6-0.2 0-0.6 0.1-1.2 0.1-1.8 0.2-5 0-8-3.1-12.2v-2l-1.8 0.6c-2.2 0.4-2.2 0.4-4.3-0.1-2.9-2.3-3.1-5-3.9-8.5h-3c1.8 4.9 1.8 4.9 4 6v3c1.3 0.3 2.6 0.7 4 1v2c2 0.3 4 0.7 6 1 0 0.6 0 0.6-0.1 3.7-0.2 9 0 17.1 2.5 25.8 0.6 2.5 0.6 2.5-0.4 5.5-2.5-6.6-3.8-13-4.7-19.9-0.1-1-0.2-1.9-0.4-2.9-0.9-6.8-0.9-6.8-0.9-9.2h-2c-2.1-1.9-2.1-1.9-4-4v-2h-2c-1.7-1.9-1.7-1.9-3.6-4.4-0.7-0.8-1.3-1.6-1.9-2.4-1.5-2.2-1.5-2.2-1.5-4.2-1-0.3-2-0.7-3-1-0.9-1.9-0.9-1.9-1.6-4.3-0.9-3.1-1.9-5.8-3.4-8.7-0.6-2.8-1-5.5-1.2-8.3-0.1-0.8-0.2-1.6-0.2-2.5-0.1-0.7-0.2-1.5-0.2-2.2-0.4-2-0.4-2-2.4-4-0.2-2.5-0.2-2.5-0.1-5.4v-3c0-0.4 0-0.4 0.1-2.6v-3c1.2-1.7 1.2-1.7 3-3 2.7 0.3 2.7 0.3 5 1-0.7-1-1.3-2-2-3 0.4-2.7 0.4-2.7 1-5h2c-0.2 0.7-0.2 0.7-1 4 0.8-0.3 0.8-0.3 5-2 0.1 0.8 0.1 1.6 0.2 2.4 0.3 0.8 0.5 1.7 0.8 2.6 2.6 1.3 2.6 1.3 5 2 0 0.8 0 1.6-0.1 2.4 0.1 2.6 0.1 2.6 1.1 3.6 5 0.2 10 0.1 15 0 0.5 0 0.5 0 3.3-0.1 7-0.3 7-0.3 10.6-3.4 0.7-0.8 1.4-1.7 2.1-2.5 2.5-0.8 4.4-1 7-1v-2c0.5 0.2 1.1 0.3 1.7 0.5 3.5 0.8 6.9 0.5 10.5 0.4 2.8 0.1 5.2 0.5 7.8 1.1v-2c2.6-1 5.3-2 8-3v3c0.4-0.3 0.4-0.3 2.3-1.6 0.9-0.4 1.8-0.9 2.7-1.4 1 0.3 2 0.7 3 1 5.9-0.6 9.4-2.3 14-6 2.8 0.2 2.8 0.2 5 1v-2c2-1.4 4-2.7 6-4-5.7 0.5-10.7 2.2-16 4.2-3.2 0.8-5.8 0.9-9 0.8v-2c-0.4 0.5-0.8 0.9-1.1 1.4-6.3 5.3-21 4.5-28.9 4.6-2.9-0.5-2.9-0.5-5-1v2h-3c-0.3 1-0.7 2-1 3h-3c-0.1-0.3-0.1-0.3-0.3-1.9-0.2-0.7-0.5-1.4-0.7-2.1-1-0.3-2-0.7-3-1-0.7 2.3-1.3 4.6-2 7-7 1.2-14 1.5-21 2 0.3-0.7 0.7-1.3 1-2 2.3-0.7 4.6-1.4 7-2v-6c-1-0.3-2-0.7-3-1v-3c0.7-0.3 1.3-0.7 2-1 0.3-1 0.7-2 1-3-1.3-0.7-2.6-1.3-4-2v-2c2-0.3 4-0.7 6-1 0.1-0.6 0.3-1.2 0.4-1.9 0.2-0.8 0.4-1.6 0.5-2.4l0.6-2.4c0.5-2.3 0.5-2.3 1.5-5.3-2.6-0.3-5.3-0.7-8-1v-2h-2c-0.3 1.3-0.7 2.6-1 4-0.1-2.4-0.1-2.4 0-5l2-2c7 0.3 13.3 2.1 20 4 3.3 0.9 3.3 0.9 6 1 3.1-1.7 3.1-1.7 6-4 2.5-1.5 5.1-3 7.6-4.5 2.4-1.5 2.4-1.5 3.8-3.1 2.3-2 4.7-2.5 7.6-3.4 1.7-1 3.3-2 5-3 0.6-0.1 1.3-0.2 1.9-0.3 2.8-0.9 3.9-2.4 5.8-4.6 0.3-0.3 0.3-0.3 1.8-2.1 1.5-2 1.5-2 2.5-5h-2c-3-5.8-3-5.8-3-8-1-0.3-2-0.7-3-1v-3c-1.7-0.3-3.3-0.7-5-1-0.3-1-0.7-2-1-3-0.7-0.1-1.5-0.1-2.2-0.2-3.7-1.1-4.8-2.7-6.8-5.8v-2c-0.5 0.2-0.5 0.2-3 1l-2-2v-3c-8.6-2.8-17.9-4.4-27-4-0.3 0.7-0.7 1.3-1 2-1.3 0.3-2.7 0.7-4 1-1.7 1-3.4 2-5 3-0.9-3.7-1.3-5.4 0.4-8.9 0.6-0.7 1.1-1.4 1.6-2.1 0.7 1.3 1.3 2.6 2 4h2c2.8-7.2 4.1-14.5 5.4-22.1 0.3-2.2 0.7-4.3 1.2-6.5 1.7-9.4 0.8-17.9-3.6-26.4h2c2 2.9 3 4.4 3 8h2c1 3.6 2 7.3 3 11 0-1.3 0-2.6-0.1-3.9 0-3.9 0-3.9 1.1-6.1-1-0.3-2-0.7-3-1-0.5-1.9-1.1-3.8-1.5-5.7-0.9-3.8-2.2-7.5-3.5-11.3 0.7-0.3 1.5-0.5 2.2-0.8 2.7-1.1 4.6-2.4 6.8-4.2-0.3-1-0.7-2-1-3 0.2-0.3 0.2-0.3 1-2-1-0.3-2-0.7-3-1-0.2 0.3-0.2 0.3-1 2-1-1.3-2-2.6-3-4h2c0.3-1.3 0.7-2.6 1-4 0.5 0 0.5 0 3.3 0.1 1.5 0 2.9 0.1 4.4 0.1 0.3 0 0.3 0 2.2 0.1 4.7 0 7.3-0.7 11.1-3.3h3c0.3-2.6 0.7-5.3 1-8h2v-3h-2c-0.1-1.1-0.1-2.1-0.2-3.2-0.8-3.8-0.8-3.8-2.8-6.1-3.9-2.2-7.6-3-12-3.7 0.7-2 0.7-2 2-4 1.9-0.6 1.9-0.6 4.2-0.7 0.9 0 1.8-0.1 2.7-0.1 1-0.1 2-0.1 3.1-0.2 1.3-0.1 2.5-0.2 3.9-0.3 1.3-0.2 2.6-0.3 4-0.4 1.2-0.1 2.5-0.2 3.8-0.3 3.3 0 4.6 0.3 7.3 2z" fill="#E1AB41"/>
  <path transform="translate(70,120)" d="m0 0c0.9 0.1 1.8 0.2 2.8 0.3 2.5 0.4 4.8 0.8 7.2 1.7 1.5 2.6 1.5 2.6 2 5 0.3 0.2 0.3 0.2 2 1v2c1 0.3 2 0.7 3 1v2h2v3c1.2 0 2.5 0.1 3.8 0.1 2.2 0.3 2.2 0.3 4.2 0.9 2.3 3 2.3 3 4 6 0.5 0.2 0.5 0.2 3 1 1.4 2.5 1.4 2.5 2.7 5.6 0.4 1 0.9 2 1.3 3 0.3 0.8 0.7 1.6 1 2.4-3.9 4.6-6.2 5.3-12 6-6.4 2.8-6.4 2.8-8 6-2.6 0.6-2.6 0.6-5 1v2c-1.6 1.7-1.6 1.7-3.8 3.6-0.7 0.6-1.4 1.2-2.2 1.8-2 1.6-2 1.6-5 2.6-1.2 2.6-1.2 2.6-2 5-5.7-0.8-11.1-2.5-16.6-4.2-3.3-0.8-6-1-9.4-0.8-1 1-1 1-1.4 3.2 0.6 3.9 2.5 5.3 5.4 7.8h-2c-0.2 0.5-0.2 0.5-1 3-2.8 0.9-2.8 0.9-6.4 1.7-1.1 0.2-2.3 0.5-3.5 0.7-3.1 0.6-3.1 0.6-6.1 0.6l-2-2-2 2c-0.2-0.3-0.2-0.3-1-2l-2 2h-3c-0.3-0.7-0.7-1.3-1-2-1-0.7-2-1.3-3-2v-2c0.3-0.2 0.3-0.2 2-1 0.3-0.8 0.6-1.7 0.9-2.5 1.1-2.5 1.1-2.5 3.2-3.3 0.6-0.1 1.3-0.1 1.9-0.2-0.2-0.6-0.4-1.1-0.6-1.7-0.5-3 0.3-4.6 1.6-7.3h-2v4h-2v-2h-3c1.6-5.4 3.2-10.7 5-16-6.6 2.2-6.6 2.2-8.6 6.1-0.4 1-0.9 1.9-1.4 2.9-3.1 0.8-3.1 0.8-6 1l-2 2c0.6-4 2.6-6.8 5-10h2c0.2-0.6 0.5-1.2 0.8-1.9 1.4-2.5 2.6-3.1 5.2-4.1v-2c0.9-0.4 1.9-0.8 2.9-1.2 3.4-2 3.6-2.5 5.1-5.8 1.5-2.1 3.1-4.1 4.7-6.1 1.3-1.9 1.3-1.9 2.3-4.9h2c0.2-0.7 0.5-1.4 0.7-2.2 1.5-3.3 3.4-5.4 5.9-8.1 0.8-0.9 1.7-1.8 2.5-2.7 0.6-0.7 1.3-1.3 1.9-2 0.7 1.3 1.3 2.6 2 4 3.6 0 4.2-0.9 7-3 4.9-2.9 9.6-1.8 15-1z" fill="#E1C081"/>
  <path transform="translate(52,286)" d="m0 0c0.2 0.1 0.2 0.1 1.5 0.7 5.9 2.8 11.9 4.7 18.2 6.4 2.1 0.6 4.2 1.2 6.2 1.9 6.7 2.2 13.2 3.4 20.1 4.1 0.4 0.1 0.4 0.1 2.3 0.3l5.7 0.6c0.4 8.7-0.2 16.1-2.3 24.6-0.9 4.4-1.2 8.7-1.4 13.2-0.1 0.7-0.2 1.4-0.3 2.2-0.3 0.2-0.3 0.2-2 1v-5h-2c-0.3 4.3-0.7 8.6-1 13h-2v3c-0.7 0.3-0.7 0.3-4 2 0.1 0.5 0.1 0.5 0.6 2.9 0.4 3.1 0.4 3.1-0.6 5.1-0.3 1.7-0.7 3.3-1 5-0.2 0.5-0.2 0.5-1 3 0.7-0.2 0.7-0.2 4-1 0.1 1.1 0.2 2.2 0.2 3.4 0.3 1.2 0.5 2.4 0.8 3.6 2 1.2 2 1.2 4 2 0.3 1 0.7 2 1 3 1.7 0.3 3.3 0.7 5 1v3c-6.6 0.1-6.6 0.1-10-1-1.6-0.1-3.3-0.1-4.9-0.1h-2.8-3c-1 0-2 0-3 0.1h-7.3v2c-1.1 0-2.1 0-3.2-0.1-3.1 0.1-5.8 0.4-8.8 1.1v-2c-2-0.3-4-0.7-6-1v-2c-0.7-0.3-1.3-0.7-2-1 4.9-5.5 9.7-7.4 17-8 0.5 0.3 0.5 0.3 3 2 0-0.6 0.1-1.2 0.1-1.8 0.9-2.2 0.9-2.2 3.9-4 3-2.2 3-2.2 3.9-6 0-1 0.1-2.1 0.1-3.2l-1 1c-0.3 0.2-0.3 0.2-2 1v-2c-0.7-0.3-1.3-0.7-2-1-6.8-8.4-6.8-8.4-7.2-13.7 0.3-2.5 0.3-2.5 1.2-6.3-0.5-0.2-0.5-0.2-3-1-1.1-2.5-1.1-2.5-2.1-5.5-0.6-1.9-1.2-3.7-1.9-5.5-0.7-0.3-1.3-0.7-2-1-0.1-0.8-0.3-1.6-0.4-2.4-0.6-2.6-0.6-2.6-2.2-4-2.3-2.6-1.6-5.3-1.4-8.6h-2c0.3-2.3 0.7-4.6 1-7h-4c-1.6-5.5-2.4-10.2-2-16l2-2z" fill="#A56919"/>
  <path transform="translate(22,385)" d="m0 0h1c0.3 2.3 0.7 4.6 1 7 2.1 0.2 4.2 0.3 6.3 0.5l3.6 0.3c9.7 0.6 19.3 0.1 29-0.6 0.6-0.1 0.6-0.1 3.8-0.3 33.4-2.4 33.4-2.4 42.3-6.9-0.3 1.6-0.7 3.3-1 5 2.1 0.2 4.2 0.4 6.4 0.6 0.6 0 0.6 0 3.6 0.3 3 0.1 3 0.1 5-0.9h6c-2.3 1.5-4.3 2.7-6.7 3.9-0.7 0.3-1.4 0.7-2.2 1-1.4 0.7-2.9 1.5-4.4 2.2-0.7 0.3-1.4 0.7-2.1 1s-1.3 0.6-2 1c-1.6 0.9-1.6 0.9-3.6 2.9-0.4 2.1-0.4 2.1-0.6 4.4-0.2 2.8-0.5 4.9-1.4 7.6-0.9-0.1-1.7-0.3-2.6-0.4-11.6-1.7-23-1.8-34.6-1.6h-3.9c-1.2 0-2.3 0.1-3.5 0.1-5.2-0.1-10.2-1-15.3-2-0.7-0.1-1.5-0.3-2.3-0.4-0.6-0.2-1.2-0.5-1.8-0.7-0.2-0.5-0.2-0.5-1-3-2-0.1-3.9-0.1-5.9-0.1-1.1 0-2.2-0.1-3.3-0.1-2.8 0.2-2.8 0.2-4.8 2.2-4-0.4-7.6-2-11.3-3.5-5-2-9.3-3.2-14.7-3.5 1.3-0.3 2.6-0.7 4-1v-8c1.3-0.7 2.6-1.3 4-2v2c7.6-1.5 7.6-1.5 9.5-4.1 0.2-0.6 0.3-1.3 0.5-1.9 0.7 0.3 1.3 0.7 2 1 0.3-0.7 0.7-1.3 1-2z" fill="#E8DFCF"/>
  <path transform="translate(74,7)" d="m0 0c1 0.3 2 0.7 3 1-0.7 1-1.3 2-2 3 0.6 0 1.2 0.1 1.9 0.1 0.8 0.1 1.6 0.1 2.4 0.2s1.6 0.1 2.4 0.2c2.7 0.6 3.6 1.5 5.3 3.5 0.7-0.3 1.3-0.7 2-1 1.2 3.5 1.1 6.4 1 10h2v3h-2c0.2 0.8 0.4 1.5 0.6 2.3 0.4 2.7 0.4 2.7-1.6 5.7-7 4.7-13.7 4.7-22 4-0.7-0.3-1.3-0.7-2-1-0.9 3.7-1 5.2 0 9-2.8 0.2-2.8 0.2-17 1 0.3 1 0.7 2 1 3 0.7 0.3 1.3 0.7 2 1 0.3 0.8 0.6 1.5 0.9 2.3 1.2 3 2.7 4.6 5.1 6.7-0.3 1-0.7 2-1 3-0.2-0.5-0.2-0.5-1-3-1-0.3-2-0.7-3-1-4.5-3.8-7-8.1-8-13.9 0-3.2 1.5-5.3 3-8.1 0.1-1.7 0.1-3.5 0.1-5.2 0.5-8.2 6.4-13.3 11.9-18.8 1.8-0.7 1.8-0.7 3.8-1.4 3.3-1.2 6.2-2.7 9.2-4.6 0.7-0.3 1.3-0.7 2-1z" fill="#BAA855"/>
  <path transform="translate(126,11)" d="m0 0c9.5 9.3 15.3 23.3 21.1 35.2 5.3 10.7 11.3 21 17.6 31.3 0.5 0.9 1.1 1.8 1.7 2.8 0.5 0.8 1 1.7 1.5 2.5 1.1 2.2 1.1 2.2 1.1 5.2h2c6.6 13.9 12 27.9 16.8 42.5 1.2 3.8 2.5 7.6 3.7 11.4 0.2 0.5 0.2 0.5 0.9 2.7 2 5.9 4.2 11.5 6.9 17.1 0.8 2.6 0.6 3.8-0.3 6.3-0.7-1.6-1.3-3.2-2-4.9-0.4-0.9-0.7-1.8-1.1-2.7-0.9-2.4-0.9-2.4-0.9-4.4h-2v-4c-1-0.3-2-0.7-3-1-0.2-1-0.4-2-0.6-3.1-0.2-1.3-0.5-2.7-0.8-4-0.1-0.7-0.2-1.4-0.4-2-0.6-3.2-1.3-6.2-2.3-9.2-0.9-2.7-0.9-2.7-0.9-5.7h-2v-5h-2c-0.7-3.3-1.3-6.6-2-10h-3c-0.1-1.1-0.2-2.2-0.2-3.4-0.2-0.6-0.2-0.6-0.8-3.6-0.3-0.2-0.3-0.2-1.9-1-2.1-1-2.1-1-3.1-3-1.4-4.4-2.4-8.3-2-13-0.7-0.2-0.7-0.2-4-1-0.3-1.2-0.3-1.2-2-7h-2c-0.4-1.1-0.8-2.2-1.2-3.4-1.5-3.4-1.5-3.4-3.9-4.9-0.6-0.2-1.3-0.5-1.9-0.7-0.3-0.7-0.7-1.3-1-2h-3c-0.1-0.6-0.1-0.6-0.4-3.4l-0.6-3.6c-0.7-0.3-1.3-0.7-2-1v-5h-2c-1.8-3.1-2-4.2-2-8-0.5-0.2-0.5-0.2-3-1-1.1-2.8-1.1-2.8-2-6-0.9-2.6-1.7-4.6-3.4-6.8-2.3-3.1-3.3-6.5-4.5-10.1-0.4-0.7-0.7-1.4-1.1-2.1-0.5-0.2-0.5-0.2-3-1-0.1-0.6-0.2-1.2-0.3-1.9-0.2-0.7-0.5-1.4-0.7-2.1-1-0.5-2-0.9-3-1.4-1-0.6-2-1.1-3-1.6-0.7-2.6-0.7-2.6-1-5-0.8 0-1.7-0.1-2.5-0.1l-3.3-0.3c-1.1 0-2.2-0.1-3.3-0.2-2.9-0.4-2.9-0.4-5.9-2.4-4.6-0.1-9.2 0.3-13.8 0.7-1.3 0.1-2.6 0.1-3.9 0.2-0.6 0.1-0.6 0.1-3.7 0.3-0.6 0-0.6 0-3.4 0.2-4.5 0.8-7.9 2.8-11.8 5.2-2.4 1.4-2.4 1.4-4.8 2.1-4.2 2.1-6.7 5.7-9.6 9.3 0-4.9 3.7-7.6 7-11 18-17.3 48.9-17 68-2z" fill="#EEDC9D"/>
  <path transform="translate(162,378)" d="m0 0c0.4 0.6 0.9 1.2 1.3 1.8 2.4 3.1 4.5 5.1 7.8 7.3 2.9 1.9 2.9 1.9 3.9 3.9 0.6 3.5 0.7 6.6 0 10-2.3 2.9-5.1 4.8-8 7l-2.4 2.7c-3.8 3.4-9.4 6.3-14.6 6.3 0-1 0.1-2 0.1-3.1-0.1-4.1-0.8-7-2.1-10.9h-3v-2c-0.6 0-1.1 0-1.7 0.1-4 0.1-7.6 0-11.5-1.1-3.5-0.9-6.2-1.1-9.8-1-0.7-0.3-1.3-0.7-2-1h-7c3.2-2.6 6.6-4.3 10.4-6.1 1.1-0.5 2.2-1 3.3-1.5 3.1-1.3 6.1-2.4 9.3-3.4 0.3 0.5 0.3 0.5 2 3 2.3 0.5 2.3 0.5 5 0 2.6-2.4 2.6-2.4 5-5 1-0.3 2-0.7 3-1 0.3-1 0.7-2 1-3 6.2-2.3 6.2-2.3 10-1v-2z" fill="#9B7942"/>
  <path transform="translate(125,398)" d="m0 0c2.3 0.3 4.7 0.5 7 0.7 2 0.3 2 0.3 4 1.3 1.5 0.2 3.1 0.4 4.6 0.6 0.8 0 1.7 0.1 2.5 0.2 0.6 0.1 1.3 0.1 1.9 0.2v2h3c2.6 5.2 3.4 8.1 2 14-1.8 1.8-4.2 1.1-6.5 1.1h-2.3-2.1c-3.9 0-7.4-0.3-11.1-1.1-1.9 0-3.8 0-5.8 0.1-5.6 0.1-10-0.9-15.2-3.1-1.5-8.8-1.5-8.8 1-13 2.9-3.1 6-3.6 10.1-3.9 2.4-0.1 4.5 0.3 6.9 0.9z" fill="#554524"/>
  <path transform="translate(177,112)" d="m0 0h2c1.3 3.6 2 6.1 2 10h2v5h2c2.5 6.9 4 13.7 5.3 20.9 0.2 1 0.4 2.1 0.7 3.1 0.7 0.3 1.3 0.7 2 1v4h2c0.7 1.6 1.3 3.2 2 4.9 0.4 0.9 0.7 1.8 1.1 2.7 0.9 2.4 0.9 2.4 0.9 4.4h2c8.9 28.8 13.2 58.7 0 87l-2 2c0.1-3.1 0.2-6.2 0.4-9.2 0-0.9 0-1.8 0.1-2.7 0-0.8 0-1.7 0.1-2.6 0-0.7 0-1.5 0.1-2.3 0.3-2.2 0.3-2.2 1.3-4 1.5-3.3 1.3-6.7 1.3-10.3v-2.4-5-7.6c0-20.3 0-20.3-3.4-27-1.2-2.4-1-4.3-0.9-6.9h-2c-1.4-5.1-2.3-9.9-2.7-15.2l-0.3-1.8c-0.7-0.3-1.3-0.7-2-1-0.1-0.9-0.3-1.9-0.4-2.9-0.7-3.4-1.2-3.8-3.6-6.1-1.8-4.5-2.4-8.6-2.6-13.4-0.1-1.2-0.2-2.5-0.3-3.7 0-1 0-1.9-0.1-2.9h-2l-2-2h-1c-0.1-0.7-0.1-1.5-0.2-2.2-0.1-1-0.2-2-0.2-3-0.1-1-0.2-1.9-0.3-2.9-0.3-2.7-0.7-5.3-1.3-7.9z" fill="#E9CD8D"/>
  <path transform="translate(19,176)" d="m0 0c-0.5 3.8-1.3 6.6-3 10-0.4 2-0.7 4-1 6h3c1.1 5.8 1.1 5.8 0 8-0.2 1.9-0.4 3.7-0.6 5.6 0 1-0.1 2-0.2 3.1 0 0.3 0 0.3-0.2 2.3h-2v7c-4.2-0.8-6.4-1.3-9.2-4.6-3.6-6.9-5.1-11.8-5.1-19.6v-2.2c0-3.7 0.3-6.5 2.3-9.6h2c0.3-1 0.7-2 1-3 4.3-3.9 7.5-4.4 13-3z" fill="#67502D"/>
  <path transform="translate(44,180)" d="m0 0h2v2c2.6 0.3 5.3 0.7 8 1-0.1 1.4-0.3 2.8-0.4 4.2l-0.3 2.4c-0.3 2.2-0.7 4.3-1.3 6.4h-7c1.3 2.5 2.5 2.9 5 4-0.7 1.3-1.3 2.6-2 4h-2v3c1.3 0.3 2.6 0.7 4 1-0.1 2.8-0.1 2.8-1 6-2.3 1.5-4.4 2.1-7 3 0.9-0.1 1.8-0.2 2.7-0.3 1.2-0.1 2.3-0.2 3.5-0.3 0.6 0 0.6 0 3.6-0.3 2.7-0.1 4.6 0 7.2 0.9-14.2 6.3-14.2 6.3-21 4-0.3-2.3-0.7-4.6-1-7-0.8-0.1-1.6-0.3-2.4-0.4-2.6-0.6-2.6-0.6-3.6-1.6-0.5-5.4-0.5-5.4 1.5-7.9 0.5-0.3 1-0.7 1.5-1.1-1.3-0.7-2.6-1.3-4-2 0.3-2 0.7-4 1-6 1.1-0.3 2.1-0.5 3.2-0.8 1.4-0.3 2.8-0.7 4.2-1 0.7-0.2 1.4-0.3 2.1-0.5 5.3-1.4 5.3-1.4 7.5-4.7-0.7-0.4-1.3-0.8-2-1.2-2-1.8-2-1.8-2.2-4.5 0-0.8 0.1-1.5 0.2-2.3z" fill="#6A4917"/>
  <path transform="translate(137,200)" d="m0 0c-2.7 2.3-4.6 3.9-8 5v2c-0.4 0-0.4 0-2.2-0.2-2.8 0.2-2.8 0.2-5 2.1-3.9 2.9-8 3.7-12.8 4.1-1-0.3-2-0.7-3-1-2.2 0.9-2.2 0.9-4 2-0.2-0.3-0.2-0.3-1-2-0.6 0.3-1.2 0.7-1.8 1-2.2 1-2.2 1-5.2 1v2c-2.6 0.1-5.2 0.1-7.8 0.1-0.7 0-1.4 0.1-2.2 0.1-3.8 0-6.7 0-10-2.2 0.3 1 0.7 2 1 3h-3c-1.7 0.3-3.3 0.6-5 1v3c-3.9 1.8-7.3 2.4-11.5 2.7-1.1 0.1-2.2 0.2-3.3 0.2-3 0.1-5.4-0.2-8.2-0.9 1-2 1-2 4.3-3.3 1.4-0.4 2.8-0.8 4.1-1.3 7.4-2.3 7.4-2.3 9.6-3.4 0.7-2 1.4-4 2-6 1.3 0.3 2.6 0.7 4 1v4c1-0.3 2-0.7 3-1 0.3-0.7 0.7-1.3 1-2h3v-2h1.8c6.7 0.1 13.2-0.3 19.8-1 1-0.1 2-0.2 3.1-0.3 2.4-0.2 4.9-0.5 7.3-0.7 0.3-1 0.7-2 1-3h2v2c2.6-0.6 5.1-1.2 7.7-1.9 0.7-0.1 1.4-0.3 2.2-0.5 3.1-0.8 6-1.5 8.9-2.7 2.8-1.1 5.2-1 8.2-0.9z" fill="#B17C2B"/>
  <path transform="translate(33,264)" d="m0 0h3c1.5 2.6 2 3.9 2 7 1.3 0.1 2.5 0.2 3.8 0.3 2.5 0.2 3.9 0.5 5.9 2 1.6 2.1 1.8 3.5 1.9 6.2 0.1 0.9 0.2 1.8 0.2 2.7 0.1 0.9 0.1 1.8 0.2 2.8 0.2 1.9 0.3 3.8 0.5 5.6 0.1 0.9 0.2 1.8 0.2 2.8 0.4 3.5 0.8 7.1 1.3 10.6h4c1 3 1 3 0.1 5.2-0.4 0.6-0.7 1.2-1.1 1.8h2c0.3 3 0.7 5.9 1 9 0.5 0.2 0.5 0.2 3 1v5c0.5 0.2 0.5 0.2 3 1 1.1 2.5 1.1 2.5 2.1 5.5 0.6 1.9 1.2 3.7 1.9 5.5 0.3 0.2 0.3 0.2 2 1v8h-2c-1.7-2.3-3.4-4.7-4.9-7.1-0.5-0.7-0.9-1.4-1.4-2-2.5-3.9-4.7-7.8-6.7-11.9-0.7-1-1.3-2-2-3-0.4-2-0.7-4-1-6h-2l-0.6-3.6c-0.3-1.5-0.6-3.1-0.8-4.6-0.2-0.8-0.3-1.6-0.4-2.4-0.2-0.8-0.3-1.5-0.4-2.3-0.2-0.7-0.3-1.4-0.4-2.1-0.4-2-0.4-2-0.9-4-0.5-2.1-0.6-3.9-0.6-6v-2.3-2.3-2.4c0-5.7 0-5.7 1.1-8-0.3 0.1-0.3 0.1-1.8 0.7-0.7 0.1-1.5 0.2-2.2 0.3-1.6-1.3-1.6-1.3-3-3-1-0.7-2-1.3-3-2v-3c-1-0.3-2-0.7-3-1-0.3-1.6-0.7-3.3-1-5z" fill="#BB9148"/>
  <path transform="translate(19,192)" d="m0 0c0.7 0.3 1.3 0.7 2 1 1.3-0.3 2.7-0.7 4-1h5c0 0.6 0.1 1.3 0.1 1.9 0 0.4 0 0.4 0.2 2.5 0.1 0.8 0.1 1.6 0.2 2.4 0.5 2.2 0.5 2.2 3.5 4.2-1 3-1 3-3 4-0.3 1-0.7 2-1 3-3.1 1.2-3.1 1.2-6 2 0.3-1.3 0.7-2.6 1-4-0.7 0.3-1.3 0.7-2 1 0.3 2.3 0.7 4.6 1 7h-6c-1.1 1.9-1.1 1.9-2 4 0.3 0.7 0.7 1.3 1 2 0 2.5-0.1 5-0.2 7.5 0.2 2.7 0.9 4.1 2.2 6.5 0.4 1.6 0.8 3.3 1.1 4.9 0.1 0.9 0.3 1.7 0.4 2.6 0.3 1.7 0.7 3.4 1 5.1 0.5 2.4 0.5 2.4 2.1 5.6 0.5 0.9 0.9 1.8 1.4 2.8-0.2 0.3-0.2 0.3-1 2-0.7-1.6-1.3-3.3-2-5h-2c-1.1-3.1-2.3-6.2-3.4-9.4-0.3-0.8-0.6-1.7-0.9-2.6-1.9-5.2-3.3-10.3-4.3-15.7-0.6-3.5-1.5-6.9-2.4-10.3 2 0.7 4 1.3 6 2v-7h2v-2.2c-0.1-5.4 0-10.5 1-15.8l1-1z" fill="#CDAC74"/>
  <path transform="translate(130,346)" d="m0 0c3.5 3.2 6.6 6.8 9 11v3c0.3-0.1 0.3-0.1 1.8-0.7 2.2-0.3 2.2-0.3 3.8 0.8 1.8 2.5 2.6 5 3.4 7.9h10c0.1-1.1 0.2-2.3 0.4-3.4l0.6-3.6c0.7-0.3 1.3-0.7 2-1 1.1 4.3 1.1 8.4 1.1 12.8 0 0.7 0 1.4-0.1 2.1v5.1h-2.3c-6 0.1-8.7 2.9-12.7 7h-2c-0.7 1.3-1.3 2.6-2 4h-7c0-2.2 0-2.2 1-5 2.5-2 5.2-3.5 8-5-0.3-7.4-3-12.1-6.9-18.2-1.1-1.8-2.2-3.6-3.3-5.3-0.5-0.8-1-1.5-1.5-2.3-3.3-5.5-3.3-5.5-3.3-9.2z" fill="#875519"/>
  <path transform="translate(197,248)" d="m0 0h3c0.2 12.7-6.2 20.5-14.6 29.4-0.8 0.9-1.6 1.7-2.4 2.6-0.3 0.3-0.3 0.3-1.8 1.6-6 5.9-6.5 11.4-7 19.6-0.2 2.6-0.4 5.2-0.6 7.7-0.1 1.4-0.2 2.7-0.3 4-0.5 6.7-1.2 13.3-1.9 19.9-0.1 1.1-0.2 2.3-0.3 3.6-0.6 6.3-1.6 12.4-3.1 18.6h-1c0.4-15.5 1.2-30.8 2.5-46.2 0-0.4 0-0.4 0.2-2.4 0.6-7.2 1.2-14.3 2.3-21.4h2c0.2-0.7 0.5-1.4 0.8-2.1 1.4-3.5 3.3-6.6 5.2-9.9h5v-2c0.3-0.3 0.3-0.3 1.9-1.6 2.2-2.5 2.5-3.4 3.1-6.5 0.8-3.8 1.9-4.6 5-6.9 1-2.7 1.5-5.2 2-8z" fill="#D6BA85"/>
  <path transform="translate(80,359)" d="m0 0c0.7 0.3 1.3 0.7 2 1-0.1 3.2-0.1 3.2-1 7-1.7 1.6-3.4 2.7-5.4 3.9-1.6 1.1-1.6 1.1-2.6 4.1-0.5-0.2-1-0.4-1.6-0.6-4.8-0.8-8.5 0.1-12.7 2.5-2.7 2.1-2.7 2.1-4.7 4.1-2.6 0.2-5.2 0.2-7.8 0.2h-2.2c-3.8 0-7.3-0.3-11-1.2v-2c-2.6 0.7-5.3 1.3-8 2 2.8-3.2 4.7-4.5 8.9-5.4 1-0.3 2.1-0.5 3.1-0.8 0.7-0.1 1.3-0.2 1.9-0.3 3.4-0.8 6.9-1.6 10.3-2.3 1.9-0.5 3.8-0.9 5.7-1.3 5.4-1.2 10.7-2.6 15.9-4.2 1.9-0.6 3.8-1.1 5.8-1.6 2.4-1.1 2.4-1.1 3.3-3.2 0-0.6 0.1-1.3 0.1-1.9z" fill="#886D3F"/>
  <path transform="translate(80,123)" d="m0 0c2.4 0.2 2.4 0.2 5 1 1.3 2.1 1.3 2.1 2 4h3c4 4.3 4 4.3 4 7h5c0.3 1.3 0.7 2.6 1 4 1.7 0.3 3.3 0.7 5 1 0.2 0.5 0.2 0.5 1 3 0.7 0.6 1.3 1.2 2 1.9 2.3 2.4 2.6 3.9 3 7.1h2c-0.5 4.3-1.7 6.3-4.8 9.2-0.6 0.7-1.3 1.4-2 2.1-2.5 1.9-4.2 2.2-7.2 2.7-1.7 1-3.3 2-5 3-0.7 0.2-1.4 0.3-2.1 0.5-2.4 0.6-3.2 1.7-4.9 3.5-4.4 3.2-9.1 5.7-14 8-0.2-0.5-0.2-0.5-1-3 0.9-0.6 1.8-1.2 2.8-1.8 3.2-2.2 3.2-2.2 5.4-4.4l1.8-1.8h2v-2c0.8-0.2 0.8-0.2 5-1 0.3-1 0.7-2 1-3 3.8-2.6 6.1-3.9 10.7-4.4 3.3-0.6 3.3-0.6 5.7-3.2 0.6-0.8 1.1-1.6 1.6-2.4-0.3-0.6-0.6-1.1-0.9-1.7-0.3-0.7-0.7-1.4-1.1-2.2-0.4-0.7-0.7-1.4-1.1-2.2-0.9-1.9-0.9-1.9-0.9-3.9-0.6-0.1-1.2-0.2-1.8-0.2-2.8-1-3.7-2.3-5.2-4.8v-2c-2.6-0.3-5.3-0.7-8-1v-3h-2c-1.6-1.4-1.6-1.4-3-3v-2c-0.8-0.3-0.8-0.3-5-2 0.3-1 0.7-2 1-3z" fill="#E9BE61"/>
  <path transform="translate(35.176 378.98)" d="m0 0c4.1 1.5 8.2 1.5 12.6 1.7 5 0.2 5 0.2 7.2 1.3v2c2 0.3 4 0.7 6 1v2h4c0.4-0.6 0.7-1.3 1-2 2 0.3 4 0.7 6 1v2c-15.7 2.3-15.7 2.3-23 2v2c-2.9-0.3-2.9-0.3-6-1-0.6-1-1.3-2-2-3-4.2-1.5-6.9-0.6-11 1v1h-5c-0.3 0.7-0.6 1.3-1 2-1.7-3.4-1.6-7.2-1-11 3.7-3.4 7.6-4.1 12.2-2z" fill="#4B370F"/>
  <path transform="translate(100.29 383.9)" d="m0 0h2.8c0.9 0 1.8 0.1 2.8 0.1h2.1c-0.3 1-0.6 2-1 3-13.2 5.5-29.8 5.1-43.9 6.1-0.6 0.1-0.6 0.1-3.7 0.3-9.1 0.6-18.3 1-27.4 0.2-0.9-0.1-1.8-0.2-2.8-0.3-2.2-0.3-2.2-0.3-4.2-1.3v-2c9.8-4.2 9.8-4.2 14.5-3.4 2.3 1.3 3.7 2.5 5.5 4.4 2.2 0.7 2.2 0.7 4 1v-2c23.8-3.3 23.8-3.3 34.2-3 6.1 0 11.7-2.9 17.1-3.1z" fill="#342511"/>
  <path transform="translate(103,296)" d="m0 0h13c0 1.1-0.1 2.2-0.1 3.4 0.1 3.6 0.1 3.6 2.1 5.6 1 0.7 2 1.3 3 2v2h-2c0.2 0.8 0.4 1.6 0.7 2.4 1.5 5.7 2.7 10.7 2.3 16.6h5c0.3 1 0.7 2 1 3 0.3 0.9 0.7 1.8 1 2.8 1.1 3.4 1.6 6.7 2 10.2h5c1.1 5.8 1.1 5.8 0 8h2c-0.3 1-0.7 2-1 3-2.1-2.6-4.1-5.2-6-8-0.3 0.2-0.3 0.2-2 1-1.4-3-2.9-6-4.3-9.1-0.2-0.4-0.2-0.4-1.2-2.5-4-8.3-7.2-16.5-9.7-25.3-0.3-1-0.5-2-0.8-3-0.7-2.4-1.3-4.7-2-7.1-3.3-0.3-6.6-0.7-10-1 0.7-1.3 1.3-2.6 2-4z" fill="#B0802D"/>
  <path transform="translate(66,44)" d="m0 0c1.3 0.3 2.6 0.7 4 1-0.7 1.3-1.3 2.6-2 4 0.7 0.3 1.3 0.7 2 1-1.1 0.8-2.2 1.7-3.4 2.5-0.6 0.5-1.2 0.9-1.9 1.4-1.7 1.1-1.7 1.1-3.7 1.1v5c0.7 0.3 1.3 0.7 2 1 1 3.1 1.8 6.2 2.5 9.4 0.1 0.2 0.1 0.2 0.5 1.6 0.7 0.3 1.3 0.7 2 1 0.1 1.6 0.1 3.2 0.1 4.9 0 0.9 0.1 1.8 0.1 2.7-0.2 2.4-0.2 2.4-2.2 4.4-0.7-4.3-1.3-8.6-2-13h-2c-3-5.8-3-5.8-3-8h-2c-1-1.6-2-3.3-3-5-1.3-1.7-2.7-3.3-4-5l-3-6c2.1-2.1 6.6-1.4 9.6-1.6 0.8 0 1.6 0 2.4-0.1l6-0.3c0.3-0.7 0.7-1.3 1-2z" fill="#BE8B38"/>
  <path transform="translate(98,336)" d="m0 0h2c0.2 6.3-0.6 11.9-1.9 18-1.1 5.4-2 11-0.4 16.4 1.8 2.2 3.7 2.6 6.3 3.6 0.7 1 1.3 2 2 3 0.5 0.2 0.5 0.2 3 1v7h-5v-3c-0.7-0.1-1.4-0.1-2.2-0.2-3.8-1.1-5.4-2.7-7.8-5.8-0.8-3.8-0.8-3.8-1-7-0.7 0.2-0.7 0.2-4 1 0.9-7.5 0.9-7.5 1.6-10.8 0.4-2.2 0.4-2.2-0.6-5.2l2-2h3v-3h2v-2.3c0-0.5 0-0.5-0.1-3.1v-3c0.1-2.6 0.1-2.6 1.1-4.6z" fill="#785229"/>
  <path transform="translate(23,159)" d="m0 0c-2.4 11.1-2.4 11.1-4 16-2 1-2 1-5.2 1.2-4.9 1-7.9 2.7-10.8 6.8-1.1 3.6-1.7 7.2-2 11h-1c-0.3-16.7-0.3-16.7 2.4-21.6 1.6-1.4 1.6-1.4 3.6-1.4 0.3-1 0.7-2 1-3 0.9 0 1.9-0.1 2.8-0.1 0.5-0.2 0.5-0.2 3.2-0.9 1.6-2.9 1.6-2.9 3-6 2.6-1.8 3.8-2 7-2z" fill="#D8B263"/>
  <path transform="translate(107,300)" d="m0 0c1.7 0.3 3.3 0.6 5 1 0.2 0.6 0.3 1.2 0.5 1.8 0.7 2.7 1.5 5.4 2.3 8.1 0.2 1 0.5 1.9 0.7 2.8 1.7 6.1 3.8 11.7 6.5 17.3 0.7 1.5 1.4 2.9 2 4.4 0.7 1.5 1.4 2.9 2.1 4.4 0.3 0.7 0.6 1.4 1 2.2 1.8 3.8 3.7 7.4 5.9 11 1.4 2.3 2.7 4.6 4 7-0.3 0.7-0.7 1.3-1 2-3.3-2.8-4.5-4.7-5-9h-2c-0.1-0.3-0.1-0.3-0.9-1.9-1.1-2.1-1.1-2.1-3.1-3.1-0.6-2.3-0.6-2.3-1.1-5.1-0.2-0.9-0.4-1.8-0.5-2.7-0.2-0.8-0.3-1.5-0.4-2.2h-2c-0.3-1.6-0.7-3.3-1-5h-3c0-0.6-0.1-1.2-0.1-1.9 0-0.4 0-0.4-0.2-2.4-0.1-0.8-0.1-1.6-0.2-2.4-0.6-2.7-1.6-3.4-3.5-5.3-0.9-2.6-0.9-2.6-1.6-5.4-0.3-1-0.5-1.9-0.8-2.9l-0.6-2.7c-0.3-1.3-0.7-2.7-1-4h-3v-5l1-1z" fill="#F5EED9"/>
  <path transform="translate(109,380)" d="m0 0c0.7 1.3 1.3 2.6 2 4 2 1 2 1 5.6 1h3.4l1 1c8.2 0.3 8.2 0.3 12-1 0.3 1 0.7 2 1 3-7.5 4-14.7 4.5-23 3-1-0.3-2-0.7-3-1 0.3-3.3 0.7-6.6 1-10z" fill="#F5EED9"/>
  <path transform="translate(58,99)" d="m0 0h1c-0.3 7.7-1.7 14-5 21-1-0.3-2-0.7-3-1-0.3-1-0.7-2-1-3-0.7 1.3-1.3 2.6-2 4h-2c1.8-5.2 4.8-9 8.1-13.3 1.8-2.5 2.9-4.8 3.9-7.7z" fill="#E1C081"/>
  <path transform="translate(97,384)" d="m0 0v2c-8.1 1.8-15.7 2.2-24 2-0.3-0.7-0.7-1.3-1-2 0.3-0.7 0.7-1.3 1-2 7.5-1.4 16.7-2.4 24 0z" fill="#4B370F"/>
  <path transform="translate(100,341)" d="m0 0h2c-0.4 2.3-0.9 4.6-1.5 6.9-1.6 6.6-2.1 13.3-2.5 20.1h3v2c1.3 0.3 2.6 0.7 4 1v3c1.3 0.7 2.6 1.3 4 2v3c-3.4-1.5-5.5-3.3-8-6-0.9-0.7-1.7-1.4-2.6-2.2-2.6-3-2.9-4.4-2.6-8.4 0-0.6 0.1-1.3 0.2-2s0.1-1.4 0.2-2.1c0.6-6 1.9-11.6 3.8-17.3z" fill="#A66A1A"/>
  <path transform="translate(136,362)" d="m0 0c4.4 1.5 5.4 4.4 7.7 8.3 1.8 3.7 2.1 6.6 2.3 10.7-1.4 1-2.9 2.1-4.3 3.1-0.8 0.5-1.6 1.1-2.4 1.7-0.8 0.4-1.5 0.8-2.3 1.2-1-0.3-2-0.7-3-1 4.8-4 4.8-4 7-4v-2h2v-2c-0.7-0.3-1.3-0.7-2-1 0.7-0.3 1.3-0.7 2-1l-2-2c-0.3 0.2-0.3 0.2-2 1 0.1-1.1 0.1-2.1 0.2-3.2-0.2-4-0.7-5-3.2-7.8v-2z" fill="#F5EED9"/>
  <path transform="translate(23,173)" d="m0 0h2c-0.3 2-0.5 4-0.8 6-0.2 2-0.2 2-0.2 5-1.3-0.3-2.6-0.7-4-1-0.7 2-1.3 4-2 6h-2c0.3 1 0.7 2 1 3h-2c-0.4-4.9 0.7-7.7 3-12 0.7-2.9 0.7-2.9 1-5h2v2h2v-4z" fill="#D8B263"/>
  <path transform="translate(30,207)" d="m0 0h1c0.2 1 0.5 1.9 0.8 2.9 0.4 1 0.8 2.1 1.2 3.1 2.1 0.9 2.1 0.9 4 1 0.3 2.3 0.7 4.6 1 7 1 0.2 1 0.2 6 1-3.4 2.1-6.1 2.2-10 2 0-2.6 0.3-4.5 1-7-2-0.7-4-1.3-6-2 0.3-2.6 0.7-5.3 1-8z" fill="#B17C2B"/>
  <path transform="translate(109,322)" d="m0 0c0.7 0.3 1.3 0.7 2 1 0.6 2.1 0.6 2.1 1 4h-4c0.3-1.6 0.7-3.3 1-5z" fill="#FDFFF1"/>
  <path transform="translate(122,343)" d="m0 0h1v6h-1v-6z" fill="#F2FCF7"/>
  <path transform="translate(140,375)" d="m0 0c0.3 0.7 0.7 1.3 1 2-0.7-0.3-1.3-0.7-2-1l1-1z" fill="#F5F8F5"/>
  <path transform="translate(133,384)" d="m0 0 2 1z" fill="#F8FBF3"/>
  <path transform="translate(139,379)" d="m0 0 2 1z" fill="#F6F9F6"/>
  <path transform="translate(110,376)" d="m0 0 2 1z" fill="#F7F7F2"/>
  <path transform="translate(107,372)" d="m0 0 2 1z" fill="#F6F6F6"/>
  <path transform="translate(126,351)" d="m0 0 2 1z" fill="#F2FDFE"/>
 </g>
</svg>`,
			pixel: `<?xml version="1.0" encoding="UTF-8"?>
<!-- Generator: visioncortex VTracer 0.6.12 -->
<svg width="263" height="387" version="1.1" viewBox="0 0 263 387" xmlns="http://www.w3.org/2000/svg">
 <defs>
  <filter id="dshOutline" x="-25%" y="-25%" width="150%" height="150%">
   <feMorphology in="SourceAlpha" operator="dilate" radius="2" result="spread"/>
   <feGaussianBlur in="spread" result="soft" stdDeviation="1.2"/>
   <feFlood flood-color="#1a1206" flood-opacity=".42" result="ink"/>
   <feComposite in="ink" in2="soft" operator="in" result="edge"/>
   <feMerge>
    <feMergeNode in="edge"/>
    <feMergeNode in="SourceGraphic"/>
   </feMerge>
  </filter>
 </defs>
 <g filter="url(#dshOutline)">
  <path transform="translate(175,14)" d="m0 0h1v11c1.3 0 1.3 0 7.6-0.1 2.4 0.1 2.4 0.1 4.4 1.1 0.4 2.2 0.4 2.2 0.6 5 0.3 4.9 0.3 4.9 1.4 6 1.7 0.2 3.4 0.4 5.1 0.6 0.9 0 1.8 0.1 2.7 0.2 0.4 0 0.4 0 2.2 0.2v1h-13v-12h-12c0.3 10.2 0.7 20.5 1 31h2c0.3 1.6 0.7 3.3 1 5 6.6 0.3 13.2 0.7 20 1v62c12-1 12-1 14-3l1 1c1.7 0.2 3.4 0.4 5.1 0.6 0.4 0 0.4 0 2.7 0.2 0.8 0.1 1.5 0.1 2.2 0.2v1h-12c0 1.8 0.1 3.5 0.1 5.3l0.3 17.7c0.1 3.6 0.1 7.1 0.2 10.7 0.3 17.4 0.5 34.9 0.4 52.3h12c0.3 12.5 0.7 25.1 1 38h9c0.3-0.7 0.7-1.3 1-2 1.6 3.2 1.2 6.5 1.2 10v2.4 5c0 2.6 0.1 5.2 0.1 7.7v4.9c0 0.8 0.1 1.5 0.1 2.3 0 2.2 0 2.2-0.4 5.7-3.2 2.2-3.9 2.2-7.6 2-0.4 0-0.4 0-2.7-0.1-0.4-0.1-0.4-0.1-2.8-0.2-0.4 0-0.4 0-2.8-0.2-6.8-0.4-6.8-0.4-9.1-1.5v-36h-10c-0.7-0.3-1.3-0.7-2-1v-25c-0.7 0.3-1.3 0.7-2 1-1.7 0.1-3.4 0.1-5.1 0.1-1.6-0.1-3.2-0.1-4.9-0.1-0.3-4-0.7-7.9-1-12h-11c-0.3 4-0.7 7.9-1 12h-12v25h12v37h12v12h12v15h11c0.9 7.6 1.1 15 1.1 22.6 0 1.1 0 2.2-0.1 3.4v8h-13v-2c-1 0.3-2 0.7-3 1-0.3 2.6-0.7 5.3-1 8-2.3 0.3-4.6 0.7-7 1-0.1 1-0.3 1.9-0.4 2.9-0.6 3.1-0.6 3.1-1.6 4.1-0.4 1.5-0.7 3-1.1 4.6-0.1 0.8-0.3 1.6-0.5 2.5-0.1 0.6-0.3 1.2-0.4 1.9-1.7 0.3-3.3 0.7-5 1-0.3-0.7-0.7-1.3-1-2-1-0.3-2-0.7-3-1v3h-4v-2c-5.9-0.3-11.9-0.7-18-1-0.7-3-1.3-5.9-2-9-2.6-0.3-5.3-0.7-8-1-0.2-0.8-0.4-1.5-0.6-2.3-0.2-1-0.5-2-0.8-3.1-0.2-1-0.5-2-0.7-3-0.9-2.6-0.9-2.6-2.9-4.6-0.1-2.2-0.1-2.2 0-5 0.1-1 0.1-2 0.2-3 0-1 0.1-2.1 0.2-3.1 0-1.1 0.1-2.1 0.1-3.2 0.2-2.6 0.3-5.1 0.5-7.7h-12v12c-1.3-0.3-2.6-0.7-4-1l1-1c0.5-2.8 1-5.6 1.4-8.4 0.6-2.6 0.6-2.6 2.6-4.6 2.7-0.3 5.3-0.1 8 0 0.3-2.6 0.7-5.3 1-8h2v-3h12c-0.3-20.1-0.7-40.3-1-61h-11c-0.3-1.8-0.3-1.8-2-11-1.8-0.3-1.8-0.3-11-2-0.3-3.6-0.7-7.3-1-11-2.8-0.2-5.7-0.5-8.5-0.7-2.5-0.3-2.5-0.3-3.5-1.3-0.1-1.9-0.1-3.7-0.1-5.6 0-1 0.1-2 0.1-3v-2.4h2v11c0.9 0 0.9 0 5.4-0.1 1.9 0 3.7 0 5.6 0.1 1 1 1 1 1.1 3.5v3.1c0 1-0.1 2-0.1 3v2.4h10v-2h2l-0.3-3c-0.1-1.4-0.2-2.7-0.3-4.1-0.1-1.3-0.3-2.6-0.4-3.9 0-4.3 0.4-7 2-11 3-1 4.6-1.1 7.7-0.9 0.4 0 0.4 0 2.7 0.2 0.9 0 1.8 0.1 2.8 0.1 0.9 0.1 1.9 0.1 2.8 0.2 2.4 0.1 4.7 0.3 7 0.4 0.3-4 0.7-7.9 1-12 2.2-0.2 4.5-0.3 6.7-0.5 2.7-0.6 3.7-1.3 5.3-3.5 0.4-2.3 0.7-4.7 1-7 0.3-0.7 0.7-1.3 1-2 2.3-0.4 2.3-0.4 5.1-0.6 0.4-0.1 0.4-0.1 2.7-0.3 0.8 0 1.5 0 2.2-0.1 0-0.6 0-1.2 0.1-1.8l0.3-8.1c0-0.9 0-1.8 0.1-2.8 0.2-5.5 0.8-10.6 2.2-16 0.3-2.3 0.3-2.3-0.7-7.3-4.6 0.3-9.2 0.7-14 1-0.3 3.6-0.7 7.3-1 11-12.1 1.5-23.8 2.3-36 2v10c-2 0.3-4 0.7-6 1 0.5 0.3 0.5 0.3 3 2 0.3 2.2 0.3 2.2 0.2 4.6 0 0.4 0 0.4-0.1 2.5 0 0.6-0.1 1.3-0.1 1.9-3.8 1.2-7.7 1.2-11.7 1.2h-2.3c-2.6 0.1-5.1 0.1-7.7 0.1-1.7 0-3.5 0.1-5.3 0.1-4.6 0-9.3 0.1-13.9 0.1-4.7 0.1-9.5 0.1-14.2 0.2-9.3 0.1-18.6 0.2-27.9 0.3-0.3 4-0.7 7.9-1 12h-12v25h-13v-1h11v-5.2c0-2.3-0.1-4.5-0.1-6.7v-3.5-3.3-3c0.1-2.3 0.1-2.3 1.1-3.3 2-0.1 4-0.1 6.1-0.1 1.1 0 2.2 0.1 3.3 0.1h2.6c-0.3-3.3-0.7-6.6-1-10-1.6-0.1-3.3-0.1-5-0.2-2.1-0.1-4.3-0.2-6.4-0.2-1.1-0.1-2.2-0.1-3.3-0.2-1.1 0-2.1 0-3.2-0.1-0.5 0-0.5 0-2.9-0.1-2.2-0.2-2.2-0.2-3.2-1.2-0.5-3.3-0.7-6.7-1-10-3.6-0.3-7.3-0.7-11-1v-12h-6v-1h7v12h12c-0.3-4-0.7-7.9-1-12-3.6-0.3-7.3-0.7-11-1v-48h1v8h2c0.3 1.7 0.7 3.3 1 5 0.5-0.3 0.5-0.3 3-2 4.5 0.5 4.5 0.5 6 2 2-0.1 4-0.2 6.1-0.4 0.5-0.1 0.5-0.1 3.3-0.3 0.9-0.1 1.7-0.2 2.6-0.3 0.7-3.3 1.3-6.6 2-10h8c0.3-0.7 0.7-1.3 1-2h3c-0.3-12.9-0.7-25.7-1-39-3.6-0.3-7.3-0.7-11-1 0-2.2 0-4.5-0.1-6.7v-3.7c0.1-3.1 0.5-5.7 1.1-8.6l-1-1c-0.3-4.8 0.2-8.5 2-13 1.1 0 2.3 0 3.4 0.1 3.6-0.1 3.6-0.1 4.6-1.1l0.6-6.6c0.1-2.1 0.3-4.2 0.4-6.4h25v-12h73v11h25v-12zm-45 45v2c-0.6-0.1-0.6-0.1-3.6-0.4-1.5-0.1-3.1-0.3-4.6-0.4l-2.4-0.3c-2.2-0.2-4.2-0.2-6.4 0.1-2.6 2.2-2.6 2.2-4 5-0.2 2.5-0.2 2.5 0.2 4.8 0.2 0.8 0.3 1.6 0.4 2.4 0.2 0.6 0.3 1.2 0.4 1.8-0.5 0-0.5 0-3.2-0.1-3.6 0.1-4.9 0.4-7.8 2.1 0 5.1 0 10.2-0.1 15.3v5.2 7.4 2.4c0 5.5 0 5.5 1.1 7.7h12v12h39v-12h13v-40h-12c0.1-2.8 0.1-5.6 0.2-8.4-0.2-2.6-0.2-2.6-2.2-4.6h-4v-2h-16zm-66 79v12h24v-12h-24zm-37 37v12h24v-12h-24z" fill="#F8C43B"/>
  <path transform="translate(52,226)" d="m0 0h57c0.3 1.7 0.3 1.7 2 10 0.9 0.1 1.9 0.1 2.8 0.2 1.2 0.1 2.4 0.2 3.6 0.2 1.2 0.1 2.4 0.2 3.7 0.3 2.9 0.3 2.9 0.3 3.9 1.3 0.1 2 0.1 4 0.1 6.1 0 1.1-0.1 2.2-0.1 3.3v2.6h9c2.4 6.4 2 12.1 1.6 18.9-0.5 10.5-0.7 20.9-0.4 31.4 0 0.4 0 0.4 0.1 2.9v2.7l-0.3 2.1c-3 2-3 2-6.6 2.5-3.4 0.5-3.4 0.5-5.4 2.5v7c-0.3 0.7-0.7 1.3-1 2-14.8 0.3-29.7 0.7-45 1-1.4 2.9-1.4 5.8-1.7 9-0.3 2-0.3 2-1.3 3-1.6 0.1-3.3 0.1-4.9 0.1h-3-3.2c-1 0-2.1 0-3.1-0.1h-7.8c-0.3-3.6-0.7-7.3-1-11-3.6-0.3-7.3-0.7-11-1v-12h-13v-35h12v-39h13v-11zm-24 51 1 2z" fill="#FDF8F3"/>
  <path transform="translate(211,250)" d="m0 0h1v36c3.8 0.2 7.5 0.4 11.4 0.6 0.6 0 0.6 0 3.6 0.1 1 0.1 1.9 0.1 2.9 0.2 0.9 0 1.9 0.1 2.9 0.1 2.2 0 2.2 0 3.2-1 0.2-2.7 0.3-5.3 0.3-8 0-0.8 0.1-1.6 0.1-2.4 0-2.5 0.1-5.1 0.2-7.7 0-1.7 0-3.4 0.1-5.2 0.1-4.2 0.2-8.5 0.3-12.7h12c0.3 16.5 0.7 33 1 50-2.3-0.2-2.3-0.2-14-1v12h-23v-13h-12c2.5-6.1 2.5-6.1 5-8h4v-2.7c0-3.4 0-6.7-0.1-10.1v-4.3c0-7.7 0-15.3 1.1-22.9z" fill="#ECAC30"/>
  <path transform="translate(51,188)" d="m0 0h1v12h85v2h2c-0.3 3-0.7 5.9-1 9-5 1.6-9.2 2.2-14.6 2.2h-2.2-7.1-4.9c-4.3 0-8.7 0-13-0.1h-13.2c-8.7 0-17.3-0.1-26-0.1v7c-1.3-0.3-2.6-0.7-4-1-0.2 0.8-0.2 0.8-1 5h-1c-1.4-26.2-1.4-26.2 0-36z" fill="#DA8D29"/>
  <path transform="translate(126,325)" d="m0 0h12c0 1.6 0 3.1-0.1 4.7v6.2c0 0.5 0 0.5-0.1 3.1v3 2.8c0.2 2.2 0.2 2.2 2.2 4.2 0.6 2.6 0.6 2.6 1.1 5.6 0.2 1 0.4 2 0.5 3.1 0.2 0.7 0.3 1.5 0.4 2.3h8v1h-12v-12h-75v-12h63v-12z" fill="#EAAD33"/>
  <path transform="translate(64,349)" d="m0 0h74v12h-38v12h-11v-12h-25v-12z" fill="#7D5006"/>
  <path transform="translate(77,2)" d="m0 0h72v11h-72v-11z" fill="#784F04"/>
  <path transform="translate(195,346)" d="m0 0h3v2c4.6-0.3 9.2-0.7 14-1v2h12v1h-11v12c-3.6 0.3-7.3 0.7-11 1 0 0.8 0 0.8-0.2 5-0.1 2.1-0.2 4.3-0.2 6.4-0.1 1.1-0.1 2.2-0.2 3.3 0 0.6 0 0.6-0.1 3.2 0 0.9-0.1 1.9-0.1 2.9-0.2 2.2-0.2 2.2-1.2 3.2-1.9 0.1-3.9 0.1-5.8 0.1h-3.8-4.1-4.1-11c-3.7 0-7.5 0-11.2-0.1h-22v-1h24c-0.3-3.6-0.7-7.3-1-11h-11v-14c1.9 3.8 2.2 5 2 9 0.9-0.2 1.9-0.4 2.8-0.6 5.2-0.8 10.1 0.5 15.2 1.6v2h4v-3c2.8 0.5 5.3 1.1 8 2 0.1-0.6 0.2-1.2 0.4-1.8 0.1-0.8 0.3-1.6 0.5-2.4 0.1-0.8 0.3-1.6 0.5-2.4 0.6-2.4 1.5-4.3 2.6-6.4 0.4-1.3 0.7-2.7 1-4h7c0-1.3 0-2.6-0.1-3.9 0-1.4 0-2.7 0.1-4.1l1-1zm-8 15v13h-12v11h24v-24h-12z" fill="#CF9943"/>
  <path transform="translate(188,250)" d="m0 0h12v49h12v13h-12c-0.3-4-0.7-7.9-1-12-3.6-0.3-7.3-0.7-11-1v-49z" fill="#7B4C05"/>
  <path transform="translate(200,224)" d="m0 0 0.6 11.4c0 1.1 0.1 2.1 0.1 3.2 0.1 1.1 0.1 2.1 0.2 3.2 0 0.9 0.1 1.9 0.1 2.9 0 2.3 0 2.3-1 4.3 3.6 0.3 7.3 0.7 11 1-0.3 13.2-0.7 26.4-1 40-0.8 0.3-0.8 0.3-5 2-1.8 2.6-1.8 2.6-3 5 3.6 0.3 7.3 0.7 11 1v1h-13c-0.3-16.2-0.7-32.3-1-49-3.6-0.3-7.3-0.7-11-1v-24c10-1 10-1 12-1z" fill="#EAAC30"/>
  <path transform="translate(200,64)" d="m0 0h12v61h-12v-61z" fill="#86590A"/>
  <path transform="translate(138,250)" d="m0 0h11c1.3 2.7 1.1 4.7 1.1 7.6v3.6 3.9 4 10.4c0 3.5 0 7.1-0.1 10.6v20.9h-12v-61z" fill="#FAE29D"/>
  <path transform="translate(83.805 -.12939)" d="m0 0h2.1 7 4.8 10.1 13 9.9 4.8 6.7 3.8c3 0.1 3 0.1 5 1.1 0.2 1.8 0.2 1.8 1 11 7.6 0.4 15.2 0.7 23 1v13h-25v-11h-73v12c-0.7-0.3-1.3-0.6-2-1 0.3-3.9 0.7-7.9 1-12h-25v-1h23c0.1-1.9 0.2-3.9 0.4-5.9 0.2-3.3 0.2-3.3 0.6-6.1 2.9-1.4 5.5-1.1 8.8-1.1zm-6.8 2.1v11h72v-11h-72z" fill="#A98948"/>
  <path transform="translate(138,311)" d="m0 0v3h-2c0 0.9 0 1.9 0.1 2.9-0.1 3.1-0.1 3.1-1.1 5.1-2.6 0.6-5.3 0.7-8 1-1.4 3-2.1 5.4-2.5 8.8-0.2 1-0.3 2.1-0.5 3.2-2.4 1.2-3.8 1.1-6.4 1.1h-2.8-3.1-3-9.8c-2.2 0-4.4 0-6.6-0.1h-16.3c0.1-1.8 0.2-3.6 0.4-5.4 0-1 0.1-2.1 0.2-3.1 0.1-0.8 0.3-1.6 0.4-2.5 2.3-1.2 3.8-1.2 6.4-1.2 0.9 0 1.8 0 2.7-0.1h2.9c0.5 0 0.5 0 3.1-0.1 3.1 0 6.3-0.1 9.5-0.2 2.2 0 4.3 0 6.5-0.1l15.9-0.3v-9h3v-2c3.7-0.9 7.2-1.1 11-1z" fill="#F5E3A4"/>
  <path transform="translate(113,76)" d="m0 0h25v25h-25v-25z" fill="#080B08"/>
  <path transform="translate(175,175)" d="m0 0h13c0.1 8.5 0.1 8.5 0 11-1 1-1 1-3.3 1.1h-2.8c-0.9 0-1.8-0.1-2.7-0.1h-2.2c0 0.3 0 0.3-0.1 1.8-0.2 3.7-0.5 6.5-2.4 9.8-3.9 2.2-7.1 1.7-11.5 1.4v12c-3.1 1-5.1 1-8.3 0.9-1.1-0.1-2.1-0.1-3.1-0.2-1.1 0-2.2-0.1-3.3-0.1-1.1-0.1-2.2-0.1-3.3-0.2-2.6-0.1-5.3-0.3-8-0.4 0.7-3.3 1.3-6.6 2-10-0.7-0.3-1.3-0.7-2-1 2.5-1.3 4.4-1.2 7.2-1.3 0.5 0 0.5 0 3.2-0.1 0.5-0.1 0.5-0.1 3.2-0.2 1.1 0 2.2 0 3.3-0.1l8.1-0.3c0.3-4 0.7-7.9 1-12 3.6-0.3 7.3-0.7 11-1 0.3-3.6 0.7-7.3 1-11z" fill="#EDAB2E"/>
  <path transform="translate(189.93 150.16)" d="m0 0c1.5 2.6 1.2 4.2 0.8 7.1-0.1 1-0.2 1.9-0.3 3-0.2 0.9-0.3 1.8-0.4 2.7-0.2 1.3-0.4 2.6-0.5 3.9l-1.5 8.1c-8.1 0.8-16 1.2-24 1-0.4 3.3-0.7 6.6-1 10h-1v-10h-24v12c-1-0.3-2-0.6-3-1h2v-12h25v-12c1-1 1-1 3.5-1.1 0.5 0.1 0.5 0.1 3 0.1h3.1 2.4c0-0.7-0.1-1.5-0.1-2.3v-3.1-3.1c0.1-2.5 0.1-2.5 1.1-3.5 2.1-0.3 4.2-0.5 6.3-0.7 1.2-0.1 2.4-0.2 3.6-0.4 3.1 0.1 3.1 0.1 5 1.3z" fill="#B47417"/>
  <path transform="translate(138,88)" d="m0 0h12v25c-5.1 0-10.2 0-15.3 0.1h-5.2-7.5-2.4c-1.9 0-3.7 0-5.6-0.1l-1-1v-11h25v-13z" fill="#66AC37"/>
  <path transform="translate(121.85 62.902)" d="m0 0h2.3 7.5 5c4.1 0.1 8.2 0.1 12.3 0.1 0.7 4.3 1.4 8.6 2 13h11c-0.3 1.3-0.6 2.6-1 4v-3c-0.3 0-0.3 0-2.3 0.1h-3c-1 0-2 0.1-3 0.1-2.7-0.2-2.7-0.2-4.7-2.2v-10c-11.2 0.3-22.4 0.7-34 1v9h23v1h-24v36h-11c-1-1-1-1-1.1-4.3 0-1.5 0-3 0.1-4.5v-2.3-7.5-5-12.4c2.8-0.9 4.4-1.1 7.2-1.1 0.7 0 0.7 0 3.8 0.1v-11c3.2-1.6 6.5-1.1 9.9-1.1z" fill="#E1D9CB"/>
  <path transform="translate(249,250)" d="m0 0h12v49h-11c-1-1-1-1-1.1-2.9v-2.6-2.9-3.2-3.2-10.3c0-2.3 0-4.6 0.1-6.9v-17z" fill="#865809"/>
  <path transform="translate(52,188)" d="m0 0c6.5-0.1 13-0.2 19.4-0.2 2.2 0 4.4-0.1 6.6-0.1 3.2-0.1 6.4-0.1 9.5-0.1 1 0 2 0 3-0.1 6.8 0 6.8 0 10.2 2.4 1.3 2.1 1.3 2.1 0.9 4.7l-0.6 2.4 2 2c-3.3 0.7-6.4 1.1-9.8 1.1h-2.8-3-3-9.7c-2.2 0-4.4 0-6.6-0.1h-16.1v-12z" fill="#704103"/>
  <path transform="translate(15,250)" d="m0 0h12c-0.5 13.3-1.1 26.7-2 40h-1c-0.7 5.9-1.3 11.9-2 18h2v2h-9v-60z" fill="#5E3F05"/>
  <path transform="translate(15,64)" d="m0 0h11v36h12v-24h1v25h-13v12h-11v-49z" fill="#65450B"/>
  <path transform="translate(63,213)" d="m0 0h49c0.2 1.8 0.2 1.8 1 11 0.2 0.3 0.2 0.3 1 2-0.6-0.2-1.1-0.3-1.7-0.5-2.4-0.5-4.6-0.6-7.1-0.6h-2.8-3.1-3.1-10c-2.2 0-4.4 0-6.7 0.1h-16.5v-12z" fill="#F9E09F"/>
  <path transform="translate(213,312)" d="m0 0h23v11c-3.6 0.3-7.3 0.7-11 1-0.3 7.9-0.7 15.8-1 24h-11v-36z" fill="#865506"/>
  <path transform="translate(2,114)" d="m0 0h11v48h-11v-48z" fill="#684303"/>
  <path transform="translate(193.75 248.94)" d="m0 0h3c0.8 0 1.5 0.1 2.2 0.1v1h-11v49h-1v-12h-12v-37c13.6-1.2 13.6-1.2 18.8-1.1z" fill="#D58D26"/>
  <path transform="translate(213,126)" d="m0 0h11v61c-1.7-0.3-3.3-0.7-5-1v-16h-4v-2.8c0.1-3.4 0.1-6.9 0.1-10.3 0-1.5 0-2.9 0.1-4.4v-6.4-3.9c-0.2-3.2-0.2-3.2-2.2-6.2-0.3-3.4-0.1-6.6 0-10z" fill="#805506"/>
  <path transform="translate(175,27)" d="m0 0h12c1.3 12 1.1 24 1 36h11v1c-6.8 0.1-13.3 0-20-1-0.3-1.6-0.7-3.3-1-5-1 0.3-2 0.7-3 1v-32zm24 12h1v24h-1v-24z" fill="#C89125"/>
  <path transform="translate(236,188)" d="m0 0h1v62h-11c-1.2-3.7-1.1-7.1-1.1-10.9v-2.4-7.4c0-1.7 0-3.3 0.1-5v-12.3h11v-24z" fill="#E4A932"/>
  <path transform="translate(63,212)" d="m0 0h76c-0.3 4.3-0.7 8.6-1 13 0 3-0.1 6 0 9h-2v2h-10c-0.2-1.8-0.2-1.8-1-11-1.8-0.2-1.8-0.2-11-1v-11h-51v-1z" fill="#ECB13C"/>
  <path transform="translate(52,349)" d="m0 0h12v12h25v12h-1v-11h-24v23h-12v-36z" fill="#AD731C"/>
  <path transform="translate(98,188)" d="m0 0h40v12h-40c1-0.7 2-1.3 3-2-0.3-0.7-0.7-1.3-1-2 0.2-0.6 0.4-1.3 0.6-1.9 0.1-0.7 0.3-1.4 0.4-2.1-1.4-1.7-1.4-1.7-3-3v-1z" fill="#8A5503"/>
  <path transform="translate(237,213)" d="m0 0h12v37h-12v-37z" fill="#845907"/>
  <path transform="translate(123.2 64.902)" d="m0 0h2.1 6.8 4.6c3.8 0.1 7.5 0.1 11.3 0.1 0.1 0.7 0.1 1.4 0.2 2.1 0.1 1 0.2 1.9 0.2 2.8 0.1 1 0.2 1.9 0.3 2.8 0.3 2.3 0.3 2.3 1.3 3.3 1.5 0.2 3 0.4 4.6 0.6 0.8 0 1.6 0.1 2.5 0.2 0.6 0.1 1.2 0.1 1.9 0.2-0.3 1-0.7 2-1 3-1 0.3-2 0.7-3 1-0.2-0.5-0.2-0.5-1-3h-3c0.2 1.3 0.2 1.3 1 8h-3c-1.5-3-1.1-5.7-1-9-5.7-0.1-5.7-0.1-8 1 0.6 2 1.3 4 2 6 0.7 0.3 1.3 0.7 2 1v2h5v1h-11c-0.3-4-0.7-7.9-1-12-3.8-0.2-3.8-0.2-23-1v-9c3-1.5 6-1.1 9.2-1.1z" fill="#E7E3DB"/>
  <path transform="translate(38,336)" d="m0 0c8.2 0.3 16.5 0.7 25 1v12h-12v12h-12v-2.9c0-1.3 0.1-2.6 0.1-4v-3.8c-0.1-4.8-0.6-9.6-1.1-14.3z" fill="#7A4F07"/>
  <path transform="translate(138,361)" d="m0 0h12v14h11c1 3 1 3 1 11h-24v-25z" fill="#84540F"/>
  <path transform="translate(64,362)" d="m0 0h24v12h-12v11h-12v-23z" fill="#E5A22E"/>
  <path transform="translate(187,361)" d="m0 0h12v24h-24v-11h12v-13z" fill="#AD6D18"/>
  <path transform="translate(151,78)" d="m0 0h3l2 2h2c0.3-0.7 0.7-1.3 1-2 1.5 3 1.1 5.7 1.1 9v2.1 6.5c0 1.5 0 3-0.1 4.5v10.9h-9c-0.3 4.6-0.7 9.2-1 14h-37c0-11 0-11 1-12 2.7-0.1 5.3-0.1 8-0.1h2.4 7.7c1.7 0 3.4 0 5.2 0.1h12.7c-0.2-4.3-0.2-4.3-1-26 0.7-0.3 1.3-0.7 2-1v-8zm-37 36v10h34v-10h-34z" fill="#DDE0CE"/>
  <path transform="translate(38,226)" d="m0 0v37c-2 0.7-4 1.3-6 2v2h-5v6h-1c0-3.6 0-7.3-0.1-10.9v-3.2-3-2.8c0.1-2.1 0.1-2.1 1.1-3.1 0.2-1.6 0.3-3.3 0.3-4.9 0-0.5 0-0.5 0.1-3 0.1-0.5 0.1-0.5 0.2-3.2 0-1 0-2.1 0.1-3.1l0.3-7.8c3.8-1.7 5.6-2 10-2z" fill="#6D4506"/>
  <path transform="translate(27,312)" d="m0 0h11c0.1 1.8 0.1 3.5 0.2 5.3 0.1 2.4 0.2 4.7 0.2 7.1 0.1 1.1 0.1 2.3 0.2 3.5 0.2 6.7 0.6 13.4 1.4 20.1h-13v-36z" fill="#694507"/>
  <path transform="translate(25,40)" d="m0 0h1v23c2 0 3.9 0 5.9-0.1 2.1 0 4.1 0 6.1 0.1 1.7 1.7 1.4 3.8 1.6 6.1 0 0.4 0 0.4 0.2 2.7 0.1 0.8 0.1 1.5 0.2 2.2 0.7 0 1.4 0.1 2.2 0.1 0.9 0.1 1.8 0.2 2.7 0.3 1 0 1.9 0.1 2.8 0.2 0.8 0.1 1.5 0.3 2.3 0.4 1.6 3.1 1.1 6.4 1.1 9.8v2.4 4.8 7.6 4.7 2.3c0 5.3 0 5.3-1.1 6.4-1.7 0.1-3.4 0.1-5.1 0.1-0.4 0-0.4 0-2.7-0.1h-2.2v-2h8c-0.3-11.2-0.7-22.4-1-34-6.9-0.3-13.9-0.7-21-1v-12c-1.3-0.3-2.6-0.7-4-1 0.7-0.3 1.3-0.7 2-1 0.3-7.3 0.7-14.5 1-22z" fill="#DFD4B6"/>
  <path transform="translate(114,114)" d="m0 0h34v10h-34v-10z" fill="#E3E0DE"/>
  <path transform="translate(39,200)" d="m0 0h11c1 1 1 1 1.1 3.3v3 3.3 3.5c0 1.1 0 2.2-0.1 3.4v8.5c-3.6 0.3-7.3 0.7-11 1-0.3 3.3-0.7 6.6-1 10h-1c-0.3-3.6-0.7-7.3-1-11h2v-25z" fill="#7E5510"/>
  <path transform="translate(26,39)" d="m0 0h13v24h-13v-24z" fill="#714E11"/>
  <path transform="translate(38,101)" d="m0 0h1c0.1 0.7 0.1 1.4 0.2 2.1 0 0.4 0 0.4 0.2 2.7l0.3 2.7c0.3 2.5 0.3 2.5 1.3 5.5h-2v2.4c0 1 0.1 2 0.1 3v3.1c-0.1 2.5-0.1 2.5-1.1 3.5-3.6 0-7.1 0-10.7-0.1-7-0.1-7-0.1-10.3 2.1v-6h-2v-8c7.7-0.8 15.3-1.1 23-1v-12z" fill="#E8D896"/>
  <path transform="translate(162,163)" d="m0 0v12h-25v12h-6c1.3-0.3 2.6-0.7 4-1-0.3-3-0.7-5.9-1-9-0.3 0.2-0.3 0.2-2 1v-3c2-0.3 4-0.7 6-1v-10c2.7-0.2 5.4-0.3 8.1-0.5 0.3 0 0.3 0 2.2-0.1 4.6-0.3 9.1-0.4 13.7-0.4z" fill="#EBAF33"/>
  <path transform="translate(163,187)" d="m0 0c0 2 0 4 0.1 5.9v3.4c-0.1 2.7-0.1 2.7-1.1 3.7-1.9 0.2-3.7 0.3-5.6 0.3-1.1 0.1-2.2 0.1-3.4 0.1-0.6 0.1-0.6 0.1-3.6 0.2-1.2 0-2.3 0-3.6 0.1-2.9 0.1-5.9 0.2-8.8 0.3 0.3-4.3 0.7-8.6 1-13 4-0.2 8-0.3 11.9-0.5 0.6 0 0.6 0 3.5-0.1 0.5-0.1 0.5-0.1 3.3-0.2 1 0 2-0.1 3-0.1 2.3-0.1 2.3-0.1 3.3-0.1z" fill="#DA8D29"/>
  <path transform="translate(39,76)" d="m0 0c2.6 0.3 5.3 0.7 8 1 1 4 1.1 7.7 1.1 11.8v3.9 4.1c0 1.4 0 2.8-0.1 4.1v10.1h-9v-35z" fill="#DEE0DD"/>
  <path transform="translate(175,225)" d="m0 0h12v25h-12v-25z" fill="#7B4904"/>
  <path transform="translate(163,225)" d="m0 0h12v25h-12v-25z" fill="#D98F28"/>
  <path transform="translate(51,14)" d="m0 0h25v12h-25v-12z" fill="#6E4B0B"/>
  <path transform="translate(130,59)" d="m0 0h16v2c0.8 0.1 1.6 0.3 2.4 0.4 2.6 0.6 2.6 0.6 3.6 1.6 0.1 3.7 0 7.3 0 11h12v40h-13v-2h11v-36h-11c-2-9.6-2-9.6-2-13-12.2 0.3-24.4 0.7-37 1v11c-4 0.3-7.9 0.7-12 1 3.6-2.4 5.7-2.2 10-2-0.1-0.7-0.3-1.4-0.4-2-0.1-0.5-0.1-0.5-0.4-2.8-0.2-0.8-0.3-1.7-0.5-2.6 0.3-2.6 0.3-2.6 2.3-4.9 3.9-2.2 7-1.9 11.3-1.5 0.8 0.1 1.5 0.2 2.3 0.2l5.4 0.6v-2z" fill="#F4D26A"/>
  <path transform="translate(51,349)" d="m0 0h1v11h11v1h-11v24h47v-10c0.3-4.6 0.7-9.2 1-14h38v25h-2v-23c-11.2-0.3-22.4-0.7-34-1 0.1 10.8 0.1 10.8 0.2 14.2v2.7 2.7c-0.2 2.4-0.2 2.4-2.2 5.4-2.1 0.4-2.1 0.4-4.8 0.3h-3-3.3-3.4c-3.5 0-7.1-0.1-10.6-0.1-2.4 0-4.8 0-7.2-0.1-5.9 0-11.8 0-17.7-0.1v-9.1c-0.1-2.3-0.1-4.6-0.1-6.9 0-7.4 0.4-14.7 1.1-22z" fill="#CBB792"/>
  <path transform="translate(212,126)" d="m0 0h1c0 0.7 0.1 1.4 0.1 2.1 0.1 0.9 0.2 1.8 0.3 2.8 0 0.9 0.1 1.8 0.2 2.7 0.4 2.4 0.4 2.4 2.4 4.4 0.2 2.3 0.2 2.3 0.2 5.2v3.1 3.3 3.3c0 5.8-0.3 11.4-1.2 17.1h4v16c2 0.3 4 0.7 6 1v25h-1v-24h-12v-62z" fill="#98610B"/>
  <path transform="translate(138,176)" d="m0 0h24v12h-24v-12z" fill="#8F5604"/>
  <path transform="translate(27,175)" d="m0 0h24v12h-24v-12z" fill="#6C4608"/>
  <path transform="translate(64,138)" d="m0 0h24v12h-24v-12z" fill="#090505"/>
  <path transform="translate(26,76)" d="m0 0h12v24h-12v-24z" fill="#070505"/>
  <path transform="translate(42.504 224.9)" d="m0 0c2.8 0 5.7 0.1 8.5 0.1v12h-12v39h-12v35h11v1c-8 0.8-15.9 1.1-24 1-0.3-0.7-0.7-1.3-1-2h13v-3.3c0-4 0-8-0.1-12v-5.2-7.5-2.4c0-1.9 0-3.7 0.1-5.6 1-1 1-1 3.5-1.1h3.1c1 0 2 0.1 3 0.1h2.4v-3.3c0-4.2 0-8.3-0.1-12.4v-5.3c-0.1-19-0.1-19 1.1-27 1-1 1-1 3.5-1.1z" fill="#D0AF7F"/>
  <path transform="translate(100,373)" d="m0 0c-0.3 4-0.7 7.9-1 12h-23v-11c8.1-0.8 15.9-1.1 24-1z" fill="#AD731C"/>
  <path transform="translate(225,188)" d="m0 0h11v24h-11v-24z" fill="#855605"/>
  <path transform="translate(213,188)" d="m0 0h11v24h-11v-24z" fill="#EAAD2B"/>
  <path transform="translate(188,39)" d="m0 0h11v24h-11v-24z" fill="#845507"/>
  <path transform="translate(38,312)" d="m0 0h1v12c0.9 0 0.9 0 5.4-0.1 1.9 0 3.7 0 5.6 0.1 2.8 2.8 1 8 1 12h71v1c-10.8 0-21.6 0-32.4 0.1h-15.1-14.5-5.5-7.8-2.3c-5.3 0-5.3 0-6.4-1.1-0.1-1.8-0.1-3.6-0.1-5.3v-3.3-3.5c0-1.1 0-2.2 0.1-3.4v-8.5z" fill="#F8C43B"/>
  <path transform="translate(50,14)" d="m0 0h1v12h24v1h-23v12h-26l2-2c2.7 0 5.3 0.6 8 1 0.1-1.2 0.3-2.5 0.4-3.8 0.8-6 0.8-6 1.6-8.2 2.5-1.3 4.3-1.1 7.1-1.1 1.6 0.1 3.2 0.1 4.9 0.1v-11z" fill="#A98948"/>
  <path transform="translate(134,250)" d="m0 0h4v61c-1.8 0.2-1.8 0.2-11 1v2h-3v9c-1.3-0.3-2.6-0.7-4-1h2c0-0.6-0.1-1.2-0.1-1.9 0-0.8-0.1-1.6-0.1-2.4s-0.1-1.6-0.1-2.4c0.4-2.9 1.1-3.5 3.3-5.3 2.3-0.7 2.3-0.7 4.7-1.2 0.8-0.1 1.6-0.3 2.4-0.5 0.7-0.1 1.3-0.2 1.9-0.3v-1.9c-0.1-13.5 0-27 0.7-40.5 0.3-5.4 0.3-10.3-0.7-15.6z" fill="#FAF1D4"/>
  <path transform="translate(236,299)" d="m0 0h13v12h-12v14h-12c0.3 7.9 0.7 15.8 1 24-1.3-0.3-2.6-0.7-4-1h2v-2.2c0-3.2 0-6.5-0.1-9.7v-3.5-3.3-3c0.1-2.3 0.1-2.3 1.1-3.3 3.7-0.1 7.3 0 11 0v-11c-0.7-0.3-1.3-0.7-2-1h2v-12z" fill="#A1762B"/>
  <path transform="translate(178.47 211.87)" d="m0 0h3 3.1c2.4 0.1 2.4 0.1 3.4 1.1 0.1 2.7 0.1 5.3 0.1 8v2.4 7.7 5.2c0 4.2 0 8.5-0.1 12.7h-1v-24h-12c-0.1-9.2-0.1-9.2 0-12 1-1 1-1 3.5-1.1z" fill="#D58D26"/>
  <path transform="translate(85.062 223.81)" d="m0 0h9.3 5.9c0.9-0.1 1.8-0.1 2.8-0.1h2.6 2.2c2.5 0.3 4.1 1 6.1 2.3 0.6 1.9 0.6 1.9 0.7 4 0.3 4 0.3 4 1.3 5 1.4 0.2 2.7 0.4 4.1 0.5 1.3 0.2 2.6 0.3 3.9 0.5v1c-2.1 0.1-4.2 0.1-6.3 0.2-0.6 0-0.6 0-3.6 0.1-0.5-0.1-0.5-0.1-3.1-0.3-2-3-2-3-2-11h-57v11h-1v-12c11.4-1 22.7-1.2 34.1-1.2z" fill="#FAE7BA"/>
  <path transform="translate(100,76)" d="m0 0h1c0.3 11.5 0.7 23.1 1 35 4 0.3 7.9 0.7 12 1-0.3 4.3-0.7 8.6-1 13h37v-11h1v12h-39v-12h-12c-1.6-3.1-1.1-6.4-1.1-9.8v-2.4-4.8-7.6-4.7-2.3c0-5.3 0-5.3 1.1-6.4z" fill="#F4D26A"/>
  <path transform="translate(261,249)" d="m0 0h2c0 7.1 0 14.2 0.1 21.3v7.3 10.4 3.3 3 2.7c-0.1 2-0.1 2-1.1 3-1.8 0.2-3.7 0.4-5.6 0.6-1.8 0.1-3.6 0.3-5.4 0.4-0.3 3.6-0.7 7.3-1 11-4.2 0.8-7.7 1.1-12 1v11h-1v-13h12c0-1.8 0-3.6-0.1-5.4 0-1.9 0-3.7 0.1-5.6l1-1h11v-50z" fill="#F8C43B"/>
  <path transform="translate(26,101)" d="m0 0h12v12c-8 0.9-15.9 1.1-24 1v-1h12v-12z" fill="#777627"/>
  <path transform="translate(13,162)" d="m0 0c9.3-0.1 9.3-0.1 12 0 1 1 1 1 1.1 3.7 0 1.6 0 1.6-0.1 9.3h-12c-0.3-4.3-0.7-8.6-1-13z" fill="#777627"/>
  <path transform="translate(124,236)" d="m0 0c11.9 1.9 11.9 1.9 13 3 0.5 3.7 0.7 7.3 1 11h-13c-0.3-4.6-0.7-9.2-1-14z" fill="#FAE7BA"/>
  <path transform="translate(50,74)" d="m0 0c1 0.3 2 0.7 3 1v39h-3c-0.3 1-0.7 2-1 3-2.6-0.3-5.3-0.7-8-1 0 1.3 0.1 2.5 0.1 3.8 0.1 3.5 0 4.1-2.1 7.2-3 0.5-3 0.5-6.6 0.7-1.2 0.1-2.4 0.1-3.6 0.2-0.5 0-0.5 0-2.8 0.1v-2c2-0.2 2-0.2 12-1 0.1-1.8 0.2-3.6 0.4-5.4 0.2-3.1 0.2-3.1 0.6-5.6 2-1 2-1 11-2v-38z" fill="#F2CF5E"/>
  <path transform="translate(164,176)" d="m0 0h11c0.1 7.7 0.1 7.7 0 10-1 1-1 1-3.7 1.1h-3.4c-1.1 0-2.2-0.1-3.3-0.1h-2.6c0.1-1.5 0.3-2.9 0.4-4.4l0.3-2.4c0.3-2.2 0.3-2.2 1.3-4.2z" fill="#DA8D29"/>
  <path transform="translate(26,312)" d="m0 0h1v36h12v13h11v1h-12c-1.2-2.4-1.1-3.9-1.1-6.6 0-0.4 0-0.4 0.1-2.5v-1.9c-0.7-0.1-1.4-0.1-2.1-0.2-0.9-0.1-1.8-0.2-2.8-0.2-0.9-0.1-1.8-0.2-2.7-0.3-2.4-0.3-2.4-0.3-4.4-1.3 0-4.9 0-9.9-0.1-14.8v-5.1-7.2-2.3c0-5.4 0-5.4 1.1-7.6z" fill="#CBB792"/>
  <path transform="translate(39,39)" d="m0 0h13c-0.3 0.5-0.3 0.5-2 3-3.6 0.2-3.6 0.2-7 0-0.7 4-1.3 7.9-2 12 0.7 0.3 1.3 0.7 2 1-0.1 1.3-0.3 2.6-0.4 3.9-0.6 5-1.1 10.1-1.6 15.1h9v1c-1.6 0-3.3 0-4.9 0.1h-2.8c-2.3-0.1-2.3-0.1-3.3-1.1-1.3-7.9-1-15.7-0.6-23.7 0.1-1.1 0.1-2.2 0.2-3.3 0.1-2.7 0.3-5.3 0.4-8z" fill="#F2CF5E"/>
  <path transform="translate(14,64)" d="m0 0h1v49h-1v-49zm-12 49h12v49h-1v-48h-11v-1zm0 49h11v1h-11v-1z" fill="#777627"/>
  <path transform="translate(33,263)" d="m0 0h5v11c-3.6 0.3-7.3 0.7-11 1-0.3 4.6-0.7 9.2-1 14h-1c-0.1-2.4-0.1-4.7-0.1-7.1 0-1.3-0.1-2.6-0.1-3.9 0.2-4.2 0.8-7.1 2.2-11 2-1.3 2-1.3 4-2l2-2z" fill="#775720"/>
  <path transform="translate(114,225)" d="m0 0c1.6-0 3.3-0 4.9-0.1h2.8c2.3 0.1 2.3 0.1 3.3 1.1 0.1 1.7 0.1 3.4 0.1 5.1 0 0.9-0.1 1.8-0.1 2.7v2.2c-1.5 0.1-2.9 0.1-4.4 0.1-0.8 0-1.6 0.1-2.4 0.1-2.2-0.2-2.2-0.2-4.2-2.2-0.2-2.2-0.2-2.2-0.1-4.6v-2.5c0.1-0.6 0.1-1.3 0.1-1.9z" fill="#F9E09F"/>
  <path transform="translate(224,125)" d="m0 0c0.3 0.2 0.3 0.2 2 1-0.3 19.8-0.7 39.6-1 60h9c1.3 0.3 2.6 0.7 4 1v24h-1v-23c-1 0-1 0-5.9 0.1-2.1 0-4.1 0-6.1-0.1-1-1-1-1-1.1-3.5v-3.3-3.8-4.1-4.1-11c0-3.7 0-7.5 0.1-11.2v-22z" fill="#F8C43B"/>
  <path transform="translate(63,212)" d="m0 0v13h-12c0.3-4 0.7-7.9 1-12h1c0.3 2 0.7 4 1 6 1 0.3 2 0.7 3 1v-7c4.9-1 4.9-1 6-1z" fill="#ECB13C"/>
  <path transform="translate(1,113)" d="m0 0h1v51c-0.7-0.3-1.3-0.7-2-1 0-7 0-13.9-0.1-20.9v-7.1-10.2-3.2-3-2.6c0.1-2 0.1-2 1.1-3z" fill="#DFD4B6"/>
  <path transform="translate(25,226)" d="m0 0h1v24h-12v61h-1v-62c3.6-0.3 7.3-0.7 11-1 0.3-7.3 0.7-14.5 1-22z" fill="#D0AF7F"/>
  <path transform="translate(200,39)" d="m0 0h1v24h12v60h-1v-59h-12v-25z" fill="#F8C43B"/>
  <path transform="translate(77,322)" d="m0 0h43c-2.4 2.4-2.9 2.3-6.1 2.3-0.4 0-0.4 0-2.5 0.1h-2.8c-0.9 0-1.8 0.1-2.8 0.1-3 0-5.9 0.1-8.9 0.1-2 0.1-4.1 0.1-6.1 0.1-4.9 0.1-9.9 0.2-14.8 0.3 0.3-1 0.7-2 1-3z" fill="#FAF1D4"/>
  <path transform="translate(199,300)" d="m0 0h1v12h12v35h-1c-0.2-4-0.3-8-0.5-12 0-1.1-0.1-2.3-0.1-3.4-0.3-5.9-0.5-11.7-0.4-17.6h-11v-14z" fill="#CF9943"/>
  <path transform="translate(52,187)" d="m0 0h83v1h-83v-1z" fill="#B47417"/>
  <path transform="translate(38,311)" d="m0 0h2v12c0.9 0 0.9 0 5.4-0.1 1.9 0 3.7 0 5.6 0.1 2.8 2.8 1 8 1 12 7.3-0.3 14.5-0.7 22-1 0.3-2.6 0.7-5.3 1-8 0.7-0.3 1.3-0.7 2-1 0 1.5 0 2.9 0.1 4.4v2.4c-0.1 2.2-0.1 2.2-1.1 4.2h-25c-0.3-3.6-0.7-7.3-1-11-3.6-0.3-7.3-0.7-11-1-0.3-4.3-0.7-8.6-1-13z" fill="#FAF1D4"/>
  <path transform="translate(212,299)" d="m0 0h1v12h21v1h-21v36h9v1h-10v-50z" fill="#A1762B"/>
  <path transform="translate(159,77)" d="m0 0h2c1.2 3.5 1.1 6.6 1.1 10.3v2.1 6.8c0 1.5 0 3-0.1 4.6v11.2h-11v-1h9c-0.3-11.2-0.7-22.4-1-34z" fill="#E7E3DB"/>
  <path transform="translate(23,287)" d="m0 0c0.5 0.3 0.5 0.3 3 2 0.3 2.2 0.3 2.2 0.3 5v3c-0.1 1-0.1 2.1-0.1 3.1 0 1.1 0 2.1-0.1 3.2 0 2.6 0 5.1-0.1 7.7-1.3-0.3-2.6-0.7-4-1h2v-2h-2c-0.1-7.1 0.3-14 1-21z" fill="#775720"/>
  <path transform="translate(237,211)" d="m0 0c2-0 4-0 5.9-0.1h3.4c2.7 0.1 2.7 0.1 3.7 1.1 0.1 2.7 0.1 5.3 0.1 8v2.4 7.7c0 1.7 0 3.4-0.1 5.2v12.7c3.6 0.3 7.3 0.7 11 1v1h-12v-37h-12v-2z" fill="#F8C43B"/>
  <path transform="translate(199,63)" d="m0 0h1v62h11v1h-12v-63z" fill="#C89125"/>
  <path transform="translate(13,63)" d="m0 0h9v1h-8v49h-13v-1h12v-49z" fill="#DFD4B6"/>
  <path transform="translate(14,250)" d="m0 0h1v60h7v1h-8v-61z" fill="#775720"/>
  <path transform="translate(26,225)" d="m0 0h11c-4 2-4 2-9 3v22h-2v-25z" fill="#7E5510"/>
 </g>
</svg>`,
			nailong: `<?xml version="1.0" encoding="UTF-8"?>
<!-- Generator: visioncortex VTracer 0.6.12 -->
<svg width="344" height="505" version="1.1" viewBox="0 0 344 505" xmlns="http://www.w3.org/2000/svg">
 <defs>
  <filter id="dshOutline" x="-25%" y="-25%" width="150%" height="150%">
   <feMorphology in="SourceAlpha" operator="dilate" radius="2" result="spread"/>
   <feGaussianBlur in="spread" result="soft" stdDeviation="1.2"/>
   <feFlood flood-color="#1a1206" flood-opacity=".42" result="ink"/>
   <feComposite in="ink" in2="soft" operator="in" result="edge"/>
   <feMerge>
    <feMergeNode in="edge"/>
    <feMergeNode in="SourceGraphic"/>
   </feMerge>
  </filter>
 </defs>
 <g filter="url(#dshOutline)">
  <path transform="translate(175.38 -.125)" d="m0 0h3.2c12.8 0 24.2 1.5 36.4 5.1 0.5 0.2 0.5 0.2 3.1 0.9 12.1 3.7 23.4 9.8 33.9 16.8 2 1.3 2 1.3 4 2.3v2c0.6 0.3 1.2 0.6 1.8 0.8 2.3 1.3 4.3 2.6 6.5 4.2l2.1 1.5c0.5 0.5 1.1 1 1.6 1.5v3c1 0.4 2 0.7 3 1v2h2c1.6 2.2 2.9 4.3 4.3 6.6 0.4 0.7 0.8 1.3 1.2 2 8 13.9 13.4 29.5 14.1 45.6 0.1 0.8 0.1 1.6 0.1 2.3 0.4 8.7 0.5 17.3 0.5 25.9-0.1 2.8 0 5.5 0 8.2 0 29.7 0 29.7-3.4 40.7-0.1 0.3-0.1 0.3-0.6 2.2-2 6.6-4.8 12.6-8.2 18.5-0.2 0.5-0.2 0.5-1.5 2.8-0.5 0.8-1 1.5-1.5 2.2h-2c-0.6 1.7-1.3 3.3-2 5h-2c-0.2 0.6-0.5 1.2-0.7 1.8-1.5 2.6-3.1 4.3-5.3 6.2h-2c-0.3 1.3-0.6 2.7-1 4l1.8 0.9c2.2 1.1 2.2 1.1 5.2 3.1v2c0.6 0.3 1.2 0.5 1.8 0.7 2.9 1.7 3.8 3.3 5.2 6.3 0.2 3.3 0.2 3.3 0 6 1.3-0.1 2.5-0.1 3.8-0.2 3.9 0 3.9 0 6.4 2 0.6 0.8 1.2 1.5 1.8 2.2 0.5 0.3 0.5 0.3 3.2 1.5 2.8 1.5 2.8 1.5 3.7 3.5 1.7 3 4 3.1 7.1 4.2 3.1 1.3 4.8 3.3 7 5.8-0.6 2-1.3 4-2 6h5c0.4 1 0.7 2 1 3 0.7 0.4 1.3 0.7 2 1v-4h2c0.5 0.6 0.9 1.3 1.4 1.9 1.7 2.3 3 3.1 5.6 4.1-0.3 2-0.6 4-1 6h2v2c0.7 0.4 1.3 0.7 2 1-7.6 2-7.6 2-11 2-0.3 2.3-0.6 4.6-1 7-0.8 0.1-1.6 0.1-2.5 0.1-1.1 0.1-2.2 0.2-3.3 0.2-1.1 0.1-2.1 0.2-3.3 0.2-2.9 0.5-2.9 0.5-4.7 1.7-1.7 2.6-1.7 4.9-1.9 8 0 0.6 0 0.6-0.2 3.3 0 0.8 0 1.7-0.1 2.5-2 0.4-3.9 0.7-6 1-1.8-3.8-2.2-6.8-2-11h-2c-0.3-1.3-0.6-2.6-1-4h2v-2h-3c-0.3-1-0.6-2-1-3-1-0.3-2-0.6-3-1 0.4 1.3 0.7 2.7 1 4h-2c-0.2-0.9-0.5-1.7-0.7-2.6-0.4-1.2-0.7-2.4-1.1-3.6-0.3-1.1-0.7-2.3-1-3.4-1.1-3.2-2.4-5.6-4.2-8.4-0.6-1.6-1.2-3.2-1.7-4.8-0.2-0.8-0.5-1.6-0.7-2.4l-0.6-1.8c-0.6 0.7-1.2 1.3-1.8 2-2.2 2-2.2 2-5.2 2-3.2-2.3-3.2-2.3-6-5v-3c-2.6-0.3-5.3-0.6-8-1 0-0.6-0.1-1.2-0.2-1.9-0.8-2.1-0.8-2.1-3.1-3.2-0.9-0.3-1.8-0.6-2.7-0.9-1.3-0.6-2.7-1.3-4-2v-2c-1.7 0.2-3.5 0.3-5.3 0.5-1 0-2 0.1-3 0.2-2.7 0.3-2.7 0.3-5.7 1.3-2.9 0.4-5.9 0.5-8.8 0.7-0.5 0-0.5 0-2.6 0.1-7 0.3-13.7 0-20.6-0.8v2c-2.7 1.4-5 1.1-8 1-0.3 1-0.6 2-1 3-2.7 1.8-5.5 2.5-8.7 3.1l-2.4 0.6c-0.7 0.1-1.3 0.2-1.9 0.3v2c-1.1 0.4-1.1 0.4-7 2-0.3 1.7-0.6 3.3-1 5h-2c-0.6 1.7-1.3 3.3-2 5h-6c-1.1 2.7-2.1 5.3-3 8h-2c-2.4 3.9-2.5 7.6-3 12-0.7 0.1-1.5 0.3-2.3 0.4-3.9 2.3-4.1 5.3-5.2 9.5-0.2 0.7-0.3 1.4-0.5 2.1h-2c-0.1 0.6-0.1 1.2-0.2 1.9-0.4 2.7-0.8 5.5-1.2 8.2-0.1 1-0.3 2-0.4 2.9-2.5 17.3-2.5 17.3-6.2 21-0.3 2-0.3 2-0.4 4.3-0.1 0.9-0.1 1.8-0.2 2.7 0 0.9 0 1.8-0.1 2.8 0 0.9 0 1.9-0.1 2.9-0.2 6.4 0 12.7 0.6 19.2 0.4 4.7 0.3 9.4 0.2 14.1 2-2 2-2 2.2-4.5-0.1-1.9-0.2-3.9-0.3-5.8 0.1-2.7 0.1-2.7 2.1-5.7 0.1 0.6 0.1 1.2 0.1 1.8 0.1 2.7 0.2 5.3 0.4 8 0 0.9 0 1.8 0.1 2.8 0 0.4 0 0.4 0.1 2.7 0 0.8 0.1 1.6 0.1 2.4 0.2 2.2 0.7 4.2 1.2 6.3 0.1 1.9 0.1 3.9 0.1 5.8v3c-0.1 0.7-0.1 1.5-0.1 2.2h2v5h2v-7c0.7-0.3 1.3-0.6 2-1 0.7 5.3 1.3 10.6 2 16h3c0.4 2.7 0.7 5.3 1 8h4v4h4v4h9v2c1.2 0.2 2.3 0.3 3.5 0.5 3.5 0.5 3.5 0.5 4.5 1.5 2.4 0.4 4.7 0.7 7 1v2h6v1c20.5 2.8 43.1 1.8 62-7 4-1.7 8-3.4 12-5v-2h3v-2c0.7-0.2 1.3-0.5 2-0.8 2-1.2 2-1.2 3-4.2 1.5-1.7 1.5-1.7 3-3h2c0.4-1 0.7-2 1-3h2v-2h2l0.3-2.1c0.8-3.3 2.1-5.9 3.7-8.9h2c0.1-0.6 0.2-1.3 0.3-1.9 0.8-3.5 2.2-6.5 3.7-9.8 1-2.3 1-2.3 2.1-6.1 0.9-3.2 0.9-3.2 2.5-5.2 3.1-4.3 2.5-10 2.3-15.1-0.2-6.9 0-12.5 3.2-18.8 1-2.3 1.5-4.5 1.9-7.1h1c0 8.8 0.1 17.6 0.1 26.4v12.3 11.8 4.5 6.3 3.7c-0.1 2.5-0.3 4.6-1.1 7h-3c0.4 0.7 0.7 1.3 1 2 0.1 2 0.1 4 0 6h-2c-1.3 3.8-0.8 7.1-0.4 11 0.6 6.9 0.2 13.3-1.6 20-0.3 0.4-0.6 0.7-1 1-2 11.7-2.3 25.6 1 37 2 2.8 2 2.8 4 5 1.1 2.6 1.2 3.5 0.3 6.1-1.3 1.9-1.3 1.9-3.2 2.6-0.8 0-1.6 0.1-2.4 0.2-0.9 0-1.7 0.1-2.6 0.2-0.4 0-0.4 0-2.7 0.2-0.9 0.1-1.8 0.1-2.7 0.2-2.2 0.2-4.5 0.4-6.7 0.5 0.7-0.3 1.3-0.6 2-1-0.4-4.1-1-7.3-3-11-7.9-0.1-15.6 0-23.4 0.8-4.2 0.4-8.4 0.3-12.6 0.2h-4c-0.3 3.7-0.6 7.3-1 11 2 0.4 4 0.7 6 1v1c-1.6-0.1-3.1-0.3-4.7-0.4-0.9-0.1-1.8-0.2-2.7-0.3-2.3-0.2-4.4-0.7-6.6-1.3v-2c-2-0.6-3.9-1.3-6-2v-2h-3c0.4-1.3 0.7-2.6 1-4h-2v-2c-2-0.3-3.9-0.6-6-1-2.2-20.2-2.2-20.2 0-27 1.9-0.9 1.9-0.9 4.1-1.7 0.7-0.2 1.5-0.5 2.2-0.7 0.6-0.2 1.1-0.4 1.7-0.6l-1.8 0.3c-0.8 0.1-1.7 0.2-2.5 0.3l-2.4 0.3c-2.3 0.1-2.3 0.1-5.3-0.9v2c-1.3-0.3-2.6-0.6-4-1v-2c-0.5 0.1-1 0.2-1.6 0.2-6.9 0.9-13.6 0.9-20.5 0.8-3.8 0-7.2 0.4-10.9 1-0.3 1.3-0.6 2.7-1 4h-4v2c-13.6 2.3-13.6 2.3-20 2v2c-0.5 0.3-0.5 0.3-3.4 1.5-1.8 0.8-3.7 1.6-5.6 2.5-2.3 0.1-4.6 0.1-7 0 0.4 1.3 0.7 2.7 1 4h-2c0 0.6 0 1.1-0.1 1.7-0.1 2.6-0.2 5.1-0.3 7.6-0.1 0.9-0.1 1.8-0.1 2.7-0.1 0.9-0.1 1.7-0.2 2.6 0 0.8 0 1.5-0.1 2.3-0.2 2.1-0.2 2.1-1.2 5.1-5.4 4.1-11.5 7.1-18 9-1-0.3-2-0.6-3-1 1.3-0.6 2.7-1.3 4-2-1-2.3-2-4.6-3-7-0.6 0.7-1.3 1.3-2 2-0.3-0.6-0.6-1.3-1-2-2-0.6-2-0.6-4-1v-4c-0.6-0.3-1.3-0.6-2-1h2v-2c-2.6 0.7-5.3 1.3-8 2 0.2 0.5 0.2 0.5 1 3h-3v2c-1.3-0.3-2.6-0.6-4-1-1 1.3-2 2.7-3 4-4.3-0.5-6-3-9-6-1.6-0.7-3.3-1.4-5-2-0.3-0.6-0.6-1.3-1-2-1.3 0.2-2.5 0.4-3.8 0.6-3.9 0.5-3.9 0.5-6.2-0.6h-5v2c-2.3-0.3-4.6-0.6-7-1-0.3 1-0.6 2-0.8 3-1.2 3-1.2 3-3.2 4v6h-2c-0.7-1.6-0.7-1.6-1-4 1.4-3.2 2.6-5.5 5-8 2.6-9.3 2.7-19.5 3.5-29.1l1.5-15.9c0.1-0.8 0.2-1.5 0.2-2.2 0.5-4.2 1.4-7.9 2.8-11.8-0.9-0.2-1.7-0.5-2.7-0.7-3.6-1.4-5.6-3-8.4-5.7-4.7-4.4-4.7-4.4-7.2-6.2-0.3-0.3-0.3-0.3-1.7-1.4v-2h-2c-1.5-1.7-3-3.5-4.4-5.3-4.4-5.5-4.4-5.5-6.4-7.4-1.2-1.3-1.2-1.3-1.2-3.3h-2c-1.9-2.6-3.5-5.3-5.2-8-1-1.8-2.1-3.5-3.3-5.1-3.7-5.2-4.9-10.5-4.5-16.9 0.7-0.6 1.3-1.3 2-2-0.4-2.1-0.4-2.1-1-4 4.7-4 4.7-4 8-4v7h3.4 5.6v-2c3 0.7 5.4 1.6 8 3-0.3 1.3-0.6 2.7-1 4h6c0.4 0.7 0.7 1.3 1 2h-2v2c1.2-0.1 2.4-0.3 3.6-0.5 4.7-0.6 9.2-0.9 13.9 0 2.3 0.5 4.3 0.6 6.7 0.6 0.6 0 0.6 0 3.8-0.1v-2.1c-0.3-15.3 0.1-30.2 1.7-45.4 1.3-11.5 1.7-22.9 1.3-34.5h1c0.4 3.2 0.4 3.2 2 19 0.4-10.5 0.7-21.1 1-32-11.6-1-11.6-1-17 0-3.1-0.4-4.3-1.2-7-3v2h-16c-0.3 0.7-0.6 1.3-1 2-5.4-6.6-5.8-12.7-6-21 0-1.2-0.1-2.3-0.1-3.6-0.2-9.6-0.2-9.6 2.1-13.4h2v2h2c-0.3 3-0.6 6-1 9h-1v15c0.5-1.2 0.9-2.5 1.4-3.8 1-2.8 2-4.7 3.6-7.2h2v3c0.5-0.4 0.9-0.8 1.4-1.3 0.6-0.5 1.2-1 1.9-1.6 0.6-0.6 1.2-1.1 1.8-1.7 2-1.4 3.5-2 5.9-2.4 2.5 3.8 2.2 5.8 2.2 10.2-0.1 1.3-0.1 2.6-0.1 3.9 0 0.9-0.1 1.9-0.1 2.9l4.8 0.6c0.9 0.1 1.8 0.2 2.7 0.3 2.5 0.1 2.5 0.1 5.5-0.9v-2c1.3-0.3 2.7-0.6 4-1v-2c1.7-2 3.2-3.1 5.5-4.3 2.9-1.9 4.4-4 6.5-6.7h2v-3.4c0-3.6 0-3.6 1-4.6h7v-8c-0.4 0-0.4 0-2.8-0.3-3.2-0.7-3.2-0.7-5.2-3.7v-4h-2v-8h2c0.3-0.6 0.6-1.2 0.9-1.9 1.1-2.1 1.1-2.1 3.1-4.1-0.7 0.3-1.5 0.5-2.3 0.7-2.7 0.3-2.7 0.3-4.2-0.8-0.5-0.6-1-1.2-1.5-1.9-0.8-0.8-1.7-1.5-2.6-2.3-2.5-2.8-3.1-4.1-3.4-7.7h-2v-6h2v-1.9-2.4c0-0.9-0.1-1.7-0.1-2.5 0.1-2.2 0.1-2.2 1.1-4.2 1.4-12.2 2.1-24.7-0.5-36.7-6-29.3 3.9-61.5 15.5-88.3h10c-0.2-0.8-0.3-1.6-0.5-2.4-0.6-4.2-0.8-8.5 0.5-12.6 2.1-1.2 2.1-1.2 4-2v-3c1.9-2.6 1.9-2.6 4.3-5.6 0.8-1 1.6-2 2.5-3 2.2-2.4 2.2-2.4 5.2-3.4 1.1-1.6 2.1-3.3 3-5 1.7-2.1 2.5-2.9 5.2-3.3h2.3c2.4-0.2 2.4-0.2 4.5-0.7 2-2.4 2-2.4 3-5 2.7-2.7 5.4-3 9-4 1.7-0.6 3.4-1.3 5-2 1.4-0.5 2.7-0.9 4-1.4 2.5-0.9 4.2-1.7 6.4-3.2 7.2-3.7 17.1-2.5 25-2.5zm-44.4 69.1c-0.8 0.6-1.7 1.2-2.6 1.8-3.1 2.9-4.8 6.2-6.4 10.2v2h-2c-0.1 2.1-0.2 4.2-0.2 6.3-0.1 1.1-0.1 2.3-0.2 3.5 0.4 3.2 0.4 3.2 2.3 5.6 2.1 1.6 2.1 1.6 4.1 1.6v2c9.6 5.5 23.5 5 34 2.8 2-0.8 2-0.8 3.6-3.4 0.2-0.8 0.3-1.6 0.4-2.4h2c1.9-4.7 2.3-8.6 2.3-13.7v-3.9c-0.3-3.4-0.3-3.4-2.3-6.4h-2c-0.2-0.7-0.5-1.5-0.7-2.3-1.9-4-4.3-4.9-8.1-6.7-8.7-2.7-16.9-2.5-24.2 3zm107 22c-3.9 6.9-3.6 14.5-2 22 1.8 4.6 3.9 7.9 8.4 10.3 5 1.7 9.6 2.5 14.6 0.7 3.8-3.4 6.9-6.8 7.2-12 0.2-10.4-0.9-16.4-8.2-24-6.9-4.2-14.8-3.2-20 3zm-83 45c0.7 1.7 1.3 3.3 2 5-2.9-0.3-5.9-0.6-9-1-0.4 8.8 1.3 14.8 7.3 21.4 12.8 12.1 33.3 15.3 50.2 15.2 8.9-0.3 16.4-2.4 23.5-7.9 0.7-0.9 1.3-1.8 2-2.7 0.5-0.6 0.9-1.1 1.4-1.8 3.7-5 4.3-9 3.6-15.2h-4v-2h-12v-2l-3.9-0.3c-8.6-0.8-16.8-1.6-25.1-3.9-11.9-3.2-23.7-4.3-36-4.8zm-1 93c-0.6 0.7-1.3 1.3-2 2h4v3c3.4 1.2 6.1 1.1 9.7 1.1h3.6c0.9-0.1 1.8-0.1 2.7-0.1v8c0.8 0.2 0.8 0.2 5 1-1.6 1.7-3.3 3.3-5 5 3.7-0.7 7.2-1.5 10.8-2.5l3-0.9c0.7-0.2 1.5-0.4 2.2-0.6v-2c1.3 0 2.6 0.1 4 0.1 1.3 0 2.7 0 4-0.1 0.4-0.3 0.7-0.6 1-1 2.9-0.3 5.7-0.5 8.6-0.7 2.4-0.3 2.4-0.3 3.4-1.3 1.4-0.3 2.9-0.5 4.3-0.7 0.8-0.2 1.7-0.3 2.6-0.4 0.9-0.2 1.8-0.3 2.7-0.4 0.9-0.2 1.8-0.3 2.7-0.5 2.3-0.3 4.5-0.6 6.7-1v-3h-3c0.4-1 0.7-2 1-3-3.3 0.5-6.4 1.1-9.6 2-4.6 1.2-9.1 1.5-13.9 1.7-0.4 0-0.4 0-2.6 0.1-8 0.3-15.9 0.2-23.9-0.8l-1-1c-1.6-0.1-3.3-0.3-4.9-0.3-5.7-0.5-10.7-1.8-16.1-3.7z" fill="#FDC84E"/>
  <path transform="translate(236.69 240.94)" d="m0 0h3c0.4 0 0.4 0 2.3 0.1v2h5c0.2 0.3 0.2 0.3 1 2 1.7 0.7 3.3 1.4 5 2-0.3 1.3-0.6 2.6-1 4 2.7 0.3 5.3 0.6 8 1v3l1.8 0.6c3.1 1.9 4.3 4.3 6.2 7.4 1.1 1.2 2.2 2.3 3.3 3.5 2.1 2.4 2.7 3.1 3.1 6.4-0.1 0.3-0.1 0.3-0.4 2.1h2c2.8 2.8 3.9 6.1 5.2 9.8 0.8 2.2 1.8 4.2 2.8 6.3 3.8 8.3 5.1 17.8 6 26.9h2c0.1 0.6 0.1 1.2 0.2 1.9 0.1 0.8 0.2 1.6 0.3 2.5 0 0.8 0.1 1.6 0.2 2.5 0.3 2.1 0.3 2.1 1.3 3.1 0.1 2.8 0.1 5.6 0.1 8.4v2.5 8.1 5.5c0 4.5-0.1 9-0.1 13.5h-2c0.1 1.1 0.1 2.2 0.2 3.4 0 4.9-1.4 9-3.2 13.6-0.2 0.6-0.4 1.3-0.7 2-0.7 1.9-0.7 1.9-2.3 5-1.6 0.7-3.3 1.4-5 2-1.3 2.6-1.3 2.6-2 5-0.6-0.4-1.3-0.7-2-1-0.3 2.3-0.6 4.6-1 7h-3c-0.3 0.9-0.6 1.9-0.9 2.8-1.1 3.2-1.1 3.2-2.1 5.2h-4c-0.1 0.3-0.1 0.3-0.7 1.9-1.3 2.1-1.3 2.1-3.4 2.8-0.6 0.1-1.3 0.2-1.9 0.3v3c-0.8 0.4-1.7 0.8-2.6 1.2-1.1 0.5-2.2 1.1-3.3 1.6-1.1 0.6-2.2 1.1-3.4 1.7-2.7 1.5-2.7 1.5-3.7 3.5-2.3 0.9-4.5 1.8-6.9 2.5-0.3 0.1-0.3 0.1-2 0.7-5 1.6-9.8 2.4-15.1 2.5-0.7 0.1-1.3 0.2-2 0.3-0.3 0.6-0.6 1.3-1 2h-32c-0.3-1-0.6-2-1-3-1.9-0.7-1.9-0.7-4.4-1.2-2.6-0.5-5-1-7.6-1.8v-2c-0.8 0-1.5 0.1-2.3 0.1-3.2-0.2-3.6-0.8-5.7-3.1-1-0.4-2-0.7-3-1v-4h-4v3c-1.3-0.4-2.6-0.7-4-1v-7h-3v-3h-5c-1.3-4.4-2.2-8.4-2.6-12.9-0.7-3.9-2-7.5-3.4-11.1h-2c0-0.7 0-1.4-0.1-2.1l-0.3-9.3c-0.1-1.1-0.1-2.2-0.1-3.3-0.1-1-0.1-2-0.2-3.1 0-0.5 0-0.5-0.1-2.9-0.2-2.3-0.2-2.3-1.2-4.3-0.1-2-0.1-4.1-0.1-6.1v-3.6-3.8-3.9-3.6-3.4c0.1-2.6 0.1-2.6 1.1-4.6 0.2-1.6 0.4-3.1 0.6-4.7 0.1-0.8 0.1-1.6 0.2-2.4 0.1-0.7 0.2-1.3 0.2-1.9 0.5-0.2 0.5-0.2 3-1 0-1 0.1-1.9 0.1-2.9 0.1-1.3 0.2-2.5 0.2-3.8 0.1-1.3 0.1-2.5 0.2-3.8 0.5-3.7 1.4-5.5 3.5-8.5 1.6-3.5 3-7 4.5-10.5 1.3-3.1 2.8-5.9 4.5-8.7 1.1-2 2-3.9 2.9-6 1.6-3.3 3.5-5.1 6.5-7.3 2.8-2.7 4.5-6.1 6.4-9.4 1.2-2.1 1.2-2.1 2.2-3.1 1.7-0.1 3.3-0.1 5 0 0.3-0.6 0.5-1.2 0.8-1.8 1.5-2.7 2.8-4.3 5.2-6.2 2.3-0.4 4.7-0.7 7-1 2.5-1.2 4.7-2.6 7-4 7.2-3.3 14.5-3.3 22.2-3.6 0.9-0.1 1.7-0.1 2.5-0.2h2.3c3.7-0.4 6.8-1.3 10.7-1.3z" fill="#FEF0B5"/>
  <path transform="translate(148,140)" d="m0 0c6.4 0.7 12.6 1.8 18.9 2.9 1.1 0.2 2.1 0.3 3.1 0.5 4.5 0.8 9 1.6 13.4 2.4 35.4 6.3 35.4 6.3 52.6 8.2-1.2 7.1-4.5 12.4-10 17-4.9 2.6-8.5 3.3-14 3v-2c-1.3-0.3-2.5-0.6-3.8-0.9-2.5-0.6-4.8-1.3-7.2-2.1v-2c-0.4 0-0.4 0-2.4 0.1-3.7 0-7.4 0.1-11 0.1-1.3 0.1-2.6 0.1-3.9 0.2-6.6 0-11.9-0.2-17.8-3.5-2.2-1-4.2-1.4-6.6-1.7-4.7-0.9-6.6-3.3-9.2-7.1-1.9-3.7-2.2-6.8-2.2-10.9 0-0.7 0.1-1.5 0.1-2.4v-1.8z" fill="#20090B"/>
  <path transform="translate(57,196)" d="m0 0c1 0.2 1 0.2 6 1 0.3 1.3 0.7 2.6 1 4h2c0.1 0.4 0.1 0.4 0.7 2.2 1.5 3.3 3.7 5.2 6.3 7.8v2c0.5-0.1 0.5-0.1 3.3-0.5 3.7-0.5 3.7-0.5 6.7-0.5-1.5 1.2-3.1 2.5-4.6 3.7-1.4 1.3-1.4 1.3-2.4 3.3h-2v8h2c0.3 0.8 0.6 1.6 0.9 2.4 1.1 2.6 1.1 2.6 3.1 3.6v2h4v8c-1.2 0.2-1.2 0.2-7 1 0 0.5 0 0.5-0.2 3.2-1.2 5.6-4.2 7.7-8.8 10.8v-4c0.7-0.3 1.3-0.7 2-1 0.7-1.6 1.4-3.3 2-5 0.7-1.7 1.3-3.3 2-5h2c0.3-5.5 0.3-8.4-3-13-0.3-1-0.7-2-1-3-1.1 0.5-2.2 0.9-3.3 1.4-2.2 1-4.4 1.8-6.7 2.6-0.3-0.7-0.7-1.3-1-2-1 0.2-1 0.2-6 1v3h-2c-0.3-0.7-0.7-1.3-1-2h-8v-2h-5v-2c-1.6-0.3-3.3-0.7-5-1-0.2-3.4-0.3-5.4 1.4-8.4l1.6-1.6h2v-3c1.3-0.2 1.3-0.2 8-1v-6c0.9-0.4 1.8-0.7 2.8-1.1 4.1-2.4 5.1-4.6 7.2-8.9z" fill="#D89949"/>
  <path transform="translate(68,227)" d="m0 0c4 0 4 0 6.2 2 2.3 3.9 2.6 6.5 2.8 11-0.3 1-0.7 2-1 3h-2l-0.3 2.1c-0.8 3.3-2.1 5.9-3.7 8.9h-2v5h-3c-0.3 1-0.7 2-1 3h-2v2c-0.7 0.2-0.7 0.2-4 1v2c-3.3 2.2-4.2 2.4-8 2-1.3-0.7-2.6-1.3-4-2v-16h2c0.2-0.8 0.5-1.7 0.7-2.5 1.5-4.2 3.5-8 6.3-11.5h2c0.3-0.6 0.6-1.2 0.9-1.9 2.3-4.5 4.3-5.1 9.1-7.1l1-1z" fill="#FDAF8E"/>
  <path transform="translate(100,484)" d="m0 0v7c0.8 0 1.6 0 2.4-0.1 2.6 0.1 2.6 0.1 3.6 1.1 0.7-0.3 1.3-0.7 2-1 0.3 1.1 0.6 2.2 0.9 3.4 1.1 3.6 1.1 3.6 2.1 5.6-1.7 0.3-3.3 0.7-5 1v2c-5.1 0.8-10 1.2-15.2 1.2h-2.3-4.8-7.2-4.7c-0.4 0-0.4 0-2.2 0.1-3.7-0.1-6.5-0.1-9.6-2.3-0.6-1.8-0.6-1.8-0.8-3.9 0-0.4 0-0.4-0.2-2.1 0-2 0-2 1-5h2c0.7-1.3 1.3-2.6 2-4 5 0.1 8.8 0.5 12.8 3.6 3.2 2.4 3.2 2.4 5.3 2.1 2.2-0.8 3.4-1.9 4.9-3.7 1 0.7 2 1.3 3 2v-2c0.7-0.3 1.3-0.7 2-1v-3c2.9-1 5-1.1 8-1z" fill="#B87C44"/>
  <path transform="translate(154,74)" d="m0 0v3c0.6 0.3 1.3 0.6 1.9 0.9 2.1 1.1 2.1 1.1 3.1 3.1 0.5 6.5-0.3 9.7-4 15-3 3.5-5.1 4.8-9.7 5.3-8.5 0.2-8.5 0.2-12.5-2.6-3.4-5.1-3.4-10.2-2.4-16.1 1.2-4.2 1.9-6.1 5.6-8.7 5.7-1.8 12.4-1.8 18 0.1zm-15 4v3c1-0.3 2-0.7 3-1v-2h-3z" fill="#080907"/>
  <path transform="translate(284,279)" d="m0 0c1.3 0.3 2.6 0.7 4 1v3h3v2h-2c0.3 1.3 0.7 2.6 1 4h2c0.7 3.3 1.3 6.6 2 10h6c0.1 1 0.1 1.9 0.2 2.9 0 0.7 0 0.7 0.2 3.9 0.1 0.6 0.1 0.6 0.3 3.7 0.5 5.2 0.5 5.2 1.3 7.5 2.9 1.7 4.5 2.1 7.8 1.6 0.7-0.2 1.5-0.4 2.2-0.6 0.8-6 1.3-12 1.6-18 0-0.9 0-1.7 0.1-2.6 0.1-2.2 0.2-4.3 0.3-6.4 1.6-0.7 3.3-1.3 5-2 0.2 0.7 0.2 0.7 1 4-0.7 0.3-0.7 0.3-4 2v2c0.6-0.4 1.2-0.7 1.8-1.1 2.6-1 3.6-0.8 6.2 0.1-1 0.3-2 0.7-3 1-2.2 1.8-2.2 1.8-4 4-0.2 2.8-0.2 2.8 0 5 0.7 0.3 1.3 0.7 2 1v2c4.3 0.7 8.6 1.3 13 2 0.3-2 0.7-4 1-6h1c-0.5 4.8-1.1 8.1-4 12-0.3 0.2-0.3 0.2-2 1 0.3 0.7 0.7 1.3 1 2h-2c0.2 1.5 0.2 1.5 1 9h-2v3c-6-0.3-10.8-0.8-16-4-0.8-0.5-1.5-0.9-2.3-1.4-6.5-4-6.5-4-7.5-6.8 0-0.3 0-0.3-0.2-1.8h-2c-0.3-0.9-0.5-1.7-0.8-2.6-2.8-8.7-6-17.2-9.5-25.7-0.4-0.8-0.7-1.6-1-2.5-0.2-0.3-0.2-0.3-0.9-2.1-0.8-2-1.3-4-1.8-6.1z" fill="#E5892A"/>
  <path transform="translate(240,482)" d="m0 0c0.3 0.7 0.7 1.3 1 2 0.3 0 0.3 0 1.7-0.2 28-2.9 28-2.9 34.3-0.8 2.7 2.6 3 3.9 3.2 7.8 0 0.5 0 0.5-0.2 3.2h-2c-0.3 1-0.7 2-1 3-3.8 0.2-7.5 0.3-11.3 0.5-1.1 0-2.1 0.1-3.2 0.1-6.8 0.3-13.7 0.5-20.5 0.4v-2c-1-0.2-1-0.2-6-1v-12c1.3-0.3 2.6-0.7 4-1z" fill="#B47A43"/>
  <path transform="translate(272,255)" d="m0 0c3.1 1.6 3.3 4.2 4.5 7.4 1.3 3.5 2.4 6.4 4.5 9.6 1.3 3.9 2 6.9 2 11h3c12 29.4 12 29.4 12 35h2c2.3 6.9 1.1 16.4-2.1 22.9-2.7 5.8-2.2 11.7-1.9 18 0 3.8-0.2 7.4-1 11.1-0.5 0.3-0.5 0.3-3 2v-6h2c-0.1-5.4-0.2-10.8-0.4-16.2 0-1.8-0.1-3.7-0.1-5.5-0.1-2.6-0.1-5.3-0.2-7.9v-2.5c-0.2-5.8-0.2-5.8-1.3-6.9-0.1-1.5-0.1-3-0.1-4.6 0-0.8 0.1-1.6 0.1-2.5v-1.9h-2c-0.3-1.1-0.5-2.2-0.8-3.4-5-21.7-5-21.7-9.3-29.8-1.6-3.2-2.8-6.4-3.9-9.8h-2c-0.1-0.6-0.2-1.1-0.3-1.7-0.2-0.7-0.3-1.5-0.5-2.2-0.2-0.8-0.3-1.5-0.5-2.3-0.2-0.6-0.5-1.2-0.7-1.8-1-0.3-2-0.7-3-1-1.4-2-2.7-4-4-6 3-2 3-2 6-2 0.3-1 0.7-2 1-3z" fill="#FBDF68"/>
  <path transform="translate(331,275)" d="m0 0c1.3 2.6 1.2 4.6 1.2 7.4 0.1 1 0.1 2 0.1 3-0.4 3-1 3.7-3.3 5.6-0.7 2.2-0.7 2.2-1 4 0.3 0 0.3 0 1.9 0.2 2.1 0.8 2.1 0.8 3.4 2.9 1 4.4 0.8 8.8-1.3 12.9-1.8-0.1-3.6-0.3-5.4-0.4l-3-0.3c-2.6-0.3-2.6-0.3-4.6-1.3v-2c-1-0.3-2-0.7-3-1v-5c1.3-0.7 2.6-1.3 4-2v-3c-1.3 0.3-2.6 0.7-4 1 0-2 0-2 1.5-3.6 0.2-0.3 0.2-0.3 1.5-1.4-0.3-0.7-0.7-1.3-1-2l-2 2c-0.7-0.3-1.3-0.7-2-1v19h-1c0-0.3 0-0.3-0.1-2-0.1-3.1-0.2-6.2-0.3-9.2-0.1-1.1-0.1-2.2-0.2-3.3 0-1 0-2-0.1-3.1 0-0.9-0.1-1.9-0.1-2.8-0.2-2.3-0.6-4.4-1.2-6.6h5v-8c0.9 0 1.9 0 2.9 0.1 11.3-0.3 11.3-0.3 12.1-0.1z" fill="#C5813B"/>
  <path transform="translate(164,265)" d="m0 0c0.4 3.5 0.1 4.8-1.8 7.8-2.2 2.2-2.2 2.2-5.2 3.2-3.8 3.1-5.3 6.6-7 11-0.9 2.1-1.8 4.3-2.7 6.4-0.8 1.9-1.5 3.7-2.3 5.6h-2v8h-3c-0.1 1-0.2 1.9-0.4 2.9l-3.6 29.1h-2v2.1c0 3.1 0 6.2 0.1 9.3v3.3c0 6.2-0.3 12.1-1.1 18.3 0 2-0.1 4 0 6-0.5 0.2-0.5 0.2-3 1-1.6-15.8-2.2-31.1-1-47 0.5-0.2 0.5-0.2 3-1 0.1-1.1 0.3-2.1 0.4-3.2 0.3-2 0.6-4 1-6 0.5-2.4 0.9-4.7 1.3-7.2 0.1-0.3 0.1-0.3 0.4-2.3 0.3-1.7 0.5-3.3 0.8-5 0.1-0.8 0.2-1.5 0.4-2.3 0-0.4 0-0.4 0.3-2.2 0.4-1.8 0.4-1.8 1.4-3.8h2c-0.1-0.7-0.1-1.4-0.2-2.2 0.2-3.4 1.1-5.1 3.2-7.8 0.7-0.3 1.4-0.5 2.1-0.8 0.3-0.2 0.3-0.2 1.9-1.2 0.3-2 0.6-4 0.7-6 0.4-2.7 1.4-4.2 3.3-6h2c0.1-0.8 0.2-1.5 0.4-2.3 0.6-2.7 0.6-2.7 2.6-5.7 6-2 6-2 8-2z" fill="#FEDB6A"/>
  <path transform="translate(246.81 90.562)" d="m0 0c0.7 0.1 1.4 0.3 2.2 0.4-0.4 2-0.4 2-1 4-0.3 0.2-0.3 0.2-2 1 0.3 1.4 0.6 2.7 1 4 1.3 0.4 2.6 0.7 4 1l-0.6-3.9c-0.3-2.2-0.3-2.2-0.4-4.1 1-1 1-1 4-1h3c0.3 1 0.6 2 1 3h2c2.3 3.7 2.3 6.8 2.2 11 0 1.3 0 2.5 0.1 3.7-0.3 3.1-0.7 4.8-2.3 7.3h-2v2c-3.3 1.7-6.5 1.7-10 1-3.9-2.1-6.4-4.8-8.4-8.7-1.1-6.2-2-11.9 1.6-17.4 2-2.4 2.4-2.8 5.6-3.3z" fill="#040503"/>
  <path transform="translate(53,204)" d="m0 0c-2 0.7-4 1.3-6 2v6c-2.6 0.3-5.3 0.7-8 1v3c-0.3 0.3-0.3 0.3-2 1.8-2 2.2-2 2.2-2.2 5.4 0 0.5 0 0.5 0.2 2.8 1.3 0.3 2.6 0.7 4 1v2h5v2c0.7-0.3 1.3-0.7 2-1h6c0.2 0.5 0.2 0.5 1 3 0.7-1.3 1.3-2.6 2-4h2c-0.3 2-0.7 4-1 6h-3c-0.2 0.3-0.2 0.3-1 2v-2h-2v-2c-2 0.7-4 1.3-6 2-0.3 2.6-0.7 5.3-1 8l-1.8-0.9c-7.8-3.7-7.8-3.7-12.2-3.1-0.3 0.7-0.7 1.3-1 2h-3l-2 2h-1v20h-1c-2.6-13.3-2.1-25.8 4-38l3-6h2c0.1-0.3 0.1-0.3 0.8-1.8 3.5-6.4 14.7-15.7 22.2-13.2z" fill="#FAC266"/>
  <path transform="translate(145.38 67.75)" d="m0 0c1.1-0 2.2-0.1 3.4-0.1 4.3 0.5 6.8 1.9 9.8 4.9 4.9 6.2 5.1 10.6 4.4 18.4-2.1 7.4-6.8 11-13 15-3.1 0.1-3.1 0.1-6.8-0.1l-3.6-0.3c-5.1-0.8-8.4-2.3-11.9-6-3.5-5.2-3.3-10.6-2.7-16.6 1.6-5.3 4.3-8.9 9-12h2v-2c3.3-1.1 5.9-1.2 9.4-1.2zm-12.4 8.2c-3 5.4-3.6 11.1-3 17 1.3 2.9 1.3 2.9 3 5 0.4 0.6 0.8 1.1 1.3 1.7 2.5 2 4.4 1.7 7.6 1.7h3.1c4.7-0.6 7.8-2.7 10.8-6.4 3.3-4.4 3.9-8.5 3.2-14-1.4-2.4-1.4-2.4-3-4h-2v-3c-6.8-2.2-15-2.1-21 2z" fill="#336616"/>
  <path transform="translate(155,136)" d="m0 0c11.1 0.2 21.4 1.7 32.2 4.1 8.2 1.8 16.4 3 24.8 3.9 2.7 0.3 5.3 0.7 8 1v2h12v2h4v5c-13.5-0.9-26.7-2.2-40-5-2.8-0.5-5.6-1-8.4-1.5-0.7-0.1-1.4-0.2-2.1-0.4-3.8-0.6-7.6-1.3-11.4-1.9-0.8-0.1-1.6-0.2-2.5-0.3-1.5-0.3-3.1-0.5-4.6-0.7-4.3-0.7-7.6-1.5-11-4.2-0.8-2.2-0.8-2.2-1-4z" fill="#E2D5B0"/>
  <path transform="translate(140,307)" d="m0 0h3c0.3 7.4 0.3 7.4-1 10.4-1.2 3.1-1.4 5.7-1.6 9s-0.4 6.5-0.9 9.8c-0.7 5.2-0.6 10.4-0.6 15.7 0 1.1 0 2.2 0.1 3.3v7.8h1c0.2 3.6 0.4 7.2 0.6 10.9 0 1 0.1 2 0.1 3.1 0.1 1 0.1 2 0.2 3 0 0.9 0.1 1.8 0.1 2.8 0 2.2 0 2.2-1 4.2h2c0.2-0.3 0.2-0.3 1-2 0.1 0.7 0.3 1.4 0.4 2.2 0.1 0.4 0.1 0.4 0.5 2.7 0.1 0.5 0.1 0.5 0.6 2.8s0.5 2.3 1.5 3.3c1 5.8 1 5.8 1 8l-2 2v-3h-3c-0.2-1-0.2-1-1-6-0.3 2-0.7 4-1 6h-2v-5h-2c-2.2-12.7-2.2-25.1-2.1-37.9v-6.2c0-5 0.1-9.9 0.1-14.9h2c0-0.7 0-1.4-0.1-2.1-0.2-10.2 0.6-20.3 4.1-29.9z" fill="#FEE889"/>
  <path transform="translate(61,228)" d="m0 0c0.2 0.5 0.2 0.5 1 3h-2c-0.3 0.6-0.5 1.2-0.8 1.8-1.2 2.2-2.5 4-4.1 6-3 3.8-5 7.8-7.1 12.2h-2v16h-1c-0.5-3.9-1-7.5-0.9-11.4-0.1-2.6-0.1-2.6-2.1-4.6-4.9 2.6-4.9 2.6-6 6h-4v-3h-2c-0.3 1.7-0.7 3.3-1 5h-2c-0.7 2.6-1.3 5.3-2 8-1.3-3.8-1.1-7.3-1.1-11.2 0-0.7 0-1.5 0.1-2.3v-5.5h1c0.2-0.6 0.4-1.3 0.6-1.9 0.2-0.4 0.2-0.4 0.8-2.5 0.3-0.9 0.6-1.7 0.8-2.5 0.8-2.1 0.8-2.1 1.8-3.1 5.2 0.3 8.7 0.9 13 4 0.1-1.1 0.2-2.2 0.2-3.4 0.8-3.6 0.8-3.6 2.7-5 2.1-0.6 2.1-0.6 5.1-0.6v2h6c0.1-0.8 0.2-1.6 0.2-2.4 0.8-2.6 0.8-2.6 2.9-3.9 0.6-0.2 1.2-0.5 1.9-0.7z" fill="#D59842"/>
  <path transform="translate(332,277)" d="m0 0c2 2 2 2 2 6 0.8 0.2 0.8 0.2 5 1 0.1 0.8 0.2 1.6 0.4 2.4 0.6 2.6 0.6 2.6 2.6 4.6 0.5 3.3 0.4 6.7 0.4 10.1v2.7c0.1 10.2-4.1 18.3-10.4 26.2-3.1 2.6-4.6 3-8.7 3.3-3.3-0.3-3.3-0.3-5.3-2.3 2.6 0.3 5.3 0.7 8 1v-3h2c-0.1-0.6-0.2-1.3-0.3-1.9-0.1-0.9-0.2-1.7-0.3-2.5 0-0.4 0-0.4-0.3-2.5 0-0.7-0.1-1.4-0.1-2.1l1-1-2-2h4v-4c0.5-0.2 0.5-0.2 3-1 0-1.7 0-3.5 0.1-5.2v-2.9c-0.1-2.8-0.5-5.2-1.1-7.9-1.3-0.3-2.6-0.7-4-1 0.3-1.3 0.7-2.6 1-4-0.7-0.3-1.3-0.7-2-1 0.3-0.2 0.3-0.2 2-1.2 2-1.8 2-1.8 2.6-4.3 0.1-0.9 0.1-1.8 0.2-2.7 0-0.9 0.1-1.8 0.1-2.7 0-0.7 0.1-1.4 0.1-2.1z" fill="#FBC055"/>
  <path transform="translate(156 229.52)" d="m0 0 2.4 0.9c4.9 1.5 9.4 2.1 14.5 2.4 2.1 0.2 2.1 0.2 3.1 1.2 15.4 1.4 30.8 1.9 45.7-2.5 2.3-0.5 2.3-0.5 4.3 0.5-0.3 0.6-0.7 1.3-1 2h3v3c-0.6 0.1-1.1 0.1-1.7 0.2-2.6 0.4-5.2 0.8-7.7 1.2-0.9 0.1-1.8 0.3-2.8 0.4-0.8 0.2-1.7 0.3-2.5 0.4s-1.6 0.3-2.4 0.4c-1.9 0.4-1.9 0.4-2.9 1.4-2.8 0.3-5.7 0.5-8.5 0.7-2.5 0.3-2.5 0.3-3.5 1.3-2.7 0.1-5.3 0-8 0v2c-1.7 0.5-3.5 0.9-5.2 1.4-0.9 0.3-1.9 0.5-2.9 0.8-2.6 0.7-5.2 1.3-7.9 1.8l5-5c-0.8-0.2-0.8-0.2-5-1v-8h-2.7-3.6c-1.2 0.1-2.4 0.1-3.6 0.1-3.1-0.1-3.1-0.1-6.1-1.1v-3c-1.3-0.4-2.6-0.7-4-1 2-1 2-1 4-0.5z" fill="#FBA02C"/>
  <path transform="translate(254,86)" d="m0 0c5.1 2.4 8.3 6.1 11 11 2.3 6.6 2.2 15.4-0.7 21.6-0.8 0.8-1.5 1.6-2.3 2.4-0.4 0.4-0.4 0.4-2.2 2.4-5.2 2.9-10.1 1.1-15.6-0.5-4.3-2.6-6.4-5.1-8.2-9.9-1.5-7.6-1.9-15.1 2-22 4.6-5.5 9.2-6.2 16-5zm-12.8 7.9c-2.9 4.5-3 8.8-2.2 14.1 1.7 5.7 4 8.9 9 12 3.5 0.6 6.8 0.6 10-1v-2c1-0.3 2-0.7 3-1 1.2-3.5 1.2-6.3 1.2-9.9v-3.8c-0.2-3.1-0.6-4.7-2.2-7.3h-2c-0.3-1-0.7-2-1-3h-6c-1.5 3.1-0.5 5.7 0 9-0.8-0.3-0.8-0.3-5-2 0-3 0-3 1.5-4.6 0.5-0.4 1-0.9 1.5-1.4v-2c-3.8-0.8-5.4 0-7.8 2.9zm6.8 1.1c-0.3 0.5-0.3 0.5-2 3 1.3 0.3 2.6 0.7 4 1-0.7-1.3-1.3-2.6-2-4z" fill="#37651C"/>
  <path transform="translate(191.56 450.94)" d="m0 0h3.6c3 0 5.9 0 8.8 0.1 0.2 0.3 0.2 0.3 1 2 1 0.3 2 0.6 3 1-0.1-0.5-0.1-0.5-1-3 1.2 0.1 2.4 0.3 3.7 0.5 3.6 0.5 6.7 0.3 10.3-0.5-1 2-1 2-2.8 2.6-0.4 0.1-0.4 0.1-2.2 0.5-0.4 0.1-0.4 0.1-2.2 0.5-0.6 0.1-1.2 0.2-1.8 0.4 0 3.5-0.1 7.1-0.1 10.7v3c0 1-0.1 2-0.1 3v2.7c0.3 2.9 0.9 5 2.2 7.6 2.2 0.8 2.2 0.8 4 1v2h2c-0.3 1.3-0.6 2.6-1 4h3c0.4 0.6 0.7 1.3 1 2 1.7 0.7 3.3 1.4 5 2-3 1-3 1-5.1 0.1-0.7-0.5-1.5-0.9-2.3-1.4-0.8-0.4-1.5-0.9-2.3-1.3-6-3.8-7.7-6.5-9.3-13.4-0.5-3.6-1-7.1-1.4-10.7-0.6-3.3-1.4-6.2-2.6-9.3-1.1 0.1-2.2 0.3-3.3 0.4-1.5 0.2-3 0.4-4.5 0.6-0.7 0.1-1.4 0.2-2.2 0.3-4.1 0.5-8.1 0.7-12.2 0.6-6.4 0-12.6 0.7-19 1.6-1.1 0.1-2.2 0.2-3.4 0.4-2.8 0.3-5.6 0.7-8.4 1.1 0.4-0.7 0.7-1.4 1-2 3-0.5 3-0.5 6.6-0.7 1.2 0 2.4-0.1 3.6-0.2 0.5 0 0.5 0 2.8-0.1v-2h4c-0.3-1.7-0.6-3.3-1-5 7.6-1.1 15-1.2 22.6-1.1z" fill="#F8A95F"/>
  <path transform="translate(304,283)" d="m0 0c3.6-0.2 3.6-0.2 7 0 2.3 3.7 2.3 6.8 2.3 11.1v2.1 4.2 6.6 4.2 3.8c-0.3 3-0.3 3-2.3 5-4.1-0.3-6.5-0.7-10-3-1.3-3.3-1.1-6.8-1.1-10.3v-3.6-3.9c0-1.2 0-2.5 0.1-3.8v-9.4h2c0.7-1 1.3-2 2-3z" fill="#FD9163"/>
  <path transform="translate(155.14 65.945)" d="m0 0c6.3 2.9 6.3 2.9 8.1 6.7 0.3 0.8 0.5 1.6 0.8 2.4h2c2.5 3.7 2.2 5.8 2.2 10.3v3.9c-0.2 3.6-0.9 6.4-2.2 9.8h-2c-0.2 0.8-0.4 1.6-0.7 2.4-1.3 2.6-1.3 2.6-4.2 3.5-1 0.1-2.1 0.2-3.3 0.4-1.1 0.1-2.2 0.2-3.3 0.4-0.8 0.1-1.7 0.2-2.5 0.3 0.4-0.5 0.9-0.9 1.3-1.4 1.3-1.3 2.5-2.5 3.7-3.8 2-1.8 2-1.8 4-1.8 0.3-1 0.6-1.9 0.9-2.9 1.1-3.1 1.1-3.1 2.1-5.1 0.5-5.7 0.7-10.5-1.8-15.6-0.8-0.8-1.5-1.6-2.2-2.4-0.6-0.6-1.1-1.2-1.6-1.9-3.6-3-8.2-2.3-12.6-2.2h-2.3c-1.8 0-3.7 0-5.5 0.1v2c-0.7 0.1-1.3 0.2-2 0.3-0.7 0.2-1.3 0.4-2 0.7-0.4 0.9-0.7 1.9-1 3h-2c-3.1 7.5-4.7 14.6-1.7 22.5 1.2 1.8 2.4 3.6 3.7 5.5-3 0-3 0-5-1v-2c-0.7-0.1-1.3-0.3-1.9-0.4-2.1-0.6-2.1-0.6-4.1-3.6-0.2-3.2-0.2-3.2-0.2-6.7 0-0.6 0-0.6 0.1-3.6 0-0.9 0-1.8 0.1-2.7h2c0.2-0.7 0.5-1.4 0.8-2.2 2.9-7 5.4-10.8 11.9-15 6-2.3 14.3-1.7 20.4 0.1z" fill="#C2B69D"/>
  <path transform="translate(44,273)" d="m0 0c0.3 0.2 0.3 0.2 1.6 1 3.7 1.5 7.4 1.6 11.3 0.5 2.6-0.6 4.7-0.4 7.3-0.1 0.9 0.1 1.8 0.2 2.8 0.3 0.6 0.1 1.3 0.2 2 0.3-0.1 4.6-0.2 9.1-0.4 13.7 0 1.6-0.1 3.1-0.1 4.7-0.1 2.2-0.1 4.5-0.2 6.7v2.1c-0.2 4.3-0.6 8.5-1.3 12.8h-1c-0.2-4.3-0.2-4.3-1-26h-2c-0.7-3-1.3-5.9-2-9-1.4 0.5-2.7 1-4.1 1.5-7.9 2.3-17 3.2-24.7-0.3-3.2-2.2-3.2-2.2-4.2-6.2h16v-2z" fill="#FAA949"/>
  <path transform="translate(156,161)" d="m0 0c4.6 0.3 8 0.9 12.1 3 5.5 2.6 10.6 2.4 16.7 2.2 2-0.1 4-0.1 6-0.2 0.9 0 1.8 0 2.7-0.1 2.6 0.1 4.9 0.5 7.5 1.1v2c0.6 0.1 1.3 0.3 1.9 0.4 0.8 0.2 1.6 0.4 2.5 0.5l2.4 0.6c2.2 0.5 2.2 0.5 4.2 1.5v2c1.3 0.3 2.6 0.7 4 1-15.6 5.2-35.9-0.2-50.5-6.7-3.5-1.8-6.4-3.8-9.5-6.3v-1z" fill="#723232"/>
  <path transform="translate(15,353)" d="m0 0c3.5 1.5 6.9 3.3 10.3 5.1 10.3 5.4 22.8 10.9 34.7 10.9v-12h1c0.9 5 0.9 9 0 14-5.6 0.8-10.3 0.9-16 0-4-0.1-8-0.1-12 0 0.2-0.5 0.2-0.5 1-3-2-0.3-4-0.7-6-1v-4c-2.3-1-4.6-2-7-3 0.3 1 0.7 2 1 3-3.4 0-6.6-0.5-10-1v-7c-1.1 0.6-2.3 1.2-3.4 1.8-0.7 0.3-1.3 0.7-2 1-1.6 1.2-1.6 1.2-2.6 4.2 0.7 0.3 1.3 0.7 2 1l-2 2c-0.2 1.9-0.2 1.9-0.1 4.1 0 0.7 0 0.7 0.1 3.9h-2c-1.8-4.5-2.4-8.2-2-13 3.2-6.8 7.8-8.3 15-7z" fill="#FAD38B"/>
  <path transform="translate(62,483)" d="m0 0h3c3.1 0.1 5.2 0.3 7.5 2.4 1.2 1.5 2.4 3 3.5 4.6-0.9-0.3-1.7-0.7-2.6-1-3.4-1-5.9-1.4-9.4-1-0.3 0.5-0.3 0.5-2 3h-2v10c-1.1-0.1-2.2-0.3-3.4-0.4-4.8-0.6-9.7-1.1-14.6-1.6-0.5-6.1 0.8-9 4-14 2.3 0.3 4.6 0.7 7 1v-2c3-1.5 5.7-1.1 9-1z" fill="#CC914B"/>
  <path transform="translate(300,326)" d="m0 0c3.5 5.2 3.3 11.9 4 18 0.1 0.5 0.1 0.5 0.3 3.1 2.5 26.4-1 51.3-7.3 76.9-0.7-0.3-1.3-0.7-2-1-0.4-3.2-0.4-3.2-0.6-7.1-0.1-0.6-0.1-0.6-0.3-3.9 0-1 0-2-0.1-3 1.3 0.7 2.6 1.3 4 2-0.3-2.6-0.7-5.3-1-8h3v-77z" fill="#FBD880"/>
  <path transform="translate(182,255)" d="m0 0c-1.1 1.9-1.1 1.9-3 4-0.9 0.2-1.9 0.5-2.9 0.7-4.2 1.8-4.8 4-6.7 8-1.5 2.4-2.8 3.7-5 5.4-3.6 2.8-4.8 5.6-6.4 9.9l-3 5.1c-1.5 2.8-2.7 5.6-3.9 8.4-0.8 1.8-1.6 3.5-2.4 5.2-2.5 5.2-4.3 9.6-4.6 15.3-0.1 2.2-0.3 4-1.1 6-0.5 0.2-0.5 0.2-3 1 0.5-2.3 0.9-4.6 1.5-6.9 0.8-3.4 0.9-6.9 1.1-10.3 0-0.8 0-1.5 0.1-2.3 0.1-1.8 0.2-3.7 0.3-5.5h2l0.3-2.1c0.8-3.5 2.2-6.6 3.7-9.9 0.3-0.7 0.6-1.4 1-2.2 0.3-0.7 0.7-1.4 1-2.2 0.3-0.6 0.6-1.3 0.9-2 1.1-1.6 1.1-1.6 4.1-2.6 0.3-1 0.7-2 1-3h3c1.9-3.6 3.4-7.3 5-11h2c0.2-0.8 0.4-1.5 0.7-2.3 1.7-3.5 3.3-4.1 6.8-5.6 1-0.4 2-0.8 3-1.3 2.5-0.8 2.5-0.8 4.5 0.2z" fill="#FEE493"/>
  <path transform="translate(143,403)" d="m0 0h2v3h2c0.3 1.6 0.7 3.3 1 5h5v3h3c0.3 2.3 0.7 4.6 1 7 1 0.3 2 0.7 3 1v-3h4c0.3 1.3 0.7 2.6 1 4 0.6 0.1 1.3 0.2 1.9 0.3 0.7 0.2 1.4 0.5 2.1 0.7 0.3 1 0.7 2 1 3h5v2c0.6 0.1 1.2 0.3 1.9 0.4 0.4 0.1 0.4 0.1 2.4 0.5l2.4 0.6c2.3 0.5 2.3 0.5 5.3 1.5 0.2 0.3 0.2 0.3 1 2 4.9 0.2 4.9 0.2 30 1v1c-10.7 2.1-22.2 1.3-33 0v-1c-1.7-0.3-3.3-0.7-5-1v-2c-1 0.1-2 0.1-3 0.2-4.5 0-7.9-1.5-12-3.2v-2h-9v-4h-4v-4h-4c-0.3-2.6-0.7-5.3-1-8-1 0.3-2 0.7-3 1-1-1-1-1-1.1-2.8 0-2.1 0.1-4.1 0.1-6.2z" fill="#FEDE79"/>
  <path transform="translate(281,391)" d="m0 0h3v4h-2l-0.3 2.1c-0.8 3.3-2.1 5.9-3.7 8.9h-2v2c-1.4 1.6-1.4 1.6-3 3h-2c-0.2 0.5-0.2 0.5-1 3h-2c-0.3 1.3-0.7 2.6-1 4-1.3 0.3-2.6 0.7-4 1v2h-3v2c-3.9 2.9-7.4 4.6-12 6-1.3 0.6-2.6 1.3-3.9 1.9-8 3.7-17.4 5.4-26.1 5.1 0.3-0.2 0.3-0.2 2-1 0.3-1 0.7-2 1-3 0.3 0 0.3 0 2.1-0.1 5.8-0.4 11-1.3 16.6-3.2 2.3-0.7 2.3-0.7 5-1 0.7-0.3 1.5-0.5 2.3-0.7 1.1-1.9 1.1-1.9 2-4 1.8-1.3 1.8-1.3 3.9-2.2 0.7-0.4 1.4-0.7 2.1-1.1 2-0.7 2-0.7 5-0.7v-3c1.6-1 3.3-2 5-3 0.3-0.7 0.7-1.3 1-2h4c0.3-0.9 0.6-1.9 0.9-2.9 1.1-3.1 1.1-3.1 2.1-5.1h3v-8c1 0.3 2 0.7 3 1 0.7-1.6 1.3-3.3 2-5z" fill="#FEDE79"/>
  <path transform="translate(308,249)" d="m0 0 1.5 1.2c3.3 2.4 6.5 4.9 10 7 0.8 0.6 1.6 1.2 2.5 1.8v2h2v2c0.6 0.2 1.2 0.5 1.8 0.8 2.5 1.4 4.3 3 6.2 5.2v2c1 0.3 2 0.7 3 1 1.4 1.7 1.4 1.7 2.7 3.9 0.4 0.7 0.9 1.4 1.3 2.1 1 2 1 2 1 5h2c2.4 8.1 2.7 15.7 1 24h-1c-0.3-5.3-0.7-10.6-1-16h-2v-7c-1.6-0.3-3.3-0.7-5-1-0.3-2-0.7-4-1-6h-2v-2h-3v-2h-2v-2h-2c0.1-0.9 0.2-1.9 0.3-2.8-0.1-1.1-0.2-2.1-0.3-3.2-2.4-1.7-2.4-1.7-5-3-0.3-1-0.7-2-1-3h-2v4c-1-0.3-2-0.7-3-1v-3h-5c0.2-0.9 0.4-1.8 0.6-2.8 0.4-3 0.2-4.4-0.6-7.2z" fill="#FCDE92"/>
  <path transform="translate(149,3)" d="m0 0c-2 3-2 3-4.1 3.7-0.4 0.1-0.4 0.1-2.4 0.5-0.8 0.1-1.6 0.3-2.4 0.5-2.1 0.3-2.1 0.3-4.1 0.3-0.3 1-0.7 2-1 3h-2c-2.9 0.6-2.9 0.6-6 2-0.6 1-1.2 2-1.8 3.1-2.2 2.9-2.2 2.9-4.3 3.4-1.6 0.1-3.2 0.2-4.8 0.2-2.1 0.3-2.1 0.3-4.5 2.1-1.6 2.2-1.6 2.2-2.7 4.4-0.9 1.8-0.9 1.8-3.9 2.8-1.6 1.8-3.2 3.7-4.7 5.6l-2.4 3c-0.7 0.8-1.3 1.6-1.9 2.4 0.7 1 1.3 2 2 3-1.2 0.2-1.2 0.2-7 1 0.8-1.4 1.6-2.9 2.4-4.3 0.4-0.8 0.9-1.6 1.3-2.4 1-1.8 2.2-3.6 3.3-5.3h2v-3h2v-2h2c0.7-1.3 1.3-2.6 2-4h2v-2c1.9-1.5 3.8-2.9 5.8-4.3l1.8-1.2c9.3-6.2 22-13.1 33.4-12.5z" fill="#FBEDA0"/>
  <path transform="translate(196,243)" d="m0 0h9c-2.9 2.9-4.3 3.6-8 5-0.8 0.5-1.6 1-2.4 1.6-2.6 1.4-2.6 1.4-5.8 1.8-4.2 0.7-6.9 2-10.6 4.2-5.9 3.4-5.9 3.4-9.2 3.4-0.2 0.8-0.5 1.6-0.8 2.4-1.2 2.6-1.2 2.6-3.3 3.4-0.6 0.1-1.3 0.1-1.9 0.2 0.2-0.5 0.2-0.5 1-3 0.7-0.3 1.3-0.7 2-1 0.1-0.6 0.3-1.3 0.4-1.9 0.6-2.1 0.6-2.1 3.6-4.1h4v-2c3.3-2.2 6.2-3 10-4 1-0.3 2-0.7 3-1 0.3-0.7 0.7-1.3 1-2 2.6-0.6 5.3-0.7 8-1v-2z" fill="#FEDB6C"/>
  <path transform="translate(276,227)" d="m0 0c3.2 0.6 5.3 1.7 8 3.7 0.4 0.2 0.4 0.2 2.2 1.6l2.4 1.8c0.8 0.5 1.6 1.1 2.5 1.7 5.7 4.3 11.4 8.6 16.9 13.2-3.1 0-4.7-0.5-7.6-1.8-0.7-0.3-1.5-0.6-2.3-0.9-2.5-1.5-2.9-2.8-4.1-5.3l-6-3c-0.3-1-0.7-2-1-3h-11v-8z" fill="#FCDE92"/>
  <path transform="translate(146,461)" d="m0 0h6v2c-0.6 0.2-1.3 0.5-1.9 0.7-5.2 2-9.9 4.2-14.5 7.3-1.6 1-1.6 1-3.6 1-1.7 5.3-2.5 10.4-3 16h-1v-19c0.3 0.7 0.7 1.3 1 2h2c-0.3-1.3-0.7-2.6-1-4 0.3 0 0.3 0 1.9-0.1 0.9-0.1 1.7-0.2 2.5-0.3 0.9 0 1.7-0.1 2.5-0.2 0.4-0.1 0.4-0.1 2.1-0.4 0.3-0.7 0.7-1.3 1-2 1-1 1-1 3.6-1.1 0.4 0 0.4 0 2.4 0.1v-2z" fill="#F8A95F"/>
  <path transform="translate(91,44)" d="m0 0c1 3.3 1.1 6.3 1.1 9.8 0 0.9-0.1 1.9-0.1 2.9v2.3h-8c0.4-5.7 2.9-10.9 7-15z" fill="#FBEDA0"/>
  <path transform="translate(139,79)" d="m0 0 2 1z" fill="#EDEFEC"/>
 </g>
</svg>`,
		};

		/**
		 * A rounded 3D dragon standing with its arms crossed over its belly,
		 * drawn from the supplied reference: cream belly, stubby horns, small
		 * green-ringed eyes. Eyes and mouth come from the shared face parts, so
		 * every mood still reads on this body.
		 * @param {string} mood - one of NAILONG_PACK (or "idle-blink").
		 * @returns {string} the raw SVG markup.
		 */
		function naiwaSvg(mood) {
			const { eyeMarkup, mouthMarkup, extraMarkup } = faceParts(mood);
			return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">` +
				`<ellipse cx="100" cy="118" rx="54" ry="56" fill="${DRAGON_BODY}" stroke="${DRAGON_LINE}" stroke-width="4"/>` +
				`<ellipse cx="100" cy="132" rx="33" ry="34" fill="${DRAGON_CREAM}"/>` +
				`<path d="M56 78 q-8 -20 6 -24 q5 12 -1 21 z" fill="${DRAGON_CREAM}" stroke="${DRAGON_LINE}" stroke-width="3"/>` +
				`<path d="M144 78 q8 -20 -6 -24 q-5 12 1 21 z" fill="${DRAGON_CREAM}" stroke="${DRAGON_LINE}" stroke-width="3"/>` +
				`<ellipse cx="100" cy="76" rx="45" ry="41" fill="${DRAGON_BODY}" stroke="${DRAGON_LINE}" stroke-width="4"/>` +
				`<circle cx="62" cy="90" r="8" fill="${DRAGON_BLUSH}" opacity="0.7"/>` +
				`<circle cx="138" cy="90" r="8" fill="${DRAGON_BLUSH}" opacity="0.7"/>` +
				eyeMarkup + mouthMarkup + extraMarkup +
				`<path d="M62 116 q16 14 38 14 q22 0 38 -14" stroke="${DRAGON_LINE}" stroke-width="4" fill="none" stroke-linecap="round"/>` +
				`<ellipse cx="74" cy="170" rx="17" ry="10" fill="${DRAGON_BODY}" stroke="${DRAGON_LINE}" stroke-width="3"/>` +
				`<ellipse cx="126" cy="170" rx="17" ry="10" fill="${DRAGON_BODY}" stroke="${DRAGON_LINE}" stroke-width="3"/>` +
				`</svg>`;
		}

		/**
		 * A waving dragon with a wide open grin, drawn from the supplied
		 * reference: one arm raised in a wave, a cream belly, brown claws.
		 * @param {string} mood - one of NAILONG_PACK (or "idle-blink").
		 * @returns {string} the raw SVG markup.
		 */
		function nailongSvg(mood) {
			const { eyeMarkup, mouthMarkup, extraMarkup } = faceParts(mood);
			return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">` +
				`<ellipse cx="100" cy="120" rx="52" ry="54" fill="${DRAGON_BODY}" stroke="${DRAGON_LINE}" stroke-width="4"/>` +
				`<ellipse cx="100" cy="136" rx="32" ry="33" fill="${DRAGON_CREAM}"/>` +
				`<path d="M48 168 q-16 -6 -14 -22 q16 4 20 18 z" fill="${DRAGON_BODY}" stroke="${DRAGON_LINE}" stroke-width="3"/>` +
				`<ellipse cx="100" cy="74" rx="44" ry="40" fill="${DRAGON_BODY}" stroke="${DRAGON_LINE}" stroke-width="4"/>` +
				`<circle cx="64" cy="88" r="8" fill="${DRAGON_BLUSH}" opacity="0.7"/>` +
				`<circle cx="136" cy="88" r="8" fill="${DRAGON_BLUSH}" opacity="0.7"/>` +
				eyeMarkup + mouthMarkup + extraMarkup +
				`<ellipse cx="160" cy="96" rx="13" ry="17" fill="${DRAGON_BODY}" stroke="${DRAGON_LINE}" stroke-width="3" transform="rotate(28 160 96)"/>` +
				`<circle cx="157" cy="82" r="4" fill="${DRAGON_INK}"/>` +
				`<ellipse cx="46" cy="128" rx="12" ry="15" fill="${DRAGON_BODY}" stroke="${DRAGON_LINE}" stroke-width="3" transform="rotate(-18 46 128)"/>` +
				`<ellipse cx="74" cy="170" rx="17" ry="10" fill="${DRAGON_BODY}" stroke="${DRAGON_LINE}" stroke-width="3"/>` +
				`<ellipse cx="126" cy="170" rx="17" ry="10" fill="${DRAGON_BODY}" stroke="${DRAGON_LINE}" stroke-width="3"/>` +
				`</svg>`;
		}

		/** Pixel-art yellow used by the sprite's eye whites and irises. */
		const PIXEL_GREEN = "#6fbf1f";
		/** Pixel-art outline color. */
		const PIXEL_LINE = "#8a6410";

		/**
		 * A blocky pixel-art dragon, drawn from the supplied reference: chunky
		 * square cells, a white belly block, and green-and-white square eyes.
		 * The eyes and mouth are drawn as pixels rather than taken from the
		 * shared face parts, so the sprite keeps its grid at every mood.
		 * @param {string} mood - one of NAILONG_PACK (or "idle-blink").
		 * @returns {string} the raw SVG markup.
		 */
		function pixelSvg(mood) {
			const blink = mood === "idle-blink";
			const m = blink ? null : NAILONG_MOODS[mood];
			const eyes = blink ? "blink" : m ? m.eyes : "round";
			const mouth = m ? m.mouth : "smile";
			let eyeMarkup;
			if (eyes === "sleep" || eyes === "blink") {
				eyeMarkup =
					`<rect x="60" y="72" width="18" height="6" fill="${DRAGON_INK}"/>` +
					`<rect x="106" y="72" width="18" height="6" fill="${DRAGON_INK}"/>`;
			} else if (eyes === "happy") {
				eyeMarkup =
					`<rect x="58" y="70" width="20" height="6" fill="${DRAGON_INK}"/>` +
					`<rect x="62" y="64" width="12" height="6" fill="${DRAGON_INK}"/>` +
					`<rect x="106" y="70" width="20" height="6" fill="${DRAGON_INK}"/>` +
					`<rect x="110" y="64" width="12" height="6" fill="${DRAGON_INK}"/>`;
			} else {
				eyeMarkup =
					`<rect x="58" y="62" width="22" height="22" fill="#ffffff"/>` +
					`<rect x="104" y="62" width="22" height="22" fill="#ffffff"/>` +
					`<rect x="64" y="68" width="12" height="12" fill="${PIXEL_GREEN}"/>` +
					`<rect x="110" y="68" width="12" height="12" fill="${PIXEL_GREEN}"/>` +
					`<rect x="68" y="68" width="6" height="6" fill="${DRAGON_INK}"/>` +
					`<rect x="114" y="68" width="6" height="6" fill="${DRAGON_INK}"/>`;
			}
			let mouthMarkup;
			if (mouth === "bigSmile") {
				mouthMarkup =
					`<rect x="76" y="94" width="32" height="12" fill="${DRAGON_MOUTH}"/>` +
					`<rect x="84" y="102" width="16" height="5" fill="#ff9d9d"/>`;
			} else if (mouth === "flat") {
				mouthMarkup = `<rect x="80" y="96" width="24" height="6" fill="${DRAGON_INK}"/>`;
			} else if (mouth === "o") {
				mouthMarkup = `<rect x="86" y="92" width="14" height="14" fill="${DRAGON_MOUTH}"/>`;
			} else if (mouth === "wavy") {
				mouthMarkup =
					`<rect x="78" y="96" width="8" height="6" fill="${DRAGON_INK}"/>` +
					`<rect x="86" y="102" width="8" height="6" fill="${DRAGON_INK}"/>` +
					`<rect x="94" y="96" width="8" height="6" fill="${DRAGON_INK}"/>`;
			} else {
				mouthMarkup =
					`<rect x="78" y="94" width="10" height="6" fill="${DRAGON_INK}"/>` +
					`<rect x="88" y="100" width="10" height="6" fill="${DRAGON_INK}"/>` +
					`<rect x="98" y="94" width="10" height="6" fill="${DRAGON_INK}"/>`;
			}
			return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" shape-rendering="crispEdges">` +
				`<rect x="40" y="56" width="120" height="120" fill="${DRAGON_BODY}"/>` +
				`<rect x="52" y="66" width="96" height="100" fill="${DRAGON_BODY}"/>` +
				`<rect x="60" y="98" width="80" height="68" fill="#fff8dc"/>` +
				`<rect x="40" y="40" width="120" height="18" fill="${DRAGON_BODY}"/>` +
				`<rect x="46" y="30" width="16" height="16" fill="${DRAGON_BODY}"/>` +
				`<rect x="138" y="30" width="16" height="16" fill="${DRAGON_BODY}"/>` +
				`<rect x="52" y="176" width="24" height="14" fill="${PIXEL_LINE}"/>` +
				`<rect x="124" y="176" width="24" height="14" fill="${PIXEL_LINE}"/>` +
				eyeMarkup + mouthMarkup +
				`<rect x="146" y="52" width="10" height="10" fill="#ffd84d"/>` +
				`</svg>`;
		}

		/**
		 * The face art for one style at one mood.
		 * @param {string} style - one of PET_STYLES.
		 * @param {string} mood - one of NAILONG_PACK (or "idle-blink").
		 * @returns {string} the raw SVG markup.
		 */
		function petSvg(style, mood) {
			if (style === "naiwa") return naiwaSvg(mood);
			if (style === "pixel") return pixelSvg(mood);
			if (style === "nailong") return nailongSvg(mood);
			return dragonSvg(mood);
		}

		/** Encode an SVG string as a data: URL for an <img> src. */
		function svgDataUrl(svg) {
			return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
		}

		/** Read one pet config value from localStorage with a fallback. */
		function readPetStorage(key, fallback) {
			try {
				const raw = window.localStorage.getItem(key);
				return raw === null ? fallback : raw;
			} catch {
				return fallback;
			}
		}

		/** Write one pet config value (null removes it). */
		function writePetStorage(key, value) {
			try {
				if (value === null) window.localStorage.removeItem(key);
				else window.localStorage.setItem(key, value);
				return true;
			} catch {
				return false;
			}
		}

		/** Pet config snapshot read from localStorage (always valid values). */
		function readPetConfig() {
			const size = Number(readPetStorage(PET_STORAGE.size, String(PET_DEFAULT_SIZE)));
			const style = readPetStorage(PET_STORAGE.style, "nailong");
			const art = readPetStorage(PET_STORAGE.art, "photo");
			return {
				enabled: readPetStorage(PET_STORAGE.enabled, "1") === "1",
				size: Number.isFinite(size) ? Math.min(PET_MAX_SIZE, Math.max(PET_MIN_SIZE, size)) : PET_DEFAULT_SIZE,
				style: PET_STYLES.includes(style) ? style : "dragon",
				// The original dragon has no photo, so a photo request falls back to its SVG.
				art: art === "photo" && PET_PHOTOS[style] !== undefined ? "photo" : "svg"
			};
		}

		/** Tell the mounted pet to re-read its config (enabled/size/position). */
		function dispatchPetConfig() {
			try {
				window.dispatchEvent(new CustomEvent(PET_CFG_EVENT));
			} catch {
				/* noop */
			}
		}

		/**
		 * Mount the pet once the DOM is ready (idempotent): a fixed, draggable
		 * dragon with a sticker panel, driven by the agent's running state.
		 * @param {object} ctx - client cordis context.
		 * @returns {() => void} teardown.
		 */
		function mountNailongPet(ctx) {
			if (document.body) return mountNailongPetNow(ctx);
			let disposed = false;
			let disposeNow = null;
			const onReady = () => {
				if (disposed) return;
				disposeNow = mountNailongPetNow(ctx);
			};
			document.addEventListener("DOMContentLoaded", onReady);
			return () => {
				disposed = true;
				document.removeEventListener("DOMContentLoaded", onReady);
				if (disposeNow) disposeNow();
			};
		}

		/** The actual mount; see mountNailongPet. */
		function mountNailongPetNow(ctx) {
			if (!document.body) return () => {};
			const styleEl = document.createElement("style");
			styleEl.textContent =
				"@keyframes dshPetBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}" +
				"@keyframes dshPetWiggle{0%,100%{transform:rotate(-4deg)}50%{transform:rotate(4deg)}}";
			document.head.appendChild(styleEl);

			let cfg = readPetConfig();
			let current = "idle";
			let override = null;
			let overrideTimer = null;
			let thinkTimer = null;
			let idleSince = Date.now();
			let prevRunning = null;
			let blinkTimer = null;
			let pos = null;
			try {
				const raw = readPetStorage(PET_STORAGE.pos, null);
				if (raw) pos = JSON.parse(raw);
			} catch {
				pos = null;
			}

			// ---- DOM ----
			const root = document.createElement("div");
			root.id = "dsh-skin-pet";
			root.setAttribute("aria-label", "奶龙桌宠");
			root.style.cssText =
				"position:fixed;z-index:2147483000;user-select:none;-webkit-user-select:none;touch-action:none;" +
				"cursor:grab;line-height:0;filter:drop-shadow(0 6px 14px rgba(0,0,0,0.28));";
			const img = document.createElement("img");
			img.alt = "";
			img.draggable = false;
			img.style.cssText = "width:100%;height:100%;pointer-events:none;animation:dshPetBob 2.6s ease-in-out infinite;";
			root.appendChild(img);

			const panel = document.createElement("div");
			panel.id = "dsh-skin-pet-panel";
			panel.style.cssText =
				"position:absolute;bottom:calc(100% + 10px);right:0;display:none;flex-direction:column;gap:8px;" +
				"padding:10px;border-radius:14px;border:1px solid var(--dsw-alias-border-l2);" +
				"background:var(--dsw-alias-bg-overlay);box-shadow:0 10px 30px rgba(0,0,0,0.25);z-index:1;";
			const panelTitle = document.createElement("div");
			panelTitle.textContent = "表情包";
			panelTitle.style.cssText = "color:var(--dsw-alias-label-secondary);font-size:12px;line-height:16px;";
			panel.appendChild(panelTitle);
			const panelGrid = document.createElement("div");
			panelGrid.style.cssText = "display:grid;grid-template-columns:repeat(4,56px);gap:6px;";
			panel.appendChild(panelGrid);
			const paintThumbs = () => {
				panelGrid.textContent = "";
				NAILONG_PACK.forEach((mood) => {
					const btn = document.createElement("button");
					btn.type = "button";
					btn.title = mood;
					btn.style.cssText =
						"width:56px;height:56px;padding:4px;border-radius:10px;border:1px solid transparent;" +
						"background:var(--dsw-alias-bg-layer-2);cursor:pointer;";
					const thumb = document.createElement("img");
					thumb.alt = "";
					thumb.draggable = false;
					thumb.src = svgDataUrl(petSvg(cfg.style, mood));
					thumb.style.cssText = "width:100%;height:100%;pointer-events:none;";
					btn.appendChild(thumb);
					btn.addEventListener("click", () => {
						override = mood;
						current = mood;
						renderFace();
						clearTimeout(overrideTimer);
						overrideTimer = setTimeout(() => {
							override = null;
							renderFace();
						}, PET_STICKER_HOLD);
						panel.style.display = "none";
					});
					panelGrid.appendChild(btn);
				});
			};
			paintThumbs();
			root.appendChild(panel);

			const btnBar = document.createElement("div");
			btnBar.style.cssText =
				"position:absolute;top:-10px;right:-6px;display:flex;gap:4px;opacity:0;transition:opacity .15s;";
			const packBtn = document.createElement("button");
			packBtn.type = "button";
			packBtn.textContent = "🎨";
			const closeBtn = document.createElement("button");
			closeBtn.type = "button";
			closeBtn.textContent = "✕";
			for (const b of [packBtn, closeBtn]) {
				b.style.cssText =
					"width:24px;height:24px;border-radius:50%;border:1px solid var(--dsw-alias-border-l2);" +
					"background:var(--dsw-alias-bg-overlay);color:var(--dsw-alias-label-primary);" +
					"font-size:12px;line-height:1;cursor:pointer;padding:0;display:flex;align-items:center;justify-content:center;";
			}
			packBtn.addEventListener("click", (e) => {
				e.stopPropagation();
				panel.style.display = panel.style.display === "flex" ? "none" : "flex";
			});
			closeBtn.addEventListener("click", (e) => {
				e.stopPropagation();
				override = null;
				clearTimeout(overrideTimer);
				renderFace();
				root.remove();
				writePetStorage(PET_STORAGE.enabled, "0");
				dispatchPetConfig();
			});
			// The pack only applies to vector art: a photo is one flat image with no
			// per-mood faces, so offering moods there would show vector thumbnails
			// whose clicks changed nothing.
			const syncPackVisibility = () => {
				packBtn.style.display = cfg.art === "photo" ? "none" : "";
			};
			syncPackVisibility();
			btnBar.appendChild(packBtn);
			btnBar.appendChild(closeBtn);
			root.appendChild(btnBar);
			root.addEventListener("mouseenter", () => { btnBar.style.opacity = "1"; });
			root.addEventListener("mouseleave", () => { btnBar.style.opacity = "0"; panel.style.display = "none"; });

			// ---- face rendering ----
			const renderFace = () => {
				const mood = override || current;
				const photo = cfg.art === "photo" ? PET_PHOTOS[cfg.style] : undefined;
				const src = photo === undefined ? svgDataUrl(petSvg(cfg.style, mood)) : svgDataUrl(photo);
				if (img.src !== src) img.src = src;
				img.style.animation = mood === "done" || mood === "happy"
					? "dshPetWiggle 0.7s ease-in-out infinite"
					: "dshPetBob 2.6s ease-in-out infinite";
			};

			// ---- drag ----
			let dragging = false;
			let startX = 0, startY = 0, baseLeft = 0, baseTop = 0;
			const applyPos = () => {
				if (pos) {
					root.style.left = pos.x + "px";
					root.style.top = pos.y + "px";
					root.style.right = "auto";
					root.style.bottom = "auto";
				} else {
					root.style.left = "auto";
					root.style.top = "auto";
					root.style.right = "24px";
					root.style.bottom = "24px";
				}
			};
			applyPos();
			root.addEventListener("pointerdown", (e) => {
				if (e.target !== img && e.target !== root) return;
				dragging = true;
				startX = e.clientX; startY = e.clientY;
				baseLeft = pos ? pos.x : window.innerWidth - cfg.size - 24;
				baseTop = pos ? pos.y : window.innerHeight - cfg.size - 24;
				root.style.cursor = "grabbing";
				root.setPointerCapture(e.pointerId);
				e.preventDefault();
			});
			root.addEventListener("pointermove", (e) => {
				if (!dragging) return;
				const x = Math.min(window.innerWidth - 40, Math.max(0, baseLeft + (e.clientX - startX)));
				const y = Math.min(window.innerHeight - 40, Math.max(0, baseTop + (e.clientY - startY)));
				pos = { x, y };
				applyPos();
			});
			const endDrag = (e) => {
				if (!dragging) return;
				dragging = false;
				root.style.cursor = "grab";
				writePetStorage(PET_STORAGE.pos, JSON.stringify(pos));
			};
			root.addEventListener("pointerup", endDrag);
			root.addEventListener("pointercancel", endDrag);

			// Click the pet itself: cycle to a random sticker briefly.
			root.addEventListener("click", () => {
				if (dragging) return;
				const pool = NAILONG_PACK.filter((mood) => mood !== "sleeping" && mood !== current);
				if (pool.length === 0) return;
				const mood = pool[Math.floor(Math.random() * pool.length)];
				override = mood;
				renderFace();
				clearTimeout(overrideTimer);
				overrideTimer = setTimeout(() => { override = null; renderFace(); }, PET_STICKER_HOLD);
			});

			// ---- blink while idle ----
			const scheduleBlink = () => {
				clearTimeout(blinkTimer);
				blinkTimer = setTimeout(() => {
					if (!override && current === "idle" && cfg.art !== "photo") {
						const src = svgDataUrl(petSvg(cfg.style, "idle-blink"));
						img.src = src;
						setTimeout(() => { if (!override && current === "idle") renderFace(); }, 160);
					}
					scheduleBlink();
				}, 2600 + Math.random() * 2600);
			};
			scheduleBlink();

			// ---- status watch (agent running state) ----
			const setMood = (mood) => {
				if (current === mood) return;
				current = mood;
				if (override === null) renderFace();
			};
			const poll = setInterval(() => {
				let running = false;
				try {
					const sessions = ctx.get("sessions");
					if (sessions && typeof sessions.list === "function") {
						const list = sessions.list();
						running = Array.isArray(list) && list.some((s) => !!s.running);
					}
				} catch { /* noop */ }
				const now = Date.now();
				if (prevRunning === null) {
					prevRunning = running;
					idleSince = now;
					return;
				}
				if (running && !prevRunning) {
					override = null;
					clearTimeout(overrideTimer);
					clearTimeout(thinkTimer);
					setMood("thinking");
					idleSince = now;
					thinkTimer = setTimeout(() => {
						if (current === "thinking" && override === null) setMood("working");
					}, 1800);
				} else if (!running && prevRunning) {
					override = null;
					clearTimeout(overrideTimer);
					clearTimeout(thinkTimer);
					setMood("done");
					idleSince = now;
					setTimeout(() => { if (current === "done" && override === null) setMood("idle"); }, 2500);
				} else if (running && current !== "working" && current !== "thinking" && override === null) {
					override = null;
					clearTimeout(overrideTimer);
					setMood("working");
					idleSince = now;
				} else if (!running && current !== "sleeping" && override === null && now - idleSince > PET_SLEEP_AFTER) {
					setMood("sleeping");
				}
				prevRunning = running;
			}, PET_POLL_MS);

			// ---- config events (settings row) ----
			let appliedSize = cfg.size;
			const onConfig = () => {
				const next = readPetConfig();
				const artChanged = next.style !== cfg.style || next.art !== cfg.art;
				cfg = next;
				if (!next.enabled) {
					root.remove();
					return;
				}
				if (artChanged) {
					paintThumbs();
					syncPackVisibility();
					renderFace();
				}
				if (!document.body.contains(root)) document.body.appendChild(root);
				root.style.width = next.size + "px";
				root.style.height = next.size + "px";
				if (next.size !== appliedSize && pos) {
					appliedSize = next.size;
					pos = null;
					applyPos();
					writePetStorage(PET_STORAGE.pos, null);
				}
			};
			window.addEventListener(PET_CFG_EVENT, onConfig);

			// ---- apply initial ----
			root.style.width = cfg.size + "px";
			root.style.height = cfg.size + "px";
			renderFace();
			if (cfg.enabled) document.body.appendChild(root);

			const teardown = () => {
				clearInterval(poll);
				clearTimeout(thinkTimer);
				clearTimeout(overrideTimer);
				clearTimeout(blinkTimer);
				window.removeEventListener(PET_CFG_EVENT, onConfig);
				root.remove();
				styleEl.remove();
			};
			ctx.effect(() => teardown, "dsh-skin: nai long pet cleanup");
			return teardown;
		}

		/** Pet settings row store (enabled + size). */
		function createPetStore() {
			return (0, _runtime_client.defineStore)({
				init: () => ({ enabled: true, size: PET_DEFAULT_SIZE, style: "dragon", art: "svg", revision: -1 }),
				actions: {
					sync: (d, enabled, size, style, art, revision) => {
						if (revision <= d.revision) return;
						d.enabled = enabled;
						d.size = size;
						d.style = style;
						d.art = art;
						d.revision = revision;
					}
				}
			});
		}

		/**
		 * Settings → General row for the pet: enable switch, size slider and a
		 * reset-position button. Writes localStorage and notifies the pet.
		 */
		function NailongPetRow({ t, setEnabled, setSize, setStyle, setArt, resetPosition, useStore }) {
			const enabled = useStore((s) => s.enabled);
			const size = useStore((s) => s.size);
			const style = useStore((s) => s.style);
			const art = useStore((s) => s.art);
			return (0, react_jsx_runtime.jsxs)("div", {
				style: styles.group,
				children: [
					(0, react_jsx_runtime.jsx)("div", {
						style: styles.title,
						children: t("pet.title")
					}),
					(0, react_jsx_runtime.jsxs)("div", {
						style: styles.actionRow,
						children: [
							(0, react_jsx_runtime.jsx)("label", {
								style: { display: "flex", alignItems: "center", gap: "8px", color: "var(--dsw-alias-label-primary)", fontSize: "13px", cursor: "pointer" },
								children: [
									(0, react_jsx_runtime.jsx)("input", {
										type: "checkbox",
										checked: enabled,
										onChange: (e) => setEnabled(e.target.checked),
										style: { accentColor: "var(--dsw-alias-brand-primary)" }
									}),
									t("pet.enable")
								]
							}),
							(0, react_jsx_runtime.jsx)("button", {
								type: "button",
								style: styles.button,
								onClick: resetPosition,
								children: t("pet.resetPos")
							})
						]
					}),
					(0, react_jsx_runtime.jsx)(Slider, {
						label: t("pet.size"),
						value: size,
						min: PET_MIN_SIZE,
						max: PET_MAX_SIZE,
						step: 4,
						format: (v) => `${v}px`,
						onChange: setSize
					}),
					(0, react_jsx_runtime.jsxs)("div", {
						style: styles.actionRow,
						children: [
							(0, react_jsx_runtime.jsx)("label", {
								style: { display: "flex", alignItems: "center", gap: "8px", color: "var(--dsw-alias-label-primary)", fontSize: "13px" },
								children: [
									t("pet.style"),
									(0, react_jsx_runtime.jsxs)("select", {
										value: style,
										onChange: (e) => setStyle(e.target.value),
										style: { background: "var(--dsw-alias-bg-layer-2)", color: "var(--dsw-alias-label-primary)", border: "1px solid var(--dsw-alias-border-l2)", borderRadius: "6px", padding: "4px 6px", fontSize: "13px" },
										children: PET_STYLES.map((id) => (0, react_jsx_runtime.jsx)("option", {
											key: id,
											value: id,
											children: t("pet.style." + id)
										}))
									})
								]
							}),
							(0, react_jsx_runtime.jsx)("label", {
								style: { display: "flex", alignItems: "center", gap: "8px", color: "var(--dsw-alias-label-primary)", fontSize: "13px" },
								children: [
									t("pet.art"),
									(0, react_jsx_runtime.jsxs)("select", {
										value: art,
										onChange: (e) => setArt(e.target.value),
										disabled: PET_PHOTOS[style] === undefined,
										style: { background: "var(--dsw-alias-bg-layer-2)", color: "var(--dsw-alias-label-primary)", border: "1px solid var(--dsw-alias-border-l2)", borderRadius: "6px", padding: "4px 6px", fontSize: "13px" },
										children: ["svg", "photo"].map((id) => (0, react_jsx_runtime.jsx)("option", {
											key: id,
											value: id,
											children: t("pet.art." + id)
										}))
									})
								]
							})
						]
					}),
					(0, react_jsx_runtime.jsx)("div", {
						style: styles.hint,
						children: t("pet.hint")
					})
				]
			});
		}
		//#endregion

		//#region dsh-skin: client plugin body
		/**
		 * Required services: theme runtime (skins, switching, token override
		 * layers), slots/locale (the settings rows). Persistence is
		 * localStorage, so no settings transport is needed.
		 */
		const inject = [
			"slots",
			"locale",
			"theme",
			"sessions"
		];

		/**
		 * Client plugin body: register the curated skins into the theme runtime,
		 * restore the saved skin and wallpaper, keep the rows' stores in sync
		 * with theme/change, and register both rows into Settings → General.
		 * @param ctx - client cordis context.
		 */
		function apply(ctx) {
			const disposers = SKINS.map((skinDefinition) => {
				try {
					return ctx.theme.register(skinDefinition);
				} catch (error) {
					console.warn(`[dsh-skin] skip theme "${skinDefinition.id}":`, error);
					return () => {};
				}
			});
			ctx.effect(() => () => {
				for (const dispose of disposers) dispose();
			}, "dsh-skin: theme registration");

			// Restore the saved skin once. Host settings may adopt system/light/dark
			// after we register; re-assert on the next tick only (not on every theme/change).
			const reassertSavedSkin = () => {
				const saved = readSavedSkin();
				if (saved === null || saved === DEFAULT_SKIN || !SKINS.some((skinDefinition) => skinDefinition.id === saved)) return;
				const current = ctx.theme.getTheme().preference;
				if (current !== saved) ctx.theme.setTheme(saved);
			};
			reassertSavedSkin();
			const reassertTimers = [setTimeout(reassertSavedSkin, 0), setTimeout(reassertSavedSkin, 80)];
			ctx.effect(() => () => {
				for (const timer of reassertTimers) clearTimeout(timer);
			}, "dsh-skin: reassert cleanup");

			// Wallpaper bookkeeping.
			let wallpaperRevision = 0;
			const wallpaperStore = createWallpaperStore();
			let wallpaperBound;
			const syncWallpaper = () => {
				wallpaperRevision += 1;
				wallpaperBound?.sync(readWallpaper(), readWallpaperOpacity(), readWallpaperBlur(), readWallpaperFit(), wallpaperError, wallpaperRevision);
			};
			document.addEventListener("visibilitychange", onWallpaperVisibility);
			applyWallpaper(ctx);
			syncWallpaper();
			ctx.effect(() => () => {
				teardownWallpaper();
			}, "dsh-skin: wallpaper cleanup");

			const skinStore = createSkinStore();
			let skinBound;
			let lastShadedKey = null;
			const syncSkin = (snapshot) => {
				skinBound?.sync(snapshot.preference, snapshot.revision);
				// A skin/scheme switch changes the base color; re-shade the wash.
				const key = `${snapshot.active?.id ?? ""}:${snapshot.active?.colorScheme ?? ""}`;
				if (readWallpaper() !== null && key !== lastShadedKey) {
					lastShadedKey = key;
					applyWallpaper(ctx);
				}
			};
			ctx.on("theme/change", syncSkin);

			ctx.effect(() => ctx.locale.register(SETTINGS_NS, {
				zh,
				en
			}), "dsh-skin: settings row dictionaries");

			const skinInjected = (actions) => {
				skinBound = actions;
				syncSkin(ctx.theme.getTheme());
				return {
					setSkin: (id) => {
						ctx.theme.setTheme(id);
						writeSavedSkin(id);
					}
				};
			};
			ctx.slots.inject("settings.general.item", () => ctx.slots.register({
				name: "settings.general.item",
				id: "skin",
				order: 20,
				store: skinStore,
				locale: SETTINGS_NS,
				inject: skinInjected
			}, SkinRow));

			const wallpaperInjected = (actions) => {
				wallpaperBound = actions;
				syncWallpaper();
				return {
					setWallpaper: (url) => {
						if (url === null) {
							writeStorage(WALLPAPER_KEY, null);
							wallpaperError = null;
							syncWallpaper();
							scheduleWallpaperApply(ctx);
							return;
						}
						const sanitized = sanitizeWallpaperUrl(url);
						if (sanitized === null) {
							wallpaperError = /^blob:/i.test(String(url).trim()) ? "blob" : "invalid";
							syncWallpaper();
							return;
						}
						if (dataUrlTooLarge(sanitized)) {
							wallpaperError = "tooLarge";
							syncWallpaper();
							return;
						}
						if (!writeStorage(WALLPAPER_KEY, sanitized)) {
							wallpaperError = "save";
							syncWallpaper();
							return;
						}
						wallpaperError = null;
						syncWallpaper();
						scheduleWallpaperApply(ctx);
					},
					setOpacity: (percent) => {
						const value = Math.min(1, Math.max(0, percent / 100));
						if (!writeStorage(WALLPAPER_OPACITY_KEY, String(value))) {
							wallpaperError = "save";
							syncWallpaper();
							return;
						}
						syncWallpaper();
						scheduleWallpaperApply(ctx);
					},
					setBlur: (px) => {
						const value = Math.min(60, Math.max(0, px));
						if (!writeStorage(WALLPAPER_BLUR_KEY, String(value))) {
							wallpaperError = "save";
							syncWallpaper();
							return;
						}
						syncWallpaper();
						scheduleWallpaperApply(ctx);
					},
					setFit: (fit) => {
						const value = WALLPAPER_FITS.includes(fit) ? fit : DEFAULT_WALLPAPER_FIT;
						if (!writeStorage(WALLPAPER_FIT_KEY, value)) {
							wallpaperError = "save";
							syncWallpaper();
							return;
						}
						syncWallpaper();
						scheduleWallpaperApply(ctx);
					},
					setError: (code) => {
						wallpaperError = code;
						syncWallpaper();
					}
				};
			};
			ctx.slots.inject("settings.general.item", () => ctx.slots.register({
				name: "settings.general.item",
				id: "skin-wallpaper",
				order: 30,
				store: wallpaperStore,
				locale: SETTINGS_NS,
				inject: wallpaperInjected
			}, WallpaperRow));

			// ---- 奶龙桌宠 (desktop pet + sticker pack) ----
			mountNailongPet(ctx);
			const petStore = createPetStore();
			let petBound;
			let petRevision = 0;
			const syncPet = () => {
				petRevision += 1;
				const config = readPetConfig();
				petBound?.sync(config.enabled, config.size, config.style, config.art, petRevision);
			};
			syncPet();
			const petInjected = (actions) => {
				petBound = actions;
				syncPet();
				return {
					setEnabled: (enabled) => {
						writePetStorage(PET_STORAGE.enabled, enabled ? "1" : "0");
						dispatchPetConfig();
						syncPet();
					},
					setSize: (px) => {
						const value = Math.min(PET_MAX_SIZE, Math.max(PET_MIN_SIZE, Math.round(px)));
						if (!writePetStorage(PET_STORAGE.size, String(value))) return;
						dispatchPetConfig();
						syncPet();
					},
					setStyle: (value) => {
						if (!PET_STYLES.includes(value)) return;
						writePetStorage(PET_STORAGE.style, value);
						// The original dragon has no photo, so switching to it drops a photo choice.
						if (PET_PHOTOS[value] === undefined) writePetStorage(PET_STORAGE.art, "svg");
						dispatchPetConfig();
						syncPet();
					},
					setArt: (value) => {
						if (value !== "svg" && value !== "photo") return;
						writePetStorage(PET_STORAGE.art, value);
						dispatchPetConfig();
						syncPet();
					},
					resetPosition: () => {
						writePetStorage(PET_STORAGE.pos, null);
						dispatchPetConfig();
					}
				};
			};
			ctx.slots.inject("settings.general.item", () => ctx.slots.register({
				name: "settings.general.item",
				id: "skin-nailong-pet",
				order: 40,
				store: petStore,
				locale: SETTINGS_NS,
				inject: petInjected
			}, NailongPetRow));
		}
		//#endregion

		exports.SETTINGS_NS = SETTINGS_NS;
		exports.SKINS = SKINS;
		exports.DEFAULT_SKIN = DEFAULT_SKIN;
		exports.NAILONG_MOODS = NAILONG_MOODS;
		exports.NAILONG_PACK = NAILONG_PACK;
		exports.dragonSvg = dragonSvg;
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});
