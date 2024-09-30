import '../main.js'
import '../modules/splide.min.js'
import { getAssetUrl, fetchCollection } from '../services/directusAPI.js';

async function fetchSlides() {
  return await fetchCollection('slides');
}

async function displaySlides() {
  const slides = await fetchSlides();

  const slideWrapper = document.getElementById('slide-wrapper');

  slides.forEach(slide => {
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
      <img src="${getAssetUrl(popup_image)}" alt="">
    `

    slideWrapper.appendChild(li);
  });
}

displaySlides().then(() => {
  new Splide('.splide', {
    rewind: true,
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
