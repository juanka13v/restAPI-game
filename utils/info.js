const getInfo = (totalItems, req) => {
  const info = {};

  info.counts = totalItems;
  info.page = req.query.page || 1;
  info.limit = req.query.limit || 10;
  info.pages =
    info.counts <= info.limit ? 1 : Math.floor(info.counts / info.limit) + 1;

  info.next = info.page == info.pages ? null : info.page + 1;
  info.prev = info.page == 1 ? null : info.page - 1;

  return info;
};

module.exports = getInfo;
