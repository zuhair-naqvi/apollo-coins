import { InMemoryCache } from "@apollo/client";

const cache = new InMemoryCache({
  typePolicies: {
    Crypto: {
      fields: {
        price: {
          read(_, { readField }) {
            const id = readField("polygonId");
            const prices: any = latestPrices();
            return prices[`${id}`] || "-";
          },
        },
      },
    },
  },
});

export const latestPrices = cache.makeVar({
  "XT.BTC-USD": "11000",
});

export default cache;
