<template>
  <div>
    <div fluid class="breadcrumb__container">
      <b-breadcrumb>
        <b-breadcrumb-item active class="ml-1 pl-0 pl-md-4">
          List Data Menunggu Konfirmasi
        </b-breadcrumb-item>
      </b-breadcrumb>
    </div>
    <b-row class="pt-1 pt-lg-4">
      <b-col>
        <base-title v-if="!rockPendingValidator.length"
          >MENUNGGU KONFIRMASI (0)</base-title
        >
        <base-title v-else
          >MENUNGGU KONFIRMASI ({{ rockPendingValidator.length }})</base-title
        >
      </b-col>
    </b-row>
    <b-row>
      <b-container>
        <b-table
          id="pendingTable"
          responsive
          striped
          hover
          show-empty
          :items="rockPendingValidator"
          :fields="fieldsPending"
          :busy="isLoading"
          :per-page="perPagePending"
          :current-page="currentPagePending"
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
          v-model="currentPagePending"
          :total-rows="rowsPending"
          :per-page="perPagePending"
          aria-controls="pendingTable"
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
    // const id = this.id
    return {
      rockPendingValidator: await store.dispatch('getRockPendingValidator'),
      rockApprovedValidator: await store.dispatch('getRockApprovedValidator'),
      rockRejectedValidator: await store.dispatch('getRockRejectedValidator'),
    }
  },
  data: () => {
    return {
      rockById: {},
      form: {
        komentar: '',
        status: 'rjt',
      },
      formApproved: {
        komentar: '',
        status: 'apr',
      },
      fieldsPending: [
        { key: 'author', label: 'Author Name' },
        { key: 'lithologyName', label: 'Lithology Name' },
        { key: 'aksi', label: 'Aksi' },
      ],
      popUpDetails: false,
      isModalDetails: false,
      isModalComments: false,
      perPagePending: 10,
      currentPagePending: 1,
      isLoading: false,
    }
  },
  computed: {
    rowsPending() {
      return this.rockPendingValidator.length
    },
  },
  methods: {
    showDetailsData(id) {
      this.$router.push(`/verifikator/menunggu-konfirmasi/konfirmasi/${id}`)
    },
    async showPopUpDetails(id) {
      this.isModalDetails = true
      // this.id = id
      await this.$axios
        .$get(
          `http://ec2-54-235-59-243.compute-1.amazonaws.com/api/valid-rock/${id}`
        )
        .then((response) => {
          this.rockById = response
        })
    },
    handleRejectData() {
      this.isModalComments = true
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
#table {
  border-collapse: collapse;
  width: 100%;
}

#table td,
#table th {
  border: 1px solid #6a4095;
  padding: 6px;
}

#tabe tr:hover {
  background-color: #ddd;
}

#table td {
  font-size: 16px;
}

#table th {
  padding-top: 6px;
  padding-bottom: 6px;
  text-align: center;
  background-color: #e3bb1b;
  color: white;
  font-size: 17px;
}
table,
th,
td {
  border-collapse: collapse;
}
th,
td {
  padding: 5px;
  text-align: left;
}
</style>
