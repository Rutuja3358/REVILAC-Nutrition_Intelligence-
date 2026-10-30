FROM node:22-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev --no-audit --no-fund
COPY . .
RUN addgroup -S revilac && adduser -S revilac -G revilac && chown -R revilac:revilac /app
USER revilac
EXPOSE 8787
CMD ["node", "production-server.js"]
