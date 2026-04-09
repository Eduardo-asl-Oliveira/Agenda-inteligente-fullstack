const {Client, LocalAuth} = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');


//cria um telefone virtual no servidor
const client = new Client({
    authStrategy: new LocalAuth() //salva
});


//mostra o qrcode
client.on('qr',(qr) => {
    qrcode.generate(qr,{small:true});
    console.log('leia o qrcode acima');
});


//conencta
client.on('ready', () => {
    console.log('wwp conectado');
});


//inicia o cliente
client.initialize();



exports.enviarMensagemWwp = async (numeroDestino, textoDaMensagem) => {
    try {
        //adicionando o sufixo obrigatório da biblioteca
        const numeroFormatado = `${numeroDestino}@c.us`;

        //chama o client
        await client.sendMessage(numeroFormatado, textoDaMensagem);
        
        console.log("Mensagem do WhatsApp enviada com sucesso para:", numeroDestino);
        return true;
    } catch (erro) {
        console.error("Erro ao disparar WhatsApp:", erro);
        return false;
    }
};