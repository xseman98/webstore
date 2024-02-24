import gql from "graphql-tag";

export const PAGE_QUERY = gql`
  query Page(
    $search: String
    $currentPage: Int
    $filter: ProductAttributeFilterInput
  ) {
    products(search: $search, currentPage: $currentPage, filter: $filter) {
      page_info {
        page_size
        current_page
        total_pages
      }
    }
  }
`;
