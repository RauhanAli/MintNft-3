const hre = require("hardhat");
//const PRICE = "500000000000000000" // 
async function main() {
  try {
    const MyToken = await hre.ethers.getContractFactory("MyToken");
    const token = await MyToken.deploy();
    await token.deployed();
    console.log("MyToken deployed to:", token.address);
    const NFT = await hre.ethers.getContractFactory("NFT");
    const nft = await NFT.deploy(token.address);
    await nft.deployed();
    console.log("nft deployed to:", nft.address)
  } catch (error) {
    console.log(error);
  }  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });