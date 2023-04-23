async function main() {
  const response = await fetch('/data/livros.json');
  const data = await response.json();

  const listaLivros = document.getElementById('lista-livros');

  data.livros.forEach((livro) => {
    const elementoLivro = document.createElement('li');
    elementoLivro.classList.add('livro');

    const imagem = document.createElement('img');
    imagem.src = livro.imagem;
    elementoLivro.appendChild(imagem);

    const nome = document.createElement('h3');
    nome.innerText = livro.nome;
    elementoLivro.appendChild(nome);

    const autor = document.createElement('p');
    autor.innerText = `Autor: ${livro.autor}`;
    elementoLivro.appendChild(autor);

    const ano = document.createElement('p');
    ano.innerText = `Ano de Publicação: ${livro.ano}`;
    elementoLivro.appendChild(ano);

    listaLivros.appendChild(elementoLivro);
  });
}

main();
