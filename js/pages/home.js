import '../main.js'
import '../modules/splide.min.js'
import '../modules/select2.min.js'
import { getAssetUrl, fetchCollection } from '../services/publicAPI.js';
import { cities } from '../../config/location.master-data.js'
import { formatToTwoDecimals } from '../services/utils.js';
import { refreshFavoriteEvent, checkIsFavorite } from '../services/favorites.js';

$('.city').select2({
  width: '100%',
  data: [
    { id: '', text: 'Select your city', value: '' },
    ...cities
  ],
});

const displaySlides = async () => {
  const slides = (await fetchCollection('slides?filter[status][_eq]=published')).data;

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
        <button class="bg-[${button_color}] slide-button" text-[${button_text_color}]><a href="${link_url}">${button_text}</a></button>
      </div>
      <img src="${getAssetUrl(popup_image)}" loading="lazy" alt="" class="pl-[56px]">
    `

    slideWrapper.appendChild(li);
  });
}

let popularCarIds = [];
const displayPopular = async () => {
  const cars = (await fetchCollection('cars?filter[status][_eq]=published&filter[rent_times][_gte]=50&limit=8')).data;

  popularCarIds = cars.map(car => car.id);

  const popularWrapper = document.getElementById('popular-wrapper');
  popularWrapper.innerHTML = ''; // Clear previous content

  cars.forEach((car) => {
    const li = document.createElement('li');
    li.className = 'splide__slide car-card';
    const { id, model, type, card_image, gasoline, steering, capacity, price, has_promotion, promotion_price } = car;
    li.setAttribute('data-id', id);
    const { iconPath } = checkIsFavorite(id);
    
    li.innerHTML = `
      <div>
        <div class="-mt-[5px]">
          <div class="text-[20px] font-bold text-[#1A202C]">${model}</div>
          <div class="text-[14px] font-bold text-[#90A3BF]">${type}</div>
        </div>
        <img src="${iconPath}" alt="" class="icon favorite">
      </div>
      <a href="/pages/detail.html?id=${id}" aria-label="See more about car"><img src="${getAssetUrl(card_image)}" loading="lazy" alt=""></a>
      <div class="space-y-[24px]">
        <div>
          <div>
            <img src="./assets/icons/gas-station.svg" alt="" class="icon">
            <span>${gasoline}L</span>
          </div>
          <div>
            <img src="./assets/icons/car.svg" alt="" class="icon">
            <span>${steering}</span>
          </div>
          <div>
            <img src="./assets/icons/profile-2user.svg" alt="" class="icon">
            <span>${capacity} People</span>
          </div>
        </div>
        <div>
          <div class="font-bold">
            <div>
              <span class="text-[20px] text-[#1A202C]">$${formatToTwoDecimals(has_promotion ? promotion_price : price)}/</span> <span class="text-[#90A3BF] text-[14px]">day</span>
            </div>
            ${has_promotion ? '<s class="text-[14px] text-[#90A3BF]">$' + formatToTwoDecimals(price) + '</s>' : ''}
          </div>
          <button><a href="/pages/payment.html?id=${id}">Rent Now</a></button>
        </div>
      </div>
    `

    popularWrapper.appendChild(li);
  });
}

const displayRecommendation = async () => {
  const cars = (await fetchCollection(`cars?filter[status][_eq]=published&filter[rating][_gte]=4&limit=8&filter[id][_nin]=${popularCarIds.join(',')}`)).data;

  const recommendation = document.getElementById('recommendation');
  recommendation.innerHTML = ''; // Clear previous content

  cars.forEach((car) => {
    const div = document.createElement('div');
    div.className = 'car-card';
    const { id, model, type, card_image, gasoline, steering, capacity, price, has_promotion, promotion_price } = car;
    div.setAttribute('data-id', id);
    const { iconPath } = checkIsFavorite(id);
    
    div.innerHTML = `
      <div>
        <div class="-mt-[5px]">
          <div class="text-[20px] font-bold text-[#1A202C]">${model}</div>
          <div class="text-[14px] font-bold text-[#90A3BF]">${type}</div>
        </div>
        <img src="${iconPath}" alt="" class="icon favorite">
      </div>
      <a href="/pages/detail.html?id=${id}" aria-label="See more about car"><img src="${getAssetUrl(card_image)}" loading="lazy" alt=""></a>
      <div class="space-y-[24px]">
        <div>
          <div>
            <img src="./assets/icons/gas-station.svg" alt="" class="icon">
            <span>${gasoline}L</span>
          </div>
          <div>
            <img src="./assets/icons/car.svg" alt="" class="icon">
            <span>${steering}</span>
          </div>
          <div>
            <img src="./assets/icons/profile-2user.svg" alt="" class="icon">
            <span>${capacity} People</span>
          </div>
        </div>
        <div>
          <div class="font-bold">
            <div>
              <span class="text-[20px] text-[#1A202C]">$${formatToTwoDecimals(has_promotion ? promotion_price : price)}/</span> <span class="text-[#90A3BF] text-[14px]">day</span>
            </div>
            ${has_promotion ? '<s class="text-[14px] text-[#90A3BF]">$' + formatToTwoDecimals(price) + '</s>' : ''}
          </div>
          <button><a href="/pages/payment.html?id=${id}">Rent Now</a></button>
        </div>
      </div>
    `
    
    recommendation.appendChild(div);
  });
}

const getCarsCount = async () => {
  const carsCount = await fetchCollection('cars?filter[status][_eq]=published&meta=total_count&limit=0');

  $('#cars-count').text(carsCount.meta.total_count);
}

Promise.all([
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
  }), 
  displayPopular().then(() => {
    new Splide('#popular', {
      arrows: false,
      pagination: false,
      gap: '32px',
      autoWidth: true
    }).mount();
  }).then(() => {
    // Refresh favorite events only after Splide has mounted
    refreshFavoriteEvent();
    displayRecommendation().then(refreshFavoriteEvent)
  }),
  getCarsCount()
]).then(() => {
  $('#skeleton-loading').addClass('hidden');
  $('#loaded').removeClass('hidden');
});





