import React, { useState } from 'react';
import './App.css';

function App() {
  const [listPokemon, setListPokemon] = useState([]);

  const fetchPokemon = async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100');
    const data = await response.json();
    const pokemonDetails = await Promise.all(
      data.results.map(async (pokemon) => {
        const res = await fetch(pokemon.url);
        const details = await res.json();
        return { name: pokemon.name, image: details.sprites.front_default };
      })
    );
    setListPokemon(pokemonDetails);
  };

  return (
    <div className="App">
      <button className="fetch-button" onClick={fetchPokemon}>Fetch Pokemon</button>
      <ul className="pokemon-list">
        {listPokemon.map((pokemon, index) => (
          <li key={index} className="pokemon-item">
            <img src={pokemon.image} alt={pokemon.name} />
            <p>{pokemon.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
