import { ScrapePage } from './ScrapePage.ts';

function generateURL(id: string) {
  return `https://www.tcgplayer.com/product/${id}/?Language=English`;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function rateLimitedProcess(ids: string[]) {
  const out: Record<string, object> = {};
  for (const id of ids) {
    const priceData = await ScrapePage(generateURL(id));
    out[id] = priceData;
    await sleep(1000);
  }
  return out;
}

async function getPriceData(ids: string[], parallels?: number) {
  const _parallels = parallels || 1;
  const splitIds: Record<number, string[]> = {};
  ids.forEach((id, idx) => {
    const bucket = idx % _parallels;
    if (splitIds[bucket]) {
      splitIds[bucket].push(id);
    } else {
      splitIds[bucket] = [id];
    }
  });

  console.log(splitIds);

  return await Promise.all(
    Object.values(splitIds).map(async (idSet) => await rateLimitedProcess(idSet)),
  );
}

export { getPriceData };
