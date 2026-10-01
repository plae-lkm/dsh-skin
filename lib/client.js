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
			"pet.hint": "小恐龙会跟着对话状态变表情（思考 / 干活 / 完成 / 睡觉），点它或打开 🎨 表情包手动换表情",
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
			"pet.hint": "The dragon reacts to the conversation state (thinking / working / done / sleeping). Click it or open the 🎨 sticker pack to pick a mood.",
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
		const PET_PHOTOS = {
			naiwa: "data:image/jpeg;base64,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",
			pixel: "data:image/jpeg;base64,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",
			nailong: "data:image/jpeg;base64,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"
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
			const style = readPetStorage(PET_STORAGE.style, "dragon");
			const art = readPetStorage(PET_STORAGE.art, "svg");
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
			btnBar.appendChild(packBtn);
			btnBar.appendChild(closeBtn);
			root.appendChild(btnBar);
			root.addEventListener("mouseenter", () => { btnBar.style.opacity = "1"; });
			root.addEventListener("mouseleave", () => { btnBar.style.opacity = "0"; panel.style.display = "none"; });

			// ---- face rendering ----
			const renderFace = () => {
				const mood = override || current;
				const photo = cfg.art === "photo" ? PET_PHOTOS[cfg.style] : undefined;
				const src = photo ?? svgDataUrl(petSvg(cfg.style, mood));
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
									(0, react_jsx_runtime.jsx)("select", {
										value: style,
										onChange: (e) => setStyle(e.target.value),
										style: { background: "var(--dsw-alias-bg-layer-2)", color: "var(--dsw-alias-label-primary)", border: "1px solid var(--dsw-alias-border-l2)", borderRadius: "6px", padding: "4px 6px", fontSize: "13px" }
									}, PET_STYLES.map((id) => (0, react_jsx_runtime.jsx)("option", {
										key: id,
										value: id,
										children: t("pet.style." + id)
									})))
								]
							}),
							(0, react_jsx_runtime.jsx)("label", {
								style: { display: "flex", alignItems: "center", gap: "8px", color: "var(--dsw-alias-label-primary)", fontSize: "13px" },
								children: [
									t("pet.art"),
									(0, react_jsx_runtime.jsx)("select", {
										value: art,
										onChange: (e) => setArt(e.target.value),
										disabled: PET_PHOTOS[style] === undefined,
										style: { background: "var(--dsw-alias-bg-layer-2)", color: "var(--dsw-alias-label-primary)", border: "1px solid var(--dsw-alias-border-l2)", borderRadius: "6px", padding: "4px 6px", fontSize: "13px" }
									}, ["svg", "photo"].map((id) => (0, react_jsx_runtime.jsx)("option", {
										key: id,
										value: id,
										children: t("pet.art." + id)
									})))
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
