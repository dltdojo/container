## prova

* https://github.com/BitGo/prova
* https://github.com/BitGo/provajs-lib

```
$ docker build -t dltdojo/prova .
$ docker run -it --rm dltdojo/prova bash

bash-4.3# prova &
[1] 5
bash-4.3# 04:56:45 2017-07-17 [INF] PRVA: Version 0.1.0-beta
04:56:45 2017-07-17 [INF] PRVA: Loading block database from '/root/.prova/data/regtest/blocks_ffldb'
04:56:45 2017-07-17 [INF] PRVA: Block database loaded
04:56:45 2017-07-17 [INF] INDX: Transaction index is enabled
04:56:45 2017-07-17 [INF] INDX: Address index is enabled
04:56:45 2017-07-17 [INF] INDX: Catching up indexes from height -1 to 0
04:56:45 2017-07-17 [INF] INDX: Indexes caught up to height 0
04:56:45 2017-07-17 [INF] CHAN: Chain state (height 0, hash 7255f2077d7848c715ae470e4524ae382ce6185fa6ab43b89b275847d822e2e0, totaltx 1, work 17)
04:56:45 2017-07-17 [INF] RPCS: Generating TLS certificates...
04:56:45 2017-07-17 [INF] RPCS: Done generating TLS certificates
04:56:45 2017-07-17 [WRN] RPCS: Can't listen on [::1]:18334: listen tcp6 [::1]:18334: bind: cannot assign requested address
04:56:45 2017-07-17 [INF] AMGR: Loaded 0 addresses from file '/root/.prova/data/regtest/peers.json'
04:56:45 2017-07-17 [INF] RPCS: RPC server listening on 127.0.0.1:18334
04:56:45 2017-07-17 [INF] CMGR: Server listening on 0.0.0.0:18989
04:56:45 2017-07-17 [INF] CMGR: Server listening on [::]:18989

bash-4.3# provactl -u user -P pass -s 127.0.0.1:18334 generate 101
-32603: No payment addresses specified via --miningaddr

```