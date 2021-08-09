FROM node:lts-alpine AS builder
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
ENV NODE_ENV production

RUN npm run build

FROM node:lts-alpine
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 4000

COPY run.sh /usr/local/bin/run.sh
RUN chmod +x /usr/local/bin/run.sh

CMD ["run.sh"]





