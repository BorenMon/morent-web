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
    const {background_image, title, description, text_color, button_text, button_color, button_text_color, popup_image} = slide;

    li.style.backgroundImage = `url(${getAssetUrl(background_image)})`;
    
    li.innerHTML = `
      <div class="text-[${text_color}] w-[284px] space-y-[16px]">
        <h2 class="text-[32px] font-[600]">${title}</h2>
        <p>${description}</p>
        <button class="h-[44px] px-[20px] bg-[${button_color}] rounded-[4px]" text-[${button_text_color}]><a href="#">${button_text}</a></button>
      </div>
      <img src="${getAssetUrl(popup_image)}" alt="" class="w-full h-[116px] absolute right-[8%] object-contain object-right">
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
