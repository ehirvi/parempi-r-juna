import { HttpLink } from "@apollo/client";
import { InMemoryCache } from "@apollo/client";
import { ApolloClient } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { Home } from "./views/Home/Home";

const gqlClient = new ApolloClient({
  link: new HttpLink({
    uri: "https://rata.digitraffic.fi/api/v2/graphql/graphql",
  }),
  cache: new InMemoryCache(),
});

export const App = () => {
  return (
    <ApolloProvider client={gqlClient}>
      <Home />
    </ApolloProvider>
  );
};
