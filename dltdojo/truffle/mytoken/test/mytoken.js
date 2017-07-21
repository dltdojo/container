var MyToken = artifacts.require("./MyToken.sol");

contract('MyToken', function(accounts) {
  it("should put 21000000 MyToken in the first account", function() {
    return MyToken.deployed().then(function(instance) {
      return instance.balanceOf(accounts[0]);
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 21000000, "21000000 wasn't in the first account");
    });
  });
});
