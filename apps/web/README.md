# Web Application

This is the Angular web application for the monorepo. It serves as the frontend interface for interacting with the API.

## Getting Started

To get started with the web application, follow these steps:

1. **Install Dependencies**: Navigate to the `apps/web` directory and run:
   ```
   npm install
   ```

2. **Run the Application**: Start the development server with:
   ```
   ng serve
   ```
   The application will be available at `http://localhost:4200`.

## Building the Application

To build the application for production, run:
```
ng build --prod
```
The output will be stored in the `dist/` directory.

## Docker

To build and run the Docker container for the web application, use the following commands:

1. **Build the Docker Image**:
   ```
   docker build -t web-app .
   ```

2. **Run the Docker Container**:
   ```
   docker run -p 4200:80 web-app
   ```

## API Integration

The web application communicates with the API hosted at `http://localhost:3000`. Ensure that the API is running before accessing the web application.

## Contributing

Feel free to submit issues or pull requests for any improvements or features you would like to see in the web application.