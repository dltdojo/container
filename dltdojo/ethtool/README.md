### base on ubuntun xenial image

```
$ docker build -t dltdojo/ethtool . 
$ docker push dltdojo/ethtool
```

### sloc

```
$ docker run -it --rm dltdojo/ethtool solc --version
solc, the solidity compiler commandline interface
Version: 0.4.15+commit.bbb8e64f.Linux.g++

$ docker run -it --rm dltdojo/ethtool solc --abi foo.sol

======= foo.sol:Foo =======
Contract JSON ABI
[{"constant":true,"inputs":[],"name":"foo","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"}]

$ docker run -it --rm dltdojo/ethtool solc --bin foo.sol

======= foo.sol:Foo =======
Binary:
606060405260056000553415601357600080fd5b5b6095806100226000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c298557814603d575b600080fd5b3415604757600080fd5b604d6063565b6040518082815260200191505060405180910390f35b600054815600a165627a7a72305820abe9b1ad00ffbd2423e8d19a207a96b933e519f445c6a08911d997e0cf51081c0029

$ docker run -it --rm dltdojo/ethtool solc --bin-runtime foo.sol

======= foo.sol:Foo =======
Binary of the runtime part:
60606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c298557814603d575b600080fd5b3415604757600080fd5b604d6063565b6040518082815260200191505060405180910390f35b600054815600a165627a7a72305820abe9b1ad00ffbd2423e8d19a207a96b933e519f445c6a08911d997e0cf51081c0029


$ docker run -it --rm dltdojo/ethtool solc --opcodes foo.sol

======= foo.sol:Foo =======
Opcodes:
PUSH1 0x60 PUSH1 0x40 MSTORE PUSH1 0x5 PUSH1 0x0 SSTORE CALLVALUE ISZERO PUSH1 0x13 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST JUMPDEST PUSH1 0x95 DUP1 PUSH2 0x22 PUSH1 0x0 CODECOPY PUSH1 0x0 RETURN STOP PUSH1 0x60 PUSH1 0x40 MSTORE PUSH1 0x0 CALLDATALOAD PUSH29 0x100000000000000000000000000000000000000000000000000000000 SWAP1 DIV PUSH4 0xFFFFFFFF AND DUP1 PUSH4 0xC2985578 EQ PUSH1 0x3D JUMPI JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST CALLVALUE ISZERO PUSH1 0x47 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH1 0x4D PUSH1 0x63 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 DUP3 DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH1 0x0 SLOAD DUP2 JUMP STOP LOG1 PUSH6 0x627A7A723058 KECCAK256 0xab 0xe9 0xb1 0xad STOP SELFDESTRUCT 0xbd 0x24 0x23 0xe8 0xd1 SWAP11 KECCAK256 PUSH27 0x96B933E519F445C6A08911D997E0CF51081C002900000000000000

$ docker run -it --rm dltdojo/ethtool solc --asm foo.sol

======= foo.sol:Foo =======
EVM assembly:
    /* "foo.sol":26:62  contract Foo { uint public foo = 5;} */
  mstore(0x40, 0x60)
    /* "foo.sol":59:60  5 */
  0x5
    /* "foo.sol":41:60  uint public foo = 5 */
  0x0
  sstore
    /* "foo.sol":26:62  contract Foo { uint public foo = 5;} */
  jumpi(tag_1, iszero(callvalue))
  0x0
  dup1
  revert
tag_1:
tag_2:
  dataSize(sub_0)
  dup1
  dataOffset(sub_0)
  0x0
  codecopy
  0x0
  return
stop

sub_0: assembly {
        /* "foo.sol":26:62  contract Foo { uint public foo = 5;} */
      mstore(0x40, 0x60)
      calldataload(0x0)
      0x100000000000000000000000000000000000000000000000000000000
      swap1
      div
      0xffffffff
      and
      dup1
      0xc2985578
      eq
      tag_2
      jumpi
    tag_1:
      0x0
      dup1
      revert
        /* "foo.sol":41:60  uint public foo = 5 */
    tag_2:
      jumpi(tag_3, iszero(callvalue))
      0x0
      dup1
      revert
    tag_3:
      tag_4
      jump(tag_5)
    tag_4:
      mload(0x40)
      dup1
      dup3
      dup2
      mstore
      0x20
      add
      swap2
      pop
      pop
      mload(0x40)
      dup1
      swap2
      sub
      swap1
      return
    tag_5:
      sload(0x0)
      dup2
      jump      // out

    auxdata: 0xa165627a7a72305820abe9b1ad00ffbd2423e8d19a207a96b933e519f445c6a08911d997e0cf51081c0029
}

```

