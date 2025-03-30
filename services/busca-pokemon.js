const axios = require('axios');

const buscaInfoPokemon = (PokeId) => {
    return new Promise((resolve, reject) => {

        const url = `https://pokeapi.co/api/v2/pokemon/${PokeId}`;
    
        axios.get(url).then(resultado => {
            const data = resultado.data;
    
            const id = data.id;
            const nome = data.name;
            const peso = data.weight;
            const altura = data.height;
            const imagem = data.sprites.other['official-artwork'].front_default;
            const ataques = data.abilities.map(a => a.ability.name).join(", ");
            const jogos = data.game_indices.map(a => a.version.name);
    
            const estatisticas = {};
    
            data.stats.forEach((estatistica) => {
                estatisticas[estatistica.stat.name] = estatistica.base_stat;
            })


            resolve({
                id,
                nome,
                peso,
                altura,
                imagem,
                ataques,
                estatisticas,
                jogos,
            })
    
        }).catch((e) => reject(e));
    });

}

module.exports = buscaInfoPokemon;