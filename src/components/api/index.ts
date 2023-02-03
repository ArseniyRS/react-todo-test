interface IRes {
  totalResults: number;
  results: any[];
  nextPage: string;
  status: string;
}

export const fetchCryptoNews = () =>
  fetch(
    `https://newsdata.io/api/1/news?apikey=${import.meta.env.VITE_API_KEY}&language=en&q=crypto`,
  ).then(async (res) => {
    const result: IRes = await res.json();
    return result.results.reduce((prev, cur) => ` ${prev}${cur.title} | `, "");
  });
