FROM node:20-alpine

WORKDIR /platter

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 1234

CMD ["npm", "start"]