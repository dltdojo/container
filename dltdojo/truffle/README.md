## 以太坊開發框架truffle開發ERC20代幣

* truffle http://truffleframework.com/docs/
* testrpc https://github.com/ethereumjs/testrpc

### 安裝 truffle 並建立專案目錄

```
$ sudo npm install -g truffle
$ sudo npm install -g ethereumjs-testrpc
$ mkdir /home/dltdojo/smb/mytoken
$ cd /home/dltdojo/smb/mytoken
$ truffle init 
$ tree -h .
.
├── [4.0K]  contracts
│   ├── [ 169]  ConvertLib.sol
│   ├── [ 953]  MetaCoin.sol
│   └── [ 493]  Migrations.sol
├── [4.0K]  migrations
│   ├── [ 129]  1_initial_migration.js
│   └── [ 249]  2_deploy_contracts.js
├── [4.0K]  test
│   ├── [2.4K]  metacoin.js
│   └── [ 630]  TestMetacoin.sol
└── [ 154]  truffle.js

3 directories, 8 files
```

### 編譯合約

```
$ truffle compile
Compiling ./contracts/ConvertLib.sol...
Compiling ./contracts/MetaCoin.sol...
Compiling ./contracts/Migrations.sol...
Writing artifacts to ./build/contracts

$ tree -h .
.
├── [4.0K]  build
│   └── [4.0K]  contracts
│       ├── [ 852]  ConvertLib.json
│       ├── [2.9K]  MetaCoin.json
│       └── [2.1K]  Migrations.json
├── [4.0K]  contracts
│   ├── [ 169]  ConvertLib.sol
│   ├── [ 953]  MetaCoin.sol
│   └── [ 493]  Migrations.sol
├── [4.0K]  migrations
│   ├── [ 129]  1_initial_migration.js
│   └── [ 249]  2_deploy_contracts.js
├── [4.0K]  test
│   ├── [2.4K]  metacoin.js
│   └── [ 630]  TestMetacoin.sol
└── [ 154]  truffle.js

5 directories, 11 files

```

### testrpc測試網路啟動並維持開啟

```
$ testrpc
EthereumJS TestRPC v4.0.1 (ganache-core: 1.0.1)

Available Accounts
==================
(0) 0x892fab0dbf2e35dacd64e13977d90ef1cfc17300
(1) 0x2113b723d8fe3c9cc7d75cc0133f1ba08548f4d4
(2) 0x95275c054027f9e361a2ed3db9be0224229629d2
(3) 0x9d8e5e3c206b2b5318f6a8f70e06945c9d1bc037
(4) 0xbf71eae720e418ee1061fd5be1793bd5c8ebca1e
(5) 0x13e15f2200b7c0588d7ebcb9fba61f16d182c7c6
(6) 0x8ebf6253779cc355a82288a66d5aee62b1af4a4a
(7) 0x316213d8e3c215f988528315cd1f2537b8934025
(8) 0x47a7241589cf8b01bc6de384e4535a1a99ca091c
(9) 0x74c21e7aeac7b137957f13a0d7d7b0f97ced457e

Private Keys
==================
(0) 5936a2cd362c3085c3b581774080d4eb2ac37e1bd1901b85a9b349d1f1809dbc
(1) d2aaa6e7bb9abaf92836df317f84b03960c05db5299ff7606098ca59cea281cb
(2) a9d7efc999d0f2b5db27194491264dbb2db09b46ecebe0cdfeeea08af2a7cd54
(3) d1b0a9ddf2a1d81e85e78baee20168406998c5dd5077c554321b8bd6f7098829
(4) 6649091277cfcfd1402db550f602885380d8417bc953e03bd38874217694a543
(5) f78c47ff27bafdc77ae4036a9a244211ca353cd38dc4413f86e5ed69b4d6f59b
(6) da05f4cf7fb836934b0d13e51468819b64df3cba61a01a0fd5c1df5959b3a15e
(7) a3c25ece9e2c6bc236ef8a87c4ed660f66bd3d9dbc02002875c9d67f6f2f7500
(8) 8552b9c86400ce076451b51e231266dbec058bd932e21f0943a1ef07c69c847e
(9) abae30b1af5ff9a30269513d7a397bb7bc783d8deb85fba561ca383dd9191695

HD Wallet
==================
Mnemonic:      carpet song van jaguar umbrella ready drama taxi design such trumpet erupt
Base HD Path:  m/44'/60'/0'/0/{account_index}

Listening on localhost:8545

```

