<template>
  <div>
    <div fluid class="breadcrumb__container">
      <b-breadcrumb>
        <b-breadcrumb-item active class="ml-1 pl-0 pl-md-4">
          List Data Diterima
        </b-breadcrumb-item>
      </b-breadcrumb>
    </div>
    <b-row class="pt-1 pt-lg-4">
      <b-col>
        <base-title v-if="!rockApprovedValidator.length"
          >DATA DITERIMA (0)</base-title
        >
        <base-title v-else
          >DATA DITERIMA ({{ rockApprovedValidator.length }})</base-title
        >
      </b-col>
    </b-row>
    <b-row>
      <b-container>
        <b-table
          id="approvedTable"
          responsive
          striped
          hover
          show-empty
          :items="rockApprovedValidator"
          :fields="fieldsApproved"
          :busy="isLoading"
          :per-page="perPageApproved"
          :current-page="currentPageApproved"
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
          v-model="currentPageApproved"
          :total-rows="rowsApproved"
          :per-page="perPageApproved"
          aria-controls="approvedTable"
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
      rockApprovedValidator: await store.dispatch('getRockApprovedValidator'),
    }
  },
  data: () => {
    return {
      fieldsApproved: [
        { key: 'author', label: 'Author Name' },
        { key: 'lithologyName', label: 'Lithology Name' },
        { key: 'aksi', label: 'Aksi' },
      ],
      perPageApproved: 10,
      currentPageApproved: 1,
      isLoading: false,
    }
  },
  computed: {
    rowsApproved() {
      return this.rockApprovedValidator.length
    },
  },
  methods: {
    showDetailsData(id) {
      this.$router.push(`/verifikator/data-diterima/diterima/${id}`)
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
