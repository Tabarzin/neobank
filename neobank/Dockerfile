# Use an official Node runtime as a parent image
FROM node:16

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN yarn build

# Serve the React app
RUN yarn global add serve

# Expose port 5000 to the outside world
EXPOSE 5000

# Command to run the application
CMD ["serve", "-s", "build"]
