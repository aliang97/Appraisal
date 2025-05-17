import fs from 'node:fs';

const writeJSONCache = (set: string, json: object) => {
  const fileName = `./api/cache/${set}.json`;
  const content = JSON.stringify(json);
  writeFile(fileName, content);
};

const writeFile = (fileName: string, content: string) => {
  fs.writeFileSync(fileName, content);
};

export { writeFile, writeJSONCache };
