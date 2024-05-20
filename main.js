import { getPokemon } from "./request.js";

// VARIABLES
const formFind = document.getElementById("form_find");
const inputFind = document.getElementById("input_find");
const btnFind = document.getElementById("btn_find");
export const containerCards = document.querySelector(".container_cards");
// CONSOLE

// FUNCIONES

const dataCardPoke = (poke) => {
  return {
    titleName: poke.name.toUpperCase(),
    image: poke.sprites.front_default,
    type: poke.types.map((item) => item.type.name.toUpperCase()).join(" / "),
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
  return `<div class="card  ${type.toLowerCase().split("/")[0].trim()}"   >
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
    containerCards.innerHTML =
      "Debes ingresar un número para buscar un Pokemon";
    formFind.reset();
    return;
  }
  if (idPoke <= 0 || idPoke > 1302) {
    containerCards.innerHTML = "Los #ID de los Pokemones   van del 1 al 1302";
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
  inputFind.focus();
};
init();
