FROM dltdojo/node:6
RUN apk --update add git build-base musl-dev linux-headers python
#
# ethereumjs/helpeth: Help (with) Ethereum. Purists' commandline tool for key and transaction management. 
# https://github.com/ethereumjs/helpeth
RUN npm install -g helpeth
#
# trufflesuite/truffle: The most popular Ethereum development framework 
# https://github.com/trufflesuite/truffle
RUN npm install -g truffle
#
# ethereumjs/testrpc: Fast Ethereum RPC client for testing and development 
# https://github.com/ethereumjs/testrpc
RUN npm install -g ethereumjs-testrpc
WORKDIR /opt/ddj
ADD package.json /opt/ddj/
RUN npm install

FROM dltdojo/node:6
RUN apk --update add git
#
#  globally npm install
#
COPY --from=0 /usr/local/lib/node_modules /usr/local/lib/node_modules
COPY --from=0 /usr/local/bin /usr/local/bin
#
#
WORKDIR /opt/ddj
COPY --from=0 /opt/ddj/node_modules /opt/ddj/node_modules
ADD package.json /opt/ddj/
ADD subapp /opt/ddj/subapp