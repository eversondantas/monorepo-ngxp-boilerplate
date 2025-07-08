FROM node:20-alpine

WORKDIR /usr/src/app

# Copy package files for root and API workspace
COPY package.json ./
COPY package-lock.json ./
COPY apps/api/package.json ./apps/api/package.json

# Install dependencies for the API workspace
RUN npm ci --ignore-scripts --workspace=apps/api

# Copy source code
COPY . .

# Build only the API application
RUN npm run build -w api

# Remove development dependencies
RUN npm prune --omit=dev --workspace=apps/api

# Set working directory to the API folder
WORKDIR /usr/src/app/apps/api

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1
# Start the applicationCMD ["node", "dist/server.js"]