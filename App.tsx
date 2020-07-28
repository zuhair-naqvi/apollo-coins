import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Cryptos from "./components/Cryptos";

const client = new ApolloClient({
  uri:
    "https://api-eu-central-1.graphcms.com/v2/ckd5o75mz21fz01xu8s9c7nb1/master",
  cache: new InMemoryCache({
    typePolicies: {
      Crypto: {
        fields: {
          price: {
            read(_, { readField }) {
              return readField("polygonId");
            },
          },
        },
      },
    },
  }),
});

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ApolloProvider client={client}>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </ApolloProvider>
      </SafeAreaProvider>
    );
  }
}
