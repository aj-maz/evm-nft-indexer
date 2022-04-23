const EventModel = require("../models/Events");

const EventSerializer = (address, startingBlock = 0) => {
  return new Promise((resolve, reject) => {
    EventModel.find(
      {
        address: address.toLowerCase(),
        blockNumber: { $gt: startingBlock },
      },
      {
        strict: false,
      }
    )
      .sort({ blockNumber: 1, logIndex: 1 })
      .select({
        blockNumber: 1,
        _id: 1,
        logIndex: 1,
        transactionIndex: 1,
        humanizedArgs: 1,
      })
      .exec((err, tes) => {
        if (err) return reject(err);
        return resolve(tes);
      });
  });
};

module.exports = EventSerializer;
