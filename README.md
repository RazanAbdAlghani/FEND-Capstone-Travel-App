# Travel App

## Overview

The Travel App is a web application that helps users plan their trips by providing city information, weather forecasts, and city images. Users can enter a city and flight date to receive relevant travel details.

## Features

- **City Location:** Fetches city coordinates using GeoNames API.
- **Weather Information:** Provides current or forecasted weather using Weatherbit API.
- **City Pictures:** Displays images of the city from Pixabay API.
- **Service Worker:** Caches files for offline usage to enhance user experience.

## Technologies Used

- **Frontend:** HTML, CSS (SCSS), JavaScript (ES6+)
- **Backend:** Node.js, Express.js
- **APIs:** GeoNames, Weatherbit, Pixabay
- **Build Tools:** Webpack, Babel
- **Testing:** Jest

## Version

- **Current Version:** 1.0.0

## Installation

To get started with the project, follow these steps:

1. **Clone the repository:**

    ```bash
    git clone <repository-url>
    ```

2. **Navigate to the project directory:**

    ```bash
    cd travel-app
    ```

3. **Install dependencies:**

    ```bash
    npm install
    ```

## Development

To start the development server and watch for file changes:

```bash
npm run dev
```

The development server will be available at `http://localhost:8081`.

## Build

To create a production build of the project:

```bash
npm run build
```

The output will be placed in the `dist` directory. The build process includes:

- Compiling JavaScript and SCSS files
- Minifying and optimizing assets
- Generating service workers for offline support

## Testing

To run tests with Jest:

```bash
npm test
```

Ensure that your tests are defined in the `test` directory.

## Service Worker

The project includes a service worker for offline functionality. To test it:

1. **Start the development server:**

    ```bash
    npm run dev
    ```

2. **Open the application in a browser.**
3. **Check the Application tab in the browser's developer tools to see if the service worker is registered.**

## API Keys

Ensure you have the following environment variables set in a `.env` file for the backend to function correctly:

```
USERNAME=your_geonames_username
USERNUMBER=your_geonames_usernumber
WEATHER_KEY=your_weatherbit_api_key
pixabay_key=your_pixabay_api_key
```

Replace the placeholders with your actual API keys.



