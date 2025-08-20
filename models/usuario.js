const { Schema } = require('mongoose');

const Usuario = new Schema({
    nome:{
        type: String,
        required: true,
        min: 4
    },
    email:{
        type: String,
        required: true,
        min: 4,
        unique: true,
        validate: {
            validator: function(v){
                return v.match('@');
            },
            message: props => `${props.value} não é um email válido!`
        }
    },
    senha: {
        type: String,
        required: true,
        
    },
    googleUsuarioId:{
        type: String,
        required: false,
    },
    githubUsuarioId:{
        type: String,
        required: false,
    }

});

Usuario.index({
    email: 1,
})

module.exports = Usuario;
