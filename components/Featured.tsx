import * as React from "react";

import { useQuery, gql } from "@apollo/client";
import { ActivityIndicator, StyleSheet, Image } from "react-native";
import { View, Text } from "./Themed";

import { Card, ListItem, Button, Icon } from "react-native-elements";
import { latestPrices } from "../cache";

const CRYPTOS = gql`
  query getCryptos {
    cryptos(where: { featured: true }) {
      name
      ticker
      featureImage {
        url
      }
      price @client
    }
  }
`;

export default function Featured() {
  const { loading, error, data } = useQuery(CRYPTOS);
  if (error) {
    return <Text>Error Fetching Data</Text>;
  }
  if (loading) {
    return <ActivityIndicator />;
  }
  const list = data?.cryptos?.map(
    ({
      name,
      ticker,
      price,
      featureImage,
    }: {
      name: string;
      ticker: string;
      price: string;
      featureImage: any;
    }) => ({ name, ticker, price, img: featureImage.url })
  );

  return (
    <View style={{ flex: 1 }}>
      {list.map((item: any) => (
        <Card
          containerStyle={{ width: "90%", marginLeft: "5%" }}
          key={item.ticker}
          title={item.name}
          image={{ uri: item.img }}
        >
          <Text>${item.price}</Text>
        </Card>
      ))}
    </View>
  );
}
