## Fabric CA Test

* https://github.com/hyperledger/fabric-ca/blob/master/docs/source/users-guide.rst
* https://jamielinux.com/docs/openssl-certificate-authority/create-the-root-pair.html
* https://gist.github.com/Soarez/9688998

### 準備docker volume

建立新的docker volume測試，如要保留舊測試內容則不要刪除。

* docker volume: ddjfab-ca

```
$ docker volume rm ddjfab-ca
$ docker volume create ddjfab-ca
```

### 新增ecdsa-with-SHA256的CA憑證

```
$ docker-compose up -d ddjnode
$ docker-compose exec ddjnode bash
bash-4.3# mkdir /ddj/myca && cd /ddj/myca
bash-4.3# sed -i.bak '/cRLSign, keyCertSign/s/^# //' /etc/ssl/openssl.cnf
bash-4.3# openssl ecparam -name prime256v1 -genkey -out key.pem
bash-4.3# openssl pkcs8 -topk8 -nocrypt -in key.pem -out p8key.pem
bash-4.3# openssl req -new -x509 -key p8key.pem -out cert.pem -days 999
bash-4.3# openssl x509 -in cert.pem -text
bash-4.3# mkdir /ddj/ca/fabric-ca-server/
bash-4.3# cp -f p8key.pem /ddj/ca/fabric-ca-server/ca-key.pem
bash-4.3# cp -f cert.pem /ddj/ca/fabric-ca-server/ca-cert.pem
bash-4.3# tree /ddj/
bash-4.3# exit
```

log

