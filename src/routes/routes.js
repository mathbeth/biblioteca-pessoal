import { Router } from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import Usuario from '../models/Usuario.js';
import Livro from '../models/Livro.js';
import Estante from '../models/Estante.js';

class HTTPError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const router = Router();

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

router.get('/cadastro', function (req, res) {
  res.sendFile(path.join(__dirname, '../../public/html/cadastro.html'));
});

router.post('/cadastro', async (req, res) => {
  const usuario = req.body;

  const novoUsuario = await Usuario.create(usuario);

  if (novoUsuario) {
    res.status(201).json({ message: 'Usuário cadastrado com sucesso', id: novoUsuario.id });
  } else {
    res.status(400).json({ message: 'Erro ao cadastrar usuário' });
  }
});

router.get('/usuarios', async (req, res) => {

  const usuarios = await Usuario.readAll();

  res.json(usuarios);
});

router.delete('/usuarios/:id', async (req, res) => {
  const id = req.params.id;

  if (id && (await Usuario.remove(id))) {
    res.json({ message: 'Usuário removido com sucesso' });
  } else {
    res.json({ message: 'Erro ao remover usuário' });
  }
});

router.get('/login', function (req, res) {
  res.sendFile(path.join(__dirname, '../../public/html/login.html'));
});

router.get('/perfil', function (req, res) {
  res.sendFile(path.join(__dirname, '../../public/html/perfil.html'));
});

// router.get('/estante', function (req, res) {
//   res.sendFile(path.join(__dirname, '../../public/html/estante.html'));
// });

router.get('/cadastro/livro', function (req, res) {
  res.sendFile(path.join(__dirname, '../../public/html/cadastroLivro.html'));
});

router.post('/cadastro/livro', async (req, res) => {
  const livro = req.body;

  const novoLivro = await Livro.create(livro);

  if (novoLivro) {
    res.json(novoLivro);
    /* res.sendFile(path.join(__dirname, '../../public/html/cadastroLivro.html'));*/
  } else {
    throw new HTTPError('Não foi possivel cadastrar o livro', 400);
  }
});

router.get('/livros', async (req, res) => {
  const livros = await Livro.readAll();

  res.json(livros);
});

router.delete('/livros/:id', async (req, res) => {
  const id = req.params.id;

  if (id && await Livro.remove(id)) {
    res.json({ message: 'Livro removido com sucesso' });
  } else {
    res.json({ message: 'Erro ao remover livro' });
  }
});

router.post('/estante', async (req, res) => {
  const estante = req.body;

  const novaEstante = await Estante.create(estante);

  if (novaEstante) { 
    res.status(201).json({ message: 'Estante cadastrada com sucesso', id: novaEstante.id });
  } else {
    res.status(400).json({ message: 'Erro ao cadastrar estante' });
  }
});

router.get('/estante', async (req, res) => {
  const estante = await Estante.readAll();

  res.json(estante);
});

router.delete('/estante/:user_id/:livro_id', async (req, res) => {
  const user_id = req.params.user_id;
  const livro_id = req.params.livro_id;

  if (user_id && livro_id && (await Estante.remove(user_id, livro_id))) {
    res.json({ message: 'Estante removida com sucesso' });
  } else {
    res.json({ message: 'Erro ao remover estante' });
  }
})

// 404 handler

router.use((req, res, next) => {
  res.status(404).json({ message: 'Content not found!' });
});

// Error handler

router.use((err, req, res, next) => {
  if (err instanceof HTTPError) {
    res.status(err.code).json({ message: err.message });
  } else {
    res.status(500).json({ message: 'Something broke!' });
  }
});

export default router;