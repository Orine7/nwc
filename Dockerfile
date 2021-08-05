# STD code builder with env
FROM node:lts-alpine AS builder
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

EXPOSE 4000
CMD ["npm","start"]


