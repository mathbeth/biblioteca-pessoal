// Obtém os dados do arquivo JSON
async function main() {
    const response = await fetch("/public/data/livros.json");
    const data = await response.json();
  
    // Obtém a lista de livros
    const listaLivros = document.getElementById("lista-livros");
  
    // Itera sobre os livros do arquivo JSON e adiciona-os à lista
    data.livros.forEach((livro) => {
      // Cria um elemento de livro
      const elementoLivro = document.createElement("li");
      elementoLivro.classList.add("livro");
  
      // Adiciona a imagem do livro
      const imagem = document.createElement("img");
      imagem.src = livro.imagem;
      elementoLivro.appendChild(imagem);
  
      // Adiciona o nome do livro
      const nome = document.createElement("h3");
      nome.innerText = livro.nome;
      elementoLivro.appendChild(nome);
  
      // Adiciona o autor do livro
      const autor = document.createElement("p");
      autor.innerText = `Autor: ${livro.autor}`;
      elementoLivro.appendChild(autor);
  
      // Adiciona o ano de publicação do livro
      const ano = document.createElement("p");
      ano.innerText = `Ano de Publicação: ${livro.ano}`;
      elementoLivro.appendChild(ano);
  
      // Adiciona o elemento de livro à lista
      listaLivros.appendChild(elementoLivro);
    });
  }
  
  main();
  