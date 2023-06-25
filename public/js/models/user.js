function createUser(usuario) {
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
    createUser(usuario);
  }
}

function enviaForm() {
  const form = document.querySelector('form');
  form.onsubmit = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username').value;

    const email = document.querySelector('#email').value;

    const senha = document.querySelector('#senha').value;

    const confirma_senha = document.querySelector('#confirma_senha').value;

    const usuario = { username, email, senha, confirma_senha };

    const response = await fetch('/cadastro', {
      method: 'POST',
      body: JSON.stringify(usuario),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.ok) {
      const novoUsuario = await response.json();

      createUser(novoUsuario);
      
      form.reset();
      
      document.querySelector('#submitForm').click();
      
      alert('Usuário cadastrado com sucesso!');
      
      window.location.href = '/login';
    } else {
      alert('Erro ao cadastrar usuário!');
    }   
  };
}

enviaForm();