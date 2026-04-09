const Evento = require("../models/Evento");



exports.postEvento = async (req,res) => {
    try{
        const evento = new Evento({
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            dataInicio: req.body.dataInicio,
            dataFim: req.body.dataFim,
            lembrarEmail: req.body.lembrarEmail,
            lembrarWwp: req.body.lembrarWwp,
            usuarioID: req.usuario.id
        });
        await evento.save();
        res.status(200).json({mensagem:"Evento criado com sucesso!"});
    }catch(erro){
        res.status(500).json({mensagem: "Erro ao criar evento!"});
    }
}

exports.getEvento = async (req,res) => {
    const idUsuario =req.usuario.id;
    try{
       res.status(200).send( await Evento.find({usuarioID: idUsuario}));
    }catch(erro){
        res.status(500).json({mensagem: "erro ao obter os eventos"});
    }
}

exports.deleteEvento = async (req,res) => {
    const id = req.params.id;
    const idUsuario =req.usuario.id;
    try{
        const eventoDeletado = await Evento.findByIdAndDelete({
            _id:id,
            usuarioID: idUsuario
        });

        if(!eventoDeletado){
            res.status(403).json({mensagem:"Tarefa nao encontrada ou sem permissão!"});
        }
        res.status(200).json({ mensagem: "Evento deletado com sucesso!", evento: eventoDeletado });
    }catch(erro){
        res.status(500).json({mensagem:"erro ao deletar Evento"});
    }
}

exports.putEvento = async (req,res) => {
    try{
        const id = req.params.id;
        const idUsuario = req.usuario.id;
        const resultado = res.status(200).send( await Evento.findByIdAndUpdate({
            _id:id,
            usuarioID: idUsuario
        }));

        if(!resultado){
            res.status(403).json({mensagem:"Sem permissao ou tarefa não encontrada!"});
        }
    }catch(erro){
        res.status(500).json({mensagem:"erro ao atualizar Evento"});
    }
}