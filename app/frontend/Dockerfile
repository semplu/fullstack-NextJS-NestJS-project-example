FROM node:22-alpine AS builder

WORKDIR /usr/src/app/frontend

COPY ./app/frontend .

RUN npm install glob rimraf

RUN npm install
