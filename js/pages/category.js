import '../main.js'
import '../modules/select2.min.js'
import { cities } from '../../config/locationMasterData.js'
import { getAssetUrl, fetchCollection } from '../services/directusAPI.js';
import { formatToTwoDecimals, refreshFavoriteEvent, checkIsFavorite } from '../services/utils.js';

$('.city').select2({
  width: '100%',
  data: [
    { id: '', text: 'Select your city', value: '' },
    ...cities
  ],
});

const displayRecommendation = async () => {
  const cars = (await fetchCollection('cars?filter[status][_eq]=published&limit=9')).data;

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
      <a href="#"><img src="${getAssetUrl(card_image)}" alt=""></a>
      <div class="space-y-[24px]">
        <div>
          <div>
            <img src="/assets/icons/gas-station.svg" alt="" class="icon">
            <span>${gasoline}L</span>
          </div>
          <div>
            <img src="/assets/icons/car.svg" alt="" class="icon">
            <span>${steering}</span>
          </div>
          <div>
            <img src="/assets/icons/profile-2user.svg" alt="" class="icon">
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
          <button>
            Rent Now
          </button>
        </div>
      </div>
    `
    
    recommendation.appendChild(div);
  });
}

displayRecommendation().then(refreshFavoriteEvent);

$('#filter-button').on('click', () => {
  $('#filter').addClass('open');
  $('#filter-backdrop').css('display', 'block');
})

const closeFilter = () => {
  $('#filter-backdrop').css('display', 'none');
  $('#filter').removeClass('open');
}

$('#close-filter').on('click', closeFilter);
$('#filter-backdrop').on('click', closeFilter);

const filterHandleResize = (e) => {
  if (e.matches) {
    closeFilter();
  }
}

const filterMediaQuery = window.matchMedia('(min-width: 1100px)');

filterMediaQuery.addEventListener('change', filterHandleResize);