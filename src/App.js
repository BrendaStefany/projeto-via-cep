import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    cep: '',
    rua: '',
    bairro: '',
    cidade: '',
    uf: '',
  });

  const checkCEP = (e) => {
    formData.cep= e.target.value.replace(/\D/g, '');
  }

  useEffect(() => {
    console.log(formData.cep);
    if (!formData.cep) return;
    
    fetch(`https://viacep.com.br/ws/${formData.cep.replace(/\D/g, '')}/json/`)
    .then(res => res.json())
    .then(data =>  {setFormData(
      {
        ...formData,
          rua: data.logradouro,
          bairro: data.bairro,
          cidade: data.localidade,
          uf: data.uf,
      }
    )})
    .catch((err) => console.log(err));
  }, [formData.cep]);
  

  return (
    <form className="formulario">
      <h1 class="titulo_cep">Busca CEP</h1>
      <div className='alinhar'>
        <label class="subtitulo">
          CEP:
          <input
            type="text"
            value={formData.cep}
            onChange={e => setFormData({ ...formData, cep: e.target.value })}
            onBlur={checkCEP}
          />
        </label>
        <label class="subtitulo">
          Rua:
          <input type="text" value={formData.rua} />
        </label>
        <label class="subtitulo">
          Bairro:
          <input type="text" value={formData.bairro} />
        </label >
        <label class="subtitulo">
          Cidade:
          <input type="text" value={formData.cidade} />
        </label>
        <label class="subtitulo">
          Estado:
          <input type="text" value={formData.uf} />
        </label>
      </div>
    </form>
  );
}

export default App;