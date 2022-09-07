const { expect } = require("chai");
const hre = require("hardhat");

describe("Deployment testing", function () {
  it("deployment should work ", async function () {

    const [owner]= await hre.ethers.getSigners();
    console.log("owner address",owner.address);
    const instancelottery = await hre.ethers.getContractFactory("lotteryMethods");
    const deployedlottery = await instancelottery.deploy();
    console.log("deployed address : ",deployedlottery.address);

    expect(typeof (deployedlottery.address)!=null);


  });
})
