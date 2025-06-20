if (localStorage.getItem('loggedIn') === 'true') {
  window.location.href = 'home.html';
}

const usernameInput = document.querySelector(`#signupName`);
const emailInput = document.querySelector(`#signinEmail`);
const passwordInput = document.querySelector(`#signinPassword`);
const signupButton = document.querySelector(`#signupBtn`);
const errorMessage = document.querySelector(`#errorMessage`);
const successMessage = document.querySelector(`#successMessage`);

usernameInput.addEventListener('input', validateInput);
usernameInput.addEventListener('focus', validateInput);
emailInput.addEventListener('input', validateInput);
emailInput.addEventListener('focus', validateInput);
passwordInput.addEventListener('input', validateInput);
passwordInput.addEventListener('focus', validateInput);

function isValid() {
  var regex = {
    username: /^\w{3,}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    password: /^\w{8,15}$/,
  };

  return {
    signupName: regex.username.test(usernameInput.value),
    signinEmail: regex.email.test(emailInput.value),
    signinPassword: regex.password.test(passwordInput.value),
  };
}

function validateInput(e) {
  var validationObj = isValid();
  if (validationObj[e.target.id]) {
    e.target.classList.remove('is-invalid');
    e.target.classList.add('is-valid');
  } else {
    e.target.classList.add('is-invalid');
    e.target.classList.remove('is-valid');
  }
}

function signup(e) {
  const username = usernameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;

  let users = [];
  if (localStorage.getItem('users') !== null) {
    users = JSON.parse(localStorage.getItem('users'));
  }

  const user = users.find(function (user) {
    return user.email === email || user.username === username;
  });

  if (user) {
    errorMessage.parentElement.classList.remove('d-none');
    setTimeout(function () {
      errorMessage.parentElement.classList.add('d-none');
    }, 3000);
  } else {
    usernameInput.classList.remove('is-valid');
    emailInput.classList.remove('is-invalid');
    emailInput.classList.add('is-valid');

    const newUser = {
      username: username,
      email: email,
      password: password,
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    successMessage.parentElement.classList.remove('d-none');
    setTimeout(function () {
      successMessage.parentElement.classList.add('d-none');
      window.location.href = 'index.html';
    }, 3000);
  }
}

signupButton.addEventListener('click', signup);
