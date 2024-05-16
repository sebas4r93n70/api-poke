import { getPokemon } from "./request.js";

// VARIABLES
const formFind = document.getElementById("form_find");
const inputFind = document.getElementById("input_find");
const btnFind = document.getElementById("btn_find");
export const containerCards = document.querySelector(".container_cards");
// CONSOLE

// FUNCIONES
const typeColorPoke = (typePoke) => {
  const colors = {
    electric: "#e0e12a",
    normal: "#a8a878",
    fire: "#f08030",
    water: "#6890f0",
    grass: "#78c850",
    ice: "#98d8d8",
    fighting: "#c03028",
    poison: "#a040a0",
    ground: "#e0c068",
    flying: "#a890f0",
    psychic: "#f85888",
    bug: "#a8b820",
    rock: "#b8a038",
    ghost: "#705898",
    dragon: "#705898",
    dark: "#040608",
    steel: "#b8b8d0",
    fairy: "#f0b6bc",
  };
  return colors[typePoke];
};
const dataCardPoke = (poke) => {
  return {
    titleName: poke.name.toUpperCase(),
    image: poke.sprites.front_default,
    type: poke.types[0].type.name.toUpperCase(),
    weigth: poke.weight / 10,
    height: poke.height / 10,
    hp: poke.stats[0].base_stat,
    attack: poke.stats[1].base_stat,
    defense: poke.stats[2].base_stat,
    superAttack: poke.stats[3].base_stat,
    superDefense: poke.stats[4].base_stat,
    speed: poke.stats[5].base_stat,
  };
};
const templateCardPoke = (poke) => {
  let typeColor = poke.types[0].type.name;
  let {
    titleName,
    image,
    type,
    weigth,
    height,
    hp,
    attack,
    defense,
    superAttack,
    superDefense,
    speed,
  } = dataCardPoke(poke);
  return `<div class="card" style=background-color:${typeColorPoke(typeColor)}>
  <div class="title_name">
    <h3>${titleName}</h3>
  </div>
  <div>
    <img src=${image} alt="">
  </div>
  <div class="card_info">
    <span>TIPO: ${type}</span><span>ALTURA: ${height} mts</span><span>PESO: ${weigth} kg</span>
  </div>
 <div class="card_stats">
   <div class="stats">
   <span>HP: ${hp}</span><span>ATAQUE: ${attack}</span><span>DEFENSA: ${defense}</span>
   </div>
   <div class="stats">
   <span>SUPER ATAQUE: ${superAttack}</span><span>SUPER DEFENSA: ${superDefense}</span><span>VELOCIDAD: ${speed}</span>
   </div>
 </div>
</div>
</div>
  `;
};
const renderCardPoke = (poke) => {
  containerCards.innerHTML = templateCardPoke(poke);
};
const findPokeCard = async (e) => {
  e.preventDefault();
  const idPoke = inputFind.value.trim();
  if (!idPoke) {
    containerCards.innerHTML = "Debe ingresar un número para buscar un Pokemon";
    formFind.reset();
    return;
  }
  if (idPoke <= 0 || idPoke > 1302) {
    containerCards.innerHTML = "Los #ID de los Pokemons   van del 1 al 1302";
    formFind.reset();
    return;
  }
  const dataPoke = await getPokemon(idPoke - 1);
  renderCardPoke(dataPoke);
  formFind.reset();
};
// INIT
const init = () => {
  formFind.addEventListener("submit", findPokeCard);
};
init();
