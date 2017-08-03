FROM node:6.2.1

ENV NPM_CONFIG_LOGLEVEL error

RUN mkdir -p /app
COPY . /app
WORKDIR /app

ENV NODE_ENV production
EXPOSE 4001

CMD ["node", "demo/index.js"]
