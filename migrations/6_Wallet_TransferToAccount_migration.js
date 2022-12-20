const SendTo = artifacts.require("sendTo");

module.exports=function(deployer,_network,accounts){
    deployer.deploy(SendTo,accounts[0]);
}