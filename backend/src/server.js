require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const movimentacaoRoutes = require('./routes/movimentacao.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/movimentacoes', movimentacaoRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Conectado ao MongoDB');
    app.listen(process.env.PORT, () => {
      console.log('API rodando na porta ' + process.env.PORT);
    });
  })
  .catch((erro) => {
    console.log('Erro ao conectar no MongoDB: ' + erro.message);
  });
