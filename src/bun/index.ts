import { BrowserWindow, Updater } from "electrobun/bun";

const DEV_SERVER_PORT = 5173;
const DEV_SERVER_URL = `http://localhost:${DEV_SERVER_PORT}`;

// Check if Vite dev server is running for HMR
async function getMainViewUrl(): Promise<string> {
	const channel = await Updater.localInfo.channel();
	if (channel === "dev") {
		try {
			await fetch(DEV_SERVER_URL, { method: "HEAD" });
			console.log(`HMR enabled: Using Vite dev server at ${DEV_SERVER_URL}`);
			return DEV_SERVER_URL;
		} catch {
			console.log(
				"Vite dev server not running. Run 'bun run dev:hmr' for HMR support.",
			);
		}
	}
	return "views://mainview/index.html";
}

// Create the main application window
const url = await getMainViewUrl();

const appMainWindow = new BrowserWindow({
	title: "qCodelicious",
	url,	
	frame: {
		width: 800,
		height: 600,
		x: 40,
		y: 40,		
	},			
	transparent: true,
});

appMainWindow.webview.autoResize = true;

appMainWindow.webview.on("dom-ready", () => {
	// GAMBIARRA: Força o alinhamento de dimensões do webview no boot inicial
	const size = appMainWindow.getSize();
	appMainWindow.setSize(size.width - 0.5, size.height - 0.5);	
});

appMainWindow.on("resize", (e: any) => {
	const MIN_WIDTH_SIZE = 380;
	const MIN_HEIGHT_SIZE = 380;
	let currentSize = appMainWindow.getSize();
	let isLimiter = false;	
	
	if (e.data.width < MIN_WIDTH_SIZE) {
		currentSize.width = MIN_WIDTH_SIZE;
		isLimiter = true;
	}
	if (e.data.height < MIN_HEIGHT_SIZE) {
		currentSize.height = MIN_HEIGHT_SIZE;
		isLimiter = true;
	}

	if (isLimiter) {
		appMainWindow.setSize(currentSize.width,currentSize.height);		
	}
	
});


console.log("qCodelicious start");
