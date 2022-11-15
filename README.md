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
## some commands to compile,deploy and test 
```bash 
* npx hardhat compile
* npx hardhat run scripts/deploy.js --network localhost 
* npx hardhat test 
* npx hardhat node 
* npx hardhat console 
* npx hardhat node 
* npx hardhat console --network localhost
```
## testing by fetching events 
```bash 
expect(result.events[0].args._from).to.equal(msg.sender);
expect(result.events[0].args._to).to.equal(addr2.address);
expect(result.events[0].args._value).to.equal(10);
```
