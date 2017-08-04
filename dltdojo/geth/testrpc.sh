#!/bin/bash
geth --dev --datadir /root/.ethereum/ --rpc --rpcapi miner,admin,db,personal,eth,net,web3 --rpccorsdomain="*" --rpcaddr="0.0.0.0" --ws --wsaddr="0.0.0.0" --wsorigins "*" &
sleep 2
geth --exec 'personal.newAccount("pass");miner.start();personal.unlockAccount(eth.accounts[0], "pass", 3600);' attach
sleep 2
tail -f /dev/null