# Use an official Node.js runtime as the base image
FROM node:18 as build

# Expose port 80 to the outside world
EXPOSE 80
EXPOSE 443
EXPOSE 3000

# The working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React app
WORKDIR /src
RUN npm start

# Serve the production build with Nginx

# Copy the build output from the previous stage to Nginx's html directory
COPY --from=build /app/build /usr/share/nginx/html
# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]

ENTRYPOINT [ "npm", "start" ]