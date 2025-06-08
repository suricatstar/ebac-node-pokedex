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

const router = express.Router();
// Define the base route for the API

router.use('/captura', cors(corsOptions) ,capturaRouter);
router.use('/status', cors(corsOptions) ,statusRouter);
router.use('/pokemons', cors(corsOptions) ,pokemonsRouter);

module.exports = router;