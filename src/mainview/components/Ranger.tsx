import React, { useState } from 'react'

const Ranger = () => {
    // 1. Usa o estado do React para controlar o valor do slider (iniciando em 70)
  const [value, setValue] = useState<number>(70);  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const volume = Number(e.target.value);
    setValue(volume);

    // 2. Atualiza a variável CSS global com segurança   
    document.documentElement.style.setProperty('--editor-opacity', (volume / 100).toString());
  };
  return (
    <>
      <input className="electrobun-webkit-app-region-no-drag" type="range" id="opacity-slider" min="0" max="100" value={value} onChange={handleChange}/>
      <span className="electrobun-webkit-app-region-no-drag" id="opacity-value">{value}%</span>
    </>
  )
}

export default Ranger
