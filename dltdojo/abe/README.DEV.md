### bitcoin abe explorer api

```
$ curl -v http://localhost:12750/chain/Testnet/q/addressbalance/mgNR7BhR6bVasbgxmy22qzQXmzXzkLmtcG
*   Trying ::1...
* Connected to localhost (::1) port 12750 (#0)
> GET /chain/Testnet/q/addressbalance/mgNR7BhR6bVasbgxmy22qzQXmzXzkLmtcG HTTP/1.1
> Host: localhost:12750
> User-Agent: curl/7.47.0
> Accept: */*
>
* HTTP 1.0, assume close after body
< HTTP/1.0 200 OK
< Date: Fri, 21 Jul 2017 01:48:57 GMT
< Server: WSGIServer/0.1 Python/2.7.12
< Content-type: text/plain
< Cache-Control: max-age=30
< Content-Length: 1
<
* Closing connection 0
2
$ curl -s http://localhost:12750/chain/Testnet/q/addressbalance/ms7X9LdUS4BYw3eLhzQiP7GEZVfFigNYdn
1
```