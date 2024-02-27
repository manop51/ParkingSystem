FROM node:18.15.0

WORKDIR /main

COPY . .

RUN npm install

EXPOSE 4500

CMD [ "node","main.js" ]