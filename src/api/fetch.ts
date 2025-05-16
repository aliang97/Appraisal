import type { CardDataAPI } from './types';

const canRequest = (api: CardDataAPI) => {
  const nowDate = new Date();

  // No lastRequestTimestamp = this is the first request
  if (!api.lastRequestTimestamp) {
    return true;
  }

  // Check if the elapsed time since lastRequestTimestamp matches maxRequestsPerSecond
  const timeDiffMS = nowDate.getTime() - api.lastRequestTimestamp.getTime();
  const requiredIntervalMS = 1000 / api.maxRequestsPerSecond;
  return timeDiffMS >= requiredIntervalMS;
};

const doFetch = async (url: URL, params?: RequestInit) => {
  try {
    const resp = await fetch(url, params);
    if (!resp.ok) {
      throw new Error(`Response status: ${resp.status}`);
    }
    const json = await resp.json();
    return json;
  } catch (error) {
    console.error((error as Error).message);
  }
};

// Fetch while respecting rate limits
const respectfullyFetch = async (api: CardDataAPI, url: URL) => {
  if (canRequest(api)) {
    api.lastRequestTimestamp = new Date();
    return await doFetch(url);
  } else {
    // TODO: implement queueing or something?
    console.error(`too many requests - try again later`);
  }
};

export { canRequest, doFetch, respectfullyFetch };
