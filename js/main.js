import './modules/jquery-3.7.1.slim.min.js'

// Function to open mobile menu
$('#menu-icon').on('click', () => {
  $('#mobile-menu').css('transform', 'translateX(0)');
  $('#backdrop').css('display', 'block');
})

// Function to close mobile menu
const closeMobileMenu = () => {
  $('#mobile-menu').css('transform', 'translateX(100%)');
  $('#backdrop').css('display', 'none');
}

// Close mobile menu on backdrop click or close icon click
$('#backdrop').on('click', closeMobileMenu);
$('#close-icon').on('click', closeMobileMenu);

// Media query function to auto-close menu at specific screen width
const handleResize = (e) => {
  if (e.matches) {  // If the screen width is smaller or equal to 1024px
    closeMobileMenu();  // Automatically close the mobile menu
  }
}

// Create a media query list object to watch for screen width <= 1024px
const mediaQuery = window.matchMedia('(min-width: 1024px)'); // Adjust to your desired screen width

// Add listener to the media query to handle screen size change
mediaQuery.addEventListener('change', handleResize);