import prisma from '../database/index.js';
import bcrypt from 'bcrypt';
const saltRounds = Number(process.env.SALT);

async function create(usuario) {
  usuario.senha = await bcrypt.hash(usuario.senha, saltRounds);

  const novoUsuario = await prisma.usuarios.create({
    data: usuario,
  });

  return novoUsuario;
}

async function readAll() {
  const usuarios = await prisma.usuarios.findMany();

  return usuarios;
}

async function read(id) {
  const usuario = await prisma.usuarios.findUnique({
    where: {
      user_id: id
    },
  });

  return usuario;
}

async function readByUsername(username) {
  const usuario = await prisma.usuarios.findUnique({
    where: {
      username: username
    },
  });

  return usuario;
}

async function readByEmail(email) {
  const usuario = await prisma.usuarios.findUnique({
    where: {
      email: email
    },
  });

  return usuario;
}

async function readByEmailAndPassword(email, senha) {
  const usuario = await prisma.usuarios.findFirst({
    where: {
      email: email,
      senha: senha,
    },
  });

  return usuario;
}

async function auth(email, senha) {
  const usuario = await prisma.usuarios.findUnique({
    where: { email },
    select: {
      user_id: true,
      senha: true
    }
  })

  if (usuario) {
    
    const match =  bcrypt.compareSync(senha, usuario.senha);

    if (match) {
      return usuario.user_id;
    }
  }
    return 0;

} 

async function update(id, usuario) {
  const updatedUsuario = await prisma.usuarios.update({
    where: {
      user_id: id,
    },

    data: usuario,
    include: {
      usuario: true
    },
  });

  return updatedUsuario;
}

async function remove(id) {
  const usuarioId = parseInt(id);

  const removedUsuario = await prisma.usuarios.delete({
    where: {
      user_id: usuarioId,
    },
  });

  return removedUsuario;
}

export default { 
  create, 
  readAll, 
  read, 
  readByUsername,
  readByEmail,
  readByEmailAndPassword,
  auth,
  update, 
  remove 
};