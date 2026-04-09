const Evento = require('../models/Evento');
const Tarefa = require('../models/Tarefa');



exports.CriaObjeto = async (id, informacoes) => {
    try{
        if(informacoes.tipo === "evento"){
        const evento = new Evento({
                    titulo: informacoes.titulo,
                    descricao: informacoes.descricao,
                    dataInicio: informacoes.dataInicio,
                    dataFim: informacoes.dataFim,
                    lembrarEmail: informacoes.lembrarEmail,
                    lembrarWwp: informacoes.lembrarWwp,
                    usuarioId: id
                });
        await evento.save();

    }else if(informacoes.tipo === "tarefa"){
        const tarefa = new Tarefa({
                    titulo: informacoes.titulo,
                    dataInicio: informacoes.dataInicio,
                    lembrarEmail: informacoes.lembrarEmail,
                    lembrarWwp: informacoes.lembrarWwp,
                    usuarioID: id
                });
        await tarefa.save();

    }else {
       return false
    }
    return true;
    }catch(erro){
        return false
    }
    
}