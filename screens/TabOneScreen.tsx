import * as React from "react";
import { StyleSheet } from "react-native";
import { View } from "../components/Themed";
import Cryptos from "../components/Cryptos";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Cryptos />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
