import { useEffect, useState } from 'react'
import { useEditor } from '../contexts/index';



const Resizer = () => {
  
  const { handleResizeWindow } = useEditor();  

  useEffect(() => {
      const resizerTop = document.getElementById('resizer-top');
      const resizerLeft = document.getElementById('resizer-left');
      const resizerTopLeft = document.getElementById('resizer-top_left');
      const resizerRight = document.getElementById('resizer-right');
      const resizerBottom = document.getElementById('resizer-bottom');
      const resizerBottomRight = document.getElementById('resizer-bottom_right');

      function onMouseMoveTop(e: MouseEvent) {    
        const { movementX, movementY } = e;
        handleResizeWindow("top", {deltaX: movementX, deltaY: movementY});    
      }

      function onMouseMoveLeft(e: MouseEvent) {    
        const { movementX, movementY } = e;
        handleResizeWindow("left", {deltaX: movementX, deltaY: movementY});    
      }

      function onMouseMoveTopLeft(e: MouseEvent) {    
        const { movementX, movementY } = e;
        handleResizeWindow("top-left", {deltaX: movementX, deltaY: movementY});    
      }

      function onMouseMoveRight(e: MouseEvent) {    
        const { movementX, movementY } = e;
        handleResizeWindow("right", {deltaX: movementX, deltaY: movementY});    
      }

      function onMouseMoveBottom(e: MouseEvent) {    
        const { movementX, movementY } = e;
        handleResizeWindow("bottom", {deltaX: movementX, deltaY: movementY});    
      }

      function onMouseMoveBottomRight(e: MouseEvent) {    
        const { movementX, movementY } = e;
        handleResizeWindow("bottom-right", {deltaX: movementX, deltaY: movementY});    
      }

      function onMouseUp() {
        // Reset do cursor e da flag     

        window.removeEventListener('mousemove', onMouseMoveTop);
        window.removeEventListener('mousemove', onMouseMoveLeft);
        window.removeEventListener('mousemove', onMouseMoveTopLeft);
        window.removeEventListener('mousemove', onMouseMoveRight);
        window.removeEventListener('mousemove', onMouseMoveBottom);
        window.removeEventListener('mousemove', onMouseMoveBottomRight);
        window.removeEventListener('mouseup', onMouseUp);
      }

      resizerTop?.addEventListener('mousedown', (e) => {
        e.preventDefault();
        
        console.log('Resizer clique: ', e.currentTarget)
        window.addEventListener('mousemove', onMouseMoveTop);
        window.addEventListener('mouseup', onMouseUp);
      });

      resizerLeft?.addEventListener('mousedown', (e) => {
        e.preventDefault();
        
        console.log('Resizer clique: ', e.currentTarget)
        window.addEventListener('mousemove', onMouseMoveLeft);
        window.addEventListener('mouseup', onMouseUp);
      });

      resizerTopLeft?.addEventListener('mousedown', (e) => {
        e.preventDefault();
        
        console.log('Resizer clique: ', e.currentTarget)
        window.addEventListener('mousemove', onMouseMoveTopLeft);
        window.addEventListener('mouseup', onMouseUp);
      });//

      resizerRight?.addEventListener('mousedown', (e) => {
        e.preventDefault();
        
        console.log('Resizer clique: ', e.currentTarget)
        window.addEventListener('mousemove', onMouseMoveRight);
        window.addEventListener('mouseup', onMouseUp);
      });

      resizerBottom?.addEventListener('mousedown', (e) => {
        e.preventDefault();
        
        console.log('Resizer clique: ', e.currentTarget)
        window.addEventListener('mousemove', onMouseMoveBottom);
        window.addEventListener('mouseup', onMouseUp);
      });

      resizerBottomRight?.addEventListener('mousedown', (e) => {
        e.preventDefault();
        
        console.log('Resizer clique: ', e.currentTarget)
        window.addEventListener('mousemove', onMouseMoveBottomRight);
        window.addEventListener('mouseup', onMouseUp);
      });        
  }, []);

  return (
    <>
      <div 
        className="resizer"   
        id="resizer-top"          
        data-direction="top"
      ></div>
      <div 
        className="resizer"  
        id="resizer-left"      
        data-direction="left"
      ></div>
      <div 
        className="resizer"
        id="resizer-top_left"        
        data-direction="top-left"
      ></div>
      <div 
        className="resizer"   
        id="resizer-right"          
        data-direction="right"
      ></div>
      <div 
        className="resizer"  
        id="resizer-bottom"      
        data-direction="bottom"
      ></div>
      <div 
        className="resizer"
        id="resizer-bottom_right"        
        data-direction="bottom-right"
      ></div>
    </>
  )
}

export default Resizer
