import gql from "graphql-tag";

export const PRODUCTS_QUERY = gql`
  query Products($search: String) {
    products(search: $search) {
      total_count
      items {
        uid
        name
        description {
          html
        }
        image {
          label
          url
        }
        categories {
          name
          level
        }
        price_range {
          maximum_price {
            final_price {
              value
              currency
            }
          }
        }
        stock_status
      }
    }
  }
`;
