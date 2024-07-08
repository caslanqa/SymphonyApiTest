FROM mcr.microsoft.com/playwright:v1.45.1-jammy

LABEL authors="cihanaslan"

WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y \
    wget \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install

COPY . .

ENTRYPOINT ["npx", "playwright", "test"]