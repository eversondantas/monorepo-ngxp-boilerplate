# API Documentation

## Overview

This is the API for the monorepo application built using Express and TypeScript. The API provides a simple "Hello World" endpoint and is designed to be easily extendable for future features.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- PostgreSQL (for database interactions)
- Docker (for containerization)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd monorepo-app/apps/api
   ```

2. Install dependencies:
   ```
   npm install
   ```

### Running the API

You can run the API in development mode using the following command:
```
npm run start
```

Alternatively, you can build and run the API using Docker:
```
docker-compose up --build
```

### API Endpoints

- **GET /hello**
  - Returns a "Hello World" message.
  
### Swagger Documentation

The API is documented using Swagger. You can access the Swagger UI at:
```
http://localhost:3000/api-docs
```

### Docker

The API can be containerized using Docker. The provided `Dockerfile` sets up the environment and dependencies for the API.

### Database Configuration

The API is configured to connect to a PostgreSQL database. Ensure that your database is running and the connection details are correctly set in the environment variables.

## License

This project is licensed under the MIT License. See the LICENSE file for details.