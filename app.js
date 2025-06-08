require("dotenv").config();

const express = require('express');

const path = require("path");

const expressLayouts = require("express-ejs-layouts");

const { connect } = require("./models");

const pokemonsRouter = require("./routes/pokemons");
const batalhaRouter = require("./routes/batalha");
const apiRouter = require('./routes/api')

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(express.static(path.join(__dirname, 'public')));

app.use("/pokemons", pokemonsRouter);
app.use("/batalha", batalhaRouter);

app.use('/api', apiRouter)

app.use((_req, _res, next) => {
  next(createError(404));
});

app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  res.render('paginas/erro', { 
    mensagem: err.message,
    erro: err,
  });
});

const porta = 3000;
app.listen(porta, () => {
  connect();

  console.log("Server is running on port " + porta);
});
