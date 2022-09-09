const { ethers } = require("hardhat");

async function main() {
  const LotteryContracts = await ethers.getContractFactory("Lottery");
  const deployedLotteryContracts  = await LotteryContracts.deploy();
  await deployedLotteryContracts.deployed();
  
  // .env file
  // dotenv js package
  // remove console.log
  // add address to that file
  // test case - process.env.LOTTERY_CONTRACT

 //deployedContractAddress= process.env.DEPLOYED_CONTRACT_ADDRESS; 
  console.log(
    "deployed Contract Address:",deployedLotteryContracts.address );
}
main()
 .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});


