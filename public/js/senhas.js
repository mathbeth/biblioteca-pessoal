// Get the password and repeat password fields
var password = document.getElementById('password');
var confirmPassword = document.getElementById('confirmpassword');
var lengthMessage = document.getElementById('length-message');
var lowercaseMessage = document.getElementById('lowercase-message');
var uppercaseMessage = document.getElementById('uppercase-message');
var numberMessage = document.getElementById('number-message');
var matchMessage = document.getElementById('match-message');

// Validate password on keyup
password.addEventListener('keyup', function () {
  // Validate length
  if (password.value.length >= 8) {
    lengthMessage.textContent = 'Comprimento válido.';
    lengthMessage.classList.remove('invalid');
    lengthMessage.classList.add('valid');
  } else {
    lengthMessage.textContent = 'A senha deve ter pelo menos 8 caracteres.';
    lengthMessage.classList.remove('valid');
    lengthMessage.classList.add('invalid');
  }

  // Validate lowercase letters
  var lowercaseLetters = /[a-z]/g;
  if (password.value.match(lowercaseLetters)) {
    lowercaseMessage.textContent = 'Contém letras minúsculas.';
    lowercaseMessage.classList.remove('invalid');
    lowercaseMessage.classList.add('valid');
  } else {
    lowercaseMessage.textContent = 'A senha deve ter pelo menos uma letra minúscula.';
    lowercaseMessage.classList.remove('valid');
    lowercaseMessage.classList.add('invalid');
  }

  // Validate capital letters
  var uppercaseLetters = /[A-Z]/g;
  if (password.value.match(uppercaseLetters)) {
    uppercaseMessage.textContent = 'Contém letras maiúsculas.';
    uppercaseMessage.classList.remove('invalid');
    uppercaseMessage.classList.add('valid');
  } else {
    uppercaseMessage.textContent = 'A senha deve ter pelo menos uma letra maiúscula.';
    uppercaseMessage.classList.remove('valid');
    uppercaseMessage.classList.add('invalid');
  }

  // Validate numbers
  var numbers = /[0-9]/g;
  if (password.value.match(numbers)) {
    numberMessage.textContent = 'Contém números.';
    numberMessage.classList.remove('invalid');
    numberMessage.classList.add('valid');
  } else {
    numberMessage.textContent = 'A senha deve ter pelo menos um número.';
    numberMessage.classList.remove('valid');
    numberMessage.classList.add('invalid');
  }
});

// Validate password match on form submit
document.querySelector('form').addEventListener('submit', function (event) {
  // If the password fields don't match
  if (password.value !== confirmPassword.value) {
    // Prevent form submission
    event.preventDefault();
    // Display an error message
    matchMessage.textContent = 'As senhas não correspondem.';
    matchMessage.classList.remove('valid');
    matchMessage.classList.add('invalid');
  } else {
    matchMessage.textContent = '';
    matchMessage.classList.remove('invalid');
    matchMessage.classList.add('valid');
  }
});
