import { useState } from 'react'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const Ranger = () => {
    // Usa o estado do React para controlar o valor do slider (iniciando em 70)
  const [value, setValue] = useState<number>(70);  

  const handleChange = (event: Event, newValue: number) => {    
    setValue(newValue);

    // Atualiza a variável CSS global com segurança   
    document.documentElement.style.setProperty('--editor-opacity', (value / 100).toString());
  }

  return (    
    <>
    <Box sx={{ width: "120px"}}>
      <Slider 
        sx={{ height: "6px", color: 'grey' }}
        size="small"          
        aria-label="opacity-slider" 
        defaultValue={70} 
        value={value} 
        onChange={handleChange}
        valueLabelDisplay='auto'
      />
    </Box>  
      {/*<input className="electrobun-webkit-app-region-no-drag" type="range" id="opacity-slider" min="0" max="100" value={value} onChange={handleChange}/>
      <span className="electrobun-webkit-app-region-no-drag" id="opacity-value">{value}%</span>*/}
    </>   
  );
}

export default Ranger;
