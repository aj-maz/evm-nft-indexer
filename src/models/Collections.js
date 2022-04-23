const mongoose = require("mongoose");

const CollectionSchema = new mongoose.Schema(
  {
    collectionName: {
      type: String,
      required: true,
    },
    symbol: {
      type: String,
      required: true,
    },
    variant: {
      type: String,
      required: true,
      enum: ["erc721", "erc1155"],
    },
    startingBlock: {
      type: Number,
      required: true,
    },
    totalSupply: {
      type: Number,
      required: true,
    },
    lastFetchedBlock: {
      type: Number,
      required: true,
    },
    contractAddress: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: false,
    },
    cover: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    chain: {
      type: String,
      enum: ["bsc", "ethereum"],
      default: "bsc",
    },
    published: {
      type: Boolean,
      default: false,
    },
    markets: {
      type: [String],
      default: ["pancake"],
    },
  },
  {
    timestamps: true,
  }
);

CollectionSchema.index({ contractAddress: 1, chain: 1 }, { unique: true });

const Collection = mongoose.model("collection", CollectionSchema);

const create = ({
  collectionName,
  symbol,
  variant,
  startingBlock,
  totalSupply,
  lastFetchedBlock,
  contractAddress,
  chain,
}) => {
  console.log(totalSupply, startingBlock);

  const coll = new Collection({
    collectionName,
    symbol,
    variant,
    totalSupply,
    startingBlock,
    lastFetchedBlock,
    contractAddress,
    chain,
  });
  return coll.save();
};

const getByAddress = (contractAddress, chain) => {
  return new Promise((resolve, reject) => {
    Collection.findOne({ contractAddress, chain }, (err, coll) => {
      if (err) return reject(err);
      return resolve(coll);
    });
  });
};

const updateLastFetchedBlock = (_id, lastFetchedBlock) => {
  return new Promise((resolve, reject) => {
    Collection.updateOne(
      { _id },
      { $set: { lastFetchedBlock } },
      (err, done) => {
        if (err) return reject(err);
        return resolve("done");
      }
    );
  });
};

module.exports = {
  commands: {
    create,
    updateLastFetchedBlock
  },
  queries: {
    getByAddress,
  },
};
