FROM node:10-alpine
WORKDIR /front
ENV HOST 0.0.0.0
ADD package.json yarn.lock ./
COPY . .
RUN yarn install \
    && yarn run build
CMD ["yarn", "start"]
EXPOSE 8080