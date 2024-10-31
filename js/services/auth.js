import directusConfig from '../../config/directusConfig.js';
import { toast } from '../services/sweetalert2.js';

export const register = (data) => {
  fetch(`${directusConfig.baseURL}/users/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(() => {
      toast('User registered successfully.', 'success', 'top')
    })
    .catch((error) => {
      console.error('Error:', error)
      toast('Failed to register. Please try again.', 'error')
    })
}