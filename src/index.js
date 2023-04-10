// importações

import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { users } from './data/users.js';

// tratando erros do tipo HTTP
class HTTPError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
};

// constantes

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename); 

const server = express();

// rotas

server.use(morgan('tiny'));

server.use(express.json());

server.use(express.static('public'));

server.get('/index', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

server.get('/cadastro', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/html/cadastro.html'));
});

server.get('/users', (req, res) => {
  res.json(users)
})

server.post('/users', (req, res) => {
  const user = req.body;

  if(user) {
    users.push({...user});

    res.json(user);
  } else {
    throw new HTTPError('Dados inválidos, não foi possível realizar seu cadastro', 400)
  }

});

server.get('/login', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/html/login.html')); // vai virar POST
});

server.get('/pagina-inicial', function(req, res) {
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
  console.log('Server is running on port 3000');
});
