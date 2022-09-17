# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
GAS_REPORT=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```
## testing by fetching events 
```bash 
expect(result.events[0].args._from).to.equal(msg.sender);
expect(result.events[0].args._to).to.equal(addr2.address);
expect(result.events[0].args._value).to.equal(10);
```
## test cases with console.log 
- 1_deployment_Test.js 
```bash
const { expect } = require("chai");
const hre = require("hardhat");

describe("Deployment testing", function () {
  it("deployment should work ", async function () {

    const [owner]= await hre.ethers.getSigners();
    console.log("owner address",owner.address);
    const instancelottery = await hre.ethers.getContractFactory("Lottery");
    const deployedlottery = await instancelottery.deploy();
    console.log("deployed address : ",deployedlottery.address);
    
    expect(typeof (deployedlottery.address)!=null);


  });
})


```
- 3_applyLotteryTest.js
```bash 
const { expect } = require("chai");
const hre = require("hardhat");


let openTime = new Date(2022, 08, 07, 1, 03).getTime();
let closeTime = new Date(2022, 10, 07, 5, 30).getTime(); 
let appliedTime=new Date(2022, 09, 07, 1, 14).getTime(); 

describe("applying lottery.....", () => {
    beforeEach(async () => {
        [addr1,addr2,addr3,addr4,addr5] = await hre.ethers.getSigners();
        contract = await hre.ethers.getContractFactory("Lottery");
        instancelottery = await hre.ethers.getContractFactory("Lottery");
        deployedlottery = await instancelottery.deploy();
        await deployedlottery.connect(addr1).openLottery(openTime,closeTime,999999999999);
        });
    it("should apply for a lottery", async () => {
        console.log("Account's old Balance :", await addr1.getBalance());
        console.log(
            "contract's old Balance : ",
            await deployedlottery.connect(addr1).balanceOfContract()
        );
            await deployedlottery.connect(addr2).applyLottery(appliedTime,{ value:999999999999})
       
        console.log(
            "contract's new Balance : ",
            await deployedlottery.connect(addr1).balanceOfContract()
        );
        console.log("Account's New Balance", await addr1.getBalance());
    });
});
```

## 4_account_duplication_test
```bash
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

```


## 5_modifiers_test 
```bash 
const { expect } = require("chai");
const hre = require("hardhat");

let openTime = new Date(2022, 08, 08, 9, 30).getTime();
let closeTime = new Date(2022, 09, 10, 6, 30).getTime(); 
let appliedTime=new Date(2022, 09, 02, 2, 32).getTime(); 

describe("Modifiers testing which must reverted with some text.....", () => {
    beforeEach(async () => {
        [addr1, addr2,addr3,addr4,addr5] = await hre.ethers.getSigners();
        contract = await hre.ethers.getContractFactory("Lottery");
        instancelottery = await hre.ethers.getContractFactory("Lottery");
        deployedlottery = await instancelottery.deploy();
        await deployedlottery.connect(addr1).openLottery(openTime,closeTime,99999999999); 
        });

        it("participating lottery by Manager.... ", async () => {    
            await expect (deployedlottery.applyLottery(appliedTime,{ value:99999999999})).to.be.revertedWith("manager cannot participate in lottery system....");
        });
        
         it("participating lottery more than once.... ", async () => {    
        await deployedlottery.connect(addr2).applyLottery(appliedTime,{ value:99999999999});
        await expect (deployedlottery.connect(addr2).applyLottery(appliedTime,{ value:99999999999})).to.be.revertedWith("This account already participated in lottery...");
    });

    it("calling withdraw function other than Owner.... ", async () => {    
        await expect(deployedlottery.connect(addr2).withDraw("0xbDA5747bFD65F08deb54cb465eB87D40e51B197E",999000)).to.be.revertedWith("only Manager can call this function...");


    });
    
});

 
```

## price_transfer_test 
```bash 
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

        console.log("-----------------------------------------------------------------------");
        // applying from addrr2 ...
        console.log("before applying, Account 2 Balance : ",await addr2.getBalance());
        console.log("current contract's Balance : ", await deployedlottery.balanceOfContract());

        await deployedlottery.connect(addr2).applyLottery(appliedTime,{ value:99999999999 });

        console.log("After Applying, Account 2 Balance",await addr2.getBalance());
        console.log("New contract's Balance : ", await deployedlottery.balanceOfContract());  
   
         

        console.log("------------------------------------------------------------------------");
          await deployedlottery.connect(addr1).closeLottery(currentTime);
                         
        console.log("**************** After winner Announcement  *******************************");

        await deployedlottery.connect(addr2);
        console.log("Account 2 Balance : ",await addr2.getBalance());
        console.log("New contract's Balance : ", await deployedlottery.balanceOfContract());  
        console.log(" Account 1 Balance : ",await addr1.getBalance())


    

    });
});




```
## withdraw_test
```bash
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

        // deployment by addrr1 ...
        await deployedlottery.connect(addr1).openLottery(openTime,closeTime,99999999999); 

        console.log("---------**   applying lottery by addr2 and addr3 **  ---------");
        await deployedlottery.connect(addr2).applyLottery(appliedTime,{ value:99999999999 });
        await deployedlottery.connect(addr3).applyLottery(appliedTime,{ value:99999999999 });

        console.log("total Balance of currentPool : ", await deployedlottery.currentPool()); 
   
        console.log("**************** After closing lottery   **********************");
         await deployedlottery.connect(addr1).closeLottery(currentTime);
        console.log("total Balance of currentPool : ", await deployedlottery.currentPool()); 
        console.log("Manager Balance : ",await addr1.getBalance());
        console.log("Account 2 Balance : ",await addr2.getBalance());
        console.log("Account 3 Balance : ",await addr3.getBalance());
        console.log(addr1.address);
      
        
        console.log("-----------------------****withdrawing balance by owner --------")
        await deployedlottery.withDraw("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",40000000001);
        console.log("New Manager/addr1 Balance : ",await addr1.getBalance());
    });



    it("Manager cannnot withdraw more than his withdrawable amount..", async () => {

        // deployment by addrr1 ...
        await deployedlottery.connect(addr1).openLottery(openTime,closeTime,99999999999); 

        console.log("---------**   applying lottery by addr2 and addr3 **  ----");
        await deployedlottery.connect(addr2).applyLottery(appliedTime,{ value:99999999999 });
        await deployedlottery.connect(addr3).applyLottery(appliedTime,{ value:99999999999 });
         await deployedlottery.connect(addr1).closeLottery(currentTime);
       
        console.log("--------------****withdrawing balance by owner **-------------");
        await expect (deployedlottery.withDraw(addr1.address,40000000002)).to.be.revertedWith("You Cannot withdraw that much amount");
        console.log("New Manager/addr1 Balance : ",await addr1.getBalance());
    });
});

```
