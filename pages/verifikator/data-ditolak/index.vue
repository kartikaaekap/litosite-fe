<template>
  <div>
    <div fluid class="breadcrumb__container">
      <b-breadcrumb>
        <b-breadcrumb-item active class="ml-1 pl-0 pl-md-4">
          List Data Ditolak
        </b-breadcrumb-item>
      </b-breadcrumb>
    </div>
    <b-row class="pt-1 pt-lg-4">
      <b-col>
        <base-title v-if="!rockRejectedValidator.length"
          >DATA DITOLAK (0)</base-title
        >
        <base-title v-else
          >DATA DITOLAK ({{ rockRejectedValidator.length }})</base-title
        >
      </b-col>
    </b-row>
    <b-row>
      <b-container>
        <b-table
          id="rejectedTable"
          responsive
          striped
          hover
          show-empty
          :items="rockRejectedValidator"
          :fields="fieldsRejected"
          :busy="isLoading"
          :per-page="perPageRejected"
          :current-page="currentPageRejected"
        >
          <template #cell(author)="{ item: { author } }">
            <span>{{ author }}</span>
          </template>
          <template #cell(lithologyName)="{ item: { lithologyName } }">
            <span>{{ lithologyName }}</span>
          </template>
          <template #cell(aksi)="{ item: { id } }">
            <b-link @click="showDetailsData(id)"> Details </b-link>
          </template>
          <template #empty>
            <p class="text-center mb-0">
              Belum ada data yang dapat ditampilkan
            </p>
          </template>
        </b-table>
        <b-pagination
          v-model="currentPageRejected"
          :total-rows="rowsRejected"
          :per-page="perPageRejected"
          aria-controls="rejectedTable"
          first-number
          last-number
          align="center"
        ></b-pagination>
      </b-container>
    </b-row>
  </div>
</template>

<script>
export default {
  layout: 'verifikator',
  async asyncData({ store }) {
    return {
      rockRejectedValidator: await store.dispatch('getRockRejectedValidator'),
    }
  },
  data: () => {
    return {
      fieldsRejected: [
        { key: 'author', label: 'Author Name' },
        { key: 'lithologyName', label: 'Lithology Name' },
        { key: 'aksi', label: 'Aksi' },
      ],
      perPageRejected: 10,
      currentPageRejected: 1,
      isLoading: false,
    }
  },
  computed: {
    rowsRejected() {
      return this.rockRejectedValidator.length
    },
  },
  methods: {
    showDetailsData(id) {
      this.$router.push(`/verifikator/data-ditolak/ditolak/${id}`)
    },
  },
}
</script>

<style lang="scss" scoped>
* {
  font-family: 'Nunito Sans';
}
.statistic {
  background-color: #6a40951a;
  &__text {
    font-size: 16px;
  }
  h2 {
    font-weight: bold;
  }
}
.breadcrumb {
  background-color: #6a40951a;
  padding: 10px 0;
}
.breadcrumb-item {
  * {
    font-family: 'Nunito Sans';
    font-size: 14px;
    font-weight: bold;
    color: #8e8e8e;
  }
  &.active * {
    color: #e3bb1b;
  }
}
</style>
