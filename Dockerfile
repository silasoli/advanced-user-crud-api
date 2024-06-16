# Use the official Node.js 14 image as the base image
FROM node:21.5.0-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

#Rebuild bcrypt
RUN npm rebuild bcrypt
 
# Install NestJS CLI
RUN npm install -g @nestjs/cli

# Copy the rest of the application code to the working directory
COPY . .

# Build the NestJS application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the application
CMD ["npm", "run", "start:prod"]
