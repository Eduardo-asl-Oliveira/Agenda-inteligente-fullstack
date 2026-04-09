const express = require('express');
const router = express.Router();


const tarefaController = require('../controllers/TarefaController');
const checarToken = require('../middlewares/authMiddleware');

//CRUD
router.post('/api/tarefa', checarToken, tarefaController.postTarefa);
router.get('/api/tarefa', checarToken, tarefaController.getTarefa);
router.delete('/api/tarefa/:id',checarToken, tarefaController.deleteTarefa);
router.put('/api/tarefa/:id',checarToken, tarefaController.putTarefa);



module.exports = router;