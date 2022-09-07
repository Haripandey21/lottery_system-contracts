const { ethers } = require("hardhat");

async function main() {
  const lotteryMethodsContracts = await ethers.getContractFactory("lotteryMethods");
  const deployedlotteryMethodsContracts  = await lotteryMethodsContracts.deploy();
  await deployedlotteryMethodsContracts.deployed();
  
  console.log(
    "deployed Contract Address:",deployedlotteryMethodsContracts.address );
    // 0x5FbDB2315678afecb367f032d93F642f64180aa3 
}
main()
 .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});


