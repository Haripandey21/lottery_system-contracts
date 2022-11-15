const { ethers } = require("hardhat");

async function main() {
  const LotteryContracts = await ethers.getContractFactory("Lottery");
  const deployedLotteryContracts  = await LotteryContracts.deploy();
  await deployedLotteryContracts.deployed(); 
    console.log(
    "deployed Contract Address in goerli :",deployedLotteryContracts.address );
}
main()
 .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});




