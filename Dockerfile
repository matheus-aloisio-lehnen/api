###################
# DEV
###################

FROM node:lts-iron AS dev

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD [ "npm", "run", "start:dev"]


###################
# DEBUG
###################

FROM node:lts-iron AS debug

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD [ "npm", "run", "start:docker-debug"]

#####################
#BUILD FOR PRODUCTION
#####################

FROM node:lts-iron  AS build

WORKDIR /usr/src/app

COPY package*.json ./

COPY --from=dev /usr/src/app/node_modules ./node_modules

COPY . .

RUN npm run build

RUN npm ci --only=production && npm cache clean --force

##################
#PRODUCTION
##################

FROM node:lts-iron  AS production

COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

CMD [ "node", "dist/main.js" ]
