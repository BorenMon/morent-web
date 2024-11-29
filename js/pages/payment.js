import '../main.js';
import '../modules/select2.min.js'
import { cities } from '../config/location.master-data.js'
import { getAssetUrl, fetchItemById } from '../services/publicAPI.js'
import { formatToTwoDecimals } from '../services/utils.js'
import {
  fetchProfile
} from '../services/client.js'

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

const profile = await fetchProfile()

$('#name-input').val(profile.first_name + ' ' + profile.last_name)
$('#phone-input').val(profile.phone)
$('#address-input').val(profile.address)

const requiredFields = [
  {
    selector: '#name-input',
    message: 'Please enter your name.',
    key: 'name'
  },
  {
    selector: '#phone-input',
    message: 'Please enter a phone number.',
    key: 'phone'
  },
  {
    selector: '#address-input',
    message: 'Please enter an address.',
    key: 'address'
  },
  {
    selector: '#pick-up .city',
    message: 'Please select a pick-up city.',
    key: 'pick_up_city'
  },
  {
    selector: '#pick-up .date',
    message: 'Please select a pick-up date.',
    key: 'pick_up_date'
  },
  {
    selector: '#pick-up .time',
    message: 'Please select a pick-up time.',
    key: 'pick_up_time'
  },
  {
    selector: '#drop-off .city',
    message: 'Please select a drop-off city.',
    key: 'drop_off_city'
  },
  {
    selector: '#drop-off .date',
    message: 'Please select a drop-off date.',
    key: 'drop_off_date'
  },
  {
    selector: '#drop-off .time',
    message: 'Please select a drop-off time.',
    key: 'drop_off_time'
  },
  {
    selector: 'input[name="terms"]',
    message: 'Please agree to Terms and Conditions before booking.',
    key: 'terms',
    type: 'checkbox'
  }
]

const optionalFields = [
  {
    selector: 'input[name="marketing"]',
    key: 'marketing',
    type: 'checkbox'
  }
]

const requiredPayload = {
  name: $('#name-input').val(),
  phone: $('#phone-input').val(),
  address: $('#address-input').val(),
  pick_up_city: $('#pick-up .city').val(),
  pick_up_date: $('#pick-up .date').val(),
  pick_up_time: $('#pick-up .time').val(),
  drop_off_city: $('#drop-off .city').val(),
  drop_off_date: $('#drop-off .date').val(),
  drop_off_time: $('#drop-off .time').val(),
  terms: $('input[name="terms"]').is(':checked')
}

const optionalPayload = {
  marketing: $('input[name="marketing"]').is(':checked')
}

const isMissingRequiredData = () => Object.keys(requiredPayload).some(key => {
  if (requiredPayload[key] == false) return true
  if (requiredPayload[key] == "" || requiredPayload[key] == "0") return true 
  return false
})

const checkBookButton = () => {
  if (isMissingRequiredData()) $('#book-button').addClass('disabled-button')
  else $('#book-button').removeClass('disabled-button')
}

checkBookButton()

$('#book-button').on('click', function () {
  if (!isMissingRequiredData()) {
    $(this).addClass('disabled-button')
    $('#loading-backdrop').css('display', 'flex')


  }
})

requiredFields.forEach(field => {
  $(field.selector).on('input', () => {
    if (field.type) requiredPayload[field.key] = $(field.selector).is(':checked')
    else requiredPayload[field.key] = $(field.selector).val()
    checkBookButton()
  })
})

optionalFields.forEach(field => {
  $(field.selector).on('input', () => {
    if (field.type) optionalPayload[field.key] = $(field.selector).is(':checked')
    else optionalPayload[field.key] = $(field.selector).val()
  })
})