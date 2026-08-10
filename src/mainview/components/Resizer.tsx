import { useEffect, useState } from 'react'
import { useEditor } from '../contexts/index';



const Resizer = () => {

  const [ isClick, setIsClick ] = useState<boolean>(false);
  const { handleResizeWindow } = useEditor();  

  useEffect(() => {
      const resizerRight = document.getElementById('resizer-right');
      const resizerBottom = document.getElementById('resizer-bottom');
      const resizerBottomRight = document.getElementById('resizer-bottom_right');

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
        
        setIsClick(false);

        window.removeEventListener('mousemove', onMouseMoveRight);
        window.removeEventListener('mousemove', onMouseMoveBottom);
        window.removeEventListener('mousemove', onMouseMoveBottomRight);
        window.removeEventListener('mouseup', onMouseUp);
      }

        resizerRight?.addEventListener('mousedown', (e) => {
          e.preventDefault();
          setIsClick(true);
          console.log('Resizer clique: ', e.currentTarget)
          window.addEventListener('mousemove', onMouseMoveRight);
          window.addEventListener('mouseup', onMouseUp);
        });

        resizerBottom?.addEventListener('mousedown', (e) => {
          e.preventDefault();
          setIsClick(true);
          console.log('Resizer clique: ', e.currentTarget)
          window.addEventListener('mousemove', onMouseMoveBottom);
          window.addEventListener('mouseup', onMouseUp);
        });

        resizerBottomRight?.addEventListener('mousedown', (e) => {
          e.preventDefault();
          setIsClick(true);
          console.log('Resizer clique: ', e.currentTarget)
          window.addEventListener('mousemove', onMouseMoveBottomRight);
          window.addEventListener('mouseup', onMouseUp);
        });        
  }, []);

  return (
    <>
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
