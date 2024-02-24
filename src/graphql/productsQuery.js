import gql from "graphql-tag";

export const PRODUCTS_QUERY = gql`
  query Products(
    $search: String
    $currentPage: Int
    $filter: ProductAttributeFilterInput
  ) {
    products(search: $search, currentPage: $currentPage, filter: $filter) {
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
          uid
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
