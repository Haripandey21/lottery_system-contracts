const { expect } = require("chai");
const hre = require("hardhat");

let openTime = new Date(2022, 08, 07, 1, 03).getTime();
let closeTime = new Date(2022, 9, 05, 5, 30).getTime(); 
let appliedTime=new Date(2022, 09, 02, 1, 14).getTime(); 
let currentTime=new Date(2022, 9, 07, 1, 14).getTime(); 

describe("withdraw function testing on the behalf of Owner : ", () => {
    beforeEach(async () => {
        [addr1, addr2,addr3,addr4,addr5] = await hre.ethers.getSigners();
        contract = await hre.ethers.getContractFactory("Lottery");
        instancelottery = await hre.ethers.getContractFactory("Lottery");
        deployedlottery = await instancelottery.deploy();
        });
    it("Manager can withdraw amount less or equal to his withdrawable amount.....", async () => {

        await deployedlottery.connect(addr1).openLottery(openTime,closeTime,99999999999); 
        await deployedlottery.connect(addr2).applyLottery(appliedTime,{ value:99999999999 });
        await deployedlottery.connect(addr3).applyLottery(appliedTime,{ value:99999999999 });
   
         await deployedlottery.connect(addr1).closeLottery(currentTime);
       
            console.log("-----------------------****withdrawing balance by owner *****-----------------")
        await deployedlottery.withDraw("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",40000000001);
        console.log("New Manager/addr1 Balance : ",await addr1.getBalance());
    });


    it("Manager cannnot withdraw more than his withdrawable amount..", async () => {


        await deployedlottery.connect(addr1).openLottery(openTime,closeTime,99999999999); 
        await deployedlottery.connect(addr2).applyLottery(appliedTime,{ value:99999999999 });
        await deployedlottery.connect(addr3).applyLottery(appliedTime,{ value:99999999999 });
         await deployedlottery.connect(addr1).closeLottery(currentTime);        
        await expect (deployedlottery.withDraw(addr1.address,40000000002)).to.be.revertedWith("You Cannot withdraw that much amount");
    });
});
