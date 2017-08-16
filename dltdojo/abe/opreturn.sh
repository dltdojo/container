#!/bin/bash
set -e
alias bcli='su-exec bitcoin bitcoin-cli'
bcli getinfo
bcli listunspent
utxo_txid=$(bcli listunspent | jq -r '.[0] | .txid')
utxo_vout=$(bcli listunspent | jq -r '.[0] | .vout')
changeaddress=$(bcli getrawchangeaddress)
op_return_data="6005600401"
evm_opcodes="PUSH1 05 PUSH1 04 ADD"
rawtxhex=$(bcli -named createrawtransaction inputs='''[ { "txid": "'$utxo_txid'", "vout": '$utxo_vout' } ]''' outputs='''{ "data": "'$op_return_data'", "'$changeaddress'": 49.9995 }''')
bcli -named decoderawtransaction hexstring=$rawtxhex
signedtx=$(bcli -named signrawtransaction hexstring=$rawtxhex | jq -r '.hex')
bcli -named decoderawtransaction hexstring=$signedtx
bcli -named sendrawtransaction hexstring=$signedtx
sleep 1s
bcli generate 2
sleep 1s
echo 
echo open the http://VMIP:12750
echo
