function getBookView(livro) {
  return `
    <div class="col" id="livro-${livro.id}">
      <div class="card">
        <div class="card-header">
          ${livro.titulo}
          <div class="icon-trash" style="float: right; display: inline">
            <span
              class="iconify"
              data-icon="solar:trash-bin-minimalistic-broken"
              style="font-size: 1.2rem"
            >
            </span>
          </div>
        </div>
        <div class="card-body">
          <div>
            <span class="fw-bold">Autor:</span> ${livro.autor}
          </div>
          <div>
            <span class="fw-bold">Editora:</span> ${livro.editora}
          </div>
          <div>
            <span class="fw-bold">Ano de publicação:</span> ${livro.ano_pub}
          </div>
        </div>
      </div>
    </div>
  `;
}
function addBookView(livro) {
  const livroGrid = document.querySelector('#livro-grid');

  const livroView = getBookView(livro);

  livroGrid.insertAdjacentHTML('beforeend', livroView);

  const livroCard = document.querySelector(`#livro-${livro.id}`);

  livroCard.querySelector('.icon-trash').onclick = async () => {
    fetch(`/livros/${livro.id}`, {
      method: 'delete',
    });

    livroCard.remove();
  };
}

async function loadBooks() {
  const response = await fetch('/livros');

  const livros = await response.json();

  for (const livro of livros) {
    addBookView(livro);
  }
}

function loadBooksSelect() {
  loadBooks();
}

window.onload = loadBooksSelect;
