import * as React from "react";

import { useQuery, gql } from "@apollo/client";
import { ActivityIndicator, ScrollView, RefreshControl } from "react-native";
import { View, Text } from "./Themed";

import { Card } from "react-native-elements";

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
  const { loading, error, data, refetch } = useQuery(CRYPTOS, {
    pollInterval: 500,
  });
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
    <ScrollView
      contentContainerStyle={{ flex: 1 }}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={refetch} />
      }
    >
      <View>
        {list.map((item: any) => (
          <Card
            containerStyle={{
              width: "90%",
              marginLeft: "5%",
            }}
            key={item.ticker}
            title={item.name}
            image={{ uri: item.img }}
          >
            <Text style={{ fontSize: 25, textAlign: "center", width: "100%" }}>
              ${item.price}
            </Text>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
}
