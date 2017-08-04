* KEEP IT SIMPLE Principle Protects Blockchains | Intel® Software https://software.intel.com/en-us/blogs/2017/07/31/keep-it-simple-principle-protects-blockchains
* Sawtooth Burrow-EVM Transaction Family Specification — Sawtooth latest documentation https://intelledger.github.io/transaction_family_specifications/sawtooth_burrow_evm_family.html


### Sawtooth Burrow-EVM Transaction Family

```
message EvmEntry {
    EvmStateAccount account = 1;
    repeated EvmStorage storage = 2;
}

message EvmStateAccount {
    bytes address = 1;
    int64 balance = 2;
    bytes code = 3;
    int64 nonce = 4;
}

message EvmStorage {
    bytes key = 1;
    bytes value = 2;
}
```