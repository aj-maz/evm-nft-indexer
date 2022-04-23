const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost:27017/bsc-indexer",
  (err, connect) => {
    if (err) return console.log(err);
    return "Connected to the bsc-indexer";
  }
);
