# Use the official lightweight Node.js 19 image.
# https://hub.docker.com/_/node
FROM node:19.8.1-slim as build

RUN apt-get update
RUN apt-get -y install git

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.

COPY package.json ./
COPY yarn.lock ./

# Install dependencies.
RUN yarn install

# Copy local code to the container image.
COPY . ./

# Build SPA app
RUN yarn build-only

## Use nginx static content server
FROM nginx:1.23.4-alpine

# Configure nginx user and permissions
RUN chown -R nginx:nginx /usr/share/nginx/html && chmod -R 755 /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d
RUN touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid
USER nginx

# Set server configuration
COPY nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy the static output from the previous stage
COPY --from=build /usr/src/app/dist /usr/share/nginx/html/atlas

EXPOSE 5400

CMD ["nginx", "-g", "daemon off;"]


# here example command to launch 
# docker build -t atlas-front:local .
# docker run -p 5400:5400 atlas-front:local