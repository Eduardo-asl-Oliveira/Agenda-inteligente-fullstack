const Tarefa = require("../models/Tarefa");



exports.postTarefa = async (req,res) => {
    try{
        const tarefa = new Tarefa({
            titulo: req.body.titulo,
            dataInicio: req.body.dataInicio,
            lembrarEmail: req.body.lembrarEmail,
            lembrarWwp: req.body.lembrarWwp,
            usuarioID: req.usuario.id
        });
        await tarefa.save();
        res.status(200).json({mensagem: "Tarefa criada com sucesso!"});
    }catch(erro){
        res.status(500).json({mensagem:"Erro ao criar tarefa"});
    }
}

exports.getTarefa = async (req,res) => {
    try{
        const id = req.usuario.id;
        res.status(200).send( await Tarefa.find({usuarioID: id}));
    }catch(erro){
        res.status(500).json({mensagem:"Erro ao obter tarefa"});
    }
}

exports.deleteTarefa = async (req,res) => {
    try{
        const idUsuario = req.usuario.id;
        const id = req.params.id;
        //acha a tarefa do usuario especifica
        const resultado = res.status(200).send( await Tarefa.findByIdAndDelete({
            _id:id,
            usuarioID: idUsuario
        }));

        if(!resultado){
            return res.status(404).json({ mensagem: "Tarefa não encontrada ou você não tem permissão!" });
        }
    }catch(erro){
        if(erro.name == 'CastError'){
            return res.status(400).json({ mensagem: "ID da tarefa está em formato inválido!" });
        }
        res.status(500).json({mensagem:"Erro ao deletar tarefa"});
    }
}

exports.putTarefa = async (req,res) => {
    try{
        const id = req.params.id;
        const idUsuario = req.usuario.id;
        const resultado = res.status(200).send( await Tarefa.findByIdAndUpdate({
            _id: id,
            usuarioID: idUsuario 
        }));

        if(!resultado){
            res.status(404).json({mensagem: "Tarefa nao encontrada ou voce nao tem permissão!"});
        }
    }catch(erro){
        if(erro.name == 'CastError'){
            return res.status(400).json({ mensagem: "ID da tarefa está em formato inválido!" });
        }
        res.status(500).json({mensagem:"Erro ao criar tarefa"});
    }
}