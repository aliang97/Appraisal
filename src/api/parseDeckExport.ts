import { doFetch } from './fetch';

type Identifier = { set: string; collector_number: string };
type MiniCardData = { set: string; collector_number: string; tcgplayer_id: number };

// Moxfield export format `1x Sol Ring (TDC) 106` to
//  {set: TDC, num: 106} for querying Scryfall API
const parseDeckExport = async () => {
  // Change this URL to do a different decklist
  const deck = (await import(`@/api/data/GraveDanger.txt?raw`)).default;

  const cardListRaw = deck.split('\n');
  const cardList: Identifier[] = [];

  cardListRaw.forEach((record) => {
    const split1 = record.split('(');
    const goodData = split1[split1.length - 1];
    const split2 = goodData.split(') ');
    if (split2 && split2.length == 2) {
      const set = split2[0].toLowerCase();
      const num = split2[1].replace('\r', '');
      cardList.push({
        set,
        collector_number: num,
      });
    }
  });
  return cardList;
};

const queryScryfallForTCGPlayerIds = async (identifiers: Identifier[]) => {
  const url = new URL('https://api.scryfall.com/cards/collection');
  const params = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ identifiers }),
  };

  const data = await doFetch(url, params);
  const miniData: MiniCardData[] = [];

  data.data.forEach((record: MiniCardData) => {
    miniData.push({
      set: record.set,
      collector_number: record.collector_number,
      tcgplayer_id: record.tcgplayer_id,
    });
  });

  return miniData;
};

const doit = async () => {
  const cardList = await parseDeckExport();
  // TODO: Handle paginated I guess
  const shortCardList = cardList.slice(0, 75);
  const data = await queryScryfallForTCGPlayerIds(shortCardList);
  console.log(data);
  return data;
};

export { doit, parseDeckExport, queryScryfallForTCGPlayerIds };
