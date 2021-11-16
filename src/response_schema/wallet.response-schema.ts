import { merge } from 'object-mapper';

const wallet = {
  wallet_address: 'wallet_address',
  balance: 'balance',
};

export const walletObjMerge = src => {
  return merge(src, wallet);
};
