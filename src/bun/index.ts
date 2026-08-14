import { BrowserWindow, BrowserView, Updater, Utils, Screen } from "electrobun/bun";
import { type AppRPCSchema } from "../shared/types"
import { isEmpty } from "@mui/material";
import { join } from 'path';

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

// Abre um canal RPC
const appRPC = BrowserView.defineRPC<AppRPCSchema>({
  maxRequestTime: 300000,
  handlers: {
    requests: {
      openFile: async () => {
        // Aciona o diálogo nativo do sistema operacional        
		try {
			const paths = await Utils.openFileDialog({
				startingFolder: Utils.paths.home,
				allowedFileTypes: "*",
				// allowedFileTypes: "png,jpg",
				canChooseFiles: true,
				canChooseDirectory: false,
				allowsMultipleSelection: false,
			});			
			
			if (Array.isArray(paths) && isEmpty(paths[0])) {
				console.log("[Channel RPC] - openFile cancelado.")
				return null;
			}
			else {
				const filePath = paths[0];
				const fileName = filePath.split(/[\\\/]/).pop();	
				// Lê os bytes brutos do arquivo			
				const file = Bun.file(filePath);
				const arrayBuffer = await file.arrayBuffer();

				// Decodifica tolerando caracteres de diferentes encodings sem estourar exceção
				const decoder = new TextDecoder("utf-8", { fatal: false });
				const content = decoder.decode(arrayBuffer);
						 
				return { content, filePath, fileName };
			}			
			
		}
		catch (error) {
			console.error("[Channel RCP] - Erro na chamada de openFile: ", error);
			return null;
		}
      },
      
      saveFile: async ({ filePath, content }) => {
        let targetPath = filePath;
        
        // Se for um arquivo novo, pergunta onde salvar
        if (!targetPath) {
          const selectedPath = await Utils.openFileDialog({            
			startingFolder: Utils.paths.home,
			allowedFileTypes: "*",
			// allowedFileTypes: "png,jpg",
			canChooseFiles: false,
			canChooseDirectory: true,
			allowsMultipleSelection: false,			
          });

		  targetPath = selectedPath ? selectedPath[0] : null;
        }
        
        if (!targetPath) return null;
        
        await Bun.write(targetPath, content);
        return { filePath: targetPath };
      },

	  saveAsFile: async ({ fileName, content }) => {        
        
        // Seleciona a pasta para salvar
        try {
			const selectedPath = await Utils.openFileDialog({            
				startingFolder: Utils.paths.home,
				allowedFileTypes: "*",
				// allowedFileTypes: "png,jpg",
				canChooseFiles: false,
				canChooseDirectory: true,
				allowsMultipleSelection: false,			
			});

			//targetPath = selectedPath ? selectedPath[0] : null;

			if (Array.isArray(selectedPath) && isEmpty(selectedPath[0])) {
				return null;
			}
			else {				
				const filePathSave = join(selectedPath[0],fileName);
				await Bun.write(filePathSave, content);
        		return { filePath: filePathSave, fileName };
			}

		}
		catch (error) {
			console.error("[Channel RCP] - Erro na chamada de saveAsFile: ", error);
			return null;
		}
		
      },	  

	  resizeWindow: async ({ direction, coordinate }) => {
		try {
			const currentFrame = appMainWindow.getFrame();			

			let newX = currentFrame.x;
			let newY = currentFrame.y;
			let newWidth = currentFrame.width;
			let newHeight = currentFrame.height;

			if (direction === "left" || direction === "top-left") {
				if (currentFrame.width > MIN_WIDTH_SIZE) {
					newX = Math.max(0, currentFrame.x + coordinate.deltaX);
					newWidth = Math.max(MIN_WIDTH_SIZE, currentFrame.width - coordinate.deltaX);
				}
				else if ((currentFrame.width = MIN_WIDTH_SIZE) && (coordinate.deltaX < 0)) {					
					newX = Math.max(0, currentFrame.x + coordinate.deltaX);
					newWidth = Math.max(MIN_WIDTH_SIZE, currentFrame.width - coordinate.deltaX);
				} 				
			}

			if (direction === "top" || direction === "top-left") {
				if (currentFrame.height > MIN_HEIGHT_SIZE) {
					newY = Math.max(0, currentFrame.y + coordinate.deltaY);
					newHeight = Math.max(MIN_HEIGHT_SIZE, currentFrame.height - coordinate.deltaY);
				}
				else if ((currentFrame.height = MIN_HEIGHT_SIZE) && (coordinate.deltaY < 0)) {
					newY = Math.max(0, currentFrame.y + coordinate.deltaY);
					newHeight = Math.max(MIN_HEIGHT_SIZE, currentFrame.height - coordinate.deltaY);
				}				
			}

			if (direction === "right" || direction === "bottom-right") {
				newWidth = Math.max(MIN_WIDTH_SIZE, currentFrame.width + coordinate.deltaX);
			}

			if (direction === "bottom" || direction === "bottom-right") {
				newHeight = Math.max(MIN_HEIGHT_SIZE, currentFrame.height + coordinate.deltaY);
			}

			appMainWindow.setFrame(newX, newY, newWidth, newHeight);			
		}
		catch (error) {
			console.error("[Channel RCP] - Erro na chamada de resizeWindow: ", error);
		}
		
	  },

	  maximizeWindow: async () => {
		try {
			// Verifica se a janela ja esta maximizada
			if (appMainWindow.isMaximized()) {
				appMainWindow.unmaximize();
			}
			else {
				const frontScreenInfo = await appMainWindow.webview.rpc?.request.getScreenInfo();
				//const currentFrame = appMainWindow.getFrame();
				appMainWindow.maximize();
				appMainWindow.setFrame( 
					0,
					0,
					Screen.getPrimaryDisplay().bounds.width, 
					frontScreenInfo.availHeight
				);				
			}						
		}
		catch (error) {
			console.error("[Channel RCP] - Erro na chamada de maximizeWindow: ", error);
		}
	  },

	  isMaximizedWindow: async() => {		
		return appMainWindow.isMaximized() ? true : false;
	  },

	  minimizeWindow: async () => {
		try {
			// Verifica se a janela ja esta maximizada
			if (appMainWindow.isMinimized()) {
				appMainWindow.unminimize();
			}
			else {
				appMainWindow.minimize();
			}			
		}
		catch (error) {
			console.error("[Channel RCP] - Erro na chamada de minimizeWindow: ", error);
		}
	  },

	  toogleAnchoreWindow: async () => {

		if (isAnchoredWindow) {				

			appMainWindow.setFrame(
				restoreAnchorFrame.x,
				restoreAnchorFrame.y,
				restoreAnchorFrame.width,
				restoreAnchorFrame.height,
			);			

			appMainWindow.setAlwaysOnTop(false);

			isAnchoredWindow = false;			
			return isAnchoredWindow;
		}
		else {
			restoreAnchorFrame = appMainWindow.getFrame();
			const frontScreenInfo = await appMainWindow.webview.rpc?.request.getScreenInfo();			

			appMainWindow.setFrame(
				Screen.getPrimaryDisplay().bounds.width - 50,
				frontScreenInfo.availHeight - 40,
				50,
				frontScreenInfo.height - frontScreenInfo.availHeight,
			);			

			appMainWindow.setAlwaysOnTop(true);

			isAnchoredWindow = true;			
			return isAnchoredWindow;
		}		
	  },

	  closeWindow: async () => {
		try {
			appMainWindow.close();			
		}
		catch (error) {
			console.error("[Channel RCP] - Erro na chamada de closeWindow: ", error);
		}
	  }
    },
    messages: {
		logFromUI: ({ message }) => {
			console.log('[Front-end log]: ', message);
		}
	}
  }
});

// Criando janela principal da aplicação
const url = await getMainViewUrl();
const MIN_WIDTH_SIZE = 520;
const MIN_HEIGHT_SIZE= 380;
const desktopArea = Screen.getPrimaryDisplay().bounds;
let restoreAnchorFrame = { x: 0, y: 0, width: 800, height: 600};
let isAnchoredWindow = false;

// Windows and MacOSX render
const appMainWindow = new BrowserWindow({
	title: "qCodelicious",
	url,
	frame: {
		x: desktopArea.width - 2,
		y: desktopArea.height - 2,
		width: desktopArea.width,
		height: desktopArea.height,
	},	
	transparent: true,
	titleBarStyle: "hidden",			
	rpc: appRPC,
	renderer: "cef",
});

// Monitora o evento loding do front-end
appMainWindow.webview.on("dom-ready", () => {	

	appMainWindow.webview.autoResize = true;
	
	appMainWindow.setFrame(0, 0, 800, 600);
	
});

console.log("qCodelicious start");


