// importações

import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
import { users } from './data/users.js';

// tratando erros do tipo HTTP
class HTTPError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

// constantes

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const server = express();

// rotas

server.use(morgan('tiny'));

server.use(express.json());

server.use(express.static('public'));

server.get('/index', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

server.get('/cadastro', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/html/cadastro.html'));
});

server.post('/cadastro', (req, res) => {
  const user = req.body;

  const id = uuidv4();

  if (user) {
    users.push({ ...user, id });

    res.send('Cadastro concluído com sucesso');
  } else {
    throw new HTTPError('Dados inválidos para cadastro de usuário', 400);
  }
});

server.delete('/users/:id', (req, res) => {
  const id = req.params.id;

  if (id) {
    const index = users.findIndex(
      (user) => user.id === id
    );

    users.splice(index, 1);
  }

  res.send(204);
});

server.get('/users', (req, res) => {
  res.json(users);
});

server.get('/login', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/html/login.html'));
});

server.get('/pagina-inicial', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/html/pagina-inicial.html'));
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
  console.log('O servidor está rodando na porta 3000');
});
