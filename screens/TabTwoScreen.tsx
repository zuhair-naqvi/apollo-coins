import * as React from "react";
import { StyleSheet } from "react-native";

import { View } from "../components/Themed";
import Featured from "./../components/Featured";

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Featured />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
