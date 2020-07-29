import * as React from "react";

import { useQuery, gql } from "@apollo/client";
import { ActivityIndicator, StyleSheet, FlatList } from "react-native";
import { View, Text } from "./Themed";

import { ListItem } from "react-native-elements";

const CRYPTOS = gql`
  query getCryptos {
    cryptos {
      name
      ticker
      polygonId
      logo {
        id
        url
      }
      price @client
    }
  }
`;

export default function List() {
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
      logo,
    }: {
      name: string;
      ticker: string;
      price: string;
      logo: any;
    }) => ({ name, ticker, price, avatar_url: logo.url })
  );

  const keyExtractor = (item, index) => index.toString();

  const renderItem = ({ item }) => {
    return (
      <ListItem
        title={item.name}
        subtitle={item.ticker}
        leftAvatar={{ source: { uri: item.avatar_url } }}
        rightElement={<Text>${item.price}</Text>}
        bottomDivider
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={keyExtractor}
        data={list}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
