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
          responsive
          striped
          hover
          show-empty
          :items="rockPendingValidator"
          :fields="fieldsPending"
          :busy="isLoading"
        >
          <template v-slot:cell(author)="{ item: { author } }">
            <span>{{ author }}</span>
          </template>
          <template v-slot:cell(lithologyName)="{ item: { lithologyName } }">
            <span>{{ lithologyName }}</span>
          </template>
          <template v-slot:cell(aksi)="{ item: { id } }">
            <b-link @click="showDetailsData(id)"> Details </b-link>
          </template>
          <template v-slot:empty>
            <p class="text-center mb-0">
              Belum ada data yang dapat ditampilkan
            </p>
          </template>
        </b-table>
      </b-container>
    </b-row>
    <!-- <base-modal-validator
      v-if="isModalDetails"
      v-model="isModalDetails"
      title="Detail Data"
      ok-label="Terima"
      @ok="handleAcceptData"
      @click="handleRejectData"
    >
      <table id="table-detail">
        <tbody>
          <tr>
            <th>Author Name:</th>
            <td>{{ rockById.author }}</td>
          </tr>
          <tr>
            <th>Lithology Name:</th>
            <td>{{ rockById.lithologyName }}</td>
          </tr>
          <tr>
            <th>Type:</th>
            <td>{{ rockById.type }}</td>
          </tr>
          <tr>
            <th>Type Detail:</th>
            <td>{{ rockById.typeDetail }}</td>
          </tr>
          <tr>
            <th>Age Zone:</th>
            <td>{{ rockById.ageZone }}</td>
          </tr>
          <tr>
            <th>Formation:</th>
            <td>{{ rockById.rockFormation }}</td>
          </tr>
          <tr>
            <th>Year Researched:</th>
            <td>{{ rockById.yearResearch }}</td>
          </tr>
          <tr>
            <th>Location:</th>
            <td>{{ rockById.location }}</td>
          </tr>
          <tr>
            <th>Latitude:</th>
            <td>{{ rockById.latitude }}</td>
          </tr>
          <tr>
            <th>Longitude:</th>
            <td>{{ rockById.longitude }}</td>
          </tr>
          <tr>
            <th>Altitude:</th>
            <td>{{ rockById.altitude }}</td>
          </tr>
          <tr>
            <th>Strike / Dip:</th>
            <td>{{ rockById.strike }} / {{ rockById.dip }}</td>
          </tr>
          <tr v-for="item in rockById.images" :key="item.id">
            <th>Attachment:</th>
            <td>
              <b-img :src="item.image" fluid />
            </td>
          </tr>
        </tbody>
      </table>
    </base-modal-validator>
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
        v-model="form.komentar"
        label="Alasan Penolakan"
        placeholder="Beri alasan penolakan"
        warning-icon
        required
        size="xtraLarge"
      />
    </base-modal> -->
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
    }
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
          `http://ec2-54-198-153-24.compute-1.amazonaws.com/api/valid-rock/${id}`
        )
        .then((response) => {
          this.rockById = response
        })
      // if (this.handleRejectData()) {
      //   try {
      //     await this.$axios.$post(
      //       `http://ec2-54-198-153-24.compute-1.amazonaws.com/api/valid-rock/${id}`,
      //       this.form.komentar,
      //       this.form.status
      //     )
      //     this.$router.push('/verifikator/data-ditolak')
      //   } catch (e) {
      //     console.log(e)
      //   }
      // } else {
      //   try {
      //     await this.$axios.$post(
      //       `http://ec2-54-198-153-24.compute-1.amazonaws.com/api/valid-rock/${id}`,
      //       this.form.komentar,
      //       this.form.status
      //     )
      //     this.$router.push('/verifikator/data-diterima')
      //   } catch (e) {
      //     console.log(e)
      //   }
      // }
    },
    handleRejectData() {
      this.isModalComments = true
      //   try {
      //     await this.$axios.$post(
      //       `http://ec2-54-198-153-24.compute-1.amazonaws.com/api/contrib-rock/${this.$route.params.inputimagesId}/image`,
      //       formData,
      //       config
      //     )
      //     this.$router.push('/dashboard/StatusData')
      //   } catch (e) {
      //     console.log(e)
      //   }
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