### 部署到testrpc測試網路

```
$ truffle migrate
Using network 'development'.

Running migration: 1_initial_migration.js
  Deploying Migrations...
  Migrations: 0x93fe2d4241aa9daa2226bbeaeadf20657b08de16
Saving successful migration to network...
Saving artifacts...
Running migration: 2_deploy_contracts.js
  Deploying ConvertLib...
  ConvertLib: 0xa869de38de4980f6d48af45885d9616709c9796d
  Linking ConvertLib to MetaCoin
  Deploying MetaCoin...
  MetaCoin: 0x13983523be9e14004b46a119928480cdea4b199c
Saving successful migration to network...
Saving artifacts...

$ tree -h .
.
├── [4.0K]  build
│   └── [4.0K]  contracts
│       ├── [1020]  ConvertLib.json
│       ├── [3.7K]  MetaCoin.json
│       └── [2.3K]  Migrations.json
├── [4.0K]  contracts
│   ├── [ 169]  ConvertLib.sol
│   ├── [ 953]  MetaCoin.sol
│   └── [ 493]  Migrations.sol
├── [4.0K]  migrations
│   ├── [ 129]  1_initial_migration.js
│   └── [ 249]  2_deploy_contracts.js
├── [4.0K]  test
│   ├── [2.4K]  metacoin.js
│   └── [ 630]  TestMetacoin.sol
└── [ 154]  truffle.js

5 directories, 11 files
```

### 測試

```
$ truffle test
Using network 'development'.

Compiling ./contracts/ConvertLib.sol...
Compiling ./contracts/MetaCoin.sol...
Compiling ./test/TestMetacoin.sol...
Compiling truffle/Assert.sol...
Compiling truffle/DeployedAddresses.sol...


  TestMetacoin
    ✓ testInitialBalanceUsingDeployedContract (118ms)
    ✓ testInitialBalanceWithNewMetaCoin (72ms)

  Contract: MetaCoin
    ✓ should put 10000 MetaCoin in the first account (44ms)
    ✓ should call a function that depends on a linked library (82ms)
    ✓ should send coin correctly (169ms)


  5 passing (907ms)

```

### ETHPM新增套件

* Issue #96 · OpenZeppelin/zeppelin-solidity https://github.com/OpenZeppelin/zeppelin-solidity/issues/96

