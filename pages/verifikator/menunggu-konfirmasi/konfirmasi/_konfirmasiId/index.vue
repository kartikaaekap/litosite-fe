<template>
  <div>
    <div fluid class="breadcrumb__container">
      <b-breadcrumb>
        <b-breadcrumb-item
          href="/verifikator/menunggu-konfirmasi/"
          class="ml-1 pl-0 pl-md-4"
          >List Data Menunggu Konfirmasi
        </b-breadcrumb-item>
        <b-breadcrumb-item active>Detail Data</b-breadcrumb-item>
      </b-breadcrumb>
    </div>
    <table id="table-detail">
      <tbody>
        <tr>
          <th>Author Name:</th>
          <td>{{ rockByIdValidator.author }}</td>
        </tr>
        <tr>
          <th>Lithology Name:</th>
          <td>{{ rockByIdValidator.lithologyName }}</td>
        </tr>
        <tr>
          <th>Type:</th>
          <td>{{ rockByIdValidator.type }}</td>
        </tr>
        <tr>
          <th>Type Detail:</th>
          <td>{{ rockByIdValidator.typeDetail }}</td>
        </tr>
        <tr>
          <th>Age Zone:</th>
          <td>{{ rockByIdValidator.ageZone }}</td>
        </tr>
        <tr>
          <th>Formation:</th>
          <td>{{ rockByIdValidator.rockFormation }}</td>
        </tr>
        <tr>
          <th>Year Researched:</th>
          <td>{{ rockByIdValidator.yearResearch }}</td>
        </tr>
        <tr>
          <th>Location:</th>
          <td>{{ rockByIdValidator.location }}</td>
        </tr>
        <tr>
          <th>Latitude:</th>
          <td>{{ rockByIdValidator.latitude }}</td>
        </tr>
        <tr>
          <th>Longitude:</th>
          <td>{{ rockByIdValidator.longitude }}</td>
        </tr>
        <tr>
          <th>Altitude:</th>
          <td>{{ rockByIdValidator.altitude }}</td>
        </tr>
        <tr>
          <th>Strike / Dip:</th>
          <td>{{ rockByIdValidator.strike }} / {{ rockByIdValidator.dip }}</td>
        </tr>
        <tr v-for="item in rockByIdValidator.images" :key="item.id">
          <th>Attachment:</th>
          <td>
            <b-img :src="item.image" fluid />
          </td>
        </tr>
      </tbody>
    </table>
    <b-row class="mt-3 mt-md-5">
      <b-col>
        <base-button
          is-full
          variant="tertiary"
          class="mb-5 mt-4"
          @click="handleRejectData()"
        >
          Tolak Data
        </base-button>
      </b-col>
      <b-col>
        <base-button is-full class="mb-5 mt-4" @click="handleApproveData()">
          Terima Data
        </base-button>
      </b-col>
    </b-row>
    <base-modal
      v-if="isModalComments"
      v-model="isModalComments"
      title="Alasan Penolakan"
      is-danger
      ok-label="Kirim"
      @ok="handleSendComments"
    >
      <base-input
        id="komentar"
        v-model="formReject.komentar"
        label="Alasan Penolakan"
        placeholder="Beri alasan penolakan"
        warning-icon
        required
        size="xtraLarge"
      />
    </base-modal>
  </div>
</template>

<script>
export default {
  layout: 'verifikator',
  async asyncData({ store, params }) {
    // const id = this.id
    return {
      rockByIdValidator: await store.dispatch(
        'getRockByIdValidator',
        params.konfirmasiId
      ),
    }
  },
  data: () => {
    return {
      formReject: {
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
      isModalComments: false,
    }
  },
  methods: {
    handleRejectData() {
      this.isModalComments = true
    },
    async handleSendComments() {
      try {
        await this.$axios.$patch(
          `http://ec2-54-198-153-24.compute-1.amazonaws.com/api/valid-rock/${this.$route.params.konfirmasiId}`,
          this.formReject
        )
        this.$router.push('/verifikator/data-ditolak')
      } catch (e) {
        console.log(e)
      }
    },
    async handleApproveData() {
      try {
        await this.$axios.$patch(
          `http://ec2-54-198-153-24.compute-1.amazonaws.com/api/valid-rock/${this.$route.params.konfirmasiId}`,
          this.formApproved
        )
        this.$router.push('/verifikator/data-diterima')
      } catch (e) {
        console.log(e)
      }
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
#table-detail {
  border-collapse: collapse;
  width: 100%;
  border: 1px solid #6a4095;
}

#table-detail td,
#table-detail th {
  padding: 6px;
  border: 1px solid #6a4095;
}

#table-detail td {
  font-size: 16px;
}

#table-detail th {
  padding-top: 6px;
  padding-bottom: 6px;
  background-color: #ffffff;
  color: black;
  font-size: 17px;
}
</style>
