const ethers = require("ethers");
require("./dbs/mongoose.js");

const mineERC721 = require("./event-miners/erc721");

const socketUrl = "wss://bsc-ws-node.nariox.org:443";
const rpcUrl = "https://bsc-dataseed.binance.org/"
const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

const main = async () => {
  const lastBlock = (await provider.getBlock()).number;

  const contractAddress = "0x11304895f41c5a9b7fbfb0c4b011a92f1020ef96";
  const startinBlock = 9922017;

  const blockSkip = 5000;

  mineERC721(provider)(contractAddress, startinBlock, lastBlock, 5000, (e) =>
    console.log(e)
  );
};

main();
