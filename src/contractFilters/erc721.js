const ethers = require("ethers");
const ERC721 = require("../contracts/ERC721.json");

const erc721FilterCreator = (provider) => (contractAddress) => {
  const NFTContract = new ethers.Contract(
    contractAddress,
    ERC721.abi,
    provider
  );

  const transferEvents = NFTContract.filters.Transfer(null, null, null);

  const fils = {
    address: contractAddress,
    topics: [...transferEvents.topics],
  };

  return fils;
};

module.exports = erc721FilterCreator;
