import '../main.js';
import '../modules/select2.min.js'
import { cities } from './config/location.master-data.js'
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
      { id: '', text: 'Select your city', value: '' },
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