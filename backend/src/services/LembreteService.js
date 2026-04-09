const EmailService = require('../services/EmailService');
const WhatsappService = require('../services/WhatsappService');
const Evento = require('../models/Evento');
const Tarefa = require('../models/Tarefa');
const cron = require('node-cron');

exports.iniciarVerificador = () => {

    // * minuto, hora, dia, mes, dia da semana
    cron.schedule('* * * * *', async () => {

        //data atual menos os segundos
        const tempo = new Date();
        tempo.setHours(tempo.getHours() - 3);
        const date = tempo.toISOString().substring(0,16);
        
        console.log("tarefa/evento marcados para: ", date);



        //EVENTOS:

        //pega todos os eventos com data igual a atua e com o lembrar email e/ou wpp ativo
        const evento = await Evento.find({dataInicio: date,
                                     $or:[ 
                                        {lembrarEmail: true},
                                        {lembrarWwp: true}
                                     ]
         }).populate('usuarioID');
         
         //dispara as mensagens
         for(const e of evento){
            if(e.lembrarEmail === true){
                EmailService.enviarNotificacao(e.usuarioID.email, e.titulo, e.descricao);
            }
            if(e.lembrarWwp === true){
                WhatsappService.enviarMensagemWwp(e.usuarioID.telefone_whatsapp,"Evento: " + e.titulo +  "descricao: " +  e.descricao);
            }
         }



         //TAREFAS:

         //pega todas as tarefas com data igual a atua e com o lembrar email e/ou wpp ativo
        const tarefa = await Tarefa.find({dataInicio: date,
                                     $or:[ 
                                        {lembrarEmail: true},
                                        {lembrarWwp: true}
                                     ]
         }).populate('usuarioID');
         
         //dispara as mensagens
         for(const t of tarefa){
            if(t.lembrarEmail === true){
                EmailService.enviarNotificacao(t.usuarioID.email, t.titulo, t.descricao);
            }
            if(t.lembrarWwp === true){
                WhatsappService.enviarMensagemWwp(t.usuarioID.telefone_whatsapp,"Evento: " + t.titulo +  "descricao: " +  t.descricao);
            }
         }

        
        

        
    });
}