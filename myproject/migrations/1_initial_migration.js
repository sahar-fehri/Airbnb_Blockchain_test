var Migrations = artifacts.require("./Migrations.sol");

var Channel = artifacts.require("./Channel.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Channel,5, 8, 2);
};
