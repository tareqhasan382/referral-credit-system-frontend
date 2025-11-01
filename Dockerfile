FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Build the app
RUN npm run build

EXPOSE 4173

# CMD instruction to start Next.js server and bind to 0.0.0.0
CMD ["npm", "run", "start", "--", "-p", "4173", "-H", "0.0.0.0"]
