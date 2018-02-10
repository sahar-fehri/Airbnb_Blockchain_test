var Migrations = artifacts.require("./Migrations.sol");

var Channel = artifacts.require("./Channel.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Channel,0x9ec580879f31f85e7e3fa195986d833e2d9245fb, 8);
};
