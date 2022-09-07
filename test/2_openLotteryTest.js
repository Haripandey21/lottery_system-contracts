const { expect } = require("chai");
const hre = require("hardhat");

describe("Deployment testing", function () {
  it("deployment should work ", async function () {

    const [owner]= await hre.ethers.getSigners();
    console.log("owner address",owner.address);
    const instancelottery = await hre.ethers.getContractFactory("lotteryMethods");
    const deployedlottery = await instancelottery.deploy();
    console.log("deployed address : ",deployedlottery.address);


    a=await deployedlottery.openLottery(1,11,12);
    // b=await deployedlottery.participate();
    // console.log("data : ",b);


  });
})
