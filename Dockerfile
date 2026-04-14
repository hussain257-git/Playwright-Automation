FROM mcr.microsoft.com/playwright:v1.44.0-jammy

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Install Playwright browsers
RUN npx playwright install

# Copy application code
COPY . .

# Run tests
CMD ["npm", "run", "test"]
