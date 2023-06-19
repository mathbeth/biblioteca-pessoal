import prisma from '../database/index.js';

async function create(Meuslivros) {
  const NewMeuslivros = await prisma.meus_livros.create({
    data: Meuslivros,
  });

  return NewMeuslivros;
}

async function readAll(user_id) {
  const livros = await prisma.meus_livros.findMany({
    where: {
      user_id: user_id
    },
    select: {
      livro_id: true,
      titulo: true,
      autor: true,
      editora: true,
      ano_pub: true,
      status: true,
      classificacao: true,
      resenha: true,
      data_inicio: true,
      data_fim: true
    },
    include: {
      livros: true
    }
  });

  return livros;
}

/* async function read(user_id, livro_id) {
  const db = await Database.connect();

  const sql = `SELECT l.livro_id, l.titulo, l.autor, l.editora, l.ano_pub, e.status, e.classificacao, e.resenha, e.data_inicio, e.data_fim
  FROM estante e INNER JOIN livros l
  ON e.livro_id = l.livro_id
  WHERE e.user_id = ? AND e.livro_id = ?`;
  
  const livro = await db.get(sql, [user_id, livro_id]);

  return livro;
} */

/* async function update(estante) {
  const db = await Database.connect();

  const { user_id, livro_id, status, classificacao, resenha, data_inicio, data_fim } = estante;

  const sql = 
  `UPDATE estante 
  SET status = ?, classificacao = ?, resenha = ?, data_inicio = ?, data_fim = ? 
  WHERE user_id = ? AND livro_id = ?`;

  const { changes } = await db.run(sql, [user_id, livro_id, status, classificacao, resenha, data_inicio, data_fim, user_id, livro_id]);

  if (changes === 1) {
    return read(user_id, livro_id);
  } else {
    return false;
  }
} */

async function remove(user_id, livro_id) {
  const removedEstante = await prisma.meus_livros.delete({
    where: {
      user_id: user_id,
      livro_id:livro_id,
    },
  });

  return removedEstante
}

export default {
  create,
/*   readAll,
  read,
  update, */
  remove,
}