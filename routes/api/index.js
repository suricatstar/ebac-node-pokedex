const express = require('express');
const cors = require('cors');

const corsOptions = {
  origin: '*', // Allow all origins for simplicity; adjust as needed
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 200 // For legacy browser support
}

const capturaRouter = require('./captura');
const statusRouter = require('./status');
const pokemonsRouter = require('./pokemons');
const autenticacaoRouter = require('./autenticacao');

const { checaAutenticacao } = require('./middleware/checa-autenticacao');

const router = express.Router();

router.use(express.json()); // Middleware to parse JSON bodies

// Define the base route for the API

router.use('/captura', cors(corsOptions), checaAutenticacao ,capturaRouter);
router.use('/status', cors(corsOptions) ,statusRouter);
router.use('/pokemons', cors(corsOptions), checaAutenticacao ,pokemonsRouter);
router.use('/autenticacao', cors(corsOptions) ,autenticacaoRouter);

module.exports = router;