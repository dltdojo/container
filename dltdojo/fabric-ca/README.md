## Fabric CA Test

* https://github.com/hyperledger/fabric-ca/blob/master/docs/source/users-guide.rst

### CA Certificate

* docker volume: ddj-fabric-ca

```
$ docker pull dltdojo/node:8
$ docker volume rm ddj-fabric-ca
$ alias ddjnode='docker run -it --rm -v ddj-fabric-ca:/ddj dltdojo/node:8'
$ alias ddjca='docker run -it --rm -v ddj-fabric-ca:/etc/hyperledger hyperledger/fabric-ca:x86_64-1.0.0'
$ ddjca fabric-ca-server init -b admin:adminPass
$ ddjnode tree /ddj
/ddj
└── fabric-ca-server
    ├── ca-cert.pem
    ├── ca-key.pem
    ├── fabric-ca-server-config.yaml
    ├── fabric-ca-server.db
    └── msp
        └── keystore
            └── abf37b94a9cd3153da7cc232014c53975e81548e9dc7a46e16a14f01837fe1bf_sk

3 directories, 5 files
$ ddjnode nano /ddj/fabric-ca-server/fabric-ca-server-config.yaml

csr:
   cn: dltdojo-ca-server
   names:
      - C: TW
        ST: "Taichung City"
        L: 
        O: DLTDOJO
        OU: DEV

$ ddjnode rm /ddj/fabric-ca-server/ca-key.pem
$ ddjnode rm /ddj/fabric-ca-server/ca-cert.pem

$ ddjca fabric-ca-server init -b admin:adminPass
$ ddjnode openssl x509 -in /ddj/fabric-ca-server/ca-cert.pem -text

Certificate:
    Data:
        Version: 3 (0x2)
        Serial Number:
            2a:f6:ec:af:80:da:06:b8:a7:be:1a:45:4b:7d:98:5c:b3:a4:75:69
    Signature Algorithm: ecdsa-with-SHA256
        Issuer: C=TW, ST=Taichung City, O=DLTDOJO, OU=DEV, CN=fabric-ca-server
        Validity
            Not Before: Jul 13 11:05:00 2017 GMT
            Not After : Jul  9 11:05:00 2032 GMT
        Subject: C=TW, ST=Taichung City, O=DLTDOJO, OU=DEV, CN=fabric-ca-server
        Subject Public Key Info:
            Public Key Algorithm: id-ecPublicKey
                Public-Key: (256 bit)
                pub:
                    04:f4:d4:3b:c2:55:09:56:32:f3:4d:2e:20:66:3b:
                    55:47:31:3c:3b:81:a6:96:0e:b1:46:8c:6a:ea:cf:
                    0d:93:20:87:3a:5c:d6:f0:01:84:46:64:00:d5:7a:
                    b2:1b:43:73:85:2a:09:ef:69:d8:f6:0b:f8:dc:70:
                    b8:41:e1:79:40
                ASN1 OID: prime256v1
                NIST CURVE: P-256
        X509v3 extensions:
            X509v3 Key Usage: critical
                Certificate Sign, CRL Sign
            X509v3 Basic Constraints: critical
                CA:TRUE, pathlen:1
            X509v3 Subject Key Identifier:
                36:B6:66:28:27:C5:90:AE:F5:86:6C:62:1D:A9:FC:88:DB:87:BA:27
    Signature Algorithm: ecdsa-with-SHA256
         30:45:02:21:00:df:a6:9a:de:84:07:d3:38:ae:bd:04:ea:cb:
         78:15:80:0a:e8:29:6e:00:43:1d:29:00:c5:ba:47:56:7d:eb:
         94:02:20:78:5f:70:38:14:7c:56:75:b2:e9:ca:d0:76:75:eb:
         9b:f3:1f:be:9c:e1:0a:6e:8c:0a:c9:ac:b2:17:95:21:5d
-----BEGIN CERTIFICATE-----
MIICBzCCAa2gAwIBAgIUKvbsr4DaBrinvhpFS32YXLOkdWkwCgYIKoZIzj0EAwIw
YDELMAkGA1UEBhMCVFcxFjAUBgNVBAgTDVRhaWNodW5nIENpdHkxEDAOBgNVBAoT
B0RMVERPSk8xDDAKBgNVBAsTA0RFVjEZMBcGA1UEAxMQZmFicmljLWNhLXNlcnZl
cjAeFw0xNzA3MTMxMTA1MDBaFw0zMjA3MDkxMTA1MDBaMGAxCzAJBgNVBAYTAlRX
MRYwFAYDVQQIEw1UYWljaHVuZyBDaXR5MRAwDgYDVQQKEwdETFRET0pPMQwwCgYD
VQQLEwNERVYxGTAXBgNVBAMTEGZhYnJpYy1jYS1zZXJ2ZXIwWTATBgcqhkjOPQIB
BggqhkjOPQMBBwNCAAT01DvCVQlWMvNNLiBmO1VHMTw7gaaWDrFGjGrqzw2TIIc6
XNbwAYRGZADVerIbQ3OFKgnvadj2C/jccLhB4XlAo0UwQzAOBgNVHQ8BAf8EBAMC
AQYwEgYDVR0TAQH/BAgwBgEB/wIBATAdBgNVHQ4EFgQUNrZmKCfFkK71hmxiHan8
iNuHuicwCgYIKoZIzj0EAwIDSAAwRQIhAN+mmt6EB9M4rr0E6st4FYAK6CluAEMd
KQDFukdWfeuUAiB4X3A4FHxWdbLpytB2deub8x++nOEKbowKyayyF5UhXQ==
-----END CERTIFICATE-----
```

