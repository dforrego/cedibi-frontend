FROM node:10-alpine
WORKDIR /home/ubuntu/source/
ENV HOST 0.0.0.0
ADD front/package.json front/yarn.lock ./
COPY ./front ./
RUN apt-get update \
    && yarn install \
    && yarn run build
CMD ["yarn", "start"]
EXPOSE 8080