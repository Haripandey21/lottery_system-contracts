const { expect } = require("chai");
const hre = require("hardhat");


let openTime = new Date(2022, 08, 07, 1, 03).getTime();
let closeTime = new Date(2022, 11, 07, 5, 30).getTime(); 
let appliedTime=new Date(2022, 09, 07, 1, 14).getTime(); 

describe("applying lottery.....", () => {
    beforeEach(async () => {
        [addr1,addr2] = await hre.ethers.getSigners();
        contract = await hre.ethers.getContractFactory("Lottery");
        instancelottery = await hre.ethers.getContractFactory("Lottery");
        deployedlottery = await instancelottery.deploy();
        await deployedlottery.connect(addr1).openLottery(openTime,closeTime,999999999999);
        });
    it("should apply for a lottery", async () => {

            oldBalance=await deployedlottery.balanceOfContract()        
         tx=   await deployedlottery.connect(addr2).applyLottery(appliedTime,{ value:999999999999})
            newBalance=await deployedlottery.balanceOfContract();

            receipt= await tx.wait();
            console.log(receipt);

        expect(newBalance).to.equal(oldBalance+999999999999);      
    });
});