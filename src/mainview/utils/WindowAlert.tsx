//import React from 'react'
import Swal, { SweetAlertIcon, SweetAlertResult } from 'sweetalert2';

export interface WindowAlertConfig {
    title?: string,
    icon?: SweetAlertIcon, 
    html?: string,
    draggable: true,       
}

export const WindowAlert = (config: WindowAlertConfig): Promise<SweetAlertResult> => {
    
    const {
        title = 'Saved!', 
        icon = 'success',
        html = '',
        draggable = false                        
    } = config;


    return Swal.fire({
        title,
        icon,
        html,        
        theme: "dark",
        customClass: {
          title: 'swal-title',
          footer: 'swal-title',
        },        
        draggable,    
    });
}