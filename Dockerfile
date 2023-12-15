FROM node:alpine

LABEL authors="ivantom"

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .


CMD ["npm","run","dev"]