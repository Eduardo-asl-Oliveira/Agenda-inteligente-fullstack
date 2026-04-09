const Usuario = require("../models/Usuario");
const bcryptjs = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
require('dotenv').config();

//salt que gara uma senha embaralhada e hash

exports.postUsuario = async (req,res) => {
    try{
          
        const senha = req.body.senha;
        const salt = await bcryptjs.genSalt(10);
        const senhaCriptografada = await bcryptjs.hash(senha,salt);
        req.body.senha = senhaCriptografada;

        const usuario = new Usuario(req.body);
        await usuario.save();

        res.status(200).json({mensagem:"Usuario criado com sucesso!"});
    }catch(erro){
        res.status(500).json({mensagem:"Erro ao criar usuario!"})
    }
}

exports.getUsuario = async (req,res) => {
    try{
        res.status(200).send( await Usuario.find());
    }catch(erro){
        res.status(500).mensage,({mensagem:"Erro ao encontrar usuarios!"})
    }
}

exports.deleteUsuario = async (req,res) => {
    try{
        const id = req.params.id; 
        await Usuario.findByIdAndDelete(id); 
        res.status(200).json({mensagem:"Usuario deletado com sucesso!"});
    } catch(erro){
        res.status(500).json({mensagem:"Erro ao deletar usuario!"}); 
    }
}

exports.putUsuario = async (req,res) => {
    try{
        const id = req.params.id;
        const dados = req.body;
        const usuarioAtualizado = await Usuario.findByIdAndUpdate(id, dados, { new: true }); 
        res.status(200).json(usuarioAtualizado);
    }catch(erro){
        res.status(500).json({mensagem:"Erro ao atualizar usuario!"}); 
    }
}


exports.login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        // 1. Procura o e-mail
        const usuarioEncontrado = await Usuario.findOne({ email });
        if (!usuarioEncontrado) {
            return res.status(400).json({ mensagem: "E-mail ou senha incorretos!" });
        }

        //compara as senhas
        const senhaValida = await bcryptjs.compare(senha, usuarioEncontrado.senha);
        if (!senhaValida) {
            return res.status(400).json({ mensagem: "E-mail ou senha incorretos!" });
        } 

        // token
        const token = jsonwebtoken.sign(
            { id: usuarioEncontrado._id }, // dados do crachá
            process.env.JWT_SECRET,        // chave corrigida
            { expiresIn: '1d' }            // validade
        );

        // retorna
        return res.status(200).json({ 
            mensagem: "Login realizado com sucesso!",
            token: token
        });
    
    } catch(erro) {
        res.status(500).json({ mensagem: "Erro ao fazer login" });
    }
}