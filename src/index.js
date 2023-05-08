// importações

import express from 'express';
import morgan from 'morgan';
import path from 'path';
import users from './data/users.js';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';

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

server.use(express.urlencoded({ extended: true }));

server.use(morgan('tiny'));

server.use(express.json());

server.use(express.static('public'));

server.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

server.get('/cadastro', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/html/cadastro.html'));
});

server.post('/cadastro', (req, res) => {
  const { username, email, password } = req.body;

  if (username == '' || email == '' || password == '') {
    return res.status(400).send('Por favor, preencha todos os campos!');
  }

  if (password.length < 8) {
    return res.status(400).send('A senha deve ter pelo menos 8 caracteres!');
  }

  if (email.indexOf('@') == -1 || email.indexOf('.') == -1) {
    return res.status(400).send('Por favor, digite um endereço de e-mail válido!');
  }

  const id = uuidv4();
  users.push({ id, username, email, password });
  res.status(201).json({ message: 'Usuário cadastrado com sucesso', id });
});

server.delete('/users/:id', (req, res) => {
  const id = req.params.id;

  if (id) {
    const index = users.findIndex((user) => user.id === id);

    users.splice(index, 1);
  }

  res.send('Cadastro excluído com sucesso!');
});

server.get('/usuarios', function (req, res) {
  let html =
    '<html><head><style> table { border-collapse: collapse; width: 100%; } th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; } th { background-color: #f2f2f2; color: #666; font-weight: bold; } tr:hover { background-color: #f5f5f5; } </style> <title>Usuários</title></head><body><h1>Usuários</h1><table><thead><tr><th>ID</th><th>Nome de usuário</th><th>Email</th><th>Senha</th></tr></thead><tbody>';
  users.forEach(function (user) {
    html +=
      '<tr><td>' +
      user.id +
      '</td><td>' +
      user.username +
      '</td><td>' +
      user.email +
      '</td><td>' +
      user.password +
      '</td></tr>';
  });

  html += '</tbody></table></body></html>';

  res.send(html);
});

server.get('/users', (req, res) => {
  res.json(users);
});

server.get('/login', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/html/login.html'));
});

server.get('/perfil', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/html/perfil.html'));
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
