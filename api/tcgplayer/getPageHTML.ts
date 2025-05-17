import { doFetch } from '../fetch.ts';
import { JSDOM } from 'jsdom';

const getPageHTML = async (id: string) => {
  const url = new URL(`https://tcgplayer.com/product/${id}`);
  const params = {
    method: 'GET',
  };
  const rawHTML = await doFetch(url, params, true);

  console.log(rawHTML);
  const { document } = new JSDOM(rawHTML).window;
  const el = document.querySelector('h1');
  console.log(el);
};

export { getPageHTML };
