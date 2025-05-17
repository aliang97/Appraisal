const doFetch = async (url: URL, params?: RequestInit, asText?: boolean) => {
  try {
    console.log(`fetch ${url}`);
    const resp = await fetch(url, params);
    if (!resp.ok) {
      throw new Error(`Response status: ${resp.status}`);
    }
    if (asText) {
      return await resp.text();
    } else {
      return await resp.json();
    }
  } catch (error) {
    console.error((error as Error).message);
  }
};

export { doFetch };
