import { toast } from '../services/sweetalert2.js';
import { register, login } from '../services/auth.js';

const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');

registerBtn.addEventListener('click', () => {
  container.classList.add('active');
});

loginBtn.addEventListener('click', () => {
  container.classList.remove('active');
});

document.getElementById('login').addEventListener('submit', async e => {
  e.preventDefault();

  const email = document.querySelector('#login input[name="email"]').value;
  const password = document.querySelector('#login input[name="password"]').value;

  if (!email || !password) {
    toast('Please fill out all required fields.', 'error');
    return;
  }
  
  if (await login(email, password)) {
    window.location.href = '/';
  }
});

document.getElementById('register').addEventListener('submit', async e => {
  e.preventDefault();

  const email = document.querySelector('#register input[name="email"]').value;
  const password = document.querySelector('#register input[name="password"]').value;
  const confirmPassword = document.querySelector('#register input[name="confirmPassword"]').value;

  if (!email ||!password ||!confirmPassword) {
    toast('Please fill out all required fields.', 'error');
    return;
  }

  if (password!== confirmPassword) {
    toast('Passwords do not match.', 'error');
    return;
  }
  
  if (await register(email, password)) {
    e.target.reset();
    container.classList.remove('active');
  }
});
