import { Electroview } from 'electrobun/view';
import {type AppRPCSchema } from '../../shared/types';

const rpc = Electroview.defineRPC<AppRPCSchema>({
    maxRequestTime: 10000,
      handlers: {
        requests: {},
        messages: {
            fileSavedNotification: ({ path }) => {
                console.log("Notificação do Backend - Arquivo salvo:", path);
            }
        }
      }
});

export const electrobun = new Electroview({ rpc });