### porosity

* https://github.com/jpmorganchase/quorum/releases/

```
$ docker run -it --rm dltdojo/ethtool porosity
parse: Please at least provide some byte code (--code) or run it in debug mode (--debug) with pre-configured inputs.
Porosity v0.1 (https://www.comae.io)
Matt Suiche, Comae Technologies <support@comae.io>
The Ethereum bytecode commandline decompiler.
Decompiles the given Ethereum input bytecode and outputs the Solidity code.


Usage: porosity.exe [options]
Debug:
    --debug                             - Enable debug mode. (testing only - no input parameter needed.)

Input parameters:
    --code <bytecode>                   - Ethereum bytecode. (mandatory)
    --arguments <arguments>             - Ethereum arguments to pass to the function. (optional, default data set provided if not provided.)
    --abi <arguments>                   - Ethereum Application Binary Interface (ABI) in JSON format. (optional but recommended)
    --hash <hashmethod>                 - Work on a specific function, can be retrieved wit --list. (optional)

Features:
    --list                              - List identified methods/functions.
    --disassm                           - Disassemble the bytecode.
    --single-step                       - Execute the byte code through our VM.
    --cfg                               - Generate a the control flow graph in Graphviz format.
    --cfg-full                          - Generate a the control flow graph in Graphviz format (including instructions)
    --decompile                         - Decompile a given function or all the bytecode.

$ CODE=60606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c298557814603d575b600080fd5b3415604757600080fd5b604d6063565b6040518082815260200191505060405180910390f35b600054815600a165627a7a72305820abe9b1ad00ffbd2423e8d19a207a96b933e519f445c6a08911d997e0cf51081c0029

$ docker run -it --rm dltdojo/ethtool porosity --code $CODE --decompile
Porosity v0.1 (https://www.comae.io)
Matt Suiche, Comae Technologies <support@comae.io>
The Ethereum bytecode commandline decompiler.
Decompiles the given Ethereum input bytecode and outputs the Solidity code.

Hash: 0xC2985578
executeInstruction: NOT_IMPLEMENTED: REVERT
function func_c2985578 {
      if (!msg.value) {
      }
      return;
}


$ docker run -it --rm dltdojo/ethtool porosity --code $CODE --list
Porosity v0.1 (https://www.comae.io)
Matt Suiche, Comae Technologies <support@comae.io>
The Ethereum bytecode commandline decompiler.
Decompiles the given Ethereum input bytecode and outputs the Solidity code.

[+] Hash: 0xC2985578 () (1 references)

$ docker run -it --rm dltdojo/ethtool porosity --code $CODE --disasm
Porosity v0.1 (https://www.comae.io)
Matt Suiche, Comae Technologies <support@comae.io>
The Ethereum bytecode commandline decompiler.
Decompiles the given Ethereum input bytecode and outputs the Solidity code.

- Total byte code size: 0x95 (149)


loc_00000000:
0x00000000 60 60                      PUSH1 60
0x00000002 60 40                      PUSH1 40
0x00000004 52                         MSTORE
0x00000005 60 00                      PUSH1 00
0x00000007 35                         CALLDATALOAD
0x00000008 7c 00  00  00  00  +      PUSH29 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 01
0x00000026 90                         SWAP1
0x00000027 04                         DIV
0x00000028 63 ff  ff  ff  ff          PUSH4 ff ff ff ff
0x0000002d 16                         AND
0x0000002e 80                         DUP1
0x0000002f 63 78  55  98  c2          PUSH4 78 55 98 c2
0x00000034 14                         EQ
0x00000035 60 3d                      PUSH1 3d
0x00000037 57                         JUMPI

loc_00000038:
0x00000038 5b                         JUMPDEST
0x00000039 60 00                      PUSH1 00
0x0000003b 80                         DUP1
0x0000003c fd                         REVERT

func_c2985578:
0x0000003d 5b                         JUMPDEST
0x0000003e 34                         CALLVALUE
0x0000003f 15                         ISZERO
0x00000040 60 47                      PUSH1 47
0x00000042 57                         JUMPI

loc_00000043:
0x00000043 60 00                      PUSH1 00
0x00000045 80                         DUP1
0x00000046 fd                         REVERT

loc_00000047:
0x00000047 5b                         JUMPDEST
0x00000048 60 4d                      PUSH1 4d
0x0000004a 60 63                      PUSH1 63
0x0000004c 56                         JUMP

loc_0000004d:
0x0000004d 5b                         JUMPDEST
0x0000004e 60 40                      PUSH1 40
0x00000050 51                         MLOAD
0x00000051 80                         DUP1
0x00000052 82                         DUP3
0x00000053 81                         DUP2
0x00000054 52                         MSTORE
0x00000055 60 20                      PUSH1 20
0x00000057 01                         ADD
0x00000058 91                         SWAP2
0x00000059 50                         POP
0x0000005a 50                         POP
0x0000005b 60 40                      PUSH1 40
0x0000005d 51                         MLOAD
0x0000005e 80                         DUP1
0x0000005f 91                         SWAP2
0x00000060 03                         SUB
0x00000061 90                         SWAP1
0x00000062 f3                         RETURN

loc_00000063:
0x00000063 5b                         JUMPDEST
0x00000064 60 00                      PUSH1 00
0x00000066 54                         SLOAD
0x00000067 81                         DUP2
0x00000068 56                         JUMP
0x00000069 00                         STOP
0x0000006a a1                         LOG1
0x0000006b 65 58  30  72  7a  +      PUSH6 58 30 72 7a 7a 62
0x00000072 20                         SHA3
0x00000073 ab                    !INVALID!
0x00000074 e9                    !INVALID!
0x00000075 b1 00  ad                  JUMPIF 00 ad
0x00000078 ff                         SUICIDE
0x00000079 bd                    !INVALID!
0x0000007a 24                    !INVALID!
0x0000007b 23                    !INVALID!
0x0000007c e8                    !INVALID!
0x0000007d d1                    !INVALID!
0x0000007e 9a                         SWAP11
0x0000007f 20                         SHA3
0x00000080 7a 00  00  00  00  +      PUSH27 00 00 00 00 00 00 00 29 00 1c 08 51 cf e0 97 d9 11 89 a0 c6 45 f4 19 e5 33 b9 96

```

