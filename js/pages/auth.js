import { toast } from '../services/sweetalert2.js';
import { register } from '../services/auth.js';

const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');

registerBtn.addEventListener('click', () => {
  container.classList.add('active');
});

loginBtn.addEventListener('click', () => {
  container.classList.remove('active');
});

document.getElementById('login').addEventListener('submit', e => {
  e.preventDefault();
});

document.getElementById('register').addEventListener('submit', e => {
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
  
  register({
    email,
    password
  })
});
