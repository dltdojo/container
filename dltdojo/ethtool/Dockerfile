FROM golang:1.8-jessie
RUN go get github.com/Masterminds/glide
# RUN go get github.com/CoinCulture/evm-tools/...
RUN mkdir -p $GOPATH/src/github.com/CoinCulture
RUN cd $GOPATH/src/github.com/CoinCulture && git clone  https://github.com/CoinCulture/evm-tools.git \
    && cd evm-tools && glide install && make
# ENV GOPATH /go
# ENV PATH $GOPATH/bin:/usr/local/go/bin:$PATH

FROM ubuntu:xenial
RUN apt-get update && apt-get install -y apt-transport-https ca-certificates curl git jq software-properties-common
RUN add-apt-repository ppa:ethereum/ethereum
RUN apt-get update && apt-get install -y solc
#
# https://github.com/jpmorganchase/quorum/releases/
#
RUN curl -sL https://github.com/jpmorganchase/quorum/releases/download/v1.2.0/porosity -o /usr/local/bin/porosity
RUN chmod +x /usr/local/bin/porosity
#
COPY --from=0 /go/bin/* /usr/local/bin/
WORKDIR /opt/ddj
ADD foo.sol .