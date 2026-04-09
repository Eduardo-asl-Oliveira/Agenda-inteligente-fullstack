const jsonwebtoken = require('jsonwebtoken');

const checarToken = (req,res,next) =>{
    // Pegar o token que o usuário enviou
    const authHeader = req.headers['authorization'];

    // Verificar se o token foi realmente enviado
    if (!authHeader) {
        return res.status(401).json({ mensagem: "Acesso negado: Token não fornecido!" });
    }

    
    //tira o Bearer que vem antes do token
    const token = authHeader.replace("Bearer ","");

    //Validar se o token é verdadeiro usando a nossa JWT_SECRET
    try{
        req.usuario = jsonwebtoken.verify(token, process.env.JWT_SECRET); //usa a minha chave JWTSECRET para descriptografar e validar a assinatura
        next();
    }catch(erro){
        res.status(401).json({mensagem: "Codigo invalido!"});
    }
    

};

module.exports = checarToken;