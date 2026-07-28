import { BrowserWindow, BrowserView, Updater, Utils } from "electrobun/bun";
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

	  closeWindow: async () => {
		try {
			appMainWindow.close();			
		}
		catch (error) {
			console.error("Fala ao fecha a janela.")
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

const MIN_WIDTH_SIZE = 380;
const MIN_HEIGHT_SIZE = 380;

// Windows and MacOSX render
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
	rpc: appRPC,
	renderer: "cef",
});

// Habilitando o auto resize
appMainWindow.webview.autoResize = true;

// Monitora o evento loding do front-end
appMainWindow.webview.on("dom-ready", () => {
	// GAMBIARRA: Força o alinhamento de dimensões do webview no boot inicial
	const size = appMainWindow.getSize();
	appMainWindow.setSize(size.width - 0.5, size.height - 0.5);	
});

// Monitora o evento de resize da janela do app
appMainWindow.on("resize", (e: any) => {	
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


