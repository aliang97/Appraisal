import type { CardDataAPI } from '@/api/types';
import { respectfullyFetch } from '../fetch';

const getRequestURL = (set: string, cn: number) => {
  return `https://api.scryfall.com/cards/${set.toLowerCase()}/${cn}`;
};

const getCardByCollectorNumber = async (api: CardDataAPI, set: string, cn: number) => {
  console.log(`getCardByCollectorNumber ${set} ${cn}`);

  return await respectfullyFetch(api, getRequestURL(set, cn));
};

export { getCardByCollectorNumber };
