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

        };
        messages: {
            fileSavedNotification: { path: string };
        };
    }>;       
};