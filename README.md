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


