const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Servindo arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rota para a agenda
app.get('/agenda', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'agenda.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
