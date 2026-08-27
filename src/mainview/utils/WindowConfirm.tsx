//import React from 'react'
import Swal, { SweetAlertResult, SweetAlertIcon } from 'sweetalert2';

export interface WindowConfirmConfig {
    title?: string,    
    icon?: SweetAlertIcon,       
    showDenyButton?: boolean,
    showCancelButton?: boolean,
    confirmButtonText?: string,
    denyButtonText?: string,    
    inputValidator?: (value: string) => string | false | void | null ,
    draggable?: boolean,
        
}

export const WindowConfirm = (config: WindowConfirmConfig): Promise<SweetAlertResult> => {
    
    const {
        title = 'WindowConfirm',        
        icon = 'warning',                 
        showDenyButton = true,
        showCancelButton = true,
        confirmButtonText = 'Save',
        denyButtonText = `Don't save`,        
        inputValidator,
        draggable = false,        
    } = config;


    return Swal.fire({        
        title,
        icon,
        theme: "dark",
        customClass: {
          title: "swal-title",          
        },                
        showDenyButton,
        showCancelButton,
        confirmButtonText,
        denyButtonText,       
        inputValidator,         
        draggable,    
    });
}