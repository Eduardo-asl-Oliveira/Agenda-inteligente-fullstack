const mongoose = require('mongoose');



const eventoSchema = new mongoose.Schema({
    titulo:{
        type: String,
        required: true,
    },
    descricao:{
        type: String,
        required: false
    },
    dataInicio:{
        type: Date,
        required: true
    },
    dataFim:{
        type: Date,
        required: false
    },
    lembrarEmail:{
        type:Boolean,
        default: false
    },
    lembrarWwp:{
        type:Boolean,
        default: false
    },
    usuarioID:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Usuario',
        required: true
    }
});

module.exports = mongoose.model('Evento',eventoSchema);