import { containerCards } from "./main";

// VARIABLES

const BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=1&offset=";
//  FUNCIONES

export const getPokemon = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}${id}`);
    const dataFirstFetch = await res.json();
    const secondFetch = await fetch(dataFirstFetch.results[0].url);
    const dataPoke = await secondFetch.json();
    return dataPoke;
  } catch (error) {
    containerCards.innerHTML = `<div><img src="/img/error_pika.png" alt="server error" /> <h3>Hubo un error, intente en unos minutos...</h3></div>`;
    console.error(`Hubo un error en el servidor: ${error}`);
  }
};
