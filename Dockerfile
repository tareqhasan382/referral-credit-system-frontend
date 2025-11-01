FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Build the app
RUN npm run build

EXPOSE 4173

CMD ["npm", "run", "start", "--", "-p", "4173"]
