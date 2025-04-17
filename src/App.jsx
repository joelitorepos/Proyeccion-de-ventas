import './App.css';
import './estilos/formulario.css';
import React, { useState } from 'react';
import FormularioInput from './componentes/formulario.jsx';

const fecha = new Date();

const diaDelMes = () => {
  return fecha.getDate();
};

const ultimoDiaDelMes = () => {
  return new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0).getDate();
};

const diasRestantes = () => {
  let diasRestantes = 0;
  for (let dia = diaDelMes(); dia <= ultimoDiaDelMes(); dia++) {
    if (new Date(fecha.getFullYear(), fecha.getMonth(), dia).getDay() !== 6) {
      diasRestantes++;
    }
  }
  return diasRestantes;
};

const diasTranscurridos = () => {
  let diasTranscurridos = 0;
  const primerDiaMes = new Date(fecha.getFullYear(), fecha.getMonth(), 1);
  const hoy = new Date();

  for (let dia = primerDiaMes.getDate(); dia <= hoy.getDate(); dia++) {
    if (new Date(fecha.getFullYear(), fecha.getMonth(), dia).getDay() !== 6) {
      diasTranscurridos++;
    }
  }
  return diasTranscurridos;
};

function App() {
  const [metaVentas, setMetaVentas] = useState(0);
  const [articulosVendidos, setArticulosVendidos] = useState(0);

  const handleSubmit1 = (input) => {
    const value = parseFloat(input);
    if (!isNaN(value)) {
      setMetaVentas(value);
    }
    console.log('Meta de ventas:', input);
  };

  const handleSubmit2 = (input) => {
    const value = parseFloat(input);
    if (!isNaN(value)) {
      setArticulosVendidos(value);
    }
    console.log('Artículos vendidos:', input);
  };

  // Calculate daily sales goal: metaVentas / diasRestantes(), rounded up
  const metaDiaria = metaVentas && diasRestantes() > 0 ? Math.ceil(metaVentas / diasRestantes()) : 0;

  // Calculate projection: articulosVendidos / diasTranscurridos()
  const proyeccion = articulosVendidos && diasTranscurridos() > 0 ? articulosVendidos / diasTranscurridos() : 0;

  // Calculate monthly projection percentage: (proyeccion / metaVentas) * 100
  const porcentajeProyeccion = metaVentas && proyeccion ? ((proyeccion / metaVentas) * 100).toFixed(2) : 0;

  return (
    <div className="App">
      <h1 className='App-title'>Proyección de ventas</h1>
      <section className="form-container">
        <h2>Metas de ventas</h2>
        <FormularioInput
          onSubmit={handleSubmit1}
          placeholder="ingrese su meta de ventas mensual"
        />
        <h2>Artículos vendidos</h2>
        <FormularioInput
          onSubmit={handleSubmit2}
          placeholder="ingrese sus artículos vendidos"
        />

        <div>
          Su meta de ventas diaria hoy es de: {metaDiaria}
        </div>
        <div>
          Su proyección es de: {proyeccion.toFixed(2)}
        </div>
        <div>
          Su proyección en porcentaje del mes es: {porcentajeProyeccion}%
        </div>
      </section>
    </div>
  );
}

export default App;