```
bash-4.3# mkdir /ddj/myca && cd /ddj/myca
bash-4.3# sed -i.bak '/cRLSign, keyCertSign/s/^# //' /etc/ssl/openssl.cnf
bash-4.3# grep -B 5 -A 5 cRLSign /etc/ssl/openssl.cnf
basicConstraints = CA:true

# Key usage: this is typical for a CA certificate. However since it will
# prevent it being used as an test self-signed certificate it is best
# left out by default.
keyUsage = cRLSign, keyCertSign

# Some might want this also
# nsCertType = sslCA, emailCA

# Include email address in subject alt name: another PKIX recommendation
bash-4.3# openssl ecparam -name prime256v1 -genkey -out key.pem
bash-4.3# openssl pkcs8 -topk8 -nocrypt -in key.pem -out p8key.pem
bash-4.3# openssl req -new -x509 -key p8key.pem -out cert.pem -days 999
You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) [AU]:TW
State or Province Name (full name) [Some-State]:Taichung
Locality Name (eg, city) []:Taichung City
Organization Name (eg, company) [Internet Widgits Pty Ltd]:DLTDOJO
Organizational Unit Name (eg, section) []:CA
Common Name (e.g. server FQDN or YOUR name) []:ca.dltdojo.org
Email Address []:
bash-4.3# openssl x509 -in cert.pem -text
Certificate:
    Data:
        Version: 3 (0x2)
        Serial Number:
            da:11:b1:b6:73:81:8a:15
    Signature Algorithm: ecdsa-with-SHA256
        Issuer: C=TW, ST=Taichung, L=Taichung City, O=DLTDOJO, OU=CA, CN=ca.dltdojo.org
        Validity
            Not Before: Jul 14 04:53:42 2017 GMT
            Not After : Apr  8 04:53:42 2020 GMT
        Subject: C=TW, ST=Taichung, L=Taichung City, O=DLTDOJO, OU=CA, CN=ca.dltdojo.org
        Subject Public Key Info:
            Public Key Algorithm: id-ecPublicKey
                Public-Key: (256 bit)
                pub:
                    04:37:1d:97:f0:d7:21:47:6d:7a:64:03:b9:7b:50:
                    d1:8b:27:8c:ac:9a:ed:91:8e:e0:4a:fd:bd:f6:10:
                    b8:25:91:9f:c8:b8:cc:4b:c7:41:5d:9c:56:98:ba:
                    42:f6:10:46:e2:50:cf:22:b4:59:af:6a:39:25:fc:
                    4d:fe:1c:5c:76
                ASN1 OID: prime256v1
                NIST CURVE: P-256
        X509v3 extensions:
            X509v3 Subject Key Identifier:
                55:EA:73:13:0F:37:15:08:52:03:15:FD:9E:E2:92:A8:6C:09:C6:40
            X509v3 Authority Key Identifier:
                keyid:55:EA:73:13:0F:37:15:08:52:03:15:FD:9E:E2:92:A8:6C:09:C6:40

            X509v3 Basic Constraints:
                CA:TRUE
            X509v3 Key Usage:
                Certificate Sign, CRL Sign
    Signature Algorithm: ecdsa-with-SHA256
         30:45:02:21:00:b4:6e:cd:7b:83:08:ce:34:47:aa:d3:7c:44:
         a0:bd:ef:41:4f:9a:2d:91:3c:34:8b:ef:82:d2:9b:0e:d9:0e:
         b0:02:20:21:bf:f5:db:9a:de:7e:13:74:fb:cd:b0:7a:33:8b:
         55:1b:97:3b:e8:a7:7a:6d:f4:65:9c:48:f5:ce:cc:e9:43
-----BEGIN CERTIFICATE-----
MIICNDCCAdqgAwIBAgIJANoRsbZzgYoVMAoGCCqGSM49BAMCMHAxCzAJBgNVBAYT
AlRXMREwDwYDVQQIDAhUYWljaHVuZzEWMBQGA1UEBwwNVGFpY2h1bmcgQ2l0eTEQ
MA4GA1UECgwHRExURE9KTzELMAkGA1UECwwCQ0ExFzAVBgNVBAMMDmNhLmRsdGRv
am8ub3JnMB4XDTE3MDcxNDA0NTM0MloXDTIwMDQwODA0NTM0MlowcDELMAkGA1UE
BhMCVFcxETAPBgNVBAgMCFRhaWNodW5nMRYwFAYDVQQHDA1UYWljaHVuZyBDaXR5
MRAwDgYDVQQKDAdETFRET0pPMQswCQYDVQQLDAJDQTEXMBUGA1UEAwwOY2EuZGx0
ZG9qby5vcmcwWTATBgcqhkjOPQIBBggqhkjOPQMBBwNCAAQ3HZfw1yFHbXpkA7l7
UNGLJ4ysmu2RjuBK/b32ELglkZ/IuMxLx0FdnFaYukL2EEbiUM8itFmvajkl/E3+
HFx2o10wWzAdBgNVHQ4EFgQUVepzEw83FQhSAxX9nuKSqGwJxkAwHwYDVR0jBBgw
FoAUVepzEw83FQhSAxX9nuKSqGwJxkAwDAYDVR0TBAUwAwEB/zALBgNVHQ8EBAMC
AQYwCgYIKoZIzj0EAwIDSAAwRQIhALRuzXuDCM40R6rTfESgve9BT5otkTw0i++C
0psO2Q6wAiAhv/Xbmt5+E3T7zbB6M4tVG5c76Kd6bfRlnEj1zszpQw==
-----END CERTIFICATE-----
bash-4.3# mkdir /ddj/ca/fabric-ca-server/
bash-4.3# cp -f p8key.pem /ddj/ca/fabric-ca-server/ca-key.pem
bash-4.3# cp -f cert.pem /ddj/ca/fabric-ca-server/ca-cert.pem
bash-4.3# tree /ddj/
/ddj/
├── ca
│   └── fabric-ca-server
│       ├── ca-cert.pem
│       └── ca-key.pem
└── myca
    ├── cert.pem
    ├── key.pem
    └── p8key.pem

3 directories, 5 files

```
### 啟動CA服務

