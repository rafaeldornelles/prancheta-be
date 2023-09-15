FROM node:18-alpine

COPY /dist ./dist
COPY package.json ./dist
RUN cd dist && npm i && ls

CMD ["node", "dist/index.js"]
