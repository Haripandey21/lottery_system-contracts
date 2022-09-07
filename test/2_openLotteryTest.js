const { expect } = require("chai");
const hre = require("hardhat");

let openTime = new Date(2022, 08, 07, 1, 03).getTime();
let closeTime = new Date(2022, 08, 07, 5, 30).getTime(); 


describe("Deployment testing", function () {
  it("deployment should work ", async function () {

    [add1, add2,add3,add4,add5] = await hre.ethers.getSigners();
    contract = await hre.ethers.getContractFactory("lotteryMethods");
    const instancelottery = await hre.ethers.getContractFactory("lotteryMethods");
    const deployedlottery = await instancelottery.deploy();
   
    await deployedlottery.connect(add1).openLottery(openTime,closeTime,9999999999999999);
    console.log("deployed address : ",deployedlottery.address);


  });
})