```
$ docker-compose up -d ca
$ docker-compose logs ca
Attaching to fabricca_ca_1
ca_1       | 2017/07/14 04:59:14 [INFO] Created default configuration file at /etc/hyperledger/fabric-ca-server/fabric-ca-server-config.yaml
ca_1       | 2017/07/14 04:59:14 [INFO] Starting server in home directory: /etc/hyperledger/fabric-ca-server
ca_1       | 2017/07/14 04:59:14 [INFO] The CA key and certificate files already exist
ca_1       | 2017/07/14 04:59:14 [INFO] Key file location: /etc/hyperledger/fabric-ca-server/ca-key.pem
ca_1       | 2017/07/14 04:59:14 [INFO] Certificate file location: /etc/hyperledger/fabric-ca-server/ca-cert.pem
ca_1       | 2017/07/14 04:59:14 [INFO] Initialized sqlite3 database at /etc/hyperledger/fabric-ca-server/fabric-ca-server.db
ca_1       | 2017/07/14 04:59:14 [INFO] Home directory for default CA: /etc/hyperledger/fabric-ca-server
ca_1       | 2017/07/14 04:59:14 [INFO] Listening on http://0.0.0.0:7054

$ docker-compose exec ddjnode tree /ddj/
/ddj/
├── ca
│   └── fabric-ca-server
│       ├── ca-cert.pem
│       ├── ca-key.pem
│       ├── fabric-ca-server-config.yaml
│       ├── fabric-ca-server.db
│       └── msp
│           └── keystore
│               └── 2990b3d79edd98120ca8f4196002599460d50588e2ce3c8109df1902920ea6b2_sk
└── myca
    ├── cert.pem
    ├── key.pem
    └── p8key.pem

5 directories, 8 files

```

### 確認註冊員受理權限

* identity name : admin
* identity pass : adminPass
* hf.Registrar.Roles: "client,user,peer,validator,auditor"

```
$ docker-compose exec ddjnode grep -A 5 -B 15 "hf.Registrar.Roles:" /ddj/ca/fabric-ca-server/fabric-ca-server-config.yaml

#     which means this "registry" section is ignored.
#############################################################################
registry:
  # Maximum number of times a password/secret can be reused for enrollment
  # (default: -1, which means there is no limit)
  maxenrollments: -1

  # Contains identity information which is used when LDAP is disabled
  identities:
     - name: admin
       pass: adminPass
       type: client
       affiliation: ""
       maxenrollments: -1
       attrs:
          hf.Registrar.Roles: "client,user,peer,validator,auditor"
          hf.Registrar.DelegateRoles: "client,user,validator,auditor"
          hf.Revoker: true
          hf.IntermediateCA: true

#############################################################################
```

### 確認可註冊隸屬關係Affiliation

```
$ docker-compose exec ddjnode grep -B 5 -A 10 "Affiliation" /ddj/ca/fabric-ca-server/fabric-ca-server-config.yaml

#############################################################################
#  Affiliation section
#############################################################################
affiliations:
   org1:
      - department1
      - department2
   org2:
      - department1

```

### 註冊員申請登記憑證 Enrollment Certificate (ECert)

