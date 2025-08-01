require("@nomicfoundation/hardhat-toolbox");
require("@chainlink/env-enc").config();
require("./tasks")

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`, // Infura测试部署地址
      accounts: [process.env.PK,process.env.PK2], // 私钥
      chainId: 11155111
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  }

};
