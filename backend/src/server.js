require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');


const usuarioRoutes = require('./routes/usuarioRoutes');
const tarefaRouters = require('./routes/tarefaRoutes');
const eventoRoutes = require('./routes/eventoRoutes');
const interacaoIARoutes = require('./routes/interacaoIARoutes');
const lembreteService = require('./services/LembreteService');
const middlewares = require('./middlewares/authMiddleware');



const app = express();
const PORT = 3000;

app.use(express.json());
app.use(usuarioRoutes);
app.use(tarefaRouters);
app.use(eventoRoutes);
app.use(interacaoIARoutes);









// Conectando ao Banco de Dados
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Conectado ao MongoDB Atlas com sucesso!');

    lembreteService.iniciarVerificador();
    
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((erro) => {
    console.error('Erro ao conectar ao MongoDB:', erro);
  });