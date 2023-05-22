import Database from "../database/database.js";

async function create(livro) {
  const db = await Database.connect();

  const { titulo, autor, editora, ano_pub } = livro;

  const sql = 
  `INSERT INTO livros (titulo, autor, editora, ano_pub) 
  VALUES (?, ?, ?, ?)`;

  const { lastID } = await db.run(sql, [titulo, autor, editora, ano_pub]);

  return read(lastID);
}

async function readAll() {
  const db = await Database.connect();

  const sql = `SELECT * FROM livros`;

  const livros = await db.all(sql);

  return livros;
}

async function read(id) {
  const db = await Database.connect();

  const sql = `SELECT * FROM livros WHERE livro_id = ?`;

  const livro = await db.get(sql, [id]);

  return livro;
}

async function update(id, livro) {
  const db = await Database.connect();

  const { titulo, autor, editora, ano_pub } = livro;

  const sql = 
  `UPDATE livros 
  SET titulo = ?, autor = ?, editora = ?, ano_pub = ? 
  WHERE livro_id = ?`;

  const { changes } = await db.run(sql, [titulo, autor, editora, ano_pub, id]);

  if (changes === 1) {
    return read(id);
  } else {
    return false;
  }
}

async function remove(id) {
  const db = await Database.connect();

  const sql = 
  `DELETE FROM livros 
  WHERE livro_id = ?`;

  const { changes } = await db.run(sql, [id]);

  return changes === 1;
}

export default {
  create,
  readAll,
  read,
  update,
  remove,
};