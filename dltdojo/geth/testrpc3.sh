#!/bin/bash
geth --exec 'personal.newAccount("pass");personal.unlockAccount(eth.accounts[0], "pass", 7200);' attach
sleep 1
geth --exec 'miner.start();' attach
sleep 1
geth --exec 'personal.newAccount("pass");personal.unlockAccount(eth.accounts[1], "pass", 7200);' attach
sleep 1
geth --exec 'personal.newAccount("pass");personal.unlockAccount(eth.accounts[2], "pass", 7200);' attach
sleep 1
for (( ; ; ))
do
   echo "Pres CTRL+C to stop..."
   geth --exec 'miner.start();' attach
   sleep 2
   geth --exec 'miner.stop();' attach
   sleep ${1:-30}
done