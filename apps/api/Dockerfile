FROM node:20-alpine

WORKDIR /usr/src/app

# Copy package files for root and API workspace
COPY package.json ./
COPY package-lock.json ./
COPY apps/api/package.json ./apps/api/package.json

# Install all dependencies (root and API workspace)
RUN npm ci --ignore-scripts

# Copy source code
COPY . .

# Build only the API application
RUN npm run build -w api

# Set working directory to the API folder
WORKDIR /usr/src/app/apps/api

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "dist/server.js"]
