FROM curioushuman/rbc-base:latest As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN chmod +x start.sh

RUN npm run build

ENTRYPOINT [ "sh", "start.sh" ]

FROM curioushuman/rbc-base:latest as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist
COPY --from=development /usr/src/app/start.sh /usr/src/app/start.sh

ENTRYPOINT [ "sh", "start.sh" ]
