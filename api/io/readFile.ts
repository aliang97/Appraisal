import fs from 'node:fs';

const readFile = (fileName: string) => {
  try {
    const data = fs.readFileSync(fileName, 'utf8');
    return data;
  } catch (e) {
    console.error(e);
  }
};

export { readFile };
