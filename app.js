const express = require('express');

const path = require("path");

const expressLayouts = require("express-ejs-layouts");

const { connect } = require("./models");

const pokemonsRouter = require("./routes/pokemons");
const batalhaRouter = require("./routes/batalha");
const capturaRota = require('./routes/api/captura')

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(express.static(path.join(__dirname, 'public')));

app.use("/pokemons", pokemonsRouter);
app.use("/batalha", batalhaRouter);

app.use('/api', capturaRota)

const porta = 3000;
app.listen(porta, () => {
  connect();

  console.log("Server is running on port " + porta);
});
