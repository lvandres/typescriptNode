FROM node:10.16.0-alpine

EXPOSE 3000

RUN mkdir -p /usr/app

WORKDIR /usr/app

COPY application/package.json .

RUN npm install nodemon -g && npm install && npm cache clean --force

COPY application/. .

ENV DB_HOST changeme
ENV DB_PORT changeme
ENV DB_USER changeme
ENV DB_PASSORD changeme
ENV DB_NAME changeme
ENV TOKEN_SECRET: chengeme

CMD ["npm", "start"]