# STD code builder with env
FROM node:lts-alpine AS builder
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
COPY run.sh /usr/local/bin/run.sh
RUN chmod +x /usr/local/bin/run.sh

EXPOSE 4000

CMD ["run.sh"]





