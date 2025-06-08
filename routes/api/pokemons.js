const express = require('express');

const { Pokemon } = require('../../models/pokemon');

const router = express.Router();

router.post('/',async (req, res) => {
    try{
        const pokemon = await Pokemon.create(req.body);
        res.status(201).json({
            sucesso: true,
            pokemon: pokemon,
        });
    } catch (e) {
        res.status(500).json({
            sucesso: false,
            erro: e,
        });
    }
});

router.get('/', async (req, res) => {
    try {
        const filtros = req.query;
        const options = {};

        if (req.query.nomeComecaCom){
            options.nome = {
                $regex: filtros.nomeComecaCom + '.*';
            }
        }

        const pokemons = await Pokemon.find();
        res.status(200).json({
            sucesso: true,
            pokemons: pokemons,
        });
    } catch (e) {
        res.status(500).json({
            sucesso: false,
            erro: e,
        });
    }
});

module.exports = router;