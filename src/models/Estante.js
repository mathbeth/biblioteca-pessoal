import Database from "../database/database.js";

async function create(user_id, livro_id, status, classificacao, resenha, data_inicio, data_fim) {
  const db = await Database.connect();

  const sql = 
  `INSERT INTO estante (user_id, livro_id, status, classificacao, resenha, data_inicio, data_fim) 
  VALUES (?, ?, ?, ?, ?, ?, ?)`;

  const { lastID } = await db.run(sql, [user_id, livro_id, status, classificacao, resenha, data_inicio, data_fim]);

  return read(lastID);
}

async function readAll(user_id) {
  const db = await Database.connect();

  const sql = 
  `SELECT l.livro_id, l.titulo, l.autor, l.editora, l.ano_pub, e.status, e.classificacao, e.resenha, e.data_inicio, e.data_fim
  FROM estante e INNER JOIN livros l 
  ON e.livro_id = l.livro_id 
  WHERE e.user_id = ?`;

  const livros = await db.all(sql, [user_id]);

  return livros;
}

async function read(user_id, livro_id) {
  const db = await Database.connect();

  const sql = `SELECT l.livro_id, l.titulo, l.autor, l.editora, l.ano_pub, e.status, e.classificacao, e.resenha, e.data_inicio, e.data_fim
  FROM estante e INNER JOIN livros l
  ON e.livro_id = l.livro_id
  WHERE e.user_id = ? AND e.livro_id = ?`;
  
  const livro = await db.get(sql, [user_id, livro_id]);

  return livro;
}

async function update(user_id, livro_id, status, classificacao, resenha, data_inicio, data_fim) {
  const db = await Database.connect();

  const sql = 
  `UPDATE estante 
  SET status = ?, classificacao = ?, resenha = ?, data_inicio = ?, data_fim = ? 
  WHERE user_id = ? AND livro_id = ?`;

  const { changes } = await db.run(sql, [status, classificacao, resenha, data_inicio, data_fim, user_id, livro_id]);

  if (changes === 1) {
    return read(user_id, livro_id);
  } else {
    return false;
  }
}

async function remove(user_id, livro_id) {
  const db = await Database.connect();

  const sql = 
  `DELETE FROM estante 
  WHERE user_id = ? AND livro_id = ?`;

  const { changes } = await db.run(sql, [user_id, livro_id]);

  return changes === 1;
}

export default {
  create,
  readAll,
  read,
  update,
  remove,
}