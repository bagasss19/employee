FROM node:14-alpine as build
WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY .env ./
COPY another-faulty-employees.json ./

# copy source code to /app/src folder
COPY . /app/src

RUN npm install
RUN npm run build


FROM node:14-alpine

WORKDIR /app

COPY package*.json ./
COPY .env ./
COPY another-faulty-employees.json ./
RUN npm install


COPY --from=build /app/dist dist
EXPOSE 8000

CMD ["npm", "run", "start"]