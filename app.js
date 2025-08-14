require("dotenv").config();

const express = require("express");

const passport = require("passport");

const session = require("express-session");

const path = require("path");

const createError = require("http-errors");

const expressLayouts = require("express-ejs-layouts");

const { connect } = require("./models");

require("./routes/auth/");
const pokemonsRouter = require("./routes/pokemons");
const batalhaRouter = require("./routes/batalha");
const autenticacaoRouter = require("./routes/auth");
const apiRouter = require("./routes/api");
const homeRouter = require("./routes/home");
const { checaAutenticado } = require("./routes/middlewares/checa-autenticacao");



const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(expressLayouts);

app.use(express.static(path.join(__dirname, "public")));

app.use("/pokemons", checaAutenticado, pokemonsRouter);
app.use("/batalha", checaAutenticado, batalhaRouter);
app.use("/auth", autenticacaoRouter);
app.use("/", checaAutenticado, homeRouter);

app.use("/api", apiRouter);

app.use((_req, _res, next) => {
  next(createError(404));
});

app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  res.render("paginas/erro", {
    mensagem: err.message,
    erro: err,
  });
});

const porta = 3000;
app.listen(porta, () => {
  connect();

  console.log("Server is running on port " + porta);
});
