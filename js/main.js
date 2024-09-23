import * as $ from './modules/jquery-3.7.1.js';

window.$ = $;

document.addEventListener("DOMContentLoaded", function () {
  // Create a script element for Tailwind CSS
  const tailwindScript = document.createElement('script');
  tailwindScript.src = 'https://cdn.tailwindcss.com';

  // Append the script to the head
  document.head.appendChild(tailwindScript);
});

