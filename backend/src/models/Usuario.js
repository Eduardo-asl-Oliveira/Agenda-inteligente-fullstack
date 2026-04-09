const mongoose = require('mongoose');


const usuarioScheme = new mongoose.Schema({
    nome: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true   
  },
  senha: { 
    type: String, 
    required: true 
  },
  telefone_whatsapp: { 
    type: String 
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Usuario', usuarioScheme);