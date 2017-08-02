#!/bin/bash
#
# http://swarm-guide.readthedocs.io/en/latest/runninganode.html#running-a-private-swarm
#
# Working directory
cd /tmp

# Preparation
DATADIR=/tmp/BZZ
mkdir -p $DATADIR
MYPASSWORD=foopass
echo $MYPASSWORD > $DATADIR/my-password
ACCOUNT=$(geth --datadir $DATADIR --password $DATADIR/my-password account new)
echo $ACCOUNT
echo
BZZKEY=${ACCOUNT:10:40}

echo "Your account is ready: "$BZZKEY

# Run geth in the background
#nohup geth --datadir $DATADIR \
#    --unlock 0 \
#    --password <(cat $DATADIR/my-password) \
#    --verbosity 6 \
#    --networkid 322 \
#    --nodiscover \
#    --maxpeers 0 \
#    2>> $DATADIR/geth.log &

# echo "geth is running in the background, you can check its logs at "$DATADIR"/geth.log"

# Now run swarm in the background
swarm \
    --bzzaccount $BZZKEY \
    --datadir $DATADIR \
    --ens-api '' \
    --verbosity 6 \
    --maxpeers 5 \
    --bzznetworkid 322 < <(cat $DATADIR/my-password) &

sleep 10
geth --exec "admin.nodeInfo.enode" attach /tmp/BZZ/bzzd.ipc &> enode.noip
ENODE=`cat enode.noip`
IP_ADDR=`ifconfig|grep "inet addr"|grep -v "127.0.0.1"|sed -r 's:[^0-9.]*([0-9.]+).*:\1:'`
SED_ARG="-r 's/\[::\]/${IP_ADDR}/'"
ENODE=`echo $ENODE | eval sed "$SED_ARG"`
echo $ENODE > enode
echo ENDOE=$ENODE

tail -f /dev/null
# echo "swarm is running in the background, you can check its logs at "$DATADIR"/swarm.log"

# Cleaning up
# You need to perform this feature manually
# USE THESE COMMANDS AT YOUR OWN RISK!
##
# kill -9 $(ps aux | grep swarm | grep bzzaccount | awk '{print $2}')
# kill -9 $(ps aux | grep geth | grep datadir | awk '{print $2}')
# rm -rf /tmp/BZZ