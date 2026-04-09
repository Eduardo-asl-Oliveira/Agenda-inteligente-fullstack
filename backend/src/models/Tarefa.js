const mongoose = require('mongoose');


const tarefaSchema = new mongoose.Schema({

    titulo:{
        type:String,
        required: true
    },
    dataInicio:{
        type:Date,
        required: true
    },
    concluida:{
        type: Boolean,
        default: false
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
        ref: 'Usuario',
        required: true
    }
});

module.exports = mongoose.model('Tarefa',tarefaSchema);