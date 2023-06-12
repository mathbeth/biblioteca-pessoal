function addUsuario(usuario) {
  fetch('/cadastro', {
    method: 'POST',
    body: JSON.stringify(usuario),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
async function loadUsuarios() {
  const response = await fetch('/usuarios');

  const usuarios = await response.json();

  for (const usuario of usuarios) {
    addUsuario(usuario);
  }
}

function loadFormSubmit() {
  const form = document.querySelector('form');

  form.onsubmit = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username').value;

    const email = document.querySelector('#email').value;

    const senha = document.querySelector('#senha').value;

    const usuario = { username, email, senha };

    const response = await fetch('/cadastro', {
      method: 'POST',
      body: JSON.stringify(usuario),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const novoUsuario = await response.json();
    
    addUsuario(novoUsuario);
  
    form.reset();

    document.querySelector('#submitForm').click();

    window.location.href = '/login';
  };
}

// A parte do login ainda não funciona
function addLoginUsuario(usuario) {
  fetch('/login', {
    method: 'POST',
    body: JSON.stringify(usuario),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

function loadLoginFormSubmit() {
  const form = document.getElementById('loginForm');

  form.onsubmit = async (event) => {
    event.preventDefault();
    const email = document.querySelector('#email').value;

    const senha = document.querySelector('#senha').value;

    const usuario = { email, senha };

    const response = await fetch('/login', {
      method: 'POST',
      body: JSON.stringify(usuario),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const novoLogin = await response.json();

    if (response.ok) {
      console.log(`${novoLogin.user_id}`);

      localStorage.setItem('user_id', novoLogin.user_id);
      localStorage.setItem('email', novoLogin.email);

      const user_id = localStorage.getItem('user_id');
      const email = localStorage.getItem('email');

      console.log(`User ID armazenado: ${user_id}`);
      console.log(`Email armazenado: ${email}`);
    } else {
      console.log('error');
    }

    form.reset();
    document.querySelector('#submitForm').click();

    window.location.href = "/perfil";
  };
}

function getBookView(livro) {
  const { livro_id, titulo, autor, editora, ano_pub } = livro;

  return `
    <div class="col" id="livro-${livro_id}">
      <div class="card">
        <div class="card-header">
          ${titulo}
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
            <span class="fw-bold">Autor:</span> ${autor}
          </div>
          <div>
            <span class="fw-bold">Editora:</span> ${editora}
          </div>
          <div>
            <span class="fw-bold">Ano de publicação:</span> ${ano_pub}
          </div>
        </div>
      </div>
    </div>
  `;
}

async function addBookView(livro) {
  const livroGrid = document.querySelector('#livro-grid');

  const livroView = getBookView(livro);

  livroGrid.insertAdjacentHTML('beforeend', livroView);

  const livroCard = document.querySelector(`#livro-${livro.livro_id}`);

  const iconTrash = livroCard.querySelector('.icon-trash');
  iconTrash.addEventListener('click', async () => {
    await fetch(`/livros/${livro.livro_id}`, {
      method: 'DELETE',
    });

    livroCard.remove();
  });
}

async function loadBooks() {
  const response = await fetch('/livros');
  const livros = await response.json();

  for (const livro of livros) {
    await addBookView(livro);
  }
}

loadFormSubmit();
loadBooks();