import '/js/main.js'
import { fetchItemById, getAssetUrl  } from '../services/directusAPI.js'
import { formatISODate } from '../services/utils.js';

// Get the current URL
const urlParams = new URLSearchParams(window.location.search);

// Get the value of the 'id' parameter
const id = urlParams.get('id');

if (id) {
  // Fetch the item by ID
  fetchItemById('blogs', id)
   .then(item => {
      console.log(item);
      $('#published-date').text(formatISODate(item.date_created));
      $('#title').text(item.title);
      $('#description').text(item.description);
      const tags = $.map(item.tags, function(tag) {
        return `<li class="tag">${tag}</li>`;
      });
      $('#tags').append(tags);
      $('#thumbnail').attr('src', getAssetUrl(item.thumbnail));

      // Create a shadow root for blog content
      const blogContainer = document.getElementById('blog-content');
      const shadowRoot = blogContainer.attachShadow({ mode: 'open' });

      // Append your content inside the shadow DOM
      shadowRoot.innerHTML = item.content;
    })
   .catch(error => {
      console.error('Error fetching blog:', error);
    });
} else {
  window.location.href = '/pages/public/blogs.html';
}