import '../main.js'
import '../modules/splide.min.js'
import '../modules/select2.min.js'
import { getAssetUrl, fetchCollection } from '../services/directusAPI.js';
import { cities } from '../../config/locationConfig.js'

async function fetchSlides() {
  return await fetchCollection('slides');
}

async function displaySlides() {
  const slides = await fetchSlides();

  const slideWrapper = document.getElementById('slide-wrapper');

  slides.forEach((slide, index) => {
    const li = document.createElement('li');
    li.className = 'splide__slide';
    const {background_image, title, description, text_color, button_text, button_color, button_text_color, popup_image, link_url} = slide;

    li.style.backgroundImage = `url(${getAssetUrl(background_image)})`;
    
    li.innerHTML = `
      <div class="text-[${text_color}] space-y-[16px]">
        <h2>${title}</h2>
        <p>${description}</p>
        <button class="bg-[${button_color}]" text-[${button_text_color}]><a href="${link_url}">${button_text}</a></button>
      </div>
      <img src="${getAssetUrl(popup_image)}" alt="" class="pl-[${index == 0 ? '24px' : '56px'}]">
    `

    slideWrapper.appendChild(li);
  });
}

displaySlides().then(() => {
  new Splide('#slider', {
    type: 'loop',
    autoplay: true,
    interval: 5000,
    perPage: 2,
    arrows: false,
    pagination: false,
    gap: '32px',
    breakpoints: {
      1000: {
        perPage: 1
      }
    }
  }).mount();
});

$('.city').select2({
  width: '100%',
  data: [
    { id: '', text: 'Select your city', value: '' },
    ...cities
  ],
});

new Splide('#popular', {
  arrows: false,
  pagination: false,
  gap: '32px',
  autoWidth: true
}).mount();
