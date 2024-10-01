# JAMstack Project with HTML, CSS, JavaScript, and Directus

## Project Overview

This project is a JAMstack application built with static HTML, CSS, JavaScript, and powered by Directus CMS. The front-end of the application is static, served via a CDN, while the back-end CMS is managed by Directus to provide dynamic content via its RESTful API.

## Technologies Used

![JAMstack](./assets/images/JAMstack.png)

- **HTML5**: For structuring web pages.
- **CSS3**: For styling and layout.
- **JavaScript (Vanilla)**: For dynamic functionality and interacting with the Directus API.
- **Directus**: A headless CMS that manages content and provides an API to fetch data dynamically.

## Features

- **Headless CMS**: The content is managed in Directus and fetched dynamically using its API.
- **JAMstack Architecture**: The app is fully static, improving performance and scalability, while still pulling dynamic content from Directus.
- **API-Driven**: Uses Directus API to fetch and display data on the website dynamically without needing a back-end server or Node.js.
const apiUrl = 'https://your-directus-instance.com';
