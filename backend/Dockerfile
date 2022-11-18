FROM node:16.14-alpine

WORKDIR /app-ngcash-desafio

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "start"]