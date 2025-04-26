const express = require('express');
const buscaInfoPokemon = require('../services/busca-pokemon');

const router = express.Router();

router.get("/", async (_req, res) => {
    try {
        const pokemonIdRandomico = Math.round(Math.random() * 904 + 1);
        const pokemon = await buscaInfoPokemon(pokemonIdRandomico);

        res.render('paginas/batalha/index', {
            pokemon,
        });
    } catch (error) {
        res.status(500).send("Erro ao buscar informações do Pokémon.");
    }
});

module.exports = router;