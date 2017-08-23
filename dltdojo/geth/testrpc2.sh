#!/bin/bash
geth --exec 'personal.newAccount("pass");miner.start();personal.unlockAccount(eth.accounts[0], "pass", 7200);' attach
sleep 2
geth --exec 'personal.newAccount("pass");personal.unlockAccount(eth.accounts[1], "pass", 7200);' attach
sleep 2
geth --exec 'personal.newAccount("pass");personal.unlockAccount(eth.accounts[2], "pass", 7200);' attach