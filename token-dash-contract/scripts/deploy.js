// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const GameToken = await hre.ethers.getContractFactory("GameToken");
  const gameToken = await GameToken.deploy();

  await gameToken.deployed();

  console.log("GameToken deployed to:", gameToken.address);

  const RunnerCollection = await hre.ethers.getContractFactory(
    "RunnerCollection"
  );
  const runnerCollection = await RunnerCollection.deploy(
    "GameToken",
    "GT",
    "https://ipfs.io/ipfs/QmWQwGXHbeC8Atj4UeiYynyTQbzLM8mQWNADHiStK37GQF/"
  );

  await runnerCollection.deployed();

  console.log("RunnerCollections deployed to:", runnerCollection.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
