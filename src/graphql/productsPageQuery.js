import gql from "graphql-tag";

export const PAGE_QUERY = gql`
  query Page($search: String, $currentPage: Int) {
    products(search: $search, currentPage: $currentPage) {
      page_info {
        page_size
        current_page
        total_pages
      }
    }
  }
`;