### evm-tools

* https://github.com/CoinCulture/evm-tools
* https://github.com/CoinCulture/evm-tools/blob/master/analysis/guide.md

```
$ docker run -it --rm  dltdojo/ethtool ls /usr/local/bin/
disasm  evm  evm-deploy  glide  porosity

$ echo 6005600401 | docker run -i --rm  dltdojo/ethtool disasm
6005600401
0      PUSH1  => 05
2      PUSH1  => 04
4      ADD

$ docker run -i --rm  dltdojo/ethtool evm --debug --code 6005600401
01
Loading root hash 0000000000000000000000000000000000000000000000000000000000000000
Created account for receiver 0000000000000000000000000000000000000000
CODE: 6005600401
OUT: 0x
VM STAT 4 OPs
PC 00000000: PUSH1 GAS: 9999999997 COST: 3
STACK = 0
MEM = 0
STORAGE = 0

PC 00000002: PUSH1 GAS: 9999999994 COST: 3
STACK = 1
0000: 0000000000000000000000000000000000000000000000000000000000000005
MEM = 0
STORAGE = 0

PC 00000004: ADD GAS: 9999999991 COST: 3
STACK = 2
0000: 0000000000000000000000000000000000000000000000000000000000000004
0001: 0000000000000000000000000000000000000000000000000000000000000005
MEM = 0
STORAGE = 0

PC 00000005: STOP GAS: 9999999991 COST: 0
STACK = 1
0000: 0000000000000000000000000000000000000000000000000000000000000009
MEM = 0
STORAGE = 0

$ echo 6005600401 | docker run -i --rm  dltdojo/ethtool evm-deploy | docker run -i --rm  dltdojo/ethtool disasm 

600580600b6000396000f36005600401
0      PUSH1  => 05
2      DUP1
3      PUSH1  => 0b
5      PUSH1  => 00
7      CODECOPY
8      PUSH1  => 00
10     RETURN
11     PUSH1  => 05
13     PUSH1  => 04
15     ADD


```