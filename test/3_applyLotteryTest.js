const { expect } = require("chai");
const hre = require("hardhat");


let openTime = new Date(2022, 08, 07, 1, 03).getTime();
let closeTime = new Date(2022, 10, 07, 5, 30).getTime(); 
let appliedTime=new Date(2022, 09, 07, 1, 14).getTime(); 

describe("applying lottery.....", () => {
    beforeEach(async () => {
        [addr1,addr2,addr3,addr4,addr5] = await hre.ethers.getSigners();
        contract = await hre.ethers.getContractFactory("lotteryMethods");
        instancelottery = await hre.ethers.getContractFactory("lotteryMethods");
        deployedlottery = await instancelottery.deploy();
        await deployedlottery.connect(addr1).openLottery(openTime,closeTime,999999999999);
        });
    it("should apply for a lottery", async () => {
        console.log("Account's old Balance :", await addr1.getBalance());
        console.log(
            "contract's old Balance : ",
            await deployedlottery.connect(addr1).balanceofContract()
        );
            await deployedlottery.connect(addr2).applyLottery(appliedTime,{ value:999999999999})
       
        console.log(
            "contract's new Balance : ",
            await deployedlottery.connect(addr1).balanceofContract()
        );
        console.log("Account's New Balance", await addr1.getBalance());
    });
});