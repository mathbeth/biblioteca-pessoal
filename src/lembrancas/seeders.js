import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import Usuario from '../models/Usuario.js';
import Livro from '../models/Livro.js';
import Estante from '../models/Estante.js';

async function up() {
  const file = resolve('src', 'database', 'seeders.json');

  const content = JSON.parse(readFileSync(file));

  for (const usuario of content.usuarios) {
    await Usuario.create(usuario);
  }

  for (const livro of content.livros) {
    await Livro.create(livro);
  }

  for (const estante of content.estante) {
    await Estante.create(estante);
  }
}

export default { up };