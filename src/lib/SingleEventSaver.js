const EventModel = require("../models/Events");

const SingleEventSaver = (ev) => {
  const eventString = JSON.stringify(ev);
  const parsedEvent = JSON.parse(eventString);
  const uniqueId = `${parsedEvent.blockNumber}:${parsedEvent.transactionIndex}:${parsedEvent.logIndex}`;

  const humanizedEvent = {
    ...parsedEvent,
  };

  return new Promise((resolve, reject) => {
    EventModel.findOne({ uniqueId }, (err, tf) => {
      if (err) return reject(err);
      if (tf) return resolve(tf);
      const ntf = new EventModel({ ...humanizedEvent, uniqueId });
      return resolve(ntf.save());
    });
  });
};

module.exports = SingleEventSaver;
