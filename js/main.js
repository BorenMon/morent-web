import * as $ from './modules/jquery-3.7.1.slim.min.js';

window.$ = $;

document.addEventListener("DOMContentLoaded", function () {
  // Create a script element for Tailwind CSS
  const tailwindScript = document.createElement('script');
  tailwindScript.src = '/js/modules/tailwind.js';

  // Append the script to the head
  document.head.appendChild(tailwindScript);
});

