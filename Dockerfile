FROM node:10-alpine
WORKDIR /front
ADD package.json yarn.lock ./
COPY . .
RUN yarn install \
    && yarn run build
CMD ["yarn", "serve"]
EXPOSE 8080