import '../main.js'
import '../modules/splide.min.js'

new Splide('.splide', {
  rewind: true,
  perPage: 2,
  arrows: false,
  pagination: false,
  gap: '32px'
}).mount();
