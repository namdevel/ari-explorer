export const viewAddress = (router, address) => {
  router.push("/explorer/address-detail?user=" + address);
};
export const viewBlock = (router, block) => {
  router.push("/explorer/block-detail?block=" + block);
};
export const viewTransaction = (router, txhash) => {
  router.push("/explorer/transaction-detail?txhash=" + txhash);
};
export const viewToken = (router, token) => {
  router.push("/explorer/token-detail?token=" + token);
};
export const viewDapp = (router, dapp) => {
  router.push("/explorer/dapp-detail?dapp=" + dapp);
};
export const shortenWalletAddress = (address) => {
  if (!address.includes("ARW")) {
    return address;
  }
  return address.slice(0, 6) + address.slice(-6) + "...";
};
export const shortenHash = (hash) => {
  return hash.slice(0, 9) + hash.slice(-9) + "...";
};

export const shortenTx = (hash) => {
  return hash.slice(0, 6) + hash.slice(-6) + "...";
};