```
$ docker-compose up -d admin
$ docker-compose exec admin fabric-ca-client enroll -u http://admin:adminPass@ca:7054

2017/07/14 05:00:36 [INFO] User provided config file: /etc/hyperledger/clients/admin/fabric-ca-client-config.yaml
2017/07/14 05:00:36 [INFO] Created a default configuration file at /etc/hyperledger/clients/admin/fabric-ca-client-config.yaml
2017/07/14 05:00:36 [INFO] generating key: &{A:ecdsa S:256}
2017/07/14 05:00:36 [INFO] encoded CSR
2017/07/14 05:00:36 [INFO] Stored client certificate at /etc/hyperledger/clients/admin/msp/signcerts/cert.pem
2017/07/14 05:00:36 [INFO] Stored CA certificate chain at /etc/hyperledger/clients/admin/msp/cacerts/ca-7054.pem

$ docker-compose exec ddjnode tree /ddj/
/ddj/
├── ca
│   ├── clients
│   │   └── admin
│   │       ├── fabric-ca-client-config.yaml
│   │       └── msp
│   │           ├── cacerts
│   │           │   └── ca-7054.pem
│   │           ├── keystore
│   │           │   └── ff4178b28388e7d2e7a4216e29c610cb09fd18394ce0134d33d2f6b12cc06240_sk
│   │           └── signcerts
│   │               └── cert.pem
│   └── fabric-ca-server
│       ├── ca-cert.pem
│       ├── ca-key.pem
│       ├── fabric-ca-server-config.yaml
│       ├── fabric-ca-server.db
│       └── msp
│           └── keystore
│               └── 2990b3d79edd98120ca8f4196002599460d50588e2ce3c8109df1902920ea6b2_sk
└── myca
    ├── cert.pem
    ├── key.pem
    └── p8key.pem

11 directories, 12 files

$ docker-compose exec ddjnode openssl x509 -in /ddj/ca/clients/admin/msp/signcerts/cert.pem -text
Certificate:
    Data:
        Version: 3 (0x2)
        Serial Number:
            11:c8:34:14:82:b1:ef:74:5e:a3:fe:6d:fc:88:5f:62:53:7d:19:0b
    Signature Algorithm: ecdsa-with-SHA256
        Issuer: C=TW, ST=Taichung, L=Taichung City, O=DLTDOJO, OU=CA, CN=ca.dltdojo.org
        Validity
            Not Before: Jul 14 04:56:00 2017 GMT
            Not After : Jul 14 04:56:00 2018 GMT
        Subject: C=US, ST=North Carolina, O=Hyperledger, OU=Fabric, CN=admin
        Subject Public Key Info:
            Public Key Algorithm: id-ecPublicKey
                Public-Key: (256 bit)
                pub:
                    04:43:a7:93:18:95:07:b6:b2:55:5c:78:6f:cd:2d:
                    2d:a2:76:4b:41:22:cf:7a:15:e5:cf:bc:8d:eb:df:
                    59:e3:5d:37:13:9d:46:de:f4:43:5d:b0:73:92:21:
                    df:1b:85:64:8b:24:28:5c:6e:d0:2e:56:dd:7d:09:
                    64:1d:33:19:6b
                ASN1 OID: prime256v1
                NIST CURVE: P-256
        X509v3 extensions:
            X509v3 Key Usage: critical
                Digital Signature
            X509v3 Basic Constraints: critical
                CA:FALSE
            X509v3 Subject Key Identifier:
                1B:49:01:66:07:EF:BD:C3:14:46:73:B9:F8:5D:9A:40:FF:0E:91:18
            X509v3 Authority Key Identifier:
                keyid:55:EA:73:13:0F:37:15:08:52:03:15:FD:9E:E2:92:A8:6C:09:C6:40

            X509v3 Subject Alternative Name:
                DNS:728e44a0498f
    Signature Algorithm: ecdsa-with-SHA256
         30:45:02:21:00:95:66:82:b4:e4:cb:f5:bb:9e:fa:5e:16:3f:
         cf:85:db:88:ee:2c:ad:d0:6e:88:19:e3:52:81:da:28:51:a3:
         1e:02:20:51:ae:49:39:22:e8:60:d4:9a:38:a5:87:43:d0:4a:
         82:ca:27:6e:09:ad:6b:ae:77:60:a1:d9:50:9f:41:da:5f
-----BEGIN CERTIFICATE-----
MIICSDCCAe6gAwIBAgIUEcg0FIKx73Reo/5t/IhfYlN9GQswCgYIKoZIzj0EAwIw
cDELMAkGA1UEBhMCVFcxETAPBgNVBAgMCFRhaWNodW5nMRYwFAYDVQQHDA1UYWlj
aHVuZyBDaXR5MRAwDgYDVQQKDAdETFRET0pPMQswCQYDVQQLDAJDQTEXMBUGA1UE
AwwOY2EuZGx0ZG9qby5vcmcwHhcNMTcwNzE0MDQ1NjAwWhcNMTgwNzE0MDQ1NjAw
WjBdMQswCQYDVQQGEwJVUzEXMBUGA1UECBMOTm9ydGggQ2Fyb2xpbmExFDASBgNV
BAoTC0h5cGVybGVkZ2VyMQ8wDQYDVQQLEwZGYWJyaWMxDjAMBgNVBAMTBWFkbWlu
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEQ6eTGJUHtrJVXHhvzS0tonZLQSLP
ehXlz7yN699Z4103E51G3vRDXbBzkiHfG4VkiyQoXG7QLlbdfQlkHTMZa6N5MHcw
DgYDVR0PAQH/BAQDAgeAMAwGA1UdEwEB/wQCMAAwHQYDVR0OBBYEFBtJAWYH773D
FEZzufhdmkD/DpEYMB8GA1UdIwQYMBaAFFXqcxMPNxUIUgMV/Z7ikqhsCcZAMBcG
A1UdEQQQMA6CDDcyOGU0NGEwNDk4ZjAKBggqhkjOPQQDAgNIADBFAiEAlWaCtOTL
9bue+l4WP8+F24juLK3QbogZ41KB2ihRox4CIFGuSTki6GDUmjilh0PQSoLKJ24J
rWuud2Ch2VCfQdpf
-----END CERTIFICATE-----
```

