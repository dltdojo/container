var keythereum = require("keythereum");
var password = "pass";
var params = { keyBytes: 32, ivBytes: 16 };
keythereum.create(params, function (dk) {
    // console.log(dk)
    var options = {
        kdf: "pbkdf2",
        cipher: "aes-128-ctr",
        kdfparams: {
            c: 262144,
            dklen: 32,
            prf: "hmac-sha256"
        }
    };
    keythereum.dump(password, dk.privateKey, dk.salt, dk.iv, options, function (keyObject) {
        console.log(keyObject)
        // keythereum.exportToFile(keyObject);
    });
});