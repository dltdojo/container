#!/bin/sh
set -e
BITCOIN_DATA=/home/bitcoin/.bitcoin
chmod 700 "$BITCOIN_DATA"
chown -R bitcoin "$BITCOIN_DATA"
su-exec bitcoin bitcoind -daemon -datadir="$BITCOIN_DATA"
sleep 2s
su-exec bitcoin bitcoin-cli generate 102
sleep 2s
su-exec bitcoin bitcoin-cli sendmany "" "{\"ms7X9LdUS4BYw3eLhzQiP7GEZVfFigNYdn\":1,\"mgNR7BhR6bVasbgxmy22qzQXmzXzkLmtcG\":2}"
sleep 1s
su-exec bitcoin bitcoin-cli generate 1
su-exec bitcoin bitcoin-cli sendtoaddress mvbnrCX3bg1cDRUu8pkecrvP6vQkSLDSou 5.5
su-exec bitcoin bitcoin-cli generate 1
sleep 2s
cd /bitcoin-abe && python -m Abe.abe --config abe-sqlite.conf