### 註冊員admin註冊新使用者alice

```
$ docker-compose exec admin fabric-ca-client register --id.name alice --id.type user --id.affiliation org1.department1 --id.attrs 'hf.Revoker=true,foo=bar'
2017/07/14 02:34:38 [INFO] User provided config file: /etc/hyperledger/clients/admin/fabric-ca-client-config.yaml
2017/07/14 02:34:38 [INFO] Configuration file location: /etc/hyperledger/clients/admin/fabric-ca-client-config.yaml
Password: OURFZMWKmqMl
```

### 使用者alice取得密碼申請ECert

```
$ docker-compose up -d alice
$ docker-compose exec alice fabric-ca-client enroll -u http://alice:OURFZMWKmqMl@ca:7054

2017/07/14 05:04:58 [INFO] User provided config file: /etc/hyperledger/clients/alice/fabric-ca-client-config.yaml
2017/07/14 05:04:58 [INFO] Created a default configuration file at /etc/hyperledger/clients/alice/fabric-ca-client-config.yaml
2017/07/14 05:04:58 [INFO] generating key: &{A:ecdsa S:256}
2017/07/14 05:04:58 [INFO] encoded CSR
2017/07/14 05:04:59 [INFO] Stored client certificate at /etc/hyperledger/clients/alice/msp/signcerts/cert.pem
2017/07/14 05:04:59 [INFO] Stored CA certificate chain at /etc/hyperledger/clients/alice/msp/cacerts/ca-7054.pem

$ docker-compose exec ddjnode tree /ddj/ca/clients
/ddj/ca/clients
├── admin
│   ├── fabric-ca-client-config.yaml
│   └── msp
│       ├── cacerts
│       │   └── ca-7054.pem
│       ├── keystore
│       │   └── ff4178b28388e7d2e7a4216e29c610cb09fd18394ce0134d33d2f6b12cc06240_sk
│       └── signcerts
│           └── cert.pem
└── alice
    ├── fabric-ca-client-config.yaml
    └── msp
        ├── cacerts
        │   └── ca-7054.pem
        ├── keystore
        │   └── 27fea3c48558e1b0c431e6a9c842a90ffbc858bb4e04b0dcbcd91e213f2f3da6_sk
        └── signcerts
            └── cert.pem

10 directories, 8 files

```

### 檢視alice的ECert，確認CN欄位。

