import gql from "graphql-tag";

export const PRODUCTS_QUERY = gql`
  query Products(
    $search: String
    $currentPage: Int
    $filter: ProductAttributeFilterInput
  ) {
    products(search: $search, currentPage: $currentPage, filter: $filter) {
      total_count
      page_info {
        page_size
        current_page
        total_pages
      }
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
