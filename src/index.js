// importações

import express from 'express';
import morgan from 'morgan';
import { livros } from './livros.js';
import path from 'path';

// tratando erros do tipo HTTP
class HTTPError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
};

// configs e rotas

const server = express();

server.use(morgan('tiny'));

server.use(express.static('public'));

server.get('/pagina-inicial', function(req, res) {
  res.sendFile(__dirname + '/html/pagina-inicial.html');
});

server.get('/ola', (req, res) => {
  res.send('Ola, mundo!');
});

// mensagens de erro

server.use((req, res, next) => {
  res.status(404).json({ message: 'Content not found!' });
});

server.use((err, req, res, next) => {
  if (err instanceof HTTPError) {
    res.status(err.code).json({ message: err.message });
  } else {
    res.status(500).json({ message: 'Something broke!' });
  }
});

// servidor rodando...

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
