FROM curioushuman/rbc-base:latest As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN chmod +x start.sh

ENTRYPOINT ["start.sh"]

FROM curioushuman/rbc-base:latest as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

ENTRYPOINT ["start.sh"]
