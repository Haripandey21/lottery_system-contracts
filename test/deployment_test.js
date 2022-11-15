const { expect } = require("chai");
const hre = require("hardhat");

describe("Deployment testing", function () {
  it("deployment should work ", async function () {

    const instancelottery = await hre.ethers.getContractFactory("Lottery");
    const deployedlottery = await instancelottery.deploy();
   // console.log("deployed address : ",deployedlottery.address);

    expect(typeof (deployedlottery.address)!=null);


  });
})



