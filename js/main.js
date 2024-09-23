import * as $ from './modules/jquery-3.7.1.js'

// console.log($)

// $(document).ready(function() {
//   // Load Tailwind CSS with specific plugins from CDN
//   const link = $('<link>', {
//     href: 'https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,line-clamp,container-queries',
//     rel: 'stylesheet'
//   });

//   // Append the link to the head
//   $('head').append(link);

//   // Use Tailwind classes after the stylesheet is loaded
//   link.on('load', function() {
//     const button = $('<button>', {
//       text: 'Click Me',
//       class: 'bg-blue-500 text-white p-2 rounded'
//     });

//     // Toggle background color on button click
//     button.on('click', function() {
//       $('.container').toggleClass('bg-gray-200');
//     });

//     // Append the button to the container
//     $('.container').append(button);
//   });
// });
