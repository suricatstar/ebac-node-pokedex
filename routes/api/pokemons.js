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
                $regex: filtros.nomeComecaCom + '.*'
            }
        }

        // Filtro por peso mínimo
        if (req.query.pesoMinimo) {
            options.peso = { 
                ...options.peso,
                $gte: parseInt(filtros.pesoMinimo) 
            };
        }

        // Filtro por altura mínima
        if (req.query.alturaMinima) {
            options.altura = { 
                ...options.altura,
                $gte: parseInt(filtros.alturaMinima) 
            };
        }

        const pokemons = await Pokemon.find(options);
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

router.get('/:id', async (req, res) => {
    try {
        const pokemon = await Pokemon.findOne({_id:req.params.id});
        
        res.json({
            sucesso: true,
            pokemon: pokemon,
        });
    }
     catch (e) {
        res.status(404).json({
            sucesso: false,
            erro: 'Pokemon não encontrado',
        });
    }
});

router.patch('/:id', async (req, res) => {
    try{
        const pokemon = await Pokemon.findOne({_id:req.params.id});
        Object.keys(req.body).forEach((atributo) => {
            pokemon[atributo] = req.body[atributo];
        });

        await pokemon.save();

        res.json({
            sucess: true,
            pokemon: pokemon,
        });

    }catch (e) {
        res.status(422).json({
            sucesso: false,
            erro: e,
        })
    }
});

// Nova rota de deleção
router.delete('/:id', async (req, res) => {
    try {
        const pokemon = await Pokemon.findByIdAndDelete(req.params.id);
        
        if (!pokemon) {
            return res.status(404).json({
                sucesso: false,
                erro: 'Pokemon não encontrado',
            });
        }

        res.json({
            sucesso: true,
            mensagem: 'Pokemon removido da pokedex com sucesso',
            pokemon: pokemon,
        });
    } catch (e) {
        res.status(500).json({
            sucesso: false,
            erro: e,
        });
    }
});

module.exports = router;