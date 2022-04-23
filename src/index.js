const ethers = require("ethers");
require("./dbs/mongoose.js");

const mineERC721 = require("./event-miners/erc721");

const socketUrl = "wss://bsc-ws-node.nariox.org:443";
const rpcUrl = "https://bsc-dataseed.binance.org/";
const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
const SingleEventSaver = require("./lib/SingleEventSaver");

const addCollection = require("./controllers/addCollection");

const Collections = require("./models/Collections");

// last fetched block = 11997017

const main = async () => {
  const lastBlock = (await provider.getBlock()).number;

  const contractAddress = "0x11304895f41c5a9b7fbfb0c4b011a92f1020ef96";
  const startingBlock = 9922017;

  const blockSkip = 5000;

  const collection = await addCollection(
    provider,
    "bsc"
  )({
    contractAddress,
    startingBlock,
    variant: "erc721",
  });

  mineERC721(provider)(
    contractAddress,
    collection.lastFetchedBlock,
    lastBlock,
    blockSkip,
    (evs, { lastFetchedBlock }) => {
      evs.forEach((event) =>
        SingleEventSaver(event)
          .then((r) => console.log("event saved"))
          .catch((err) => console.log(err))
      );
      Collections.commands.updateLastFetchedBlock(
        collection._id,
        lastFetchedBlock
      );
    }
  );
};

main();
