const { expect } = require("chai");
const hre = require("hardhat");

let openTime = new Date(2022, 08, 07, 1, 03).getTime();
let closeTime = new Date(2022, 9, 05, 5, 30).getTime(); 
let appliedTime=new Date(2022, 09, 02, 1, 14).getTime(); 
let currentTime=new Date(2022, 9, 07, 1, 14).getTime();

describe("getting winner and amount must be transferd to him.....", () => {
    beforeEach(async () => {
        [addr1, addr2,addr3,addr4,addr5] = await hre.ethers.getSigners();
        contract = await hre.ethers.getContractFactory("lotteryMethods");
        instancelottery = await hre.ethers.getContractFactory("lotteryMethods");
        deployedlottery = await instancelottery.deploy();
        });
    it("getting winner....", async () => {
        
        // deployment by addr1 ...
        await deployedlottery.connect(addr1).openLottery(openTime,closeTime,99999999999); 

        console.log("-----------------------------------------------------------------------");
        // applying from addr2 ...
        console.log("before applying, Account 2 Balance : ",await addr2.getBalance());
        console.log("current contract's Balance : ", await deployedlottery.balanceofContract());

        await deployedlottery.connect(addr2).applyLottery(appliedTime,{ value:99999999999 });

        console.log("After Applying, Account 2 Balance",await addr2.getBalance());
        console.log("New contract's Balance : ", await deployedlottery.balanceofContract());  
   
        console.log("-----------------------------------------------------------------------");
        // applying from addr3....
        console.log("before applying, Account 3 Balance : ",await addr3.getBalance());
        console.log("current contract's Balance : ", await deployedlottery.balanceofContract());

        await deployedlottery.connect(addr3).applyLottery(appliedTime,{ value:99999999999 });

        console.log("After Applying, Account 3 Balance",await addr2.getBalance());
        console.log("New contract's Balance : ", await deployedlottery.balanceofContract());  

        
        console.log("-----------------------------------------------------------------------");
        // applying from addr4 ...
        console.log("before applying, Account 4 Balance : ",await addr4.getBalance());
        console.log("current contract's Balance : ", await deployedlottery.balanceofContract());

        await deployedlottery.connect(addr4).applyLottery(appliedTime,{ value:99999999999 });

        console.log("After Applying, Account 4 Balance",await addr2.getBalance());
        console.log("New contract's Balance : ", await deployedlottery.balanceofContract());  
   
        console.log("-----------------------------------------------------------------------");
        // applying from addr5....
        console.log("before applying, Account 5 Balance : ",await addr5.getBalance());
        console.log("current contract's Balance : ", await deployedlottery.balanceofContract());

        await deployedlottery.connect(addr5).applyLottery(appliedTime,{ value:99999999999 });

        console.log("After Applying, Account 5 Balance",await addr5.getBalance());
        console.log("Total contract's Balance : ", await deployedlottery.balanceofContract());  

        console.log("------------------------------------------------------------------------");
        await deployedlottery.connect(addr1).closeLottery(currentTime);
     
     
        console.log("**************** After winner Announcement  *******************************");

        await deployedlottery.connect(addr2);
        console.log("Account 2 Balance : ",await addr5.getBalance());
        await deployedlottery.connect(addr3);
        console.log(" Account 3 Balance : ",await addr5.getBalance());
        await deployedlottery.connect(addr4);
        console.log(" Account 4 Balance : ",await addr5.getBalance());
        await deployedlottery.connect(addr5);
        console.log("Account 5 Balance : ",await addr5.getBalance());

        console.log("Total contract's Balance : ", await deployedlottery.balanceofContract());  
        console.log("current Pool Balance : ",await deployedlottery.currentPool());





    });
});
