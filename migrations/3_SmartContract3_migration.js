const DynamicArray = artifacts.require("dynamicArray");

module.exports=function(deployer){
    deployer.deploy(DynamicArray);
}