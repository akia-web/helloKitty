FROM node:24-alpine AS builder

WORKDIR /app

COPY . .

RUN npm ci

RUN npm run build


FROM node:24-alpine

WORKDIR /app

COPY --from=builder /app/.output ./.output
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/app/generated/prisma ./app/generated/prisma

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]