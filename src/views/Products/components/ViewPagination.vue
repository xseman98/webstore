<template>
  <div class="text-center">
    <v-pagination
      v-model="page.current_page"
      :length="page.total_pages"
      @input="showPage"
    ></v-pagination>
  </div>
</template>

<script>
import { PAGE_QUERY } from "@/graphql";

export default {
  name: "ViewPagination",

  data() {
    return {
      page: {},
    };
  },

  apollo: {
    page: {
      query: PAGE_QUERY,
      variables() {
        return {
          search: "",
          currentPage: 1,
          filter: {},
        };
      },
      update: (data) => data.products.page_info,
    },
  },

  methods: {
    showPage(page) {
      this.$emit("page-change", page);
      this.$apollo.queries.page.fetchMore({
        variables: {
          currentPage: page,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return fetchMoreResult;
        },
      });
    },

    handleCategoryChange(uid) {
      this.$apollo.queries.page.fetchMore({
        variables: {
          filter: uid === "*" ? {} : { category_uid: { eq: uid } },
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;

          return fetchMoreResult;
        },
      });
    },
  },

  watch: {
    "$route.params.uid": {
      handler: function () {
        this.handleCategoryChange(decodeURIComponent(this.$route.params.uid));
      },
      deep: true,
    },
  },
};
</script>
