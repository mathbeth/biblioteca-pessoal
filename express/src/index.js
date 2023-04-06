// importações

import express from 'express';
import morgan from 'morgan';
import {livros} from './livros.js';
import path from 'path';

// tratando de erros do tipo HTTP
class HTTPError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
};

// rotas e outras coisas

const server = express();

server.use(morgan('tiny'));

server.use(express.static('public'));

server.get('/', (req, res) => {
  const enviaarquivo = path.join(__dirname, '../public/pagina-inicial.html');
  res.sendFile(enviaarquivo);
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
