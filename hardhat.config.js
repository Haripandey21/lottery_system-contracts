require("hardhat-gas-reporter");
require("@nomiclabs/hardhat-etherscan");
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" });

const QUICKNODE_HTTP_URL = process.env.QUICKNODE_HTTP_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  solidity: "0.8.9",
  networks: {
    goerli: {
      url: QUICKNODE_HTTP_URL,
      accounts: [PRIVATE_KEY],
    },
  },
  gasReporter: {
    enabled : true,
    currency: 'USD',
    outputFile :'gasreporter.txt',
    //nocolors : true,
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: "6143C7EZTMVHWZTCZ6NTVQTT6EAK3WWENP"
  }
};


