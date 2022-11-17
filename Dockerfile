FROM node:16.14-alpine

WORKDIR /app-ngcash-desafio

COPY package.json /app-ngcash-desafio

RUN npm install

COPY . /app-ngcash-desafio

EXPOSE 3001

CMD ["npm", "start"]