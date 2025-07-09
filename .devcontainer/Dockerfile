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

# Install Google Chrome for headless tests
RUN curl -fsSL https://dl.google.com/linux/linux_signing_key.pub | gpg --dearmor -o /usr/share/keyrings/google-chrome.gpg \
    && echo "deb [arch=amd64 signed-by=/usr/share/keyrings/google-chrome.gpg] http://dl.google.com/linux/chrome/deb/ stable main" \
       | tee /etc/apt/sources.list.d/google-chrome.list \
    && apt-get update \
    && apt-get install -y google-chrome-stable \
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
ENV CHROME_BIN=/usr/bin/google-chrome

# Expose ports
EXPOSE 3000 4200 5432

# Default command
CMD ["bash"]
