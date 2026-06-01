/* login.js — Login & Register Logic */

/* --- Check if already logged in --- */
/* If user is already logged in, skip the login page */
var existingUser = localStorage.getItem('chronos-user');
if (existingUser) {
  window.location.href = 'index.html';
}

/* --- Register Form --- */
document.getElementById('registerForm').addEventListener('submit', function (e) {
  e.preventDefault();

  var username = document.getElementById('regUsername').value.trim();
  var email    = document.getElementById('regEmail').value.trim();
  var password = document.getElementById('regPassword').value.trim();
  var errorEl  = document.getElementById('registerError');

  /* Check username is not empty */
  if (username === '') {
    errorEl.textContent = 'Please enter a username.';
    return;
  }
    
  /* Check email contains @ */
  if (email.indexOf('@') === -1) {
    errorEl.textContent = 'Please enter a valid email address.';
    return;
  }

  /* Check password is at least 6 characters */
  if (password.length < 6) {
    errorEl.textContent = 'Password must be at least 6 characters.';
    return;
  }

  /* Check if username is already taken */
  if (localStorage.getItem('chronos-user-' + username)) {
    errorEl.textContent = 'That username is already taken.';
    return;
  }

  /* Check if email is already registered */
  if (localStorage.getItem('chronos-email-' + email)) {
    errorEl.textContent = 'That email is already registered.';
    return;
  }

  /* Save account to local storage */
  var userData = { username: username, email: email, password: password };
  localStorage.setItem('chronos-user-' + username, JSON.stringify(userData));
  localStorage.setItem('chronos-email-' + email, username);

  /* Switch back to login form and show success message */
  errorEl.textContent = '';
  showLogin();
  document.getElementById('loginError').style.color = '#C9A84C';
  document.getElementById('loginError').textContent = 'Account created! You can now log in.';
});

/* --- Login Form --- */
document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();

  var identifier = document.getElementById('loginIdentifier').value.trim();
  var password   = document.getElementById('loginPassword').value.trim();
  var errorEl    = document.getElementById('loginError');

  /* Reset error color back to red */
  errorEl.style.color = '';

  /* Check fields are not empty */
  if (identifier === '' || password === '') {
    errorEl.textContent = 'Please fill in both fields.';
    return;
  }

  /* Try to find account by username first */
  var userData = null;
  var rawByUsername = localStorage.getItem('chronos-user-' + identifier);

  if (rawByUsername) {
    userData = JSON.parse(rawByUsername);
  } else {
    /* Try by email */
    var usernameFromEmail = localStorage.getItem('chronos-email-' + identifier);
    if (usernameFromEmail) {
      var rawByEmail = localStorage.getItem('chronos-user-' + usernameFromEmail);
      if (rawByEmail) {
        userData = JSON.parse(rawByEmail);
      }
    }
  }

  /* If no account found */
  if (!userData) {
    errorEl.textContent = 'No account found with that username or email.';
    return;
  }

  /* Check password matches */
  if (userData.password !== password) {
    errorEl.textContent = 'Incorrect password.';
    return;
  }

  /* Login successful — save and redirect */
  localStorage.setItem('chronos-user', userData.username);
  window.location.href = 'index.html';
});
