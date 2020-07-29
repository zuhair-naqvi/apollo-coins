import { InMemoryCache } from "@apollo/client";

const cache = new InMemoryCache({
  typePolicies: {
    Crypto: {
      fields: {
        price: {
          read(_, { readField }) {
            const ticker = readField("ticker");
            const prices: any = latestPrices();
            return prices[`${ticker}`] || "-";
          },
        },
      },
    },
  },
});

export const latestPrices = cache.makeVar({
  "BTC-USD": "-",
  "ETH-USD": "-",
});

const socket = new WebSocket("wss://socket.polygon.io/crypto");
socket.onopen = () => {
  socket.send(
    JSON.stringify({
      action: "auth",
      params: "fQADH6_SpkB0gNHcF_MunG9jXwI1jjKCj8umn_",
    })
  );
  socket.send(
    JSON.stringify({
      action: "subscribe",
      params: "XT.BTC-USD,XT.ETH-USD,XT.BCH-USD",
    })
  );
};
socket.onmessage = ({ data }) => {
  const message = JSON.parse(data);
  const { pair, p }: { pair: string; p: string } = message[0];
  if (pair) {
    const prices = latestPrices();
    console.log(prices);
    latestPrices({
      ...prices,
      [pair]: Math.round(Number(p)),
    });
  }
};

export default cache;
