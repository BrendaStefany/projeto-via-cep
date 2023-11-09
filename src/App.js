import React, { useState } from 'react';
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
    const cep = e.target.value.replace(/\D/g, '');
    if (!e.target.value) return;
    console.log(cep);
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setFormData({
          ...formData,
          rua: data.logradouro,
          bairro: data.bairro,
          cidade: data.localidade,
          uf: data.uf,
        });
      }).catch((err) => console.log(err));
  }

  return (
    <form >
      <label>
        CEP:
        <input
          type="text"
          value={formData.cep}
          onChange={e => setFormData({ ...formData, cep: e.target.value })}
          onBlur={checkCEP}
        />
      </label>
      <label>
        Rua:
        <input type="text" value={formData.rua} />
      </label>
      <label>
        Bairro:
        <input type="text" value={formData.bairro} />
      </label>
      <label>
        Cidade:
        <input type="text" value={formData.cidade} />
      </label>
      <label>
        Estado:
        <input type="text" value={formData.uf} />
      </label>
    </form>
  );
}

export default App;
