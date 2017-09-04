FROM dltdojo/geth:1.6.7.all
RUN ls -al  /usr/local/bin/
#
# dldtojo/geth:1.6.7
#
FROM node:6.11.1-alpine
COPY --from=0 /usr/local/bin/geth /usr/local/bin
COPY --from=0 /usr/local/bin/puppeth /usr/local/bin
RUN apk --update add bash curl jq tree git
#
# eth_compilers, eth_compileSolidity are gone in go-ethereum 1.6.0 · https://github.com/ethereum/go-ethereum/issues/3793
# install solidity compiler solcjs
# http://solidity.readthedocs.io/en/develop/installing-solidity.html
# bash-4.3# solcjs --version
# 0.4.13+commit.0fb4cb1a.Emscripten.clang
# 
RUN npm install -g solc
WORKDIR /opt/geth
RUN curl -s https://www.rinkeby.io/rinkeby.json -o rinkeby.json
ADD gethload.js testaccount.sh start.sh testrpc.sh attach.sh rinkeby.sh SimpleStorage.sol testrpc2.sh testrpc3.sh start-debug.sh ./
RUN chmod +x *.sh
ENTRYPOINT []
# --datadir "/root/.ethereum/"
CMD ["/opt/geth/start.sh"]