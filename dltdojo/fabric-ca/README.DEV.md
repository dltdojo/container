
### TEST: Creating self-signed ecdsa-with-SHA256 SSL certificate using OpenSSL

* docker volume: ddj-fabric-ca

```
$ docker pull dltdojo/node:8
$ docker volume rm ddj-fabric-ca
$ alias ddjnode='docker run -it --rm -v ddj-fabric-ca:/ddj/keys dltdojo/node:8'
$ ddjnode openssl ecparam -list_curves | grep 256
  secp256k1 : SECG curve over a 256 bit prime field
  prime256v1: X9.62/SECG curve over a 256 bit prime field
  brainpoolP256r1: RFC 5639 curve over a 256 bit prime field
  brainpoolP256t1: RFC 5639 curve over a 256 bit prime field
$ ddjnode openssl ecparam -name prime256v1 -genkey -out /ddj/keys/key.pem
$ ddjnode openssl pkcs8 -topk8 -nocrypt -in /ddj/keys/key.pem -out /ddj/keys/p8key.pem

$ ddjnode cat /ddj/keys/key.pem
-----BEGIN EC PARAMETERS-----
BggqhkjOPQMBBw==
-----END EC PARAMETERS-----
-----BEGIN EC PRIVATE KEY-----
MHcCAQEEIIzcmzx75NxoRHml0muafhn5rmMVNy15PEUQEdj0FFyboAoGCCqGSM49
AwEHoUQDQgAEZ2Mg9MHe7oH+yN6/ujSOVUqgF6OA1gyTFKGj07UA9Gu+ZfCLpQVC
LtYE3hm8jyytO1qa8oYis4VSAMHscd9HQA==
-----END EC PRIVATE KEY-----

$ ddjnode cat /ddj/keys/p8key.pem
-----BEGIN PRIVATE KEY-----
MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgjNybPHvk3GhEeaXS
a5p+GfmuYxU3LXk8RRAR2PQUXJuhRANCAARnYyD0wd7ugf7I3r+6NI5VSqAXo4DW
DJMUoaPTtQD0a75l8IulBUIu1gTeGbyPLK07WpryhiKzhVIAwexx30dA
-----END PRIVATE KEY-----

$ ddjnode openssl req -new -x509 -key /ddj/keys/p8key.pem -out /ddj/keys/cert.pem -days 999
Country Name (2 letter code) [AU]:TW
State or Province Name (full name) [Some-State]:TC
Locality Name (eg, city) []:Taichung
Organization Name (eg, company) [Internet Widgits Pty Ltd]:DLTDOJO
Organizational Unit Name (eg, section) []:DEV
Common Name (e.g. server FQDN or YOUR name) []:ca.dltdojo.org
Email Address []:

$ ddjnode tree /ddj
/ddj
└── keys
    ├── cert.pem
    └── key.pem

1 directory, 2 files

$ ddjnode openssl x509 -in /ddj/keys/cert.pem -text
Certificate:
    Data:
        Version: 3 (0x2)
        Serial Number:
            cc:e9:d6:82:ff:37:4c:01
    Signature Algorithm: ecdsa-with-SHA256
        Issuer: C=TW, ST=TC, L=Taichung, O=DLTDOJO, OU=DEV, CN=ca.dltdojo.org
        Validity
            Not Before: Jul 13 10:24:08 2017 GMT
            Not After : Apr  7 10:24:08 2020 GMT
        Subject: C=TW, ST=TC, L=Taichung, O=DLTDOJO, OU=DEV, CN=ca.dltdojo.org
        Subject Public Key Info:
            Public Key Algorithm: id-ecPublicKey
                Public-Key: (256 bit)
                pub:
                    04:3c:b9:0c:6d:f9:11:78:2f:c8:ee:c2:53:72:c2:
                    5a:d2:04:65:71:92:2b:89:d2:90:7b:1e:45:b4:c1:
                    22:ab:d9:dc:eb:98:ac:f1:bc:fd:69:8d:d3:2d:d2:
                    a5:f0:36:ca:87:a7:b3:24:49:12:5c:71:ad:97:e6:
                    76:64:8d:d5:d0
                ASN1 OID: prime256v1
                NIST CURVE: P-256
        X509v3 extensions:
            X509v3 Subject Key Identifier:
                87:7B:D8:45:36:DA:9E:F5:B5:66:9C:35:31:3A:5C:66:BA:2B:9A:F1
            X509v3 Authority Key Identifier:
                keyid:87:7B:D8:45:36:DA:9E:F5:B5:66:9C:35:31:3A:5C:66:BA:2B:9A:F1

            X509v3 Basic Constraints:
                CA:TRUE
    Signature Algorithm: ecdsa-with-SHA256
         30:45:02:20:6f:94:ad:38:9e:c5:59:fb:3e:25:c1:a2:bf:85:
         16:9a:ed:6d:ed:c6:df:97:9b:bb:a9:58:00:db:0c:47:0c:1e:
         02:21:00:ce:cf:9b:f6:fe:1a:45:fc:2a:03:49:2f:20:67:67:
         a6:c3:5f:65:85:9c:5e:60:14:14:8d:fc:38:95:fd:0e:39
-----BEGIN CERTIFICATE-----
MIICEzCCAbmgAwIBAgIJAMzp1oL/N0wBMAoGCCqGSM49BAMCMGYxCzAJBgNVBAYT
AlRXMQswCQYDVQQIDAJUQzERMA8GA1UEBwwIVGFpY2h1bmcxEDAOBgNVBAoMB0RM
VERPSk8xDDAKBgNVBAsMA0RFVjEXMBUGA1UEAwwOY2EuZGx0ZG9qby5vcmcwHhcN
MTcwNzEzMTAyNDA4WhcNMjAwNDA3MTAyNDA4WjBmMQswCQYDVQQGEwJUVzELMAkG
A1UECAwCVEMxETAPBgNVBAcMCFRhaWNodW5nMRAwDgYDVQQKDAdETFRET0pPMQww
CgYDVQQLDANERVYxFzAVBgNVBAMMDmNhLmRsdGRvam8ub3JnMFkwEwYHKoZIzj0C
AQYIKoZIzj0DAQcDQgAEPLkMbfkReC/I7sJTcsJa0gRlcZIridKQex5FtMEiq9nc
65is8bz9aY3TLdKl8DbKh6ezJEkSXHGtl+Z2ZI3V0KNQME4wHQYDVR0OBBYEFId7
2EU22p71tWacNTE6XGa6K5rxMB8GA1UdIwQYMBaAFId72EU22p71tWacNTE6XGa6
K5rxMAwGA1UdEwQFMAMBAf8wCgYIKoZIzj0EAwIDSAAwRQIgb5StOJ7FWfs+JcGi
v4UWmu1t7cbfl5u7qVgA2wxHDB4CIQDOz5v2/hpF/CoDSS8gZ2emw19lhZxeYBQU
jfw4lf0OOQ==
-----END CERTIFICATE-----
```

