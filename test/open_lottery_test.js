const { expect } = require("chai");
const hre = require("hardhat");
let openTime = new Date(2022, 08, 07, 1, 03).getTime();
let closeTime = new Date(2022, 11, 07, 5, 30).getTime(); 
describe("openLottery function testing...", function () {
  it("lottery should open... ", async function () {
    [addr1, addr2,addr3,addr4,addr5] = await hre.ethers.getSigners();
    contract = await hre.ethers.getContractFactory("Lottery");
    const instancelottery = await hre.ethers.getContractFactory("Lottery");
    const deployedlottery = await instancelottery.deploy(); 
    await deployedlottery.connect(addr1).openLottery(openTime,closeTime,99999999999999);
  });
})
