FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN yarn install

RUN apk update && \
    apk --no-cache add chromium

COPY . .

RUN apt-get update && apt-get install -y chromiu

CMD ["yarn", "start"]