* jbenet/go-ipfs - Docker Hub https://hub.docker.com/r/jbenet/go-ipfs/
* Replication on IPFS -- Or, the Backing-Up Content Model · Issue #47 · ipfs/faq https://github.com/ipfs/faq/issues/47
* https://ipfs.io/docs/commands/#ipfs-refs-local
* https://ipfs.io/docs/commands/#ipfs-add
* https://ipfs.io/docs/commands/#ipfs-cat
* Pinning https://ipfs.io/ipfs/QmTkzDwWqPbnAh5YiV5VwcTLnGdwSNsNTn2aDxdXBFca7D/example#/ipfs/QmQwAP9vFjbCtKvD8RkJdCvPHqLQjZfW7Mqbbqx18zd8j7/pinning/readme.md
* https://ipfs.io/docs/commands/#ipfs-pin

### 啟動三個節點列出本機檔案參考

```
$ docker-compose up -d
$ docker-compose exec node1 ipfs version
ipfs version 0.4.10

$ docker-compose exec node1 ipfs refs local
QmPZ9gcCEpqKTo6aq61g2nXGUhM4iCL3ewB6LDXZCtioEB
QmbFFVbPsyoiqJT6rb2wGtfy9cwujbdmUYWLVu6USSYD8r
QmejvEPop4D7YUadeGqYWmZxHhLc4JBUCzJJHWMzdcMe2y
QmUNLLsPACCz1vLxQVkXqqLX5R1X345qqfHbsf67hvA3Nn
QmVLDAhCY3X9P2uRudKAryuQFPM5zqA3Yij1dY8FpGbL7T
QmdfTbBqBPQ7VNxZEYEj14VmRuZBkqFbiwReogJgS1zR1n
QmY5heUM5qgRubMDD1og9fhCPA6QdkMp3QCwd4s7gJsyE7
QmZq1uJyvfij1TfdTPJDuBcryWDg5upUyz8S3FSrhULQ6W
QmdncfsVm2h5Kqq9hPmU7oAVX2zTSVP3L869tgTbPYnsha
QmSKboVigcD3AY4kLsob117KJcMHvMUu6vNFqk1PQzYUpp
QmQ5vhrL7uv6tuoN9KeVBwd4PwfQkXdVVmDLUZuTNxqgvm
QmYCvbfNbCwFR45HiNP45rwJgvatpiW38D961L5qAhUM5Y
QmRr8Ed4rtEcEH3CVJrfRWqWRdaJA9VPSrBWJcjb52jW7y
QmZTR5bcpQD7cFgTorqxZDYaew1Wqgfbd2ud9QqGPAkK2V
QmbhZ4KGKEMAEFLW73toGAo47qtMaQyukucfyCRwZvHPMN

$ docker-compose exec node2 ipfs refs local
QmPZ9gcCEpqKTo6aq61g2nXGUhM4iCL3ewB6LDXZCtioEB
QmbFFVbPsyoiqJT6rb2wGtfy9cwujbdmUYWLVu6USSYD8r
QmejvEPop4D7YUadeGqYWmZxHhLc4JBUCzJJHWMzdcMe2y
QmUNLLsPACCz1vLxQVkXqqLX5R1X345qqfHbsf67hvA3Nn
QmVLDAhCY3X9P2uRudKAryuQFPM5zqA3Yij1dY8FpGbL7T
QmdfTbBqBPQ7VNxZEYEj14VmRuZBkqFbiwReogJgS1zR1n
QmY5heUM5qgRubMDD1og9fhCPA6QdkMp3QCwd4s7gJsyE7
QmZq1uJyvfij1TfdTPJDuBcryWDg5upUyz8S3FSrhULQ6W
QmdncfsVm2h5Kqq9hPmU7oAVX2zTSVP3L869tgTbPYnsha
QmSKboVigcD3AY4kLsob117KJcMHvMUu6vNFqk1PQzYUpp
QmQ5vhrL7uv6tuoN9KeVBwd4PwfQkXdVVmDLUZuTNxqgvm
QmYCvbfNbCwFR45HiNP45rwJgvatpiW38D961L5qAhUM5Y
QmRr8Ed4rtEcEH3CVJrfRWqWRdaJA9VPSrBWJcjb52jW7y
QmZTR5bcpQD7cFgTorqxZDYaew1Wqgfbd2ud9QqGPAkK2V
QmbhZ4KGKEMAEFLW73toGAo47qtMaQyukucfyCRwZvHPMN

$ docker-compose exec node3 ipfs refs local
QmPZ9gcCEpqKTo6aq61g2nXGUhM4iCL3ewB6LDXZCtioEB
QmbFFVbPsyoiqJT6rb2wGtfy9cwujbdmUYWLVu6USSYD8r
QmejvEPop4D7YUadeGqYWmZxHhLc4JBUCzJJHWMzdcMe2y
QmUNLLsPACCz1vLxQVkXqqLX5R1X345qqfHbsf67hvA3Nn
QmVLDAhCY3X9P2uRudKAryuQFPM5zqA3Yij1dY8FpGbL7T
QmdfTbBqBPQ7VNxZEYEj14VmRuZBkqFbiwReogJgS1zR1n
QmY5heUM5qgRubMDD1og9fhCPA6QdkMp3QCwd4s7gJsyE7
QmZq1uJyvfij1TfdTPJDuBcryWDg5upUyz8S3FSrhULQ6W
QmdncfsVm2h5Kqq9hPmU7oAVX2zTSVP3L869tgTbPYnsha
QmSKboVigcD3AY4kLsob117KJcMHvMUu6vNFqk1PQzYUpp
QmQ5vhrL7uv6tuoN9KeVBwd4PwfQkXdVVmDLUZuTNxqgvm
QmYCvbfNbCwFR45HiNP45rwJgvatpiW38D961L5qAhUM5Y
QmRr8Ed4rtEcEH3CVJrfRWqWRdaJA9VPSrBWJcjb52jW7y
QmZTR5bcpQD7cFgTorqxZDYaew1Wqgfbd2ud9QqGPAkK2V
QmbhZ4KGKEMAEFLW73toGAo47qtMaQyukucfyCRwZvHPMN
```
### node1寫入ipfs
```
$ docker-compose exec node1 bash
bash-4.3# echo "I <3 IPFS node1" | ipfs add -q
QmQXPLGAaK2V41MHLbvAhsZTsPQZ5ob2Vx8arzL85uSUGX
bash-4.3# ipfs cat /ipfs/QmQXPLGAaK2V41MHLbvAhsZTsPQZ5ob2Vx8arzL85uSUGX
I <3 IPFS node1
bash-4.3# exit
exit
```

