import gql from "graphql-tag";

export const CATEGORIES_QUERY = gql`
  query Categories($search: String) {
    products(search: $search, pageSize: 10000) {
      items {
        categories {
          uid
          name
        }
      }
    }
  }
`;
