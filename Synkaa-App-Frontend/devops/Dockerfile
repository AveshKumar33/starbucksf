#Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY . /app



RUN cat /app/.env.local

RUN npm i 

RUN npm run build

RUN cat /app/.env.local

CMD ["npm", "run", "start" ]