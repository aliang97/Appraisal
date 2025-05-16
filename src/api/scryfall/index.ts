import type { CardDataAPI } from '../types';
import { getCardByCollectorNumber } from './getCardByCollectorNumber';

const Scryfall: CardDataAPI = {
  name: 'Scryfall',
  maxRequestsPerSecond: 10,
  getCardByCollectorNumber,
};

export { Scryfall };
