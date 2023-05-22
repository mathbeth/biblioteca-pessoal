import Database from "./database.js";

async function up() {
  const db = await Database.connect();

  const usuariosSql = `
  CREATE TABLE usuarios (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    email TEXT,
    senha TEXT,
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
      user_id INTEGER references usuarios (user_id),
      livro_id INTEGER references livros (livro_id),
      status TEXT,
      classificacao INTEGER,
      resenha TEXT,
      data_inicio DATE,
      data_fim DATE
    )`;

  await db.run(estanteSql);
}

export default { up };