### node2使用ipfs cat讀取檔案並快取

```
$ curl "https://ipfs.io/ipfs/QmQXPLGAaK2V41MHLbvAhsZTsPQZ5ob2Vx8arzL85uSUGX"
I <3 IPFS node1

$ docker-compose exec node1 ipfs refs local | grep QmQXPL
QmQXPLGAaK2V41MHLbvAhsZTsPQZ5ob2Vx8arzL85uSUGX

$ docker-compose exec node2 ipfs refs local | grep QmQXPL

$ docker-compose exec node3 ipfs refs local | grep QmQXPL

$ docker-compose exec node2 ipfs cat /ipfs/QmQXPLGAaK2V41MHLbvAhsZTsPQZ5ob2Vx8arzL85uSUGX
I <3 IPFS node1

$ docker-compose exec node2 ipfs refs local | grep QmQXPL
QmQXPLGAaK2V41MHLbvAhsZTsPQZ5ob2Vx8arzL85uSUGX
```

### 停止具有該檔案的兩個節點後無法存取，啟動其中一個節點後恢復

```
$ docker-compose stop node1
Stopping ipfs_node1_1 ... done

$ docker-compose stop node2
Stopping ipfs_node2_1 ... done

$ docker-compose exec node3 ipfs cat /ipfs/QmQXPLGAaK2V41MHLbvAhsZTsPQZ5ob2Vx8arzL85uSUGX
^C
Error: request canceled

$ docker-compose up -d node2
Starting ipfs_node2_1

$ docker-compose exec node3 ipfs cat /ipfs/QmQXPLGAaK2V41MHLbvAhsZTsPQZ5ob2Vx8arzL85uSUGX
I <3 IPFS node1
```

### 非本機加入檔案只快取，需pin add才免回收

```
$ docker-compose exec node1 ipfs pin ls --type=all | grep QmQXPL
QmQXPLGAaK2V41MHLbvAhsZTsPQZ5ob2Vx8arzL85uSUGX recursive
$ docker-compose exec node2 ipfs pin ls --type=all | grep QmQXPL
$ docker-compose exec node2 ipfs repo gc
removed QmbFFVbPsyoiqJT6rb2wGtfy9cwujbdmUYWLVu6USSYD8r
removed QmQXPLGAaK2V41MHLbvAhsZTsPQZ5ob2Vx8arzL85uSUGX
removed QmRr8Ed4rtEcEH3CVJrfRWqWRdaJA9VPSrBWJcjb52jW7y

$ docker-compose exec node2 ipfs cat /ipfs/QmQXPLGAaK2V41MHLbvAhsZTsPQZ5ob2Vx8arzL85uSUGX
I <3 IPFS node1

$ docker-compose exec node2 ipfs pin add /ipfs/QmQXPLGAaK2V41MHLbvAhsZTsPQZ5ob2Vx8arzL85uSUGX
pinned QmQXPLGAaK2V41MHLbvAhsZTsPQZ5ob2Vx8arzL85uSUGX recursively

$ docker-compose exec node2 ipfs repo gc
removed QmZq1uJyvfij1TfdTPJDuBcryWDg5upUyz8S3FSrhULQ6W
removed QmbhZ4KGKEMAEFLW73toGAo47qtMaQyukucfyCRwZvHPMN

```

### stop all containers

```
$ docker-compose stop
```