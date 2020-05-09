FROM node:6-alpine

ADD views /cms/views
ADD package.json /cms
ADD index.js /cms

RUN cd /cms; npm install

ENV NODE_ENV production
ENV PORT 8080
EXPOSE 8080

WORKDIR "/cms"
CMD [ "npm", "start" ]