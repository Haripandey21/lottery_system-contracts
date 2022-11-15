const { expect } = require("chai");
const hre = require("hardhat");

let openTime = new Date(2022, 08, 07, 1, 03).getTime();
let closeTime = new Date(2022, 9, 05, 5, 30).getTime(); 
let appliedTime=new Date(2022, 09, 02, 1, 14).getTime(); 
let currentTime=new Date(2022, 9, 07, 1, 14).getTime();

describe("getting winner and amount must be transferd to him.....", () => {
    beforeEach(async () => {
        [addr1, addr2,addr3,addr4,addr5] = await hre.ethers.getSigners();
        contract = await hre.ethers.getContractFactory("Lottery");
        instancelottery = await hre.ethers.getContractFactory("Lottery");
        deployedlottery = await instancelottery.deploy();
        });
    it("getting winner....", async () => {       
        // deployment by addr1 ...
        await deployedlottery.connect(addr1).openLottery(openTime,closeTime,99999999999); 
        // applying from addr2 ...
        await deployedlottery.connect(addr2).applyLottery(appliedTime,{ value:99999999999 });
        // applying from addr3....
        console.log("before applying, Account 3 Balance : ",await addr3.getBalance());
        await deployedlottery.connect(addr3).applyLottery(appliedTime,{ value:99999999999 });        
        // applying from addr4 ...
        await deployedlottery.connect(addr4).applyLottery(appliedTime,{ value:99999999999 });   
        // applying from addr5....
        await deployedlottery.connect(addr5).applyLottery(appliedTime,{ value:99999999999 });
        await deployedlottery.connect(addr1).closeLottery(currentTime);
        await deployedlottery.connect(addr2);
        await deployedlottery.connect(addr3);
        await deployedlottery.connect(addr4);
        await deployedlottery.connect(addr5);
    });
});
