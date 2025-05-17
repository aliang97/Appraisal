import fs from 'node:fs';

const fileExists = (fileName: string) => {
  return fs.existsSync(fileName);
};

const readFile = (fileName: string) => {
  try {
    const data = fs.readFileSync(fileName, 'utf8');
    return data;
  } catch (e) {
    console.error(e);
  }
};

export { readFile, fileExists };
