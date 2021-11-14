FROM node:16-slim AS node

COPY . .
RUN rm -rf /node_modules
RUN yarn cache clean && yarn install --frozen-lockfile
RUN yarn install --frozen-lockfile

EXPOSE 7000

CMD ["yarn", "start"]
