const { expect } = require("chai");
const hre = require("hardhat");

let openTime = new Date(2022, 08, 08, 9, 30).getTime();
let closeTime = new Date(2022, 11, 08, 6, 30).getTime(); 
let appliedTime=new Date(2022, 09, 08, 2, 32).getTime(); 

describe("Participants duplication checking.....", () => {
    beforeEach(async () => {
        [addr1, addr2,addr3,addr4,addr5] = await hre.ethers.getSigners();
        contract = await hre.ethers.getContractFactory("Lottery");
        instancelottery = await hre.ethers.getContractFactory("Lottery");
        deployedlottery = await instancelottery.deploy();
        await deployedlottery.connect(addr1).openLottery(openTime,closeTime,99999999999); 
        });

    it("participating 1st time... ", async () => {       
        await deployedlottery.connect(addr2).applyLottery(appliedTime,{ value:99999999999});
  
    });

    it("participating 2nd time... ", async () => {    
        await deployedlottery.connect(addr2).applyLottery(appliedTime,{ value:99999999999});
        await expect (deployedlottery.connect(addr2).applyLottery(appliedTime,{ value:99999999999})).to.be.revertedWith("This account already participated in lottery...");
    });
});
