### TEST: Creating self-signed ecdsa-with-SHA256 SSL certificate using OpenSSL

* hyperledger/fabric-baseimage: https://github.com/hyperledger/fabric-baseimage
* DOCKER_BASE_x86_64=ubuntu:xenial https://github.com/hyperledger/fabric-baseimage/blob/master/Makefile#L23
* hyperledger/fabric-ca:x86_64-1.0.0 https://github.com/hyperledger/fabric-ca/blob/release/Makefile#L103

```
$ docker build -t dltdojo/fabric-ca .
$ docker run -it --rm dltdojo/fabric-ca curl -v http://www.google.com

* Rebuilt URL to: http://www.google.com/
*   Trying 74.125.203.103...
* Connected to www.google.com (74.125.203.103) port 80 (#0)
> GET / HTTP/1.1
> Host: www.google.com
> User-Agent: curl/7.47.0
> Accept: */*
>
< HTTP/1.1 302 Found
< Cache-Control: private
< Content-Type: text/html; charset=UTF-8
< Referrer-Policy: no-referrer
< Location: http://www.google.com.tw/?gfe_rd=cr&ei=MbNuWYOOMo2A9AXIoIKQBw
< Content-Length: 262
< Date: Wed, 19 Jul 2017 01:17:37 GMT
<
<HTML><HEAD><meta http-equiv="content-type" content="text/html;charset=utf-8">
<TITLE>302 Moved</TITLE></HEAD><BODY>
<H1>302 Moved</H1>
The document has moved
<A HREF="http://www.google.com.tw/?gfe_rd=cr&amp;ei=MbNuWYOOMo2A9AXIoIKQBw">here</A>.
</BODY></HTML>
* Connection #0 to host www.google.com left intact

```