```
$ docker-compose exec ddjnode openssl x509 -in /ddj/ca/clients/alice/msp/signcerts/cert.pem -text
Certificate:
    Data:
        Version: 3 (0x2)
        Serial Number:
            39:00:65:37:db:3c:d7:be:78:94:bf:de:09:4a:de:19:0d:7b:84:0e
    Signature Algorithm: ecdsa-with-SHA256
        Issuer: C=TW, ST=Taichung, L=Taichung City, O=DLTDOJO, OU=CA, CN=ca.dltdojo.org
        Validity
            Not Before: Jul 14 05:00:00 2017 GMT
            Not After : Jul 14 05:00:00 2018 GMT
        Subject: C=US, ST=North Carolina, O=Hyperledger, OU=Fabric, CN=alice
        Subject Public Key Info:
            Public Key Algorithm: id-ecPublicKey
                Public-Key: (256 bit)
                pub:
                    04:0c:aa:dd:20:8e:e1:49:32:fa:38:7a:1a:f6:65:
                    a4:45:67:f0:84:f3:d7:7c:51:5b:f9:a1:48:9d:54:
                    f3:40:e5:84:ba:41:f3:f0:36:04:02:39:1f:77:71:
                    8a:ff:32:11:d8:c6:d7:e3:83:db:f9:0d:55:3f:2e:
                    c7:5f:3c:b3:fa
                ASN1 OID: prime256v1
                NIST CURVE: P-256
        X509v3 extensions:
            X509v3 Key Usage: critical
                Digital Signature
            X509v3 Basic Constraints: critical
                CA:FALSE
            X509v3 Subject Key Identifier:
                A0:4D:B5:42:E5:CA:D6:E4:D3:5C:3E:57:07:8E:C2:CE:CD:05:19:DF
            X509v3 Authority Key Identifier:
                keyid:55:EA:73:13:0F:37:15:08:52:03:15:FD:9E:E2:92:A8:6C:09:C6:40

            X509v3 Subject Alternative Name:
                DNS:7a3c60183fe1
    Signature Algorithm: ecdsa-with-SHA256
         30:45:02:21:00:e7:a9:65:1a:ca:45:69:70:19:b9:93:6d:34:
         91:a6:78:7a:e0:03:ac:d4:e8:fd:53:c8:79:90:aa:18:ff:b1:
         66:02:20:23:cf:7a:a2:ab:83:be:49:86:9d:a1:c2:c6:75:e1:
         96:55:d0:dd:21:76:9d:f1:4c:2e:1f:8a:e1:83:a3:94:28
-----BEGIN CERTIFICATE-----
MIICSDCCAe6gAwIBAgIUOQBlN9s81754lL/eCUreGQ17hA4wCgYIKoZIzj0EAwIw
cDELMAkGA1UEBhMCVFcxETAPBgNVBAgMCFRhaWNodW5nMRYwFAYDVQQHDA1UYWlj
aHVuZyBDaXR5MRAwDgYDVQQKDAdETFRET0pPMQswCQYDVQQLDAJDQTEXMBUGA1UE
AwwOY2EuZGx0ZG9qby5vcmcwHhcNMTcwNzE0MDUwMDAwWhcNMTgwNzE0MDUwMDAw
WjBdMQswCQYDVQQGEwJVUzEXMBUGA1UECBMOTm9ydGggQ2Fyb2xpbmExFDASBgNV
BAoTC0h5cGVybGVkZ2VyMQ8wDQYDVQQLEwZGYWJyaWMxDjAMBgNVBAMTBWFsaWNl
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEDKrdII7hSTL6OHoa9mWkRWfwhPPX
fFFb+aFInVTzQOWEukHz8DYEAjkfd3GK/zIR2MbX44Pb+Q1VPy7HXzyz+qN5MHcw
DgYDVR0PAQH/BAQDAgeAMAwGA1UdEwEB/wQCMAAwHQYDVR0OBBYEFKBNtULlytbk
01w+VweOws7NBRnfMB8GA1UdIwQYMBaAFFXqcxMPNxUIUgMV/Z7ikqhsCcZAMBcG
A1UdEQQQMA6CDDdhM2M2MDE4M2ZlMTAKBggqhkjOPQQDAgNIADBFAiEA56llGspF
aXAZuZNtNJGmeHrgA6zU6P1TyHmQqhj/sWYCICPPeqKrg75Jhp2hwsZ14ZZV0N0h
dp3xTC4fiuGDo5Qo
-----END CERTIFICATE-----
```

### 檢視alice的keystore與BCCSP設定

* BCCSP (BlockChain Crypto Service Provider) SW: https://github.com/hyperledger/fabric/tree/master/bccsp/sw
* Signature Algorithm: ecdsa-with-SHA256

