//import React from 'react'
import Swal, { SweetAlertResult } from 'sweetalert2'
import AppIcon from '../../icon.iconset/icon_256x256.png';

export interface WindowAboutConfig {
    title?: string,
    text?: string,
    imageUrl?: string,    
    imageWidth?: number,
    imageHeight?: number,
    imageAlt?: string,    
}

export const WindowAbout = (config: WindowAboutConfig): Promise<SweetAlertResult> => {
    
    const {
        title = 'About',
        text = '',
        imageUrl,
        imageWidth = 16,
        imageHeight = 16,
        imageAlt = 'App Icon'        
    } = config;


    return Swal.fire({
        title,
        text,        
        imageUrl: imageUrl ?? AppIcon,
        imageWidth,
        imageHeight,
        imageAlt, 
        theme: "dark",
        customClass: {
          title: 'swal-title',
          footer: 'swal-title',
        },
        footer: `<a class='swal-link' href="https://github.com/rafaelsouzars/qcodelicious" target="_blank" rel="noopener noreferrer">Github</a>`, 
        draggable: true    
    });
}