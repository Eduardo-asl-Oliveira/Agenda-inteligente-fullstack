const express = require('express');
const router = express.Router();
const checarToken = require('../middlewares/authMiddleware');

const usuarioController = require('../controllers/UsuarioController');


//ROTAS DE AUTENTIFICACAO
router.post('/api/login', usuarioController.login);

//ROTAS DE CRUD
router.post('/api/cadastro', usuarioController.postUsuario);
router.get('/api/usuario', checarToken, usuarioController.getUsuario);
router.delete('/api/usuario/:id',checarToken, usuarioController.deleteUsuario);
router.put('/api/usuario/:id',checarToken, usuarioController.putUsuario);

module.exports = router;
