var ConvertLib = artifacts.require("./ConvertLib.sol");
var MetaCoin = artifacts.require("./MetaCoin.sol");
var Meme = artifacts.require("./Meme.sol");
var MailTransfer = artifacts.require("./MailTransfer.sol");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(MetaCoin);
  deployer.deploy(Meme);
  deployer.deploy(MailTransfer);
};
