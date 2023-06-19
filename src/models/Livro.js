import prisma from '../database/index.js';

async function create(livro) {
  const novoLivro = await prisma.livros.create({
    data: livro,
  });

  return novoLivro;
}

async function readAll() {
  const livros = await prisma.livros.findMany();

  return livros
}

async function read(id) {
  const livro = await prisma.livros.findUnique({
    where: {
      id,
    },
  });

  return livro
}

async function update(id, livro) {
  const updatedLivro = await prisma.livros.update({
    where: {
      livro_id: id,
    },
    data: livro,
    include: {
      livro: true
    },
  });

  return updatedLivro
}

async function remove(id) {
  const livroId = parseInt(id);

  const removedLivro = await prisma.livros.delete({
    where: {
      livro_id: livroId,
    },
  });

  return removedLivro
}

export default {
  create,
  readAll,
  read,
  update,
  remove,
};