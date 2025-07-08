const {Schema} = require('mongoose');

const Pokemon = new Schema({
    id: {
        type: Number,
        required: true,
    },
    nome:{
        type: String,
        required: true,
    },
    altura:{
        type: Number,
        required: true,
        min: 0,
    },
    peso:{
        type: Number,
        required: true,
        min: 0,
    },
    imagem:{
        type: String,
        required: true,
        validate:{
            validator: (valor) => {
                return valor && valor.startsWith('http')
            },
            message: () => 'A imagem deve ser uma URL absoluta'
        }
    },
    ataques: {
        type: String,
        required: true,
    },
    estatisticas:{
        type : Object,
        required: true,
    },
    capturadoPor: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    jogos:{
        type: [String],
        required: true,
    },
}); 

Pokemon.index({
    capturadoPor: 1,
})

module.exports = Pokemon;