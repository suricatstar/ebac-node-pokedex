require("dotenv").config();

const axios = require('axios');

const buscaInfoPokemon = async (PokeId) => {
    try {
        const url = `${process.env.BASE_URL}/${PokeId}`;
        const resultado = await axios.get(url);
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
        });

        return {
            id,
            nome,
            peso,
            altura,
            imagem,
            ataques,
            estatisticas,
            jogos,
        };
    } catch (e) {
        throw e;
    }
};

module.exports = buscaInfoPokemon;