FROM node:22-alpine AS builder

WORKDIR /usr/src/app/backend

COPY ./app/backend/package*.json ./
COPY ./app/backend/tsconfig*.json ./
RUN npm install
