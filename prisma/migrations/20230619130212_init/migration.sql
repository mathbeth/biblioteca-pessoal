-- CreateTable
CREATE TABLE "Usuarios" (
    "user_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Livros" (
    "livro_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "editora" TEXT NOT NULL,
    "genero" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Estante" (
    "user_id" INTEGER NOT NULL,
    "livro_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "avaliacao" INTEGER,
    "resenha" TEXT,
    "data_inicio" DATETIME,
    "data_fim" DATETIME,

    PRIMARY KEY ("user_id", "livro_id"),
    CONSTRAINT "Estante_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Usuarios" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Estante_livro_id_fkey" FOREIGN KEY ("livro_id") REFERENCES "Livros" ("livro_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_username_key" ON "Usuarios"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_email_key" ON "Usuarios"("email");
