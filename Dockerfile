<<<<<<< HEAD

FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Build the app
RUN npm run build

EXPOSE 4173
CMD ["npm", "run", "start", "--", "-p", "4173"]
=======
# syntax=docker/dockerfile:1
########################################
# Builder: install all deps (including dev) and build
########################################
FROM node:20-alpine AS builder
WORKDIR /app

# Ensure we install devDependencies during build (do NOT set NODE_ENV=production here)
# copy package files first for cache
COPY package*.json ./

# Install all deps (dev + prod) so tools like typescript are available for build-time
RUN npm ci --prefer-offline --no-audit --progress=false

# Copy source and build
COPY . .
RUN npm run build

########################################
# Runner: create smaller image with only production deps
########################################
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# Copy package files and install only production dependencies here
COPY package*.json ./
RUN npm ci --omit=dev --prefer-offline --no-audit --progress=false

# Copy only built output and public/static files
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
# Copy next config / env types if needed
COPY --from=builder /app/next.config.* ./
COPY --from=builder /app/next-env.d.ts ./

EXPOSE 3000
CMD ["npm", "run", "start"]
>>>>>>> f1c3cb8c35cb836da727309e5812d5c602ae2e27
