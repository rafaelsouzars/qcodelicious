import { RPCSchema } from "electrobun";

export type AppRPCSchema = {
    bun: RPCSchema<{
         requests: {
            openFile: {
                params: void;
                response: { content: string; filePath: string } | null;
            };
            saveFile: {
                params: { 
                    filePath: string | null;                                      
                    content: string; 
                };
                response: { filePath: string } | null;
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