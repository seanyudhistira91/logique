FROM node:16.17-alpine

WORKDIR /usr/app

COPY . .

RUN npm install --verbose

RUN npm run build 

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