### TEST: fabric-ca-server init init

```
$ docker pull hyperledger/fabric-ca:x86_64-1.0.0
$ docker volume rm ddj-fabric-ca
$ docker run -it --rm -v ddj-fabric-ca:/etc/hyperledger hyperledger/fabric-ca:x86_64-1.0.0 fabric-ca-server init -b admin:adminPass
2017/07/13 09:10:19 [INFO] Created default configuration file at /etc/hyperledger/fabric-ca-server/fabric-ca-server-config.yaml
2017/07/13 09:10:19 [INFO] generating key: &{A:ecdsa S:256}
2017/07/13 09:10:19 [INFO] encoded CSR
2017/07/13 09:10:19 [INFO] signed certificate with serial number 112545607161247376131285504905487901250168500625
2017/07/13 09:10:19 [INFO] The CA key and certificate were generated for CA
2017/07/13 09:10:19 [INFO] The key was stored by BCCSP provider 'SW'
2017/07/13 09:10:19 [INFO] The certificate is at: /etc/hyperledger/fabric-ca-server/ca-cert.pem
2017/07/13 09:10:19 [INFO] Initialized sqlite3 database at /etc/hyperledger/fabric-ca-server/fabric-ca-server.db
2017/07/13 09:10:19 [INFO] Home directory for default CA: /etc/hyperledger/fabric-ca-server
2017/07/13 09:10:19 [INFO] Initialization was successful

$ docker run -it --rm -v ddj-fabric-ca:/ddj dltdojo/node:8 tree /ddj
└── fabric-ca-server
    ├── ca-cert.pem
    ├── ca-key.pem
    ├── fabric-ca-server-config.yaml
    ├── fabric-ca-server.db
    └── msp
        └── keystore
            └── abf37b94a9cd3153da7cc232014c53975e81548e9dc7a46e16a14f01837fe1bf_sk

3 directories, 5 files
```