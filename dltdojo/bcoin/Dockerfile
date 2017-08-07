FROM node:7-alpine
RUN apk --update add git build-base musl-dev linux-headers python
RUN npm i -g bcoin --production

FROM dltdojo/node:8
#
#  globally npm install
#
COPY --from=0 /usr/local/lib/node_modules /usr/local/lib/node_modules
COPY --from=0 /usr/local/bin/bcoin /usr/local/bin/
WORKDIR /opt/ddj
RUN npm link bcoin
ADD blockchain.js ./