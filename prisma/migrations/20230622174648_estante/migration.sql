/*
  Warnings:

  - You are about to drop the `Estante` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Estante";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Meus_livros" (
    "user_id" INTEGER NOT NULL,
    "livro_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "avaliacao" INTEGER,
    "resenha" TEXT,
    "data_inicio" DATETIME,
    "data_fim" DATETIME,

    PRIMARY KEY ("user_id", "livro_id"),
    CONSTRAINT "Meus_livros_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Usuarios" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Meus_livros_livro_id_fkey" FOREIGN KEY ("livro_id") REFERENCES "Livros" ("livro_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
