const { expect } = require("chai");
const hre = require("hardhat");
let openTime = new Date(2022, 08, 07, 1, 03).getTime();
let closeTime = new Date(2022, 09, 05, 5, 30).getTime(); 
let appliedTime=new Date(2022, 09, 02, 1, 14).getTime(); 
let currentTime=new Date(2022, 09, 07, 1, 14).getTime();

describe("deploying by addr1..addr2 is only participant..and checking amount of winner(aka addr2) => ", () => {
    beforeEach(async () => {
        [addr1, addr2,addr3] = await hre.ethers.getSigners();
        contract = await hre.ethers.getContractFactory("Lottery");
        instancelottery = await hre.ethers.getContractFactory("Lottery");
        deployedlottery = await instancelottery.deploy();
        });
    it("getting winner....", async () => {        
        // deployment by addrr1 ...
        await deployedlottery.connect(addr1).openLottery(openTime,closeTime,99999999999); 
        // applying from addrr2 ...
        await deployedlottery.connect(addr2).applyLottery(appliedTime,{ value:99999999999 });
        await deployedlottery.connect(addr1).closeLottery(currentTime);                        
        await deployedlottery.connect(addr2);
    });
});
