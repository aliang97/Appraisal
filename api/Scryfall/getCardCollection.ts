import type { Identifier } from '../types';
import { doFetch } from '../fetch.ts';

// Scryfall only accepts max 75 ids per request -
//  so we should split the list into groups of up to 75 elements
const chunk75Ids = (ids: Identifier[]) => {
  const ids75: Identifier[][] = [];

  ids.forEach((id, idx) => {
    const chunkId = Math.floor(idx / 75);
    if (!ids75[chunkId]) {
      ids75[chunkId] = [];
    } else {
      ids75[chunkId].push(id);
    }
  });
  return ids75;
};

const fetchCollection = async (ids: Identifier[]) => {
  const url = new URL('https://api.scryfall.com/cards/collection');

  const params = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ identifiers: ids }),
  };
  const data = await doFetch(url, params);
  return data.data.map((record) => ({
    name: record.name,
    set: record.set,
    collector_number: record.collector_number,
    tcgplayer_id: record.tcgplayer_id,
  }));
};

const getCardCollection = async (ids: Identifier[]) => {
  if (ids.length > 500) {
    console.warn(
      "You are probably going to get rate limited by scryfall since I didn't bother to add a rate limit on requests",
    );
  }

  const ids75 = chunk75Ids(ids);
  const collections = await Promise.all(ids75.map((ids) => fetchCollection(ids)));

  return collections.flat();
};

export { getCardCollection };
