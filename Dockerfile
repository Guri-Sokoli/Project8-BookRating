FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 80
EXPOSE 443
EXPOSE 3000

CMD ["npm", "start"]