```
$ truffle install zeppelin
$ tree -h .
.
├── [4.0K]  build
│   └── [4.0K]  contracts
│       ├── [1020]  ConvertLib.json
│       ├── [3.7K]  MetaCoin.json
│       └── [2.3K]  Migrations.json
├── [4.0K]  contracts
│   ├── [ 169]  ConvertLib.sol
│   ├── [ 953]  MetaCoin.sol
│   └── [ 493]  Migrations.sol
├── [4.0K]  installed_contracts
│   └── [4.0K]  zeppelin
│       ├── [4.0K]  contracts
│       │   ├── [1.4K]  Bounty.sol
│       │   ├── [1.7K]  DayLimit.sol
│       │   ├── [4.0K]  lifecycle
│       │   │   ├── [ 283]  Destructible.sol
│       │   │   ├── [ 491]  Migrations.sol
│       │   │   ├── [ 732]  Pausable.sol
│       │   │   └── [ 965]  TokenDestructible.sol
│       │   ├── [ 538]  LimitBalance.sol
│       │   ├── [2.9K]  MultisigWallet.sol
│       │   ├── [4.0K]  ownership
│       │   │   ├── [ 567]  Claimable.sol
│       │   │   ├── [ 300]  Contactable.sol
│       │   │   ├── [ 603]  DelayedClaimable.sol
│       │   │   ├── [ 560]  HasNoContracts.sol
│       │   │   ├── [1.3K]  HasNoEther.sol
│       │   │   ├── [ 800]  HasNoTokens.sol
│       │   │   ├── [1.0K]  Multisig.sol
│       │   │   ├── [ 450]  NoOwner.sol
│       │   │   ├── [ 509]  Ownable.sol
│       │   │   └── [5.0K]  Shareable.sol
│       │   ├── [4.0K]  payment
│       │   │   └── [ 928]  PullPayment.sol
│       │   ├── [ 878]  ReentrancyGuard.sol
│       │   ├── [1.1K]  SafeMath.sol
│       │   └── [4.0K]  token
│       │       ├── [ 761]  BasicToken.sol
│       │       ├── [1.1K]  CrowdsaleToken.sol
│       │       ├── [ 362]  ERC20Basic.sol
│       │       ├── [ 432]  ERC20.sol
│       │       ├── [1.7K]  LimitedTransferToken.sol
│       │       ├── [ 975]  MintableToken.sol
│       │       ├── [ 695]  PausableToken.sol
│       │       ├── [ 578]  SimpleToken.sol
│       │       ├── [1.1K]  StandardToken.sol
│       │       └── [3.5K]  VestedToken.sol
│       ├── [1.7K]  ethpm.json
│       ├── [ 84K]  lock.json
│       └── [  53]  lock.uri
├── [4.0K]  migrations
│   ├── [ 129]  1_initial_migration.js
│   └── [ 249]  2_deploy_contracts.js
├── [4.0K]  test
│   ├── [2.4K]  metacoin.js
│   └── [ 630]  TestMetacoin.sol
└── [ 154]  truffle.js

12 directories, 45 files

```

### 選擇 MitableToken繼承，測試完成後部署到testrpc

* contracts/MyToken.sol
* migrateions/3_deploy_mytoken.js
* test/mytoken.js 

```
$ truffle test
Using network 'development'.

Compiling ./contracts/ConvertLib.sol...
Compiling ./contracts/MetaCoin.sol...
Compiling ./contracts/MyToken.sol...
Compiling ./test/TestMetacoin.sol...
Compiling truffle/Assert.sol...
Compiling truffle/DeployedAddresses.sol...
Compiling zeppelin/contracts/SafeMath.sol...
Compiling zeppelin/contracts/ownership/Ownable.sol...
Compiling zeppelin/contracts/token/BasicToken.sol...
Compiling zeppelin/contracts/token/ERC20.sol...
Compiling zeppelin/contracts/token/ERC20Basic.sol...
Compiling zeppelin/contracts/token/MintableToken.sol...
Compiling zeppelin/contracts/token/StandardToken.sol...


  TestMetacoin
    ✓ testInitialBalanceUsingDeployedContract (80ms)
    ✓ testInitialBalanceWithNewMetaCoin (67ms)

  Contract: MetaCoin
    ✓ should put 10000 MetaCoin in the first account
    ✓ should call a function that depends on a linked library (65ms)
    ✓ should send coin correctly (145ms)

  Contract: MyToken
    ✓ should put 21000000 MyToken in the first account


  6 passing (983ms)

$ truffle migrate
Compiling ./contracts/ConvertLib.sol...
Compiling ./contracts/MetaCoin.sol...
Compiling ./contracts/MyToken.sol...
Compiling zeppelin/contracts/SafeMath.sol...
Compiling zeppelin/contracts/ownership/Ownable.sol...
Compiling zeppelin/contracts/token/BasicToken.sol...
Compiling zeppelin/contracts/token/ERC20.sol...
Compiling zeppelin/contracts/token/ERC20Basic.sol...
Compiling zeppelin/contracts/token/MintableToken.sol...
Compiling zeppelin/contracts/token/StandardToken.sol...
Writing artifacts to ./build/contracts

Using network 'development'.

Running migration: 3_deploy_mytoken.js
  Deploying MyToken...
  MyToken: 0x80919325f6fec0b0048be92ced6adbf936bc5537
Saving successful migration to network...
Saving artifacts...

```