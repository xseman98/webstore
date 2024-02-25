<template>
  <div class="text-center">
    <v-pagination
      v-model="getCurrentPage"
      :length="getTotalPages"
    ></v-pagination>
  </div>
</template>

<script>
export default {
  name: "ViewPagination",

  props: {
    pageInfo: {
      type: Object,
      required: false,
    },
  },

  computed: {
    getCurrentPage: {
      get() {
        return this.pageInfo ? this.pageInfo.current_page : 1;
      },
      set(newValue) {
        this.$emit("page-change", newValue);
      },
    },

    getTotalPages() {
      return this.pageInfo ? this.pageInfo?.total_pages : 1;
    },
  },
};
</script>
