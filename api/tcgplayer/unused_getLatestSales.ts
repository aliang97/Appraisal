// I think their internal API is auth locked >:(

import { doFetch } from '../fetch.ts';

const postParams = {
  limit: 25,
  listingType: 'All',
  offset: 0,
  languages: [1],
  variants: [1],
  conditions: [1, 2],
};

const fetchLatestSales = async (id: string) => {
  const url = new URL(`https://mpapi.tcgplayer.com/v2/product/${id}/latestsales`);
  const params = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postParams),
  };
  const params2 = {
    method: 'POST',
    contentType: 'application/json',
    payload: postParams,
  };

  const data = await doFetch(url, params2);
  console.log(data);
};

const getLatestSales = async (id: string) => {
  return await fetchLatestSales(id);
};

export { getLatestSales };
