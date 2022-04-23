const { ethers } = require("ethers");
const ERC721 = require("../contracts/ERC721.json");
const Collections = require("../models/Collections");

const addCollection =
  (provider, chain) =>
  async ({ contractAddress, startingBlock, variant }) => {
    const existedColl = await Collections.queries.getByAddress(
      contractAddress,
      chain
    );

    if (existedColl) return existedColl;

    const NFTContract = new ethers.Contract(
      contractAddress,
      ERC721.abi,
      provider
    );

    const collectionName = await NFTContract.name();
    const symbol = await NFTContract.symbol();
    const totalSupply = parseInt(String(await NFTContract.totalSupply()));

    return Collections.commands.create({
      collectionName,
      symbol,
      variant,
      startingBlock,
      totalSupply,
      lastFetchedBlock: startingBlock,
      contractAddress,
      chain,
    });
  };

module.exports = addCollection;
