const InteracaoIA = require("../models/InteracaoIA");
const CriaEventoOuTarefaIAService = require("../services/CriaEventoOuTarefaIAService");

const {googleGenerativeAi, GoogleGenerativeAI} = require('@google/generative-ai');



exports.processarComando = async(req,res) => {
    try{
        const {comando} = req.body; //substitui o req.body.comando

        if(!comando){
            return res.status(400).json({mensagem: "Envie algum comando!"});
        }

        const dataDeHoje = new Date().toLocaleDateString('pt-BR');

        //inicia a conexao 
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        //escolhe o modelo
        const model = genAI.getGenerativeModel({model:"gemini-2.5-flash"});
        //prompt
        const instrucoes = `
        Você é um assistente inteligente de um aplicativo de produtividade.
        Sua tarefa é ler a frase do usuário e transformá-la em um objeto JSON exato.
        Hoje é dia ${dataDeHoje}. Use essa informação para calcular prazos como "amanhã", "semana que vem", etc.

        Regras:
        - Se a frase indicar algo pontual ou rápido, classifique como "tarefa".
        - Se indicar um compromisso com hora marcada ou data, classifique como "evento".
        - Retorne APENAS o JSON. Não escreva mais nenhuma palavra, não use formatação markdown (\`\`\`).

        Identificação:
        - verificar se o usuario quer criar uma nova tarefa ou um novo evento
        
        Formato obrigatório caso seja uma tarefa:
        {
            "tipo":"tarefa",
            "titulo": "ideia resumida ou nome da tarefa",
            "dataInicio": "a data anterior que o usuario falar tomo como base a data de hoje enviada, e o horario tome como base as informacoes enviadas, coloque aqui (formato YYYY-MM-DDTHH:mm), se não, coloque a data atual e o horario padrao de 6am",
            "lembrarEmail": "true ou false (booleano. true se o usuário pedir para ser lembrado, false se não pedir),
            "lembrarWwp": "true ou false (booleano. true se o usuário pedir para ser lembrado, false se não pedir)
        }

         Formato obrigatório caso seja um evento:
        {
            "tipo":"evento",
            "titulo": "ideia resumida ou nome da tarefa",
            "descricao": "oque sera feito de maneira mais aprofundada",
            "dataInicio": "a data anterior que o usuario falar tomo como base a data de hoje enviada, e o horario tome como base as informacoes enviadas, coloque aqui (formato YYYY-MM-DDTHH:mm), se não, coloque a data atual e o horario padrao de 6am",
            "dataFim": "a data final que o usuario falar tomo como base a data de hoje enviada, e o horario tome como base as informacoes enviadas, coloque aqui (formato YYYY-MM-DDTHH:mm), se não, coloque a data atual e o horario padrao de 6am",
            "lembrarEmail": "true ou false (booleano. true se o usuário pedir para ser lembrado, false se não pedir),
            "lembrarWwp": "true ou false (booleano. true se o usuário pedir para ser lembrado, false se não pedir)
        }

        Frase do usuário: "${comando}"
        `;
        
        //requisicao
        const resultado = await model.generateContent(instrucoes);
        let textoResposta = resultado.response.text();

        //evita a formatacao markdown
        textoResposta = textoResposta.replace(/```json/g, "").replace(/```/g, "").trim();

        //transforma em objeto
        const objeto = JSON.parse(textoResposta);


        //salva a interacao
        const novaInteracao = new InteracaoIA({
            mensagemUsuario: comando,
            respostaIA: textoResposta,   
            usuarioID: req.usuario.id   
        });
        await novaInteracao.save();

        
         res.status(200).json({mensagem:"Pedido entendido com sucesso!", 
                                    compreencaoIA: objeto});

        
        //salva evento ou tarefa
        const resposta = await CriaEventoOuTarefaIAService.CriaObjeto(req.usuario.id, objeto);
        if(resposta){
            return res.status(200).json({mensagem:"Pedido armazendo no banco de dados"});
        }



    } catch (erro) {
        console.error("🚨 ERRO:", erro); 
        return res.status(500).json({ mensagem: "Erro interno", detalhes: erro.message });
    }
}



exports.getInteracaoIA = async (req,res) => {
    const idUsuario = req.usuario.id;
    try{
        res.status(200).send( await InteracaoIA.find({usuarioID: idUsuario}));
    }catch(erro){
        res.status(500).json({mensagem:"Erro ao obter o historico da interacao ia"});
    }
}