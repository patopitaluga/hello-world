FROM node:22.6.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY server.js .

EXPOSE 3000

CMD ["node", "server.js"]
