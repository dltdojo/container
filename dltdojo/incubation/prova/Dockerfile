FROM golang:1.9-alpine
# FROM alpine:3.6
# https://github.com/docker-library/golang/blob/master/1.9-rc/alpine/Dockerfile
RUN go version && go env GOROOT GOPATH
RUN apk --update --no-cache add curl build-base musl-dev linux-headers git
RUN go get -u github.com/Masterminds/glide
RUN git clone https://github.com/bitgo/prova $GOPATH/src/github.com/bitgo/prova
RUN cd $GOPATH/src/github.com/bitgo/prova && glide install && go install . ./cmd/...
RUN ls $GOPATH/bin

# docker build -t dltdojo/prova .
#
FROM alpine:3.6
COPY --from=0 /go/bin/* /usr/local/bin/
RUN apk --update add bash curl jq
WORKDIR /opt/prova
ADD prova.conf /root/.prova/
ENTRYPOINT []
CMD ["prova"]