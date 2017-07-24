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
RUN curl -s https://www.rinkeby.io/rinkeby.json -o rinkeby.json
ADD gethload.js .
ADD testaccount.sh start.sh testrpc.sh attach.sh rinkeby.sh ./
RUN chmod +x *.sh
ENTRYPOINT []
# --datadir "/root/.ethereum/"
CMD ["/opt/geth/start.sh"]