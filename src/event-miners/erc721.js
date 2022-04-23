const ethers = require("ethers");
const ERC721 = require("../contracts/ERC721.json");

const erc721FilterMaker = require("../contractFilters/erc721");

const MineERC721Events =
  (provider) =>
  async (contractAddress, startingBlock, endingBlock, contractSkip, cb) => {
    const NFTContract = new ethers.Contract(
      contractAddress,
      ERC721.abi,
      provider
    );

    const queryBatch = async (from, to, skip, attempt = 1) => {
      const sleep = (timeout) =>
        new Promise((resolve, reject) => {
          setTimeout(() => resolve(), timeout);
        });

      if (skip === 0) {
        console.log("already fetched all blocks");
        return;
      }

      try {
        console.log(`fetching from block ${from} to ${from + skip - 1} ...`);
        const fileteredEvents = await NFTContract.queryFilter(
          erc721FilterMaker(provider)(contractAddress),
          from,
          from + skip - 1
        );

        cb(fileteredEvents, { lastFetchedBlock: from + skip - 1 });

        const nextFrom = from + skip;
        const nextTo = from + 2 * skip;
        const lastBlock =
          (await provider.getBlockNumber()) > to
            ? to
            : await provider.getBlockNumber();
        if (nextFrom > lastBlock) {
          queryBatch(lastBlock, to, 0);
        } else if (nextTo > lastBlock) {
          queryBatch(nextFrom, to, lastBlock - nextFrom);
        } else {
          queryBatch(nextFrom, to, skip);
        }
      } catch (err) {
        const waitTime = 1000 * attempt;
        console.log(`some error happened, will retry in ${waitTime} sec`, err);
        await sleep(waitTime);
        return queryBatch(from, to, skip, attempt + 1);
      }
    };

    queryBatch(startingBlock, endingBlock, contractSkip);
  };

module.exports = MineERC721Events;
