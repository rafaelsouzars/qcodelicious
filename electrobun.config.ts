import { ElectrobunConfig } from "electrobun";

export default {
	app: {
		name: "qcodelicious",
		identifier: "qcodelicious.rafaelsouzars",
		version: "1.0.0",
	},
	build: {
		bun: {			
			entrypoint: "src/bun/index.ts",
			minify: true,			
		},
		// Vite builds to dist/, we copy from there
		copy: {
			"dist/index.html": "views/mainview/index.html",
			"dist/assets": "views/mainview/assets",			
		},
		// Ignore Vite output in watch mode — HMR handles view rebuilds separately
		watchIgnore: ["dist/**"],
		mac: {
			icons: "src/icon.iconset",
			bundleCEF: false,
		},
		linux: {
			icon: "src/icon.iconset/icon_256x256.png",
			bundleCEF: true,
		},
		win: {
			icon: "src/icon.iconset/icon_256x256.png",
			bundleCEF: false,
		},
	},
} satisfies ElectrobunConfig;
