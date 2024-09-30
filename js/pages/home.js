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
    const {background_image} = slide;

    li.style.backgroundImage = `url('https://boren-do-v1.online/morent-cms/assets/5cce4a7e-fd00-4f46-bfff-f03db2c144a8')`;
    
    li.innerHTML = `
      <div class="text-white w-[284px] space-y-[16px]">
        <h2 class="text-[32px] font-[600]">The Best Platform for Car Rental</h2>
        <p>Ease of doing a car rental safely and reliably. Of course at a low price.</p>
        <button class="h-[44px] px-[20px] bg-[#3563E9] rounded-[4px]"><a href="#">Rental Car</a></button>
      </div>
      <img src="./image 7.png" alt="" class="w-[406px] h-[116px] absolute right-[8%] object-contain">
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
