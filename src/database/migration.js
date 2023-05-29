import Database from "./database.js";

async function up() {
  const db = await Database.connect();

  const usuariosSql = `
  CREATE TABLE usuarios (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    senha TEXT NOT NULL CHECK(LENGTH(senha) >= 8),
    UNIQUE (username, email)
  )`;
  
  await db.run(usuariosSql);

  const livrosSql = `
  CREATE TABLE livros (
    livro_id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT,
    autor TEXT,
    editora TEXT,
    ano_pub INTEGER
  )`;

  await db.run(livrosSql);

  const estanteSql = `
    CREATE TABLE estante (
      user_id INTEGER,
      livro_id INTEGER,
      status TEXT,
      classificacao INTEGER,
      resenha TEXT,
      data_inicio DATE,
      data_fim DATE,
      FOREIGN KEY (user_id) REFERENCES usuarios(user_id),
      FOREIGN KEY (livro_id) REFERENCES livros(livro_id)
    )`;

  await db.run(estanteSql);
}

export default { up };