const PokemonContainer = document.getElementById("pokemon_containerID");
const SearchContainer = document.getElementById("search_containerID");
const SearchElement = document.createElement("input");
var j = 1;
SearchElement.setAttribute("type", "text");
SearchElement.setAttribute("name", "searchBar");
SearchContainer.appendChild(SearchElement);
var peticionEnCurso=false;
window.addEventListener('scroll',()=>{
  if(window.scrollY + window.innerHeight >= 
  document.documentElement.scrollHeight){
    if (!peticionEnCurso){
      j += 20;
      peticionEnCurso=true;
      receivePokemons();
    }
  }
});

const createPokemonCard = (pokemon) => {
  const PokemonElement = document.createElement("div");
  const PokemonName = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const PokemonID = pokemon.id;
  const PokemonType1 = pokemon.types[0].type.name;
  PokemonElement.setAttribute("id", PokemonName);
  const PokemonTypeColors = {
    fire: "#EE8130",
    grass: "#7AC74C",
    electric: "#FFFF00",
    water: "#6390F0",
    ground: "#E2BF65",
    rock: "#B6A136",
    fairy: "#D685AD",
    poison: "#A33EA1",
    bug: "#A6B91A",
    dragon: "#6F35FC",
    psychic: "#F95587",
    flying: "#A98FF3",
    fighting: "#C22E28",
    normal: "#A8A77A",
    ice: "#96D9D6",
    ghost: "#735797",
    dark: "#705746",
    steel: "#B7B7CE",
  };
  const AddColors = PokemonTypeColors[PokemonType1];
  PokemonElement.style.backgroundColor = AddColors;
  PokemonInnerHTML = `
    <div class="pokemon_imageContainer" id="${PokemonName}">
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${PokemonID}.png"/>
    </div>
    <div class="pokemon_infomationContainer">
      <span class="pokemon_id">#${PokemonID.toString().padStart(3, "0")}</span>
      <h3 class="pokemon_name">${PokemonName}</h3>
      <small class="pokemon_type">Type: <span>${PokemonType1}</span></small><br>
    </div>`;
  if(pokemon.types[1] != null){
    const PokemonType2 = pokemon.types[1].type.name 
    PokemonInnerHTML = `
    <div class="pokemon_imageContainer" id="${PokemonName}">
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${PokemonID}.png"/>
    </div>
    <div class="pokemon_infomationContainer">
      <span class="pokemon_id">#${PokemonID.toString().padStart(3, "0")}</span>
      <h3 class="pokemon_name">${PokemonName}</h3>
      <small class="pokemon_type">Type: <span>${PokemonType1}/${PokemonType2}</span></small><br>
    </div>`};
  PokemonElement.setAttribute("class", "pokemon_card");
  PokemonElement.innerHTML = PokemonInnerHTML;
  PokemonContainer.appendChild(PokemonElement);
};

const getPokemons = async (id) => {
  const api_url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const response = await fetch(api_url);
  const data = await response.json();
  createPokemonCard(data);
};

const receivePokemons = async () => {
  if(j < 21){
    for (let item = 1; item <= 20; item++) {
      await getPokemons(item);
    }
  }else{
    for (let item = j; item <= j+19; item++) {
      await getPokemons(item);
    }
  }
  createSearchFilter();
  peticionEnCurso = false;
};

receivePokemons();

const createSearchFilter = () => {
  const cards = document.querySelectorAll(".pokemon_card");
  SearchElement.addEventListener("keyup", (event) => {
    const val = event.target.value.toLowerCase();
    cards.forEach((card) => {
      if (card.id.toLowerCase().includes(val)) {
        card.style.display = "block";
      }else {
        card.style.display = "none";
      }
    });
  });
};
