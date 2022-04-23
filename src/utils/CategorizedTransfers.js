const CategorizedTransfers = (evs) => {
  const mints = [];
  const transfers = [];
  const burns = [];
  evs.forEach((ev) => {
    if (ev.args[0] === "0x0000000000000000000000000000000000000000") {
      mints.push(ev);
    } else if (ev.args[1] === "0x0000000000000000000000000000000000000000") {
      burns.push(ev);
    } else {
      transfers.push(ev);
    }
  });

  return { mints, transfers, burns };
};

module.exports = CategorizedTransfers;