```
$ docker-compose exec ddjnode cat /ddj/ca/clients/alice/msp/keystore/27fea3c48558e1b0c431e6a9c842a90ffbc858bb4e04b0dcbcd91e213f2f3da6_sk
-----BEGIN PRIVATE KEY-----
MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgnNmCWVpIStOr1Nuy
KQEtIHBr1yYQBoq158Md89G60GKhRANCAAQabA0o6J0PhYQShu+sWuwdXH+h4pxY
p6oqI7Nu5559DFWJ0ePVz8e+xhUpee6dPIzXn0hKFLCk1gybUOcmpcDp
-----END PRIVATE KEY-----

$ docker-compose exec ddjnode cat /ddj/ca/clients/alice/fabric-ca-client-config.yaml

#############################################################################
# BCCSP (BlockChain Crypto Service Provider) section allows to select which
# crypto implementation library to use
#############################################################################
bccsp:
    default: SW
    sw:
        hash: SHA2
        security: 256
        filekeystore:
            # The directory used for the software file-based keystore
            keystore: msp/keystore

```

### 註冊員admin註冊新節點peer1
```
$ docker-compose exec admin fabric-ca-client register --id.name peer1 --id.type peer --id.affiliation org2.department1 --id.secret peer1pw
2017/07/14 05:06:51 [INFO] User provided config file: /etc/hyperledger/clients/admin/fabric-ca-client-config.yaml
2017/07/14 05:06:51 [INFO] Configuration file location: /etc/hyperledger/clients/admin/fabric-ca-client-config.yaml
Password: peer1pw
```

### 節點peer1申請ECert

