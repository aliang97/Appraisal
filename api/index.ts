import { readFile } from './io/readFile.ts';
import { doit } from './tcgplayer/puppeteer.ts';
// import { parseMoxfieldExport } from './parseMoxfieldExport.ts';
// import { getCardCollection } from './Scryfall/getCardCollection.ts';

async function main() {
  const fileData = readFile('./api/data/GraveDanger.txt');
  if (!fileData) {
    console.error('Error reading input text file');
    return;
  }
  // const cardIdList = parseMoxfieldExport(fileData);

  // await getCardCollection(cardIdList);
  // TODO: implement caching
  doit();
}

main();
