import './modules/jquery-3.7.1.slim.min.js'
import { redirectSearch } from './services/utils.js'

// Function to set the active class on the nav link that matches the current URL
function setActiveNavLink() {
  // Get the current pathname (without the domain name, e.g., "/about.html")
  const currentPath = window.location.pathname

  // Select all navigation links (anchor elements inside the nav)
  let navLinks = document.querySelectorAll('#nav a')

  // Loop through each nav link
  navLinks.forEach((link) => {
    // Check if the href attribute of the link matches the currentPath
    if (link.getAttribute('href') === currentPath) {
      // Add the 'active' class to the matching link
      link.parentElement.classList.add('active')
    }
  })

  // For mobile navigations
  navLinks = document.querySelectorAll('#mobile-nav a')

  navLinks.forEach((link) => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active')
    }
  })
}

fetch('/components/header.html')
  .then((response) => response.text())
  .then((data) => {
    document.getElementById('header-placeholder').innerHTML = data

    // Function to open mobile menu
    $('#menu-icon').on('click', () => {
      $('#mobile-menu').css('transform', 'translateX(0)')
      $('#nav-backdrop').css('display', 'block')
    })

    // Function to close mobile menu
    const closeMobileMenu = () => {
      $('#mobile-menu').css('transform', 'translateX(100%)')
      $('#nav-backdrop').css('display', 'none')
    }

    // Close mobile menu on backdrop click or close icon click
    $('#nav-backdrop').on('click', closeMobileMenu)
    $('#close-icon').on('click', closeMobileMenu)

    // Media query function to auto-close menu at specific screen width
    const handleResize = (e) => {
      if (e.matches) {
        // If the screen width is smaller or equal to 1024px
        closeMobileMenu() // Automatically close the mobile menu
      }
    }

    // Create a media query list object to watch for screen width <= 1024px
    const mediaQuery = window.matchMedia('(min-width: 1024px)') // Adjust to your desired screen width

    // Add listener to the media query to handle screen size change
    mediaQuery.addEventListener('change', handleResize)

    // Call the function to set the active nav link after the header is loaded
    setActiveNavLink()

    // Search Implementation
    const inputs = document.querySelectorAll('.search-input')
    const searchButtons = document.querySelectorAll('.search-icon')

    inputs.forEach((input) => {
      input.addEventListener('keypress', function (event) {
        // Check if the pressed key is Enter
        if (event.key === 'Enter') {
          // Prevent the default action (if necessary)
          event.preventDefault()

          redirectSearch(input.value)
        }
      })

      input.addEventListener('input', function () {
        const currentValue = input.value
        inputs.forEach((otherInput) => {
          // Update all other inputs except the current one
          if (otherInput !== input) {
            otherInput.value = currentValue
          }
        })
      })
    })

    searchButtons.forEach(button => {
      button.addEventListener('click', () => {
        redirectSearch(inputs[0].value)
      })
    })
  })

// Load footer component
fetch('/components/footer.html')
  .then((response) => response.text())
  .then((data) => {
    document.getElementById('footer-placeholder').innerHTML = data
  })
