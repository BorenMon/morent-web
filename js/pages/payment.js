import '../main.js';
import '../modules/select2.min.js'
import { cities } from '../../config/locationMasterData.js'

$('.city').select2({
  width: '100%',
  data: [
    { id: '', text: 'Select your city', value: '' },
    ...cities
  ],
});