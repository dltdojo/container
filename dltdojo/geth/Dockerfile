FROM  dltdojo/geth:1.6.7.all
RUN ls -al  /usr/local/bin/
#
# dldtojo/geth:1.6.7
#
FROM alpine:3.6
COPY --from=0 /usr/local/bin/geth /usr/local/bin
COPY --from=0 /usr/local/bin/puppeth /usr/local/bin
RUN apk --update add bash curl jq tree
WORKDIR /opt/geth
ADD gethload.js .
ADD testaccount.sh .
RUN chmod +x testaccount.sh
ENTRYPOINT []
# --datadir "/root/.ethereum/"
CMD ["geth","--dev","--datadir","/root/.ethereum/","--rpc","--rpcapi", "miner,admin,db,personal,eth,net,web3"]