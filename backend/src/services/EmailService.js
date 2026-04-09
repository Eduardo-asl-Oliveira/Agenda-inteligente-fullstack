const nodemailer = require('nodemailer');
require('dotenv').config();


const transportador = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'indioflexeiro@gmail.com',
        pass: process.env.EMAIL_SENHA
    }
});


exports.enviarNotificacao = async (emailDestino, titulo, textoDaMensagem) => {
    try {
        const opcoesDoEmail = {
            from: 'indioflexeiro@gmail.com', // O e-mail remetente
            to: emailDestino,                // O e-mail do usuário
            subject: titulo,                 // O assunto
            text: textoDaMensagem            // O corpo da mensagem
        };

        await transportador.sendMail(opcoesDoEmail);
        return true;
    } catch (erro) {
        console.error("Erro ao disparar e-mail:", erro);
        return false;
    }
};