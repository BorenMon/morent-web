import '../main.js';
import '../modules/select2.min.js'
import { cities } from '../config/location.master-data.js'
import { getAssetUrl, fetchItemById } from '../services/publicAPI.js'
import { formatToTwoDecimals } from '../services/utils.js'

// Get the current URL
const urlParams = new URLSearchParams(window.location.search);

// Get the value of the 'id' parameter
const carId = urlParams.get('id');

if (carId) {
  $('.city').select2({
    width: '100%',
    data: [
      { id: '0', text: 'Select your city', value: '' },
      ...cities
    ],
  });

  const {
    model,
    card_image,
    price,
    has_promotion,
    promotion_price,
  } = (await fetchItemById('cars', carId));

  const taxPercentage = 0/100;
  const subTotal = has_promotion ? promotion_price : price;
  const tax = taxPercentage * subTotal;

  $('#model').text(model);
  $('#image').attr('src', getAssetUrl(card_image));
  $('#sub-total').text(`$${formatToTwoDecimals(subTotal)}`);
  $('#tax').text(`$${formatToTwoDecimals(tax)}`);
  $('#total').text(`$${formatToTwoDecimals(subTotal + tax)}`);
} else {
  window.location.href = '/pages/category.html';
}

const bookingEls = [
  {
    key: 'city',
    type: 'number'
  },
  {
    key: 'date',
    type: 'string'
  },
  {
    key: 'time',
    type: 'string'
  }
]

const loadBookingInputs = () => {
  const pickUpInputs = JSON.parse(localStorage.getItem('pickUpInputs')) || {
    city: null,
    date: null,
    time: null
  };

  const dropOffInputs = JSON.parse(localStorage.getItem('dropOffInputs')) || {
    city: null,
    date: null,
    time: null
  };

  ["pick-up", "drop-off"].forEach(id => {
    bookingEls.forEach(el => {
      let value
      if (id == "pick-up") value = pickUpInputs[el.key]
      else value = dropOffInputs[el.key]
      $(`#${id} .${el.key}`).val(value).trigger('change')
    })
  })
}

loadBookingInputs()

bookingEls.forEach(el => {
  $(`.${el.key}`).on('change', function () {
    let value;
    if (el.type === 'number') value = +$(this).val();
    else value = $(this).val();
    saveBookingInputs(el.key, value, this);
  });
})

const saveBookingInputs = (key, value, el) => {
  let type = $(el).closest('.booking-container').attr('id');

  if (type === 'pick-up') type = 'pickUpInputs';
  else type = 'dropOffInputs';

  const savedInputs = JSON.parse(localStorage.getItem(type)) || {
    city: null,
    date: null,
    time: null
  }; 
  
  savedInputs[key] = value;

  localStorage.setItem(type, JSON.stringify(savedInputs));
}