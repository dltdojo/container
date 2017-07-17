## Hyperledger Composer(HC)
Introduction | Hyperledger Composer https://hyperledger.github.io/composer/introduction/introduction.html

### Install and run Hyperledger Composer (HC) Playground locally

* ubuntu 16.04
* https://hyperledger.github.io/composer/installing/using-playground-locally.html
* Playground (Example): http://192.168.2.106:8080/ 

```
$ curl -sSL https://hyperledger.github.io/composer/install-hlfv1.sh | bash

--------------------------------------------------------------------------------------
Hyperledger Fabric and Hyperledger Composer installed, and Composer Playground launched
Please use 'composer.sh' to re-start, and 'composer.sh stop' to shutdown all the Fabric and Composer docker images

$ ./composer.sh stop
Stopping all Docker containers
Killing all running containers
4ab8f4068c86
3550ffad25c0
8f86b0061cf2
6bf7213d19be
b0f65118342a
8b0917f4368d
Removing all containers
4ab8f4068c86
3550ffad25c0
8f86b0061cf2
6bf7213d19be
b0f65118342a
8b0917f4368d
```

### Start playground

```
$ ./composer.sh

PAYLOAD_LINE=104
PAYLOAD_START=105
Development only script for Hyplerledger Fabric control
Running 'downloadFabric.sh'
FABRIC_VERSION is unset, assuming hlfv1
FABRIC_START_TIMEOUT is unset, assuming 15 (seconds)

# Grab the current directory.
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
 cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd
 dirname "${BASH_SOURCE[0]}"

# Pull and tag the latest Hyperledger Fabric base image.
docker pull hyperledger/fabric-peer:x86_64-1.0.0
x86_64-1.0.0: Pulling from hyperledger/fabric-peer
Digest: sha256:b7c1c2a6b356996c3dbe2b9554055cd2b63194cd7a492a83de2dbabf7f7e3c65
Status: Image is up to date for hyperledger/fabric-peer:x86_64-1.0.0
docker pull hyperledger/fabric-ca:x86_64-1.0.0
x86_64-1.0.0: Pulling from hyperledger/fabric-ca
Digest: sha256:b7094644bcbf6c28948fcdd0c38ffe65f98889a57da0e1bf23bd18731ef44800
Status: Image is up to date for hyperledger/fabric-ca:x86_64-1.0.0
docker pull hyperledger/fabric-ccenv:x86_64-1.0.0
x86_64-1.0.0: Pulling from hyperledger/fabric-ccenv
Digest: sha256:eb2e87ea07e29a0b6b6e51e200efcc0cbaa571b8124c6b2dcc704da93bf39f24
Status: Image is up to date for hyperledger/fabric-ccenv:x86_64-1.0.0
docker pull hyperledger/fabric-orderer:x86_64-1.0.0
x86_64-1.0.0: Pulling from hyperledger/fabric-orderer
Digest: sha256:d0ea1f7e7ca04f0c4b7484f8835fd68e9bf13e6fcb700cf3a70f00a4059fc344
Status: Image is up to date for hyperledger/fabric-orderer:x86_64-1.0.0
docker pull hyperledger/fabric-couchdb:x86_64-1.0.0
x86_64-1.0.0: Pulling from hyperledger/fabric-couchdb
Digest: sha256:e89b0f95f6ff674fd043795090dd65a11d727ec005d925545cf0b4fc48aa221d
Status: Image is up to date for hyperledger/fabric-couchdb:x86_64-1.0.0
Development only script for Hyplerledger Fabric control
Running 'startFabric.sh'
FABRIC_VERSION is unset, assuming hlfv1
FABRIC_START_TIMEOUT is unset, assuming 15 (seconds)

# Grab the current directory
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
 cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd
 dirname "${BASH_SOURCE[0]}"

#
cd "${DIR}"/composer

docker-compose -f "${DIR}"/composer/docker-compose.yml down
Removing network composer_default
docker-compose -f "${DIR}"/composer/docker-compose.yml up -d
Creating network "composer_default" with the default driver
Creating ca.org1.example.com
Creating couchdb
Creating orderer.example.com
Creating peer0.org1.example.com

# wait for Hyperledger Fabric to start
# incase of errors when running later commands, issue export FABRIC_START_TIMEOUT=<larger number>
echo ${FABRIC_START_TIMEOUT}
15
sleep ${FABRIC_START_TIMEOUT}

# Create the channel
docker exec peer0.org1.example.com peer channel create -o orderer.example.com:7050 -c composerchannel -f /etc/hyperledger/configtx/composer-channel.tx
2017-07-17 03:08:45.878 UTC [msp] GetLocalMSP -> DEBU 001 Returning existing local MSP
2017-07-17 03:08:45.878 UTC [msp] GetDefaultSigningIdentity -> DEBU 002 Obtaining default signing identity
2017-07-17 03:08:45.880 UTC [channelCmd] InitCmdFactory -> INFO 003 Endorser and orderer connections initialized
2017-07-17 03:08:45.880 UTC [msp] GetLocalMSP -> DEBU 004 Returning existing local MSP
2017-07-17 03:08:45.880 UTC [msp] GetDefaultSigningIdentity -> DEBU 005 Obtaining default signing identity
2017-07-17 03:08:45.880 UTC [msp] GetLocalMSP -> DEBU 006 Returning existing local MSP
2017-07-17 03:08:45.880 UTC [msp] GetDefaultSigningIdentity -> DEBU 007 Obtaining default signing identity
2017-07-17 03:08:45.880 UTC [msp/identity] Sign -> DEBU 008 Sign: plaintext: 0A8C060A074F7267314D53501280062D...6D706F736572436F6E736F727469756D
2017-07-17 03:08:45.880 UTC [msp/identity] Sign -> DEBU 009 Sign: digest: E72FEDAD25492702165ED4546846687121CE5521A54598EB091189FABBEC595B
2017-07-17 03:08:45.880 UTC [msp] GetLocalMSP -> DEBU 00a Returning existing local MSP
2017-07-17 03:08:45.880 UTC [msp] GetDefaultSigningIdentity -> DEBU 00b Obtaining default signing identity
2017-07-17 03:08:45.880 UTC [msp] GetLocalMSP -> DEBU 00c Returning existing local MSP
2017-07-17 03:08:45.880 UTC [msp] GetDefaultSigningIdentity -> DEBU 00d Obtaining default signing identity
2017-07-17 03:08:45.880 UTC [msp/identity] Sign -> DEBU 00e Sign: plaintext: 0AC9060A1B08021A0608BDD4B0CB0522...9F45E714D48B2BA003C3DC203C909A8A
2017-07-17 03:08:45.880 UTC [msp/identity] Sign -> DEBU 00f Sign: digest: 4AA976EC25DA8C52F2F0DC923BF73541BD51F69591D7F6622E6D0D223BE0572A
2017-07-17 03:08:45.926 UTC [msp] GetLocalMSP -> DEBU 010 Returning existing local MSP
2017-07-17 03:08:45.926 UTC [msp] GetDefaultSigningIdentity -> DEBU 011 Obtaining default signing identity
2017-07-17 03:08:45.926 UTC [msp] GetLocalMSP -> DEBU 012 Returning existing local MSP
2017-07-17 03:08:45.926 UTC [msp] GetDefaultSigningIdentity -> DEBU 013 Obtaining default signing identity
2017-07-17 03:08:45.926 UTC [msp/identity] Sign -> DEBU 014 Sign: plaintext: 0AC9060A1B08021A0608BDD4B0CB0522...DF50B2E0B05712080A021A0012021A00
2017-07-17 03:08:45.926 UTC [msp/identity] Sign -> DEBU 015 Sign: digest: 03F42D06E30519BEED4DD64FDE50EDA5A841D7046A1D3AFAE5B74541A47013ED
2017-07-17 03:08:45.927 UTC [channelCmd] readBlock -> DEBU 016 Got status:*orderer.DeliverResponse_Status
2017-07-17 03:08:45.927 UTC [msp] GetLocalMSP -> DEBU 017 Returning existing local MSP
2017-07-17 03:08:45.927 UTC [msp] GetDefaultSigningIdentity -> DEBU 018 Obtaining default signing identity
2017-07-17 03:08:45.933 UTC [channelCmd] InitCmdFactory -> INFO 019 Endorser and orderer connections initialized
2017-07-17 03:08:46.133 UTC [msp] GetLocalMSP -> DEBU 01a Returning existing local MSP
2017-07-17 03:08:46.133 UTC [msp] GetDefaultSigningIdentity -> DEBU 01b Obtaining default signing identity
2017-07-17 03:08:46.133 UTC [msp] GetLocalMSP -> DEBU 01c Returning existing local MSP
2017-07-17 03:08:46.133 UTC [msp] GetDefaultSigningIdentity -> DEBU 01d Obtaining default signing identity
2017-07-17 03:08:46.133 UTC [msp/identity] Sign -> DEBU 01e Sign: plaintext: 0AC9060A1B08021A0608BED4B0CB0522...41E65FA44F4B12080A021A0012021A00
2017-07-17 03:08:46.133 UTC [msp/identity] Sign -> DEBU 01f Sign: digest: DDF0360D9559B95066543A81E3D5A7A105697705A48EB7CFD51F2C7607BEEE0A
2017-07-17 03:08:46.136 UTC [channelCmd] readBlock -> DEBU 020 Received block:0
2017-07-17 03:08:46.136 UTC [main] main -> INFO 021 Exiting.....

# Join peer0.org1.example.com to the channel.
docker exec -e "CORE_PEER_MSPCONFIGPATH=/etc/hyperledger/msp/users/Admin@org1.example.com/msp" peer0.org1.example.com peer channel join -b composerchannel.block
2017-07-17 03:08:46.200 UTC [msp] GetLocalMSP -> DEBU 001 Returning existing local MSP
2017-07-17 03:08:46.200 UTC [msp] GetDefaultSigningIdentity -> DEBU 002 Obtaining default signing identity
2017-07-17 03:08:46.201 UTC [channelCmd] InitCmdFactory -> INFO 003 Endorser and orderer connections initialized
2017-07-17 03:08:46.202 UTC [msp/identity] Sign -> DEBU 004 Sign: plaintext: 0A89070A5B08011A0B08BED4B0CB0510...6DC527F3FC701A080A000A000A000A00
2017-07-17 03:08:46.202 UTC [msp/identity] Sign -> DEBU 005 Sign: digest: 1276D3CA8BA18C7BEE4046EA161D054472B1E0C21BA6486A898BF65F0B2969EE
2017-07-17 03:08:46.249 UTC [channelCmd] executeJoin -> INFO 006 Peer joined the channel!
2017-07-17 03:08:46.249 UTC [main] main -> INFO 007 Exiting.....

cd ../..
Development only script for Hyplerledger Fabric control
Running 'createComposerProfile.sh'
FABRIC_VERSION is unset, assuming hlfv1
FABRIC_START_TIMEOUT is unset, assuming 15 (seconds)
# Grab the current directory
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
 cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd
 dirname "${BASH_SOURCE[0]}"

rm -rf ~/.composer-connection-profiles/hlfv1/*
rm -rf ~/.composer-credentials/*

# copy org admin credentials into the keyValStore
mkdir -p ~/.composer-credentials
cp "${DIR}"/composer/creds/* ~/.composer-credentials

# create a composer connection profile
mkdir -p ~/.composer-connection-profiles/hlfv1
cat << EOF > ~/.composer-connection-profiles/hlfv1/connection.json
{
    "type": "hlfv1",
    "orderers": [
       { "url" : "grpc://localhost:7050" }
    ],
    "ca": { "url": "http://localhost:7054",
            "name": "ca.org1.example.com"
    },
    "peers": [
        {
            "requestURL": "grpc://localhost:7051",
            "eventURL": "grpc://localhost:7053"
        }
    ],
    "keyValStore": "${HOME}/.composer-credentials",
    "channel": "composerchannel",
    "mspID": "Org1MSP",
    "timeout": "300"
}
EOF
echo "Hyperledger Composer profile has been created for the Hyperledger Fabric v1.0 instance"
Hyperledger Composer profile has been created for the Hyperledger Fabric v1.0 instance
0.9.2: Pulling from hyperledger/composer-playground
Digest: sha256:4a8b559f9ecc04006ce3680426cfe60e0d84a927f7c1375d012ff3959b264426
Status: Image is up to date for hyperledger/composer-playground:0.9.2
WARNING: Found orphan containers (peer0.org1.example.com, orderer.example.com, couchdb, ca.org1.example.com) for this project. If you removed or renamed this service in your compose file, you can run this command with the --remove-orphans flag to clean it up.
Creating composer
114aab0e76bf0c78308f89efc4b8c9423e31568da0c340ca187a9b17aa9a4457-priv
114aab0e76bf0c78308f89efc4b8c9423e31568da0c340ca187a9b17aa9a4457-pub
PeerAdmin
Could not detect web browser to use - please launch Composer Playground URL using your chosen browser ie: <browser executable name> http://localhost:8080 or set your BROWSER variable to the browser launcher in your PATH

--------------------------------------------------------------------------------------
Hyperledger Fabric and Hyperledger Composer installed, and Composer Playground launched
Please use 'composer.sh' to re-start, and 'composer.sh stop' to shutdown all the Fabric and Composer docker images


$ docker ps
CONTAINER ID        IMAGE                                              COMMAND                  CREATED             STATUS              PORTS                                            NAMES
4ab8f4068c86        dev-peer0.org1.example.com-org-acme-biznet-0.9.2   "chaincode -peer.a..."   33 seconds ago      Up 33 seconds                                                        dev-peer0.org1.example.com-org-acme-biznet-0.9.2
3550ffad25c0        hyperledger/composer-playground                    "pm2-docker compos..."   5 minutes ago       Up 5 minutes        0.0.0.0:8080->8080/tcp                           composer
8f86b0061cf2        hyperledger/fabric-peer:x86_64-1.0.0               "peer node start -..."   7 minutes ago       Up 7 minutes        0.0.0.0:7051->7051/tcp, 0.0.0.0:7053->7053/tcp   peer0.org1.example.com
6bf7213d19be        hyperledger/fabric-orderer:x86_64-1.0.0            "orderer"                7 minutes ago       Up 7 minutes        0.0.0.0:7050->7050/tcp                           orderer.example.com
b0f65118342a        hyperledger/fabric-couchdb:x86_64-1.0.0            "tini -- /docker-e..."   7 minutes ago       Up 7 minutes        4369/tcp, 9100/tcp, 0.0.0.0:5984->5984/tcp       couchdb
8b0917f4368d        hyperledger/fabric-ca:x86_64-1.0.0                 "sh -c 'fabric-ca-..."   7 minutes ago       Up 7 minutes        0.0.0.0:7054->7054/tcp                           ca.org1.example.com

$ tree ~/.composer*
/home/dltdojo/.composer-connection-profiles
└── hlfv1
    └── connection.json
/home/dltdojo/.composer-credentials
├── 114aab0e76bf0c78308f89efc4b8c9423e31568da0c340ca187a9b17aa9a4457-priv
├── 114aab0e76bf0c78308f89efc4b8c9423e31568da0c340ca187a9b17aa9a4457-pub
└── PeerAdmin

1 directory, 4 files

$ cat ~/.composer-connection-profiles/hlfv1/connection.json | jq .
{
  "type": "hlfv1",
  "orderers": [
    {
      "url": "grpc://localhost:7050"
    }
  ],
  "ca": {
    "url": "http://localhost:7054",
    "name": "ca.org1.example.com"
  },
  "peers": [
    {
      "requestURL": "grpc://localhost:7051",
      "eventURL": "grpc://localhost:7053"
    }
  ],
  "keyValStore": "/home/dltdojo/.composer-credentials",
  "channel": "composerchannel",
  "mspID": "Org1MSP",
  "timeout": "300"
}

$ cat ~/.composer-credentials/PeerAdmin | jq .
{
  "name": "PeerAdmin",
  "mspid": "Org1MSP",
  "roles": null,
  "affiliation": "",
  "enrollmentSecret": "",
  "enrollment": {
    "signingIdentity": "114aab0e76bf0c78308f89efc4b8c9423e31568da0c340ca187a9b17aa9a4457",
    "identity": {
      "certificate": "-----BEGIN CERTIFICATE-----\nMIICGjCCAcCgAwIBAgIRANuOnVN+yd/BGyoX7ioEklQwCgYIKoZIzj0EAwIwczEL\nMAkGA1UEBhMCVVMxEzARBgNVBAgTCkNhbGlmb3JuaWExFjAUBgNVBAcTDVNhbiBG\ncmFuY2lzY28xGTAXBgNVBAoTEG9yZzEuZXhhbXBsZS5jb20xHDAaBgNVBAMTE2Nh\nLm9yZzEuZXhhbXBsZS5jb20wHhcNMTcwNjI2MTI0OTI2WhcNMjcwNjI0MTI0OTI2\nWjBbMQswCQYDVQQGEwJVUzETMBEGA1UECBMKQ2FsaWZvcm5pYTEWMBQGA1UEBxMN\nU2FuIEZyYW5jaXNjbzEfMB0GA1UEAwwWQWRtaW5Ab3JnMS5leGFtcGxlLmNvbTBZ\nMBMGByqGSM49AgEGCCqGSM49AwEHA0IABGu8KxBQ1GkxSTMVoLv7NXiYKWj5t6Dh\nWRTJBHnLkWV7lRUfYaKAKFadSii5M7Z7ZpwD8NS7IsMdPR6Z4EyGgwKjTTBLMA4G\nA1UdDwEB/wQEAwIHgDAMBgNVHRMBAf8EAjAAMCsGA1UdIwQkMCKAIBmrZau7BIB9\nrRLkwKmqpmSecIaOOr0CF6Mi2J5H4aauMAoGCCqGSM49BAMCA0gAMEUCIQC4sKQ6\nCEgqbTYe48az95W9/hnZ+7DI5eSnWUwV9vCd/gIgS5K6omNJydoFoEpaEIwM97uS\nXVMHPa0iyC497vdNURA=\n-----END CERTIFICATE-----\n"
    }
  }
}

```