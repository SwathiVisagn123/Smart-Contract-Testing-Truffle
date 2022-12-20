const TransferArray = artifacts.require("TransferArray");

module.exports=function(deployer,_network,accounts){
    deployer.deploy(TransferArray,accounts[0]);
}