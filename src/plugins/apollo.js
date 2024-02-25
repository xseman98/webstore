import Vue from "vue";
import VueApollo from "vue-apollo";
import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { createHttpLink } from "apollo-link-http";

Vue.use(VueApollo);

const httpLink = createHttpLink({
  uri: `http://localhost:${process.env.VUE_APP_PORT}/graphql`,
});

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

export default apolloProvider;
