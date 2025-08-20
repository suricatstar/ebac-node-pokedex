const express = require("express");
const Passport  = require("passport");

const { checaAutenticado, checaNaoAutenticado } = require("./middlewares/checa-autenticacao");
const passport = require("passport");

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

router.get("/google", checaNaoAutenticado, passport.authenticate('google'))

router.get('/oauth2/redirect/google', checaNaoAutenticado, passport.authenticate('google', {
    failureRedirect: '/auth',
    failureMessage: true
}), (_req, res) => {
    res.redirect('/');
});

router.get("/github", checaNaoAutenticado, passport.authenticate('github'));

router.get('/oauth2/redirect/github', checaNaoAutenticado, passport.authenticate('github', {
    failureRedirect: '/auth',
    failureMessage: true
}), (_req, res) => {
    res.redirect('/');
});

module.exports = router;