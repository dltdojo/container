#!/bin/bash
geth --dev --datadir /root/.ethereum/ --rpc --rpcapi miner,admin,db,personal,eth,net,web3 --rpccorsdomain="*" --rpcaddr="0.0.0.0"