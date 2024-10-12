import '../main.js'
import { getAssetUrl, fetchCollection } from '../services/directusAPI.js'
import {
  formatToTwoDecimals,
  refreshFavoriteEvent,
  checkIsFavorite,
} from '../services/utils.js'

$('#filter-button').on('click', () => {
  $('#filter').addClass('open')
  $('#filter-backdrop').css('display', 'block')
})

const closeFilter = () => {
  $('#filter-backdrop').css('display', 'none')
  $('#filter').removeClass('open')
}

$('#close-filter').on('click', closeFilter)
$('#filter-backdrop').on('click', closeFilter)

const filterHandleResize = (e) => {
  if (e.matches) {
    closeFilter()
  }
}

const filterMediaQuery = window.matchMedia('(min-width: 1100px)')

filterMediaQuery.addEventListener('change', filterHandleResize)

const displayFavorites = async () => {
  const favoriteIds = JSON.parse(localStorage.getItem('savedFavorites') || '[]')

  const cars = (await fetchCollection(`cars?filter[status][_eq]=published&filter[id][_in]=${favoriteIds.join(',')}`)).data

  const favorites = document.querySelector('#favorites > div')
  favorites.innerHTML = '' // Clear previous content

  if (cars.length > 0) {
    cars.forEach((car) => {
      const div = document.createElement('div')
      div.className = 'car-card'
      const {
        id,
        model,
        type,
        card_image,
        gasoline,
        steering,
        capacity,
        price,
        has_promotion,
        promotion_price,
      } = car
      div.setAttribute('data-id', id)
      const { iconPath } = checkIsFavorite(id)
  
      div.innerHTML = `
        <div>
          <div class="-mt-[5px]">
            <div class="text-[20px] font-bold text-[#1A202C]">
              ${model}
            </div>
            <div class="text-[14px] font-bold text-[#90A3BF]">${type}</div>
          </div>
          <img
            src="${iconPath}"
            alt=""
            class="icon favorite"
          />
        </div>
        <div class="info">
          <a href="#"
            ><img
              src="${getAssetUrl(card_image)}"
              alt=""
          /></a>
          <div class="space-y-[48px] details">
            <div class="space-y-[12px]">
              <div class="space-x-[12px]">
                <img
                  src="/assets/icons/car-body.svg"
                  alt=""
                  class="icon"
                />
                <span class="name">Type</span>
                <span>${type}</span>
              </div>
              <div class="space-x-[12px]">
                <img src="/assets/icons/car.svg" alt="" class="icon" />
                <span class="name">Steering</span>
                <span>${steering}</span>
              </div>
              <div class="space-x-[12px]">
                <img
                  src="/assets/icons/profile-2user.svg"
                  alt=""
                  class="icon"
                />
                <span class="name">Capacity</span>
                <span>${capacity} People</span>
              </div>
              <div class="space-x-[12px]">
                <img src="/assets/icons/gas-station.svg" alt="" class="icon" />
                <span class="name">Gasoline</span>
                <span>${gasoline}L</span>
              </div>
            </div>
            <div>
              <div class="font-bold">
                <div>
                  <span class="text-[20px] text-[#1A202C]">$${formatToTwoDecimals(has_promotion ? promotion_price : price)}/</span> <span class="text-[#90A3BF] text-[14px]">day</span>
                </div>
                ${has_promotion ? '<s class="text-[14px] text-[#90A3BF]">$' + formatToTwoDecimals(price) + '</s>' : ''}
              </div>
              <button>Rent Now</button>
            </div>
          </div>
        </div>
      `
  
      favorites.appendChild(div)
    })
  } else {
    favorites.innerHTML = '<div class="text-center text-[24px] text-[#90A3BF]">No favorite cars found.</div>'
  }
}

displayFavorites().then(refreshFavoriteEvent)
