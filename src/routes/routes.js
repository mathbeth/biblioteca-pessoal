import express from 'express';
import users from '../data/users.js';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';

class HTTPError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const router = express.Router();

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

router.get('/cadastro', function (req, res) {
  res.sendFile(path.join(__dirname, '../../public/html/cadastro.html'));
});

router.post('/cadastro', (req, res) => {
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

router.delete('/users/:id', (req, res) => {
  const id = req.params.id;

  if (id) {
    const index = users.findIndex((user) => user.id === id);

    users.splice(index, 1);
  }

  res.send('Cadastro excluído com sucesso!');
});

router.get('/usuarios', function (req, res) {
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

router.get('/users', (req, res) => {
  res.json(users);
});

router.get('/login', function (req, res) {
  res.sendFile(path.join(__dirname, '../../public/html/login.html'));
});

router.get('/perfil', function (req, res) {
  res.sendFile(path.join(__dirname, '../../public/html/perfil.html'));
});

router.get('/pagina-inicial', function (req, res) {
  res.sendFile(path.join(__dirname, '../../public/html/pagina-inicial.html'));
});

router.use((req, res, next) => {
  res.status(404).json({ message: 'Content not found!' });
});

router.use((err, req, res, next) => {
  if (err instanceof HTTPError) {
    res.status(err.code).json({ message: err.message });
  } else {
    res.status(500).json({ message: 'Something broke!' });
  }
});

export default router;