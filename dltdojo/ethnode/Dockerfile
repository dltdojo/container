FROM dltdojo/node:8
RUN apk --update add git build-base musl-dev linux-headers python
WORKDIR /opt/ddj
ADD package.json /opt/ddj/
RUN npm install

FROM dltdojo/node:8
RUN apk --update add git
RUN npm install -g truffle
RUN npm install -g ethereumjs-testrpc
WORKDIR /opt/ddj
COPY --from=0 /opt/ddj/node_modules /opt/ddj/node_modules
ADD package.json /opt/ddj/
ADD subapp /opt/ddj/subapp