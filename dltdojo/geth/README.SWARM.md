### dltdojo/swarm:1.6.7

```
$ docker build -f Dockerfile.swarm -t dltdojo/swarm:1.6.7 . 
$ docker run -it --rm dltdojo/swarm:1.6.7 swarm version
Swarm
Version: 1.6.7-stable
Network Id: 0
Go Version: go1.9beta2
OS: linux
GOPATH=
GOROOT=/usr/local/go
$ docker run -it --rm dltdojo/swarm:1.6.7 bash
bash-4.3# geth account new
WARN [08-02|06:29:39] No etherbase set and no accounts found as default
Your new account is locked with a password. Please give a password. Do not forget this password.
Passphrase: pass
Repeat passphrase: pass
Address: {9682f1178e0dddf081feebf3bdd3c957c1c0aa58}

bash-4.3#  swarm --bzzaccount 9682f1178e0dddf081feebf3bdd3c957c1c0aa58 --ens-api ''

Unlocking swarm account 0x9682f1178e0dddf081feebf3bdd3c957c1c0aa58 [1/3]
Passphrase:
INFO [08-02|06:31:20] Starting peer-to-peer node               instance=swarm/v1.6.7-stable/linux-amd64/go1.9beta2
WARN [08-02|06:31:20] No ENS, please specify non-empty --ens-api to use domain name resolution
INFO [08-02|06:31:20] Starting P2P networking
INFO [08-02|06:31:23] UDP listener up                          self=enode://e6cc3fc0da35375ba452ccc416a26cdad56bd278c8d5f63573a186ad7fd316de3cdc95d68a2d0e6f060c9a20561ea9912ab9f170ef30a107e7c1007f5626ee29@[::]:30399
WARN [08-02|06:31:23] Starting Swarm service
WARN [08-02|06:31:23] Warning: error reading kaddb '/root/.ethereum/swarm/bzz-9682f1178e0dddf081feebf3bdd3c957c1c0aa58/bzz-peers.json' (skipping): open /root/.ethereum/swarm/bzz-9682f1178e0dddf081feebf3bdd3c957c1c0aa58/bzz-peers.json: no such file or directory
INFO [08-02|06:31:23] Swarm network started on bzz address: 2163c52ee291452747ead5a6f31c4d9c62e880390aca0f429583ae051685f8ab
INFO [08-02|06:31:23] Swarm http proxy started on 127.0.0.1:8500
INFO [08-02|06:31:23] RLPx listener up                         self=enode://e6cc3fc0da35375ba452ccc416a26cdad56bd278c8d5f63573a186ad7fd316de3cdc95d68a2d0e6f060c9a20561ea9912ab9f170ef30a107e7c1007f5626ee29@[::]:30399
INFO [08-02|06:31:23] IPC endpoint opened: /root/.ethereum/bzzd.ipc
INFO [08-02|06:31:43] Peer c16ed184 is capable (0/3)
INFO [08-02|06:31:43] add new record <c16ed1847a850033384f640e067dc797be36fc04cafac6374c47204b08a46653> to kaddb
INFO [08-02|06:31:43] syncronisation request sent with address: -, index: 0-0, session started at: 0, last seen at: 0, latest key:
INFO [08-02|06:31:43] syncer started: address: -, index: 0-0, session started at: 0, last seen at: 0, latest key:

WARN [08-02|06:41:07] no peer
WARN [08-02|06:41:10] no peer
WARN [08-02|06:41:13] no peer
WARN [08-02|06:41:16] no peer
WARN [08-02|06:41:19] no peer
WARN [08-02|06:41:22] no peer
WARN [08-02|06:41:25] no peer
WARN [08-02|06:41:28] no peer
WARN [08-02|06:41:31] no peer
WARN [08-02|06:41:34] no peer
WARN [08-02|06:41:37] no peer
WARN [08-02|06:41:40] no peer
WARN [08-02|06:41:43] no peer
WARN [08-02|06:41:46] no peer
WARN [08-02|06:41:49] no peer
WARN [08-02|06:41:52] no peer

^CINFO [08-02|06:42:18] Got interrupt, shutting down...
INFO [08-02|06:42:18] IPC endpoint closed: /root/.ethereum/bzzd.ipc
INFO [08-02|06:42:18] saved kaddb with 6 nodes to /root/.ethereum/swarm/bzz-9682f1178e0dddf081feebf3bdd3c957c1c0aa58/bzz-peers.json

```


