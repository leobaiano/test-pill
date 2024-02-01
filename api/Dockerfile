FROM node:18-alpine

ENV CHROME_BIN="/usr/bin/chromium-browser" \
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD="true"

WORKDIR /app

COPY package*.json ./

# Instalação do Chromium
RUN apk update && apk --no-cache add \
    chromium \
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    bash

RUN echo "Chromium executable path:"
RUN which chromium-browser

# Configuração do Puppeteer para usar o Chromium
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

RUN yarn install

COPY . .

CMD ["yarn", "dev"]
