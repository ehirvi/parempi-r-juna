import { HttpLink } from "@apollo/client";
import { InMemoryCache } from "@apollo/client";
import { ApolloClient } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";

const gqlClient = new ApolloClient({
  link: new HttpLink({
    uri: "https://rata.digitraffic.fi/api/v2/graphql/graphql",
  }),
  cache: new InMemoryCache(),
});

export const App = () => {
  return (
    <ApolloProvider client={gqlClient}>
      <p>hello world</p>
    </ApolloProvider>
  );
};
