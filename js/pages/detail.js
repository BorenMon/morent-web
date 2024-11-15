import '../main.js'
import '../modules/splide.min.js'
import '../modules/select2.min.js'
import { getAssetUrl, fetchCollection } from '../services/publicAPI.js'
import { formatToTwoDecimals } from '../services/utils.js'
import { refreshFavoriteEvent, checkIsFavorite } from '../services/favorites.js';
import '../modules/viewer.min.js'

const bigImage = document.getElementById('big-image')

new Viewer(bigImage, {
  inline: false,
  toolbar: {
    zoomIn: true,
    zoomOut: true,
    play: {
      show: true
    },
    rotateLeft: true,
    rotateRight: true,
    flipHorizontal: true,
    flipVertical: true,
  }
});

const displayImages = async () => {
  // const cars = (await fetchCollection('cars?filter[status][_eq]=published&filter[rent_times][_gte]=50&limit=8')).data;

  // const popularWrapper = document.getElementById('popular-wrapper');
  // popularWrapper.innerHTML = ''; // Clear previous content

  // cars.forEach((car) => {
  //   const li = document.createElement('li');
  //   li.className = 'splide__slide car-card';
  //   const { id, model, category, card_image, gasoline, type, capacity, price, has_promotion, promotion_price } = car;
  //   li.setAttribute('data-id', id);
  //   const { iconPath } = checkIsFavorite(id);
    
  //   li.innerHTML = `
  //     <div>
  //       <div class="-mt-[5px]">
  //         <div class="text-[20px] font-bold text-[#1A202C]">${model}</div>
  //         <div class="text-[14px] font-bold text-[#90A3BF]">${category}</div>
  //       </div>
  //       <img src="${iconPath}" alt="" class="icon favorite">
  //     </div>
  //     <a href="#"><img src="${getAssetUrl(card_image)}" alt=""></a>
  //     <div class="space-y-[24px]">
  //       <div>
  //         <div>
  //           <img src="/assets/icons/gas-station.svg" alt="" class="icon">
  //           <span>${gasoline}L</span>
  //         </div>
  //         <div>
  //           <img src="/assets/icons/car.svg" alt="" class="icon">
  //           <span>${type}</span>
  //         </div>
  //         <div>
  //           <img src="/assets/icons/profile-2user.svg" alt="" class="icon">
  //           <span>${capacity} People</span>
  //         </div>
  //       </div>
  //       <div>
  //         <div class="font-bold">
  //           <div>
  //             <span class="text-[20px] text-[#1A202C]">$${formatToTwoDecimals(has_promotion ? promotion_price : price)}/</span> <span class="text-[#90A3BF] text-[14px]">day</span>
  //           </div>
  //           ${has_promotion ? '<s class="text-[14px] text-[#90A3BF]">$' + formatToTwoDecimals(price) + '</s>' : ''}
  //         </div>
  //         <button>
  //           Rent Now
  //         </button>
  //       </div>
  //     </div>
  //   `

  //   popularWrapper.appendChild(li);
  // });
}

displayImages().then(() => {
  const splide = new Splide('#images-carousel', {
    arrows: false,
    pagination: false,
    gap: '24px',
    autoWidth: true,
  }).mount();

  splide.on('click', (image) => {
    let imageUrl, isMain = false;
    document.querySelectorAll('li.image').forEach(image => {
      image.classList.remove('active');
    })
    image.slide.classList.add('active')
    if (image.index != 0) {
      imageUrl = image.slide.querySelector('div').style.backgroundImage.replace(/^url\(["']?/, '').replace(/["']?\)$/, '')
    } else {
      imageUrl = image.slide.querySelector('div img').src
      isMain = true;
    }
    showImage(imageUrl, isMain);
  })
})

const showImage = (imageUrl, isMain) => {
  const image = bigImage.querySelector('img')
  image.src = imageUrl

  if (isMain) {
    image.style.width = '80%'
    image.style.height = 'auto'
    image.style.borderRadius = '0'
  } else {
    image.style.width = '100%'
    image.style.height = '100%'
    image.style.objectFit = 'cover'
    image.style.objectPosition = 'center'
    image.style.borderRadius = '10px'
  }
}

// const displayRecommendation = async () => {
//   const cars = (await fetchCollection('cars?filter[status][_eq]=published&filter[rating][_gte]=4&limit=8')).data;

//   const recommendation = document.getElementById('recommendation');
//   recommendation.innerHTML = ''; // Clear previous content

//   cars.forEach((car) => {
//     const div = document.createElement('div');
//     div.className = 'car-card';
//     const { id, model, category, card_image, gasoline, type, capacity, price, has_promotion, promotion_price } = car;
//     div.setAttribute('data-id', id);
//     const { iconPath } = checkIsFavorite(id);
    
//     div.innerHTML = `
//       <div>
//         <div class="-mt-[5px]">
//           <div class="text-[20px] font-bold text-[#1A202C]">${model}</div>
//           <div class="text-[14px] font-bold text-[#90A3BF]">${category}</div>
//         </div>
//         <img src="${iconPath}" alt="" class="icon favorite">
//       </div>
//       <a href="#"><img src="${getAssetUrl(card_image)}" alt=""></a>
//       <div class="space-y-[24px]">
//         <div>
//           <div>
//             <img src="/assets/icons/gas-station.svg" alt="" class="icon">
//             <span>${gasoline}L</span>
//           </div>
//           <div>
//             <img src="/assets/icons/car.svg" alt="" class="icon">
//             <span>${type}</span>
//           </div>
//           <div>
//             <img src="/assets/icons/profile-2user.svg" alt="" class="icon">
//             <span>${capacity} People</span>
//           </div>
//         </div>
//         <div>
//           <div class="font-bold">
//             <div>
//               <span class="text-[20px] text-[#1A202C]">$${formatToTwoDecimals(has_promotion ? promotion_price : price)}/</span> <span class="text-[#90A3BF] text-[14px]">day</span>
//             </div>
//             ${has_promotion ? '<s class="text-[14px] text-[#90A3BF]">$' + formatToTwoDecimals(price) + '</s>' : ''}
//           </div>
//           <button>
//             Rent Now
//           </button>
//         </div>
//       </div>
//     `
    
//     recommendation.appendChild(div);
//   });
// }

// displayRecommendation().then(refreshFavoriteEvent);

// const getCarsCount = async () => {
//   const carsCount = await fetchCollection('cars?filter[status][_eq]=published&meta=total_count&limit=0');

//   $('#cars-count').text(carsCount.meta.total_count);
// }

// getCarsCount();
// // check and change img on detail

const displayPopular = async () => {
  const cars = (await fetchCollection('cars?filter[status][_eq]=published&filter[rent_times][_gte]=50&limit=8')).data;

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
      <a href="/pages/public/detail.html" aria-label="See more about car"><img src="${getAssetUrl(card_image)}" loading="lazy" alt=""></a>
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
          <button>
            Rent Now
          </button>
        </div>
      </div>
    `

    popularWrapper.appendChild(li);
  });
}

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
})