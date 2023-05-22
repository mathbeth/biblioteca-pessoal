import Database from "../database/database.js";

async function create(usuario) {
  const db = await Database.connect();

  const { username, email, senha } = usuario;

  const sql = 
  `INSERT INTO usuarios 
  (username, email, senha) 
  VALUES (?, ?, ?)`;

  const { lastID } = await db.run(sql, [username, email, senha]);

  return read(lastID);
}

async function readAll() {
  const db = await Database.connect();

  const sql = `SELECT * FROM usuarios`;

  const usuarios = await db.all(sql);

  return usuarios;
}

async function read(id) {
  const db = await Database.connect();

  const sql = `SELECT * FROM usuarios WHERE user_id = ?`;

  const usuario =  await db.get(sql, [id]);

  return usuario;
}

async function update(id, usuario) {
  const db = await Database.connect();

  const { username, email, senha } = usuario;

  const sql = 
  `UPDATE usuarios 
  SET username = ?, email = ?, senha = ? 
  WHERE user_id = ?`;

  const { changes } = await db.run(sql, [username, email, senha, id]);

  if (changes === 1) {
    return read(id);
  } else {
    return false;
  }
}

async function remove(id) {
  const db = await Database.connect();

  const sql = 
  `DELETE FROM usuarios 
  WHERE user_id = ?`;

  const { changes } = await db.run(sql, [id]);

  return changes === 1;
}

export default { 
  create, 
  readAll, 
  read, 
  update, 
  remove 
};