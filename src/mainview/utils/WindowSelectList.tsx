import Swal, { SweetAlertResult, SweetAlertInput } from 'sweetalert2';

// Define um tipo que exclui 'file' do SweetAlertInput
//type NonFileSweetAlertInput = Exclude<SweetAlertInput, 'file'>;

export interface WindowSelectListConfig {
    title?: string,    
    //input?: NonFileSweetAlertInput,
    inputOptions?: object,
    inputPlaceholder?: string,
    showCancelButton?: boolean,
    draggable?: boolean,      
    inputValidator?: (value: string) => string | false | void | null ,        
}

export const WindowSelectList = (config: WindowSelectListConfig): Promise<SweetAlertResult> => {
    const {
        title = 'WindowSelectList', 
        inputOptions,       
        inputPlaceholder = undefined, 
        showCancelButton = true,
        draggable = false,       
        inputValidator,                
    } = config;
  
    return Swal.fire({
        title,
        input: 'select',
        theme: "dark",
        customClass: {
          title: "swal-title",          
        },
        inputOptions,
        inputPlaceholder,
        showCancelButton,
        draggable,
        inputValidator,
    });
}

