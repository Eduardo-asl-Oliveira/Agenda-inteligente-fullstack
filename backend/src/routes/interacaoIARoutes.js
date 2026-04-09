const express = require('express');
const router = express.Router();
const checarToken = require('../middlewares/authMiddleware');


const interacaoIAController = require('../controllers/InteracaoIAController');


//CRUD
router.post('/api/interacaoIA',checarToken, interacaoIAController.processarComando);
router.get('/api/interacaoIA',checarToken, interacaoIAController.getInteracaoIA);



module.exports = router;