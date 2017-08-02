* Running a private swarm http://swarm-guide.readthedocs.io/en/latest/runninganode.html#running-a-private-swarm

```
$ docker-compose build
$ docker-compose up -d

$ docker-compose exec snode1 cat /tmp/enode
"enode://f5d25253eedb82a255240e2d94580a9924b701a874f189dd36f2a8bfcb9b82da933c81261941adeeca5a93dfdba695a05ea7cab8beea689fa8e692af6d953d11@192.168.96.3:30399"

$ docker-compose exec snode2 cat /tmp/enode
"enode://714231069c5d8c45bb03395298f581438b790fc678bb5cef517e35fbd92a339af27af2720d09429607b546b369fa2cb5a03f458dc9003c7b030e293ff48a12ad@192.168.96.2:30399"


$ docker-compose exec snode1 bash
bash-4.3# echo 'hello swarm' > hello.txt
bash-4.3# swarm up hello.txt
f42610ecfe779b9cf056898847a3c7511a45c64accec26a81a62c62eb737ea90
bash-4.3# curl -s http://localhost:8500/bzz:/f42610ecfe779b9cf056898847a3c7511a45c64accec26a81a62c62eb737ea90
hello swarm

bash-4.3# geth --exec "console.log(admin.nodeInfo.enode)" attach /tmp/BZZ/bzzd.ipc
enode://0eca24bb727227d047eb0be919b3edef92a686e3f8e1603fd45ae101a2a8400dee7a444a015084c0bdcd8deee9d948c85698a5029538f6bc9f942b539847eaa1@[::]:30399

bash-4.3# exit
exit

$ docker-compose exec snode2 curl -s http://localhost:8500/bzz:/f42610ecfe779b9cf056898847a3c7511a45c64accec26a81a62c62eb737ea90
Manifest not Found

```