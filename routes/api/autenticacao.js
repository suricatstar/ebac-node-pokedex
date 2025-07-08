const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { Usuario } = require('../../models');

const router = express.Router();

router.post('/login', async (req, res) => {
    try{

        const usuario = await Usuario.findOne({ email: req.body.email });
    
        const senhaCorreta = await bcrypt.compare(req.body.senha, usuario?.senha || '');
    
        if(senhaCorreta){
            res.json({
                sucesso: true,
                jwt: jwt.sign({
                    email: usuario.email,
                    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) // Expira em 24 horas   
                },process.env.SEGREDO_JWT)
            })
        }
        else {
            res.status(401).json({
                sucesso: false,
                mensagem: 'Email ou senha inválidos'
            });
        }
    }
    catch (e){
        res.status(500).json({
            sucesso: false,
            erro: e
        });
    }
});

module.exports = router;