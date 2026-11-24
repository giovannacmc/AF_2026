const express = require('express');
const controller = require('../controllers/movimentacao.controller');

const router = express.Router();

router.get('/', controller.listar);
router.post('/', controller.criar);
router.put('/:id', controller.atualizar);
router.delete('/:id', controller.excluir);

module.exports = router;
