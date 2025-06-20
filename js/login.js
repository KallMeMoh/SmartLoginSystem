if (localStorage.getItem('loggedIn') === 'true') {
  window.location.href = '/SmartLoginSystem/home.html';
}

const emailInput = document.querySelector(`#signinEmail`);
const passwordInput = document.querySelector(`#signinPassword`);
const loginButton = document.querySelector(`#loginBtn`);
const errorMessage = document.querySelector(`#errorMessage`);
const successMessage = document.querySelector(`#successMessage`);

let users = [];
/*
{username, email, password}
*/
if (localStorage.getItem('users') !== null) {
  users = JSON.parse(localStorage.getItem('users'));
}

function login() {
  const email = emailInput.value;
  const password = passwordInput.value;

  const user = users.find(function (user) {
    return user.email === email;
  });

  if (user && user.password === password) {
    emailInput.classList.remove('is-invalid');
    passwordInput.classList.remove('is-invalid');
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('currentUser', JSON.stringify(user));
    successMessage.parentElement.classList.remove('d-none');
    setTimeout(function () {
      successMessage.parentElement.classList.add('d-none');
      window.location.href = '/SmartLoginSystem/home.html';
    }, 3000);
  } else {
    emailInput.classList.add('is-invalid');
    emailInput.classList.remove('is-valid');
    passwordInput.classList.add('is-invalid');
    passwordInput.classList.remove('is-valid');

    errorMessage.parentElement.classList.remove('d-none');
    setTimeout(function () {
      errorMessage.parentElement.classList.add('d-none');
    }, 3000);
  }
}

loginButton.addEventListener('click', login);
