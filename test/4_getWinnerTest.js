const { expect } = require("chai");
const hre = require("hardhat");

let openTime = new Date(2022, 08, 07, 1, 03).getTime();
let closeTime = new Date(2022, 08, 07, 5, 30).getTime(); 
let appliedTime=new Date(2022, 08, 07, 1, 14).getTime(); 

describe("getting winner and amount must be transferd to him.....", () => {
    beforeEach(async () => {
        [add1, add2,add3,add4,add5] = await hre.ethers.getSigners();
        contract = await hre.ethers.getContractFactory("lotteryMethods");
        instancelottery = await hre.ethers.getContractFactory("lotteryMethods");
        deployedlottery = await instancelottery.deploy();
        });
    it("getting winner....", async () => {
        
        // deployment by addr1 ...
        await deployedlottery.connect(add1).openLottery(openTime,closeTime,99999999999); 

        console.log("-----------------------------------------------------------------------");
        // applying from addr2 ...
        await deployedlottery.connect(add2);
        console.log("before applying, Account 2 Balance : ",await add2.getBalance());
        console.log("current contract's Balance : ", await deployedlottery.balanceofContract());

        await deployedlottery.connect(add2).applyLottery(appliedTime,{ value:99999999999 });

        console.log("After Applying, Account 2 Balance",await add2.getBalance());
        console.log("New contract's Balance : ", await deployedlottery.balanceofContract());  
   
        console.log("-----------------------------------------------------------------------");
        // applying from addr3....
        await deployedlottery.connect(add3);
        console.log("before applying, Account 3 Balance : ",await add3.getBalance());
        console.log("current contract's Balance : ", await deployedlottery.balanceofContract());

        await deployedlottery.connect(add3).applyLottery(appliedTime,{ value:99999999999 });

        console.log("After Applying, Account 3 Balance",await add2.getBalance());
        console.log("New contract's Balance : ", await deployedlottery.balanceofContract());  

        
        console.log("-----------------------------------------------------------------------");
        // applying from addr4 ...
        await deployedlottery.connect(add4);
        console.log("before applying, Account 4 Balance : ",await add4.getBalance());
        console.log("current contract's Balance : ", await deployedlottery.balanceofContract());

        await deployedlottery.connect(add4).applyLottery(appliedTime,{ value:99999999999 });

        console.log("After Applying, Account 4 Balance",await add2.getBalance());
        console.log("New contract's Balance : ", await deployedlottery.balanceofContract());  
   
        console.log("-----------------------------------------------------------------------");
        // applying from add5....
        await deployedlottery.connect(add5);
        console.log("before applying, Account 5 Balance : ",await add5.getBalance());
        console.log("current contract's Balance : ", await deployedlottery.balanceofContract());

        await deployedlottery.connect(add5).applyLottery(appliedTime,{ value:99999999999 });

        console.log("After Applying, Account 5 Balance",await add5.getBalance());
        console.log("Total contract's Balance : ", await deployedlottery.balanceofContract());  

        console.log("------------------------------------------------------------------------");
        await deployedlottery.connect(add1);
         await deployedlottery.getWinner();
     
        console.log("**************** After winner Announcement  *******************************");

        await deployedlottery.connect(add2);
        console.log("Account 2 Balance : ",await add5.getBalance());
        await deployedlottery.connect(add3);
        console.log(" Account 3 Balance : ",await add5.getBalance());
        await deployedlottery.connect(add4);
        console.log(" Account 4 Balance : ",await add5.getBalance());
        await deployedlottery.connect(add5);
        console.log("Account 5 Balance : ",await add5.getBalance());


        // await deployedlottery.connect(add1);
        // console.log("before applying, Account 1 Balance : ",await add1.getBalance());
        // console.log("current contract's Balance : ", await deployedlottery.balanceofContract());

        

   
        
            
  

    });
});
