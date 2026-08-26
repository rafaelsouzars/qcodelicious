//import React from 'react'
import Swal, { SweetAlertResult, SweetAlertInput } from 'sweetalert2';

// Define um tipo que exclui 'file' do SweetAlertInput
type NonFileSweetAlertInput = Exclude<SweetAlertInput, 'file'>;

export interface WindowDialogConfig {
    title?: string,    
    input?: NonFileSweetAlertInput,
    inputLabel?: string,
    inputPlaceholder?: string,
    inputValue?: string,  
    inputValidator?: (value: string) => string | false | void | null ,
    showCancelButton?: boolean,
    draggable?: boolean,
        
}

export const WindowDialog = (config: WindowDialogConfig): Promise<SweetAlertResult> => {
    
    const {
        title = 'WindowDialog',        
        input = 'text',
        inputLabel = undefined,
        inputPlaceholder = undefined,
        inputValue = '',
        inputValidator,        
        showCancelButton = true,
        draggable = false,        
    } = config;


    return Swal.fire({        
        title,
        input,
        theme: "dark",
        customClass: {
          title: "swal-title",          
        },
        inputLabel,
        inputPlaceholder,
        inputValue,
        inputValidator,                
        showCancelButton,         
        draggable,    
    });
}