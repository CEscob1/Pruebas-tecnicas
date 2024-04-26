import './App.css';
import { useState } from 'react';
import logo from './assets/logo.png';

function App() {
  const [pokemonImage, setPokemonImage] = useState('');
  const [pokemonInfo, setPokemonInfo] = useState(null);

  const handleConsultarPokedex = () => {
    const pokemonNumber = document.querySelector('.entradatxt').value;
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`)
      .then(response => response.json())
      .then(data => {
        const pokemonImageUrl = data.sprites.front_default;
        setPokemonImage(pokemonImageUrl);
        setPokemonInfo({
          id: data.id,
          name: data.name,
          type: data.types[0].type.name 
        });
      })
      .catch(error => console.error('Error al consultar la PokeAPI:', error));
  };

  return (
    <div className="App">
      <div className="consola">
        <img src={logo} alt="" className="imagen-pokedex" />
        <div className="contenedor">
          {pokemonImage && <img src={pokemonImage} alt="Imagen del Pokémon" className="pokemon-image" />}
        </div>
        <input type="text" className="entradatxt" placeholder="INGRESA # DE POKEMON" />
        <button onClick={handleConsultarPokedex} className="btn-consulta">CONSULTAR EN POKEDEX</button>
        <div className="tabla-container">
          <div className="fila">
            <div className="celda">ID del Pokémon</div>
            <div className="celda">Nombre</div>
            <div className="celda">Tipo</div>
          </div>
          {pokemonInfo && (
            <div className="fila">
              <div className="celda">{pokemonInfo.id}</div>
              <div className="celda">{pokemonInfo.name}</div>
              <div className="celda">{pokemonInfo.type}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;