# Use the official Node.js 20 image as base
FROM mcr.microsoft.com/devcontainers/typescript-node:20

# Set the working directory
WORKDIR /workspace

# Install global packages
RUN npm install -g @angular/cli@latest \
    @nestjs/cli@latest \
    typescript@latest \
    ts-node@latest \
    nodemon@latest \
    npm-check-updates@latest \
    prettier@latest \
    eslint@latest

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    wget \
    git \
    nano \
    vim \
    postgresql-client \
    tree \
    jq \
    && rm -rf /var/lib/apt/lists/*

# Configure git (will be overridden by user config)
RUN git config --global init.defaultBranch main \
    && git config --global core.editor "code --wait"

# Create workspace directory with proper permissions
RUN mkdir -p /workspace && chown -R node:node /workspace

# Switch to node user
USER node

# Set environment variables
ENV NODE_ENV=development
ENV PATH="/workspace/node_modules/.bin:$PATH"

# Expose ports
EXPOSE 3000 4200 5432

# Default command
CMD ["bash"]
