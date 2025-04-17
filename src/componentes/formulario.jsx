import React, { useState } from 'react';

const FormularioInput = ({ onSubmit, placeholder }) => {
  const [input, setInput] = useState('');

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() !== '') {
      onSubmit(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="App-form">
      <input
        type="text"
        value={input}
        onChange={handleChange}
        className="input"
        placeholder={placeholder}
      />
      <button className='boton'>Enviar</button>
    </form>
  );
};

export default FormularioInput;