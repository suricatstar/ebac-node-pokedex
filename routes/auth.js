const express = require("express");
const Passport  = require("passport");

const { checaAutenticado, checaNaoAutenticado } = require("./middlewares/checa-autenticacao");

const router = express.Router();

router.get("/", checaNaoAutenticado, (req, res) => {
    res.render('paginas/login', {error: req.query.erroNoLogin});
});

router.get("/logout", checaAutenticado, async (req, res, next) => {
    req.logout(req.user, (erro) => {
        if (!erro) {
            return res.redirect("/auth");
        } else {
            return next(erro);
        }
    });
    
});

router.post("/", Passport.authenticate('local',{
    successRedirect: "/",
    failureRedirect: "/auth?erroNoLogin=true",
}))

module.exports = router;