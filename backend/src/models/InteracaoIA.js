const mongoose = require('mongoose');


const interacaoIASchema = new mongoose.Schema({
    mensagemUsuario:{
        type: String,
        required:true
    },
    respostaIA:{
        type: String,
        required: true
    },
    usuarioID:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Usuario',
        required: true
    }
},{ 
    timestamps: true
});

module.exports = mongoose.model('InteracaoIA', interacaoIASchema);