```
$ docker-compose up -d peer1
$ docker-compose exec peer1 fabric-ca-client enroll -u http://peer1:peer1pw@ca:7054

2017/07/14 05:07:36 [INFO] User provided config file: /etc/hyperledger/clients/peer1/fabric-ca-client-config.yaml
2017/07/14 05:07:36 [INFO] Created a default configuration file at /etc/hyperledger/clients/peer1/fabric-ca-client-config.yaml
2017/07/14 05:07:36 [INFO] generating key: &{A:ecdsa S:256}
2017/07/14 05:07:37 [INFO] encoded CSR
2017/07/14 05:07:37 [INFO] Stored client certificate at /etc/hyperledger/clients/peer1/msp/signcerts/cert.pem
2017/07/14 05:07:37 [INFO] Stored CA certificate chain at /etc/hyperledger/clients/peer1/msp/cacerts/ca-7054.pem

$ docker-compose exec ddjnode tree /ddj/ca/clients
/ddj/ca/clients
├── admin
│   ├── fabric-ca-client-config.yaml
│   └── msp
│       ├── cacerts
│       │   └── ca-7054.pem
│       ├── keystore
│       │   └── ff4178b28388e7d2e7a4216e29c610cb09fd18394ce0134d33d2f6b12cc06240_sk
│       └── signcerts
│           └── cert.pem
├── alice
│   ├── fabric-ca-client-config.yaml
│   └── msp
│       ├── cacerts
│       │   └── ca-7054.pem
│       ├── keystore
│       │   └── 27fea3c48558e1b0c431e6a9c842a90ffbc858bb4e04b0dcbcd91e213f2f3da6_sk
│       └── signcerts
│           └── cert.pem
└── peer1
    ├── fabric-ca-client-config.yaml
    └── msp
        ├── cacerts
        │   └── ca-7054.pem
        ├── keystore
        │   └── f2523a613296d7636ef9c8177dea7b795824eb6be7d083cbf98f0a604d094ea6_sk
        └── signcerts
            └── cert.pem

15 directories, 12 files

$ docker-compose exec ddjnode openssl x509 -in /ddj/ca/clients/peer1/msp/signcerts/cert.pem -text
Certificate:
    Data:
        Version: 3 (0x2)
        Serial Number:
            3d:9d:5f:e0:3c:c5:2e:fe:8c:af:dd:9e:b5:c5:16:fe:70:23:25:63
    Signature Algorithm: ecdsa-with-SHA256
        Issuer: C=TW, ST=Taichung, L=Taichung City, O=DLTDOJO, OU=CA, CN=ca.dltdojo.org
        Validity
            Not Before: Jul 14 05:03:00 2017 GMT
            Not After : Jul 14 05:03:00 2018 GMT
        Subject: C=US, ST=North Carolina, O=Hyperledger, OU=Fabric, CN=peer1
        Subject Public Key Info:
            Public Key Algorithm: id-ecPublicKey
                Public-Key: (256 bit)
                pub:
                    04:21:4d:9e:30:e7:d5:d4:83:13:8a:ea:ec:7f:3a:
                    49:0f:df:85:5c:aa:48:24:05:c5:53:6c:c2:d4:27:
                    9c:d1:f1:e5:4d:51:6d:0c:90:00:67:11:55:8e:e9:
                    81:88:fb:7f:67:fd:1d:98:80:07:02:43:8a:e8:64:
                    53:0a:6a:67:99
                ASN1 OID: prime256v1
                NIST CURVE: P-256
        X509v3 extensions:
            X509v3 Key Usage: critical
                Digital Signature
            X509v3 Basic Constraints: critical
                CA:FALSE
            X509v3 Subject Key Identifier:
                79:DF:89:2F:F0:FB:4F:64:49:93:13:B3:4C:B6:0F:47:EF:78:A6:06
            X509v3 Authority Key Identifier:
                keyid:55:EA:73:13:0F:37:15:08:52:03:15:FD:9E:E2:92:A8:6C:09:C6:40

            X509v3 Subject Alternative Name:
                DNS:52325500fb91
    Signature Algorithm: ecdsa-with-SHA256
         30:45:02:21:00:ce:43:cf:41:0c:10:13:b6:3e:50:f3:43:62:
         cd:9a:35:3d:4c:a1:d3:69:ab:a2:76:7b:9e:57:64:a7:bd:7c:
         40:02:20:7e:89:7d:c6:c4:62:26:26:13:1b:67:42:1a:65:e7:
         cd:78:19:f7:94:c6:7a:41:bd:9e:e2:b8:3f:0d:72:28:1a
-----BEGIN CERTIFICATE-----
MIICSDCCAe6gAwIBAgIUPZ1f4DzFLv6Mr92etcUW/nAjJWMwCgYIKoZIzj0EAwIw
cDELMAkGA1UEBhMCVFcxETAPBgNVBAgMCFRhaWNodW5nMRYwFAYDVQQHDA1UYWlj
aHVuZyBDaXR5MRAwDgYDVQQKDAdETFRET0pPMQswCQYDVQQLDAJDQTEXMBUGA1UE
AwwOY2EuZGx0ZG9qby5vcmcwHhcNMTcwNzE0MDUwMzAwWhcNMTgwNzE0MDUwMzAw
WjBdMQswCQYDVQQGEwJVUzEXMBUGA1UECBMOTm9ydGggQ2Fyb2xpbmExFDASBgNV
BAoTC0h5cGVybGVkZ2VyMQ8wDQYDVQQLEwZGYWJyaWMxDjAMBgNVBAMTBXBlZXIx
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEIU2eMOfV1IMTiursfzpJD9+FXKpI
JAXFU2zC1Cec0fHlTVFtDJAAZxFVjumBiPt/Z/0dmIAHAkOK6GRTCmpnmaN5MHcw
DgYDVR0PAQH/BAQDAgeAMAwGA1UdEwEB/wQCMAAwHQYDVR0OBBYEFHnfiS/w+09k
SZMTs0y2D0fveKYGMB8GA1UdIwQYMBaAFFXqcxMPNxUIUgMV/Z7ikqhsCcZAMBcG
A1UdEQQQMA6CDDUyMzI1NTAwZmI5MTAKBggqhkjOPQQDAgNIADBFAiEAzkPPQQwQ
E7Y+UPNDYs2aNT1ModNpq6J2e55XZKe9fEACIH6JfcbEYiYmExtnQhpl5814GfeU
xnpBvZ7iuD8Nciga
-----END CERTIFICATE-----
```

### cleanup
```
$ docker-compose stop && docker-compose rm -f && docker volume rm ddjfab-ca
```