export const formatToTwoDecimals = (value) => {
  return parseFloat(value).toFixed(2)
}

export const formatISODate = (isoDate) => {
  const date = new Date(isoDate)
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return date.toLocaleDateString('en-US', options)
}

export const redirectSearch = (keyword) => {
  const isLocalhost = window.location.hostname === '127.0.0.1';
  
  // If on localhost, include `.html`, otherwise omit it for Netlify's pretty URLs
  const extension = isLocalhost ? '.html' : '';
  window.location.href = `/pages/public/category${extension}?keyword=${keyword}`;
}

export function debounce(func, delay) {
  let timeout
  return function (...args) {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), delay)
  }
}
