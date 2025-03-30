# Dockerfile for Next.js with Firebase Firestore
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json first
COPY package.json ./

# Install dependencies using npm
RUN npm install

# Copy the rest of the application files
COPY . .

# Create a .env file from environment variables
RUN touch .env.local

# Build the Next.js application
RUN npm run build

# Expose the port Next.js runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
