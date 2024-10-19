import '../main.js'
import '../modules/select2.min.js'
import { cities } from '../../config/locationMasterData.js'
import { getAssetUrl, fetchCollection } from '../services/directusAPI.js'
import {
  formatToTwoDecimals,
  refreshFavoriteEvent,
  checkIsFavorite,
  debounce
} from '../services/utils.js'

if (false) {
  $('.city').select2({
    width: '100%',
    data: [{ id: '', text: 'Select your city', value: '' }, ...cities],
  })
  
  let filter_count;
  let total_page;
  
  const displayCars = async (queryString) => {
    const result = (
      await fetchCollection(`cars?${queryString}`)
    )
  
    const carData = result.data
    filter_count = result.meta.filter_count
    total_page = Math.ceil(filter_count / 9)
    changePagination();
  
    const cars = document.getElementById('cars')
    cars.innerHTML = '' // Clear previous content
  
    carData.forEach((car) => {
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
                <span class="text-[20px] text-[#1A202C]">$${formatToTwoDecimals(
                  has_promotion ? promotion_price : price
                )}/</span> <span class="text-[#90A3BF] text-[14px]">day</span>
              </div>
              ${
                has_promotion
                  ? '<s class="text-[14px] text-[#90A3BF]">$' +
                    formatToTwoDecimals(price) +
                    '</s>'
                  : ''
              }
            </div>
            <button>
              Rent Now
            </button>
          </div>
        </div>
      `
  
      cars.appendChild(div)
    })
  }
  
  const prefixCarsQueryString = 'filter[status][_eq]=published&perPage=9&meta=filter_count'
  
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
  
  // Get the current URL
  const urlParams = new URLSearchParams(window.location.search);
  
  export let keyword = urlParams.get('keyword');
  let page = 1
  let types = [];
  let capacities = [];
  let maxPrice = 100;
  
  // Function to generate pagination dynamically
  function generatePagination(currentPage, totalPages) {
    const paginationContainer = document.getElementById('pagination'); // Select the container
    
    // Clear existing pagination (if any)
    paginationContainer.innerHTML = '';
  
    // Previous button
    const prevButton = document.createElement('a');
    prevButton.href = '#';
    prevButton.classList.add(
      'relative', 'inline-flex', 'items-center', 'rounded-l-md', 'px-2', 'py-2', 
      'text-gray-400', 'ring-1', 'ring-inset', 'ring-gray-300', 'hover:bg-gray-50', 
      'focus:z-20', 'focus:outline-offset-0'
    );
    prevButton.innerHTML = `<span class="sr-only">Previous</span><img src="/assets/icons/backward-arrow.svg" alt="">`;
    if (currentPage === 1) {
      prevButton.classList.add('disabled');
      prevButton.style.pointerEvents = 'none'; // Disable when on first page
    }
    paginationContainer.appendChild(prevButton);
  
    // Number of pages to display before and after the current page
    const maxPagesToShow = 5;
    const halfMaxPages = Math.floor(maxPagesToShow / 2);
  
    // Calculate start and end page numbers to display
    let startPage = Math.max(1, currentPage - halfMaxPages);
    let endPage = Math.min(totalPages, currentPage + halfMaxPages);
  
    // Adjust if we're near the start or end
    if (currentPage - halfMaxPages <= 0) {
      endPage = Math.min(totalPages, endPage + (halfMaxPages - currentPage + 1));
    }
    if (currentPage + halfMaxPages >= totalPages) {
      startPage = Math.max(1, startPage - (currentPage + halfMaxPages - totalPages));
    }
  
    // Page links
    for (let i = startPage; i <= endPage; i++) {
      const pageLink = document.createElement('a');
      pageLink.href = '#';
      pageLink.classList.add(
        'relative', 'inline-flex', 'items-center', 'px-4', 'py-2', 'text-sm', 'font-semibold', 
        'text-gray-900', 'ring-1', 'ring-inset', 'ring-gray-300', 'hover:bg-gray-50', 
        'focus:z-20', 'focus:outline-offset-0'
      );
      
      // Highlight the current page
      if (i === currentPage) {
        pageLink.classList.add('z-10', 'bg-[#3563E9]', 'text-white');
      }
  
      pageLink.textContent = i;
      paginationContainer.appendChild(pageLink);
  
      // Add event listener to each page link
      pageLink.addEventListener('click', function (e) {
        e.preventDefault();
        generatePagination(i, totalPages); // Regenerate pagination for selected page
      });
    }
  
    // If there are pages not displayed, add ellipsis
    if (endPage < totalPages) {
      const ellipsis = document.createElement('span');
      ellipsis.classList.add(
        'relative', 'inline-flex', 'items-center', 'px-4', 'py-2', 'text-sm', 'font-semibold', 
        'text-gray-700', 'ring-1', 'ring-inset', 'ring-gray-300', 'focus:outline-offset-0'
      );
      ellipsis.textContent = '...';
      paginationContainer.appendChild(ellipsis);
    }
  
    // Next button
    const nextButton = document.createElement('a');
    nextButton.href = '#';
    nextButton.classList.add(
      'relative', 'inline-flex', 'items-center', 'rounded-r-md', 'px-2', 'py-2', 
      'text-gray-400', 'ring-1', 'ring-inset', 'ring-gray-300', 'hover:bg-gray-50', 
      'focus:z-20', 'focus:outline-offset-0'
    );
    nextButton.innerHTML = `<span class="sr-only">Next</span><img src="/assets/icons/forward-arrow.svg" alt="">`;
    if (currentPage === totalPages) {
      nextButton.classList.add('disabled');
      nextButton.style.pointerEvents = 'none'; // Disable when on last page
    }
    paginationContainer.appendChild(nextButton);
  
    // Add event listeners for previous and next buttons
    prevButton.addEventListener('click', function (e) {
      e.preventDefault();
      if (currentPage > 1) {
        generatePagination(currentPage - 1, totalPages); // Go to previous page
      }
    });
  
    nextButton.addEventListener('click', function (e) {
      e.preventDefault();
      if (currentPage < totalPages) {
        generatePagination(currentPage + 1, totalPages); // Go to next page
      }
    });
  }
  
  const changePagination = () => {
    if (filter_count > 0) {
      $('#showing-from').text((page - 1) * 9 + 1)
      $('#showing-to').text(Math.min(page * 9, filter_count))
      $('#filter_count').text(filter_count)
  
      $('#pagination-container > div:nth-child(1)').css('display', 'block')
      $('#pagination-container > div:nth-child(2)').css('display', 'block')
      $('#pagination-container > p').css('display', 'none')
  
      generatePagination(page, total_page)
    } else {
      $('#pagination-container > div:nth-child(1)').css('display', 'none')
      $('#pagination-container > div:nth-child(2)').css('display', 'none')
      $('#pagination-container > p').css('display', 'block')
    }
  }
  
  function refreshCars(queryString) {
    displayCars(queryString).then(refreshFavoriteEvent)
  }
  
  function queryParamsBuilder(page, keyword, types, capacities, maxPrice) {
    let queryParams = new URLSearchParams();
  
    // Add pagination parameters
    queryParams.append('page', page);
  
    // Add keyword search for multiple fields (e.g., title, description)
    if (keyword) {
      queryParams.append('filter[_or][0][brand][_contains]', keyword);
      queryParams.append('filter[_or][1][model][_contains]', keyword);
    }
  
    // Add filter for types (if not empty)
    if (types.length > 0) {
      types.forEach((type, index) => {
        queryParams.append(`filter[type][_in][${index}]`, type);
      });
    }
  
    // Add filter for capacities (if not empty)
    if (capacities.length > 0) {
      capacities.forEach((capacity, index) => {
        if (capacity === '8 or more') {
          // Handle the "8 or more" case with _gte (greater than or equal to)
          queryParams.append('filter[capacity][_gte]', 8);
        } else {
          // Handle other capacity values as exact matches using _in
          queryParams.append(`filter[capacities][_in][${index}]`, capacity);
        }
      });
    }
  
    // Add max price filter (if defined)
    if (maxPrice !== undefined && maxPrice !== null) {
      queryParams.append('filter[price][_lte]', maxPrice);
    }
  
    // Return the complete query string
    return queryParams.toString();
  }
  
  export const defaultRefreshCars = (otherKeyword = undefined) => {
    if (otherKeyword) {
      keyword = otherKeyword;
    } else keyword = ''
    refreshCars(prefixCarsQueryString + '&' + queryParamsBuilder(page, keyword, types, capacities, maxPrice));
  }
  
  if (keyword) defaultRefreshCars();
  else refreshCars(prefixCarsQueryString);
  
  async function getCount(queryParams) {
    return (await fetchCollection('cars?' + prefixCarsQueryString + '&limit=0&' + queryParams)).meta.filter_count;
  }
  
  $('label[for="Sport"] span').text(`(${await getCount('filter[type][_eq]=Sport')})`)
  $('label[for="SUV"] span').text(`(${await getCount('filter[type][_eq]=SUV')})`)
  $('label[for="MPV"] span').text(`(${await getCount('filter[type][_eq]=MPV')})`)
  $('label[for="Sedan"] span').text(`(${await getCount('filter[type][_eq]=Sedan')})`)
  $('label[for="Coupe"] span').text(`(${await getCount('filter[type][_eq]=Coupe')})`)
  $('label[for="Hatchback"] span').text(`(${await getCount('filter[type][_eq]=Hatchback')})`)
  $('label[for="2 Person"] span').text(`(${await getCount('filter[capacity][_eq]=2')})`)
  $('label[for="4 Person"] span').text(`(${await getCount('filter[capacity][_eq]=4')})`)
  $('label[for="6 Person"] span').text(`(${await getCount('filter[capacity][_eq]=6')})`)
  $('label[for="8 or More"] span').text(`(${await getCount('filter[capacity][_gte]=8')})`)
  
  const maxPriceInput = document.getElementById('max-price');
  
  // Event listener for input changes
  maxPriceInput.addEventListener('input', e => {
    const maxPrice = e.target.value;
    
    // Update the max price value display immediately
    $('#max-price-value').text(formatToTwoDecimals(maxPrice));
  
    // Debounced API call
    debounceRefreshCars();
  });
  
  const debounceRefreshCars = debounce(function() {
    defaultRefreshCars();
  }, 300);
  
  const typeChecks = [$('#Sport'), $('#SUV'), $('#MPV'), $('#Sedan'), $('#Coupe'), $('#Hatchback')]
  
  typeChecks.forEach(type => {
    type.on('change', e => {
      if (e.target.checked) {
        types.push(e.target.value);
      } else {
        types = types.filter(type => type !== e.target.value);
      }
      defaultRefreshCars();
    });
  })
  
  
  const capacityChecks = [$('input[id="2 Person"]'), $('input[id="4 Person"]'), $('input[id="6 Person"]'), $('input[id="8 or More"]')]
  
  capacityChecks.forEach(capacity => {
    capacity.on('change', e => {
      if (e.target.checked) {
        capacities.push(e.target.value);
      } else {
        capacities = capacities.filter(capacity => capacity !== e.target.value);
      }
      defaultRefreshCars();
    });
  })
}