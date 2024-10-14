export const formatToTwoDecimals = (value) => {
  return parseFloat(value).toFixed(2);
}

export const formatISODate = (isoDate) => {
  const date = new Date(isoDate);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

export const checkIsFavorite = (carID, savedFavorites) => {
  savedFavorites = savedFavorites || JSON.parse(localStorage.getItem('savedFavorites') || '[]');

  const isFavorite = savedFavorites.includes(carID);
  const iconPath = isFavorite ? '/assets/icons/like.svg' : '/assets/icons/heart-outline.svg';
  const oppositeIconPath = !isFavorite ? '/assets/icons/like.svg' : '/assets/icons/heart-outline.svg';

  return {
    isFavorite,
    iconPath,
    oppositeIconPath
  };
}

export const refreshFavoriteEvent = () => {
  // Ensure event listeners are removed before re-attaching
  $('.favorite').off('click');
  
  // Attach the click event once
  $('.favorite').on('click', (e) => {
    const id = +e.target.parentElement.parentElement.dataset.id;
    
    // Toggle favorite status
    const savedFavorites = JSON.parse(localStorage.getItem('savedFavorites') || '[]');

    const { isFavorite, oppositeIconPath } = checkIsFavorite(id, savedFavorites);

    // Add or remove car from favorites
    if (isFavorite) {
      savedFavorites.splice(savedFavorites.indexOf(id), 1);
    } else savedFavorites.push(id);

    e.target.src = oppositeIconPath;
    
    // Update local storage
    localStorage.setItem('savedFavorites', JSON.stringify(savedFavorites));
  });
}