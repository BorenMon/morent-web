import api from './authAPI.js';

export const fetchProfile = async () => {
  let profile = JSON.parse(localStorage.getItem('profile'));
  
  if (!profile && localStorage.getItem('access_token')) {
    const response = await api.get('/users');

    if (response.status == 200) {
      profile = response.data.data[0];
      localStorage.setItem('profile', JSON.stringify(profile));
    }
  }

  return profile;
}