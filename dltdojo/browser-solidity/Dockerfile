FROM dltdojo/node:6
RUN apk --update add git
ENV BUILD_VER=2017-08-19
RUN npm i -g http-server
WORKDIR /opt/build
RUN git clone -b gh-pages --depth=1 https://github.com/ethereum/browser-solidity.git
ENV VER=remix-70f02ab
CMD ["http-server","browser-solidity"]

#
# FROM dltdojo/node:6
# WORKDIR /opt/ddj
# COPY --from=0 /opt/build/browser-solidity/build /opt/ddj/build
# COPY --from=0 /opt/build/browser-solidity/assets /opt/ddj/assets
# COPY --from=0 /opt/build/browser-solidity/index.html /opt/ddj/