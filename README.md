# MORENT Web Client

This repository contains the frontend of MORENT, a Car Rental Web App. It is built using HTML, CSS, and Vanilla JavaScript, providing a clean and responsive user interface for browsing and renting cars.

## Demo

You can access the live demo of the MORENT Web App here:  
[MORENT Live Demo](https://morent-kh.netlify.app)

## Features

- Responsive design for seamless usage across devices.
- Dynamic content integration using APIs from:
  - **Directus** for content management.
  - **NestJS Service** for additional backend functionalities.
- Interactive user interface built with Vanilla JavaScript.
- Interactive user interface built with Vanilla JavaScript.

## Tech Stack

- **HTML5** for structuring the app.
- **CSS3** for styling and responsive design.
- **Vanilla JavaScript** for dynamic and interactive functionalities.
- **Directus API** for fetching and managing content.
- **NestJS API** for handling custom backend logic.

## Getting Started

### Prerequisites

To run this project locally, you need:
- A modern web browser.
- (Optional) A simple HTTP server like [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) for testing locally.

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/BorenMon/morent-web.git
    cd morent-web
    ```

2. Open the `index.html` file in your browser to view the app or use **Live Server** by right clicking on the `index.html` file and select **Open with Live Server**.

## API Integration

This app interacts with the following APIs:

1. **MORENT CMS (Directus)**  
   Provides content and data management. The Directus backend source code is maintained in the [MORENT CMS Repository](https://github.com/BorenMon/morent-cms.git).

2. **MORENT Service (NestJS)**  
   Handles additional backend functionalities, such as custom business logic and extended features. The NestJS service source code is maintained in the [MORENT Service Repository](https://github.com/BorenMon/morent-service.git).

Make sure both Directus and NestJS services are running and accessible. Configure the Base URLs in the JavaScript files:

**For Directus** (`/js/config/directus.config.js`):
```javascript
const directusConfig = {
  baseURL: 'https://your-directus-instance-url'
};

export default directusConfig;
```

**For NestJS** (`/js/config/service.config.js`):
```javascript
const serviceConfig = {
  baseURL: 'https://your-nestjs-instance-url'
}

export default serviceConfig;
```

## Credits
The UI design of the MORENT Web Client was inspired by a public Figma design by [Vishnu . v](https://www.figma.com/@vishnuv). We deeply appreciate his creative work and acknowledge his contribution to the visual inspiration of this project.

## Development

Feel free to modify the code to fit your requirements. For CSS and JavaScript, ensure proper structuring for scalability.

## Contributing

We welcome contributions! Submit a pull request with your enhancements or bug fixes.

## License

This project is licensed under the MIT License.