# Use an official Node.js runtime as the base image
FROM node:18 as build

# Expose port 80 to the outside world
EXPOSE 80
EXPOSE 443
EXPOSE 3000

# The working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json /app
COPY public/ /app
COPY src/ /app
COPY package.json /app

# Install dependencies
CMD ["npm", "install"]
# Copy the rest of the application code to the working directory
COPY . .

# Runiuyu56 the application
CMD ["npm", "start"]