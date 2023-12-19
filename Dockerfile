# Use a Node base image
FROM node:latest

# Set the working directory in the Docker container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app's source code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run your app (use "npm start" or "node server" as per your setup)
CMD ["npm", "start"]
