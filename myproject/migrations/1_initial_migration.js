var Migrations = artifacts.require("./Migrations.sol");

var Channel = artifacts.require("./Channel.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Channel,0x5fD65cFdA02fbF49890Fc18001d9eE98Dd8d19dA, 8);
};
