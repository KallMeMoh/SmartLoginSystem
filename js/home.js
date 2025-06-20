let user = {};
if (localStorage.getItem('currentUser') !== null) {
  user = JSON.parse(localStorage.getItem('currentUser'));
}

if (
  localStorage.getItem('loggedIn') !== 'true' &&
  user.username === undefined
) {
  window.location.href = 'index.html';
} else {
  document.querySelector('#username').textContent = user.username;
}

const logoutButton = document.querySelector('#logoutBtn');
logoutButton.addEventListener('click', function (e) {
  localStorage.removeItem('loggedIn');
  localStorage.removeItem('currentUser');
  window.location.href = 'index.html';
});
