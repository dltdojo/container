#!/bin/bash
geth --dev --datadir /root/.ethereum/ --rpc --rpcapi miner,admin,db,personal,eth,net,web3 --rpccorsdomain="*" --rpcaddr="0.0.0.0" --ws --wsaddr="0.0.0.0" --wsorigins "*" &
sleep 2
geth --exec 'personal.newAccount("pass");miner.start();personal.unlockAccount(eth.accounts[0], "pass", 7200);' attach
sleep 2
geth --exec 'personal.newAccount("pass");personal.unlockAccount(eth.accounts[1], "pass", 7200);' attach
sleep 2
geth --exec 'personal.newAccount("pass");personal.unlockAccount(eth.accounts[2], "pass", 7200);' attach
tail -f /dev/null