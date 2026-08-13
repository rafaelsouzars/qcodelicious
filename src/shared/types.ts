import { RPCSchema } from "electrobun";

export type AppRPCSchema = {
    bun: RPCSchema<{
         requests: {
            openFile: {
                params: void;
                response: { content: string; filePath: string; fileName: string | undefined; } | null;
            };
            saveFile: {
                params: { 
                    filePath: string | null;                                      
                    content: string; 
                };
                response: { filePath: string; } | null;
            };
            saveAsFile: {
                params: { 
                    fileName: string;                                      
                    content: string; 
                };
                response: { filePath: string; fileName: string; } | null;
            };            
            resizeWindow: {
                params: {
                    direction: "top" | "left" | "top-left" | "right" | "bottom" | "bottom-right";
                    coordinate: { deltaX: number; deltaY: number; };
                };
                response: void;
            };
            maximizeWindow: {
                params: void;
                response: void;
            };
            isMaximizedWindow: {
                params: void;
                response: boolean;
            }
            minimizeWindow: {
                params: void;
                response: void;
            };
            toogleAnchoreWindow: {
                params: void;
                response: boolean;
            };
            closeWindow: {
                params: void;
                response: void;
            };
         };         
         messages: {
            logFromUI: { message: string };
        };     
    }>;
    webview: RPCSchema<{
        requests: {
            getScreenInfo: {
                params: void;
                response: { width: number; height: number; availWidth: number; availHeight: number; devicePixelRatio: number; };
            };
        };
        messages: {
            fileSavedNotification: { path: string };
        };
    }>;       
};