const jwt = require('jsonwebtoken');

const { Usuario } = require('../../../models/usuario');

const checaAutenticacao = async (req, res, next) => {
    try{

        const jwtUsuario = req.headers.authorization.replace('Bearer ', '');
        const email = (await jwt.verify(jwtUsuario, process.env.SEGREDO_JWT)).email;
    
        const usuario = await Usuario.findOne({ email: email });
    
        if (!usuario){
            throw 'Usuário não encontrado';
        }

        req.usuario = usuario;
    
        next();
    }
    catch (e){
        res.status(401).json({
            sucesso: false,
            erro: 'faça login para acessar esta rota',
        });
    }
};

module.exports = {
    checaAutenticacao,
};