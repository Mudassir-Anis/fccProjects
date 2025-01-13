const typeEl = document.getElementById('types');

const inpEl = document.getElementById('search-input');

const pokemonName = document.getElementById('pokemon-name');

const pokemonId = document.getElementById('pokemon-id');

const searchBtn = document.getElementById('search-button');

const weightEl = document.getElementById('weight');

const heightEl = document.getElementById('height');

const imgEl = document.getElementById('sprite')

const inpContainer = document.getElementById('input-container');
const checkPokemon = async (data,str) => {
    const {results} = data;
    let pokemon = results.find(obj => obj.id === Number(str) || obj.name.toLowerCase() === str.toLowerCase());
    if(pokemon){
        let rawPokemonStats = await fetch(pokemon.url);
        let pokemonStats = await rawPokemonStats.json();
        let {stats} = pokemonStats;
        const {height} = pokemonStats;
        const {id} = pokemonStats;
        const {name} = pokemonStats;
        const {weight} = pokemonStats;
        const {sprites} = pokemonStats;
        const {types} = pokemonStats;
        renderStuff(stats,height,id,name,weight,sprites,types);
    } else {
        alert("Pokémon not found");
    }

}


const getData = async () => {
      try{
        let rawData = await fetch("https://pokeapi-proxy.freecodecamp.rocks/api/pokemon");
      let data = await rawData.json();
      checkPokemon(data,inpEl.value);
      
      } catch(err) {
          console.log(err);
      }
}




const renderStuff = (stats,height,id,name,weight,sprites,types) => {

    stats.forEach(obj => {
        document.getElementById(`${obj.stat.name}`).textContent = obj.base_stat;
    })
    pokemonName.textContent = name.toUpperCase();
    pokemonId.textContent = `#${id}`;
    weightEl.innerHTML = `Weight: ${weight}`;
    heightEl.innerHTML = `Height: ${height}`;
    typeEl.innerHTML = "";
    console.log(types);
    types.map(type => {
        typeEl.insertAdjacentHTML("beforeend",`<div class="type">${type.type.name}</div>`);
    })
    imgEl.src = sprites.front_default; 


}


searchBtn.addEventListener('click',getData);
inpContainer.addEventListener('submit', (event) => {
  event.preventDefault();
})