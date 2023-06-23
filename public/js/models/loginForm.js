function loadLoginFormSubmit() {
  const form = document.getElementById('loginForm');

  form.onsubmit = async (event) => {
    event.preventDefault();
    const email = document.querySelector('#email').value;
    const senha = document.querySelector('#senha').value;
    const usuario = { email, senha };

    try {
      const response = await fetch('/login', {
        method: 'POST',
        body: JSON.stringify(usuario),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  } catch (error) {
    console.log(error);
  }
}}

loadLoginFormSubmit();