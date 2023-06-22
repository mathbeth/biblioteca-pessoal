import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


async function main() {
  
  const user1 = await prisma.usuarios.create({
    data: {
      user_id: 1,
      username: 'matheus',
      email: 'matheus@example.com',
      senha: 'senhasenha'
    }
  });
  const user2 = await prisma.usuarios.create({
    data: {
      user_id: 2,
      username: 'heleny',
      email: 'heleny@example.com',
      senha: 'senhasenha'
    }
  });
  
  const user3 = await prisma.usuarios.create({
    data: {
      user_id: 3,
      username: 'jhullia',
      email: 'jhullia@example.com',
      senha: 'senhasenha'
    }
  });

  const user4 = await prisma.usuarios.create({
    data: {
      user_id: 4,
      username: 'gabi',
      email: 'gabi@example.com',
      senha: 'senhasenha'
    }
  });

  const livro1 = await prisma.livros.create({
    data: {
      livro_id: 1,
      titulo: '1984',
      autor: 'George Orwell',
      editora: 'Secker & Warburg',
      genero: 'Ficção'
    }
  });
  
  const livro2 = await prisma.livros.create({
    data: {
      livro_id: 2,
      titulo: 'Orgulho e Preconceito',
      autor: 'Jane Austen',
      editora: 'T. Egerton, Whitehall',
      genero: 'Romance'
    }
  });

  const livro3 = await prisma.livros.create({
    data: {
      livro_id: 3,
      titulo: 'Cem Anos de Solidão',
      autor: 'Gabriel García Márquez',
      editora: 'Harper & Row',
      genero: 'Ficção'
    }
  });
  
  const livro4 = await prisma.livros.create({
    data: {
      livro_id: 4,
      titulo: 'O Grande Gatsby',
      autor: 'F. Scott Fitzgerald',
      editora: 'Charles Scribners Sons',
      genero: 'Romance'
    }
  });
  
  const livro5 = await prisma.livros.create({
    data: {
      livro_id: 5,
      titulo: 'Dom Quixote',
      autor: 'Miguel de Cervantes',
      editora: 'Francisco de Robles',
      genero: 'Romance'
    }
  });

  const estante1 = await prisma.meus_livros.create({
    data: {
      user_id: 1,
      livro_id: 1,
      status: "Lendo",
      avaliacao: 4,
      resenha: "Ótimo livro!",
      data_inicio: null,
      data_fim: null
    }
  })
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });