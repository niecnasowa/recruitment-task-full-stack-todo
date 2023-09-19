# Use an official Node runtime as a parent image
FROM node:16

# Set the working directory in Docker
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install application dependencies inside the container
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Specify the port the app runs on
EXPOSE 3000

# The command to start the application
CMD ["npm", "run", "start"]
