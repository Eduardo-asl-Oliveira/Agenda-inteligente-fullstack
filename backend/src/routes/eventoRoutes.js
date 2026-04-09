const express = require('express');
const router = express.Router();
const checarToken = require('../middlewares/authMiddleware');

const eventoController = require('../controllers/EventoController');


//CRUD
router.post('/api/evento',checarToken, eventoController.postEvento);
router.get('/api/evento',checarToken, eventoController.getEvento);
router.delete('/api/evento/:id',checarToken, eventoController.deleteEvento);
router.put('/api/evento/:id',checarToken, eventoController.putEvento);


module.exports = router;