FROM dltdojo/node:6
RUN apk --update add git
ENV BUILD_VER=2017-08-19
RUN npm i -g http-server
WORKDIR /opt/build
RUN git clone -b gh-pages --depth=1 https://github.com/ethereum/browser-solidity.git
ENV VER=remix-70f02ab
WORKDIR /opt/build/browser-solidity
RUN mkdir dweb3js && cd dweb3js && \
    curl -sL https://cdn.rawgit.com/ethereum/web3.js/1.0/dist/web3.min.js -o web3-1.0.min.js && \
    curl -sL https://rawgit.com/ethereum/web3.js/master/dist/web3.min.js -o web3-0.20.1.min.js && \
    curl -sL https://rawgit.com/ethereum/web3.js/master/dist/web3.js -o web3-0.20.1.js
CMD ["http-server","."]

#
# FROM dltdojo/node:6
# WORKDIR /opt/ddj
# COPY --from=0 /opt/build/browser-solidity/build /opt/ddj/build
# COPY --from=0 /opt/build/browser-solidity/assets /opt/ddj/assets
# COPY --from=0 /opt/build/browser-solidity/index.html /opt/ddj/