### Start the ca server

```
$ ddjca fabric-ca-server start -b admin:adminPass
2017/07/13 11:12:51 [INFO] Configuration file location: /etc/hyperledger/fabric-ca-server/fabric-ca-server-config.yaml
2017/07/13 11:12:51 [INFO] Starting server in home directory: /etc/hyperledger/fabric-ca-server
2017/07/13 11:12:51 [INFO] The CA key and certificate already exist
2017/07/13 11:12:51 [INFO] The key is stored by BCCSP provider 'SW'
2017/07/13 11:12:51 [INFO] The certificate is at: /etc/hyperledger/fabric-ca-server/ca-cert.pem
2017/07/13 11:12:51 [INFO] Initialized sqlite3 database at /etc/hyperledger/fabric-ca-server/fabric-ca-server.db
2017/07/13 11:12:51 [INFO] Home directory for default CA: /etc/hyperledger/fabric-ca-server
2017/07/13 11:12:51 [INFO] Listening on http://0.0.0.0:7054

```

### Explore the Fabric CA CLI

```
$ ddjca fabric-ca-server start -b admin:adminPass
// TODO
$ ddjca fabric-ca-client enroll -u http://admin:adminPass@localhost:7954
2017/07/13 11:24:28 [INFO] User provided config file: /etc/hyperledger/fabric-ca-server/fabric-ca-client-config.yaml
2017/07/13 11:24:28 [INFO] Created a default configuration file at /etc/hyperledger/fabric-ca-server/fabric-ca-client-config.yaml
2017/07/13 11:24:28 [INFO] generating key: &{A:ecdsa S:256}
2017/07/13 11:24:28 [INFO] encoded CSR
Error: POST failure [Post http://localhost:7954/enroll: dial tcp 127.0.0.1:7954: getsockopt: connection refused]; not sending
POST http://localhost:7954/enroll
Authorization: Basic YWRtaW46YWRtaW5QYXNz
{"hosts":["78a0c5c03969"],"certificate_request":"-----BEGIN CERTIFICATE REQUEST-----\nMIIBQjCB6QIBADBdMQswCQYDVQQGEwJVUzEXMBUGA1UECBMOTm9ydGggQ2Fyb2xp\nbmExFDASBgNVBAoTC0h5cGVybGVkZ2VyMQ8wDQYDVQQLEwZGYWJyaWMxDjAMBgNV\nBAMTBWFkbWluMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE+Io3QPe0QiwI449S\nb4fMQ3BCJxAEq1yAINRJMIOMoZJBmNXtM3QqTENH6yYOwHpIHtnkxMugT4R32O/H\n2iX1F6AqMCgGCSqGSIb3DQEJDjEbMBkwFwYDVR0RBBAwDoIMNzhhMGM1YzAzOTY5\nMAoGCCqGSM49BAMCA0gAMEUCIQDDB/QTzyhxEqsaK5GNbdqaADAekOQZ2PN8akR3\nWqi8nAIgTXaIZl9L13Tb7vgQTGdgoiORZc2Wq0bfEyU3FBV4Js8=\n-----END CERTIFICATE REQUEST-----\n","profile":"","crl_override":"","label":"","CAName":""}

```