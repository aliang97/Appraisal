import type { Identifier, Card } from './types';
import { fileExists, readFile } from './io/readFile.ts';
import { getCardCollection } from './Scryfall/getCardCollection.ts';
import { writeJSONCache } from './io/writeFile.ts';

function splitIdsBySet(ids: Identifier[]) {
  const idsBySet: Record<string, Identifier[]> = {};
  ids.forEach((id) => {
    if (idsBySet[id.set]) {
      idsBySet[id.set].push(id);
    } else {
      idsBySet[id.set] = [id];
    }
  });
  return idsBySet;
}

const getCardsFromSet = async (set: string, ids: Identifier[]) => {
  const filePath = `./api/cache/${set}.json`;

  // The file doesn't exist, so we have no cached cards in this set
  if (!fileExists(filePath)) {
    console.log(`making new cache file for set ${set}`);
    // hit scryfall api with all ids & make new json file
    const cardList = await getCardCollection(ids);
    writeJSONCache(set, { cards: cardList });
    return cardList;
  }

  // Read the existing cache file
  const outCardList: Card[] = [];

  const raw = readFile(filePath);
  const json = JSON.parse(raw || '');
  const scryfallBatchIds: Identifier[] = [];
  for (const id of ids) {
    // Look for each id in the cached data
    const theCard = json.cards.find(
      (card) => card.set === id.set && card.collector_number === id.collector_number,
    );
    if (!theCard) {
      scryfallBatchIds.push(id);
    } else {
      console.log(`using cached data for ${id.set} - ${id.collector_number}`);
      // TODO: Check if price data is stale
      outCardList.push(theCard);
    }
  }
  let newCardList: Card[] = [];
  if (scryfallBatchIds.length > 0) {
    newCardList = await getCardCollection(scryfallBatchIds);
  }
  json.cards.push(...newCardList);
  writeJSONCache(set, { cards: json.cards });
  outCardList.push(...newCardList);

  return outCardList;
};

const getCardData = async (ids: Identifier[]) => {
  const allCards: Card[] = [];
  // 1. Group ids by set to optimize cache checking
  const idsBySet = splitIdsBySet(ids);

  // 1. Check cache to see if we have data on each card
  for (const [set, ids] of Object.entries(idsBySet)) {
    allCards.push(...(await getCardsFromSet(set, ids)));
  }

  return allCards;
};

export { getCardData };
