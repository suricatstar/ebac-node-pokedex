const express = require('express');
const buscaInfoPokemon = require('../services/busca-pokemon');

const router = express.Router();

router.get("/", (_req, res) => {

    const pokemonIdRandomico = Math.round(Math.random() * 904 + 1);

    buscaInfoPokemon(pokemonIdRandomico).then(pokemon => {

        res.render('paginas/batalha/index', {
            pokemon,
        });
    })

});

module.exports = router;