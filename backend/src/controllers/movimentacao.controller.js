const Movimentacao = require('../models/movimentacao.model');

async function listar(req, res) {
  try {
    const movimentacoes = await Movimentacao.find().sort({ data: -1 });
    res.json(movimentacoes);
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao buscar movimentações' });
  }
}

async function criar(req, res) {
  try {
    const movimentacao = await Movimentacao.create(req.body);
    res.status(201).json(movimentacao);
  } catch (erro) {
    res.status(400).json({ mensagem: 'Erro ao cadastrar, verifique os dados' });
  }
}

async function atualizar(req, res) {
  try {
    const movimentacao = await Movimentacao.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: 'after',
      runValidators: true,
    });
    if (!movimentacao) {
      return res.status(404).json({ mensagem: 'Movimentação não encontrada' });
    }
    res.json(movimentacao);
  } catch (erro) {
    res.status(400).json({ mensagem: 'Erro ao atualizar, verifique os dados' });
  }
}

async function excluir(req, res) {
  try {
    const movimentacao = await Movimentacao.findByIdAndDelete(req.params.id);
    if (!movimentacao) {
      return res.status(404).json({ mensagem: 'Movimentação não encontrada' });
    }
    res.json({ mensagem: 'Movimentação excluída' });
  } catch (erro) {
    res.status(400).json({ mensagem: 'Erro ao excluir' });
  }
}

module.exports = { listar, criar, atualizar, excluir };
