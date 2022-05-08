let provider = new ethers.providers.Web3Provider(window.ethereum);
let signer;

async function connectMetamask() {
  await provider.send("eth_requestAccounts", []);
  signer = await provider.getSigner();
  console.log("Account address:", await signer.getAddress());

  const balance = await signer.getBalance();
  const convertToEth = 1e18;
  console.log("account's balance in ether:", balance.toString() / convertToEth);
}

async function claimTokens() {
  const GameTokenAddress = "0xba964E9b18F293d4a106dC4CAA66A55580981811";
  const GameTokenABI = [
    "function mintToken(address _account, uint _amount) public",
  ];
  const gameToken = new ethers.Contract(
    GameTokenAddress,
    GameTokenABI,
    provider
  );
  let convertToWei = 1000000000;
  let amountToClaim = window.totalGweiScore * convertToWei;
  await gameToken
    .connect(signer)
    .mintToken(signer.getAddress(), amountToClaim.toString());
}

async function claimNft() {
  const runnerCollectionAddress = "0xE3deA50da4d294Ed8A98562D923794B22EedCA16";
  const runnerCollectionABI = ["function mint(uint _amount) public"];
  const runnerCollection = new ethers.Contract(
    runnerCollectionAddress,
    runnerCollectionABI,
    provider
  );
  await runnerCollection.connect(signer).mint(window.totalNFTScore.toString());
}
