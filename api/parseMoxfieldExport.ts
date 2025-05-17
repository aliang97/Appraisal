import type { Identifier } from './types';

// Moxfield export format `1x Sol Ring (TDC) 106` to
//  {set: TDC, num: 106} for querying Scryfall API
const parseMoxfieldExport = (rawText: string) => {
  const cardIdList: Identifier[] = [];
  const cardRecords = rawText
    .split('\n')
    .filter((el) => el !== '')
    .map((el) => el.trim()); // removes leading & trailing whitespace

  cardRecords.forEach((record) => {
    const split1 = record.split('(');
    const goodData = split1[split1.length - 1];
    const split2 = goodData.split(') ');
    if (split2 && split2.length == 2) {
      const set = split2[0].toLowerCase();
      const num = split2[1].replace('\r', '');
      cardIdList.push({
        set,
        collector_number: num,
      });
    }
  });

  return cardIdList;
};

export { parseMoxfieldExport };
