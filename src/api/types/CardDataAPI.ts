import type { Card } from './Card';

interface CardDataAPI {
  name: string;
  maxRequestsPerSecond: number;
  lastRequestTimestamp?: Date;
  getCardByCollectorNumber: (
    api: CardDataAPI,
    set: string,
    collectorNumber: number,
  ) => Promise<undefined | Card>;
}

export type { CardDataAPI };
