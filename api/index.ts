import { getCardData } from './getCardData.ts';
import { readFile } from './io/readFile.ts';
import { parseMoxfieldExport } from './parseMoxfieldExport.ts';
import { getPriceData } from './tcgplayer/getPriceData.ts';

async function main() {
  const fileData = readFile('./api/data/GraveDanger.txt');
  if (!fileData) {
    console.error('Error reading input text file');
    return;
  }

  const cardIdList = parseMoxfieldExport(fileData);
  const data = await getCardData(cardIdList);

  // const d = await getPriceData(['624048', '624347', '624439']);
  // console.log(d);
}

main();
