### parity

* paritytech/parity: Fast, light, robust Ethereum implementation https://github.com/paritytech/parity
* parity/parity - Docker Hub  https://hub.docker.com/r/parity/parity/
* Getting Synced · paritytech/parity Wiki https://github.com/paritytech/parity/wiki/Getting-Synced#warp-synchorization
* Parity 1.7 warp sync is enabled by default.

### main chain 1.7.0

```
$ docker run -it --rm parity/parity:v1.7.0

2017-07-30 09:03:44 UTC Starting Parity/v1.7.0-beta-5f2cabd-20170727/x86_64-linux-gnu/rustc1.19.0
2017-07-30 09:03:44 UTC Keys path /root/.local/share/io.parity.ethereum/keys/Foundation
2017-07-30 09:03:44 UTC DB path /root/.local/share/io.parity.ethereum/chains/ethereum/db/906a34e69aec8c0d
2017-07-30 09:03:44 UTC Path to dapps /root/.local/share/io.parity.ethereum/dapps
2017-07-30 09:03:44 UTC State DB configuration: fast
2017-07-30 09:03:44 UTC Operating mode: active
2017-07-30 09:03:44 UTC Configured for Foundation using Ethash engine
2017-07-30 09:03:45 UTC Updated conversion rate to Ξ1 = US$195.88 (607757800 wei/gas)
2017-07-30 09:03:50 UTC Public node URL: enode://5ec0b3c99f402eae149c79c5f9032a8da0faf6ab2c51d52c538d5571a96710532d55c75f4da548a9abdd0c3f02f9f4ccdac2a81d193a48ce2366c6a6b2724690@172.17.0.2:30303
2017-07-30 09:03:55 UTC Syncing snapshot 0/396        #0    6/25 peers   8 KiB chain 3 MiB db 0 bytes queue 10 KiB sync  RPC:  0 conn,  0 req/s,   0 µs
2017-07-30 09:04:00 UTC Syncing snapshot 1/396        #0    7/25 peers   8 KiB chain 3 MiB db 0 bytes queue 10 KiB sync  RPC:  0 conn,  0 req/s,   0 µs
2017-07-30 09:04:05 UTC Syncing snapshot 2/396        #0    7/25 peers   8 KiB chain 3 MiB db 0 bytes queue 10 KiB sync  RPC:  0 conn,  0 req/s,   0 µs
2017-07-30 09:04:10 UTC Syncing snapshot 2/396        #0    7/25 peers   8 KiB chain 3 MiB db 0 bytes queue 10 KiB sync  RPC:  0 conn,  0 req/s,   0 µs
2017-07-30 09:04:15 UTC Syncing snapshot 3/396        #0    7/25 peers   8 KiB chain 3 MiB db 0 bytes queue 10 KiB sync  RPC:  0 conn,  0 req/s,   0 µs
2017-07-30 09:04:20 UTC Syncing snapshot 5/396        #0    7/25 peers   8 KiB chain 3 MiB db 0 bytes queue 10 KiB sync  RPC:  0 conn,  0 req/s,   0 µs
2017-07-30 09:04:25 UTC Syncing snapshot 5/396        #0    7/25 peers   8 KiB chain 3 MiB db 0 bytes queue 10 KiB sync  RPC:  0 conn,  0 req/s,   0 µs
```

### dev chain 1.6.10

* http://<DEVIP>:8180/
* Parity private blockchain, gain ether - Ethereum Stack Exchange https://ethereum.stackexchange.com/questions/15753/parity-private-blockchain-gain-ether
* Private development chain · paritytech/parity Wiki https://github.com/paritytech/parity/wiki/Private-development-chain
* transfer issue : Container Exit 139.

```
$ docker-compose up -d dev16
$ docker-compose logs dev16

Attaching to parity_dev16_1
dev16_1  | 2017-07-30 09:57:05 UTC Starting Parity/v1.6.10-stable-1a5b176-20170721/x86_64-linux-gnu/rustc1.19.0
dev16_1  | 2017-07-30 09:57:05 UTC State DB configuration: fast
dev16_1  | 2017-07-30 09:57:05 UTC Operating mode: active
dev16_1  | 2017-07-30 09:57:05 UTC Configured for DevelopmentChain using InstantSeal engine
dev16_1  | 2017-07-30 09:57:05 UTC *** INSECURE *** Running Trusted Signer with no origin validation.
dev16_1  | 2017-07-30 09:57:05 UTC If you do not intend this, exit now.
dev16_1  | 2017-07-30 09:57:10 UTC Public node URL: enode://ed8733641f9f207f4b7b34289042b5992ff9dda56031f2cd94ce01b0ec63be0f5a54900c23df7ec82bca9bbfada8796d01e333da9f561182fc4ecd459a2102aa@192.168.48.2:30303
dev16_1  | 2017-07-30 09:57:10 UTC Syncing       #0 f3f3…b688     0 blk/s    0 tx/s   0 Mgas/s      0+    0 Qed        #0    0/25 peers    19 KiB db    7 KiB chain  0 bytes queue 448 bytes sync  RPC:  0 conn,  0 req/s,   0 µs
dev16_1  | 2017-07-30 09:57:15 UTC Syncing       #0 f3f3…b688     0 blk/s    0 tx/s   0 Mgas/s      0+    0 Qed        #0    0/25 peers    19 KiB db    7 KiB chain  0 bytes queue 448 bytes sync  RPC:  0 conn,  0 req/s,   0 µs

$ docker-compose ps
     Name                   Command                State     Ports
------------------------------------------------------------------
parity_dev16_1   /parity/parity --chain dev ...   Exit 139

$ docker-compose up -d dev16
```

### dev chain 1.7.0

* ws connection failure in 1.7.0 · Issue #6166 · paritytech/parity https://github.com/paritytech/parity/issues/6166
* http://<DEVIP>:8180/

```
$ docker-compose up -d dev17 
$ docker-compose logs dev17

Attaching to parity_dev_1
dev_1  | 2017-07-30 09:41:44 UTC Starting Parity/v1.7.0-beta-5f2cabd-20170727/x86_64-linux-gnu/rustc1.19.0
dev_1  | 2017-07-30 09:41:44 UTC Keys path /root/.local/share/io.parity.ethereum/keys/DevelopmentChain
dev_1  | 2017-07-30 09:41:44 UTC DB path /root/.local/share/io.parity.ethereum/chains/DevelopmentChain/db/27be8d97b7392e8c
dev_1  | 2017-07-30 09:41:44 UTC Path to dapps /root/.local/share/io.parity.ethereum/dapps
dev_1  | 2017-07-30 09:41:44 UTC State DB configuration: fast
dev_1  | 2017-07-30 09:41:44 UTC Operating mode: active
dev_1  | 2017-07-30 09:41:44 UTC Configured for DevelopmentChain using InstantSeal engine

$ docker-compose exec dev17 /parity/parity signer new-token

Open: http://127.0.0.1:8180/#/auth?token=B5og-nP9L-kHyf-z1eU
to authorize your browser.
Or use the generated token:
B5og-nP9L-kHyf-z1eU

```