FROM node:18-alpine as deps
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:18-alpine as builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .
RUN yarn build

FROM node:18-alpine as runner
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY --from=builder /app/build ./build

ENV NODE_ENV=production
ENV PORT=5000

EXPOSE 5000

CMD ["yarn", "start"]