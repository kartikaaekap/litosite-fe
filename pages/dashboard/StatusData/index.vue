<template>
  <div>
    <section id="introduction" class="section__introduction">
      <div fluid class="breadcrumb__container">
        <b-breadcrumb>
          <b-breadcrumb-item
            href="/dashboard/InputData/"
            class="ml-3 pl-0 ml-md-5 pl-md-4"
            >Input Data
          </b-breadcrumb-item>
          <b-breadcrumb-item active>Status Data</b-breadcrumb-item>
        </b-breadcrumb>
      </div>
      <b-container>
        <b-row class="mt-4">
          <b-col class="d-flex my-auto">
            <b-link class="tabs mb-0 mr-4" to="/dashboard/InputData">
              Input Data
            </b-link>
            <b-link class="tabs tabs--active"> Status Data </b-link>
          </b-col>
        </b-row>
        <b-row class="mt-5">
          <b-col class="text-center">
            <h1 class="section__title my-4">STATUS DATA</h1>
          </b-col>
        </b-row>
      </b-container>
    </section>
    <section id="chart" class="section__chart">
      <b-container>
        <b-row class="py-5 order-2 order-sm-1 order-md-1">
          <b-col class="text-left">
            <div class="d-md-flex">
              <b-col cols="12" class="col-md-6">
                <div class="h1 pb-0 d-flex">
                  <b-icon icon="file-text" color="#337EE1" />
                  <b-col cols="12 pb-2">
                    <p class="status__text mb-0 pb-0">Total Data yang Dibuat</p>
                    <p
                      v-if="
                        !rockPending.length &&
                        !rockExcel.length &&
                        !rockApproved.length &&
                        !rockRejected.length
                      "
                      class="status__title"
                    >
                      0
                    </p>
                    <p v-else class="status__title">{{ totalData }}</p>
                  </b-col>
                </div>
                <div class="h1 d-flex">
                  <b-icon icon="file-text" color="#F73A18" />
                  <b-col cols="12 pb-2">
                    <p class="status__text mb-0 pb-0">Menunggu Konfirmasi</p>
                    <p
                      v-if="rockPending.length === 0 && rockExcel.length === 0"
                      class="status__title"
                    >
                      0
                    </p>
                    <p v-else class="status__title">
                      {{ rockPending.length + rockExcel.length }}
                    </p>
                  </b-col>
                </div>
              </b-col>
              <b-col cols="12" class="col-md-6">
                <div class="h1 d-flex">
                  <b-icon icon="file-text" color="#F73A18" />
                  <b-col cols="12 pb-2">
                    <p class="status__text mb-0 pb-0">Data Diterima</p>
                    <p v-if="rockApproved.length === 0" class="status__title">
                      0
                    </p>
                    <p v-else class="status__title">
                      {{ rockApproved.length }}
                    </p>
                  </b-col>
                </div>
                <div class="h1 d-flex">
                  <b-icon icon="file-text" color="#3B3B3B" />
                  <b-col cols="12">
                    <p class="status__text mb-0 pb-0">Data Ditolak</p>
                    <p v-if="rockRejected.length === 0" class="status__title">
                      0
                    </p>
                    <p v-else class="status__title">
                      {{ rockRejected.length }}
                    </p>
                  </b-col>
                </div>
              </b-col>
            </div>
          </b-col>
          <b-col>
            <pie-chart
              :donut="true"
              :data="[
                numberRockPending,
                numberRockApproved,
                numberRockRejected,
              ]"
              :colors="chartColor"
            ></pie-chart
          ></b-col>
        </b-row>
      </b-container>
    </section>
    <section id="statusData">
      <b-container>
        <b-row class="mt-5">
          <b-col>
            <b-tabs
              pills
              small
              class="p-0"
              nav-wrapper-class="pills d-flex justify-content-center"
            >
              <b-tab title="Menunggu Konfirmasi">
                <section id="pending-table" class="mt-5">
                  <b-container>
                    <div class="mt-3" style="overflow-x: auto">
                      <b-table
                        id="pendingTable"
                        responsive
                        striped
                        hover
                        show-empty
                        class="table-text"
                        :items="pendingXlsData"
                        :fields="fieldsPending"
                        :busy="isLoading"
                        :per-page="perPagePending"
                        :current-page="currentPagePending"
                      >
                        <template #cell(type)="{ item: { type } }">
                          <span>{{ type }}</span>
                        </template>
                        <template #cell(typeDetail)="{ item: { typeDetail } }">
                          <span>{{ typeDetail }}</span>
                        </template>
                        <template
                          #cell(lithologyName)="{ item: { lithologyName } }"
                        >
                          <span>{{ lithologyName }}</span>
                        </template>
                        <template #cell(createAt)="{ item: { createAt } }">
                          <span>{{ formatDate(createAt) }}</span>
                        </template>
                        <template #cell(updatedAt)="{ item: { updatedAt } }">
                          <span>{{ formatDate(updatedAt) }}</span>
                        </template>
                        <template
                          #cell(images)="{ item: { id, status, images } }"
                        >
                          <b-link
                            v-if="status === 'xls'"
                            @click="showModalImage(id)"
                          >
                            Tambah Gambar
                          </b-link>
                          <b-link
                            v-for="coba in images"
                            v-else
                            :key="coba.id"
                            class="gambarPending"
                            :href="coba.image"
                            target="_blank"
                            >Lihat Gambar</b-link
                          >
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
                      <base-modal
                        v-if="isModalImage"
                        v-model="isModalImage"
                        title="Masukkan gambar"
                        is-danger
                        ok-label="Kirim"
                        @ok="handleSendImage"
                      >
                        <b-row>
                          <b-col cols="12" class="mx-auto mt-3">
                            <div class="section__blacktext">
                              Attachment <b-icon icon="paperclip" />
                            </div>
                            <p class="section__paragraph">
                              Supported format: .JPG, .JPEG, .PNG,
                            </p>
                            <div>
                              <b-card class="card text-center">
                                <img
                                  v-if="preview"
                                  class="img-fluid"
                                  style="
                                    border-radius: 10px;
                                    box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.7);
                                  "
                                  :src="preview"
                                  alt
                                />
                                <img
                                  v-else
                                  class="img-fluid"
                                  style="
                                    width: 600px;
                                    border-radius: 10px;
                                    box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.7);
                                  "
                                  src="../../../assets/img/no-image.jpg"
                                />
                              </b-card>
                              <input
                                ref="image"
                                class="hide-input mt-3 mb-3"
                                type="file"
                                accept="image/*"
                                @change="imageSelected"
                              />
                            </div>
                          </b-col>
                        </b-row>
                      </base-modal>
                    </div>
                  </b-container>
                </section>
              </b-tab>
              <b-tab title="Data Diterima">
                <section id="accepted-table" class="mt-5">
                  <b-container>
                    <div class="mt-3" style="overflow-x: auto">
                      <b-table
                        id="approvedTable"
                        class="table-text"
                        responsive
                        striped
                        hover
                        show-empty
                        :items="rockApproved"
                        :fields="fieldsApproved"
                        :busy="isLoading"
                        :per-page="perPageApproved"
                        :current-page="currentPageApproved"
                      >
                        <template #cell(type)="{ item: { type } }">
                          <span>{{ type }}</span>
                        </template>
                        <template #cell(typeDetail)="{ item: { typeDetail } }">
                          <span>{{ typeDetail }}</span>
                        </template>
                        <template
                          #cell(lithologyName)="{ item: { lithologyName } }"
                        >
                          <span>{{ lithologyName }}</span>
                        </template>
                        <template #cell(updatedAt)="{ item: { updatedAt } }">
                          <span>{{ formatDate(updatedAt) }}</span>
                        </template>
                        <template #cell(aksi)="{ item: { id } }">
                          <b-link @click="handleAccepted(id)"> Details </b-link>
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
                    </div>
                  </b-container>
                </section>
              </b-tab>
              <b-tab title="Data Ditolak">
                <section id="rejected-table" class="mt-5">
                  <b-container>
                    <div class="mt-3" style="overflow-x: auto">
                      <b-table
                        id="rejectedTable"
                        class="table-text"
                        responsive
                        striped
                        hover
                        show-empty
                        :items="rockRejected"
                        :fields="fields"
                        :busy="isLoading"
                        :per-page="perPageRejected"
                        :current-page="currentPageRejected"
                      >
                        <template #cell(type)="{ item: { type } }">
                          <span>{{ type }}</span>
                        </template>
                        <template #cell(typeDetail)="{ item: { typeDetail } }">
                          <span>{{ typeDetail }}</span>
                        </template>
                        <template
                          #cell(lithologyName)="{ item: { lithologyName } }"
                        >
                          <span>{{ lithologyName }}</span>
                        </template>
                        <template #cell(komentar)="{ item: { komentar } }">
                          <span>{{ komentar }}</span>
                        </template>
                        <template #cell(aksi)="row">
                          <b-link @click="showModalEdit(row)">
                            Edit Data
                          </b-link>
                          <!-- <b-link class="ml-2"> Delete </b-link> -->
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
                      <base-modal
                        v-if="isModalEdit"
                        v-model="isModalEdit"
                        title="Edit Data Lapangan"
                        ok-label="Kirim Ulang"
                        @ok="handleEditData"
                      >
                        <b-form @submit.prevent="handleEditData">
                          <base-input
                            id="author"
                            v-model="form.author"
                            label="Author Name"
                            placeholder="Input author name"
                            warning-icon
                            required
                          />
                          <base-input
                            id="lithologyName"
                            v-model="form.lithologyName"
                            label="Lithology Name"
                            placeholder="Input lithology name"
                            warning-icon
                            required
                          />
                          <base-input-select
                            id="type"
                            v-model="form.type"
                            label="Type"
                            :options="typeOptions"
                            warning-icon
                            required
                          />
                          <base-input-select
                            id="typeDetail"
                            v-model="form.typeDetail"
                            label="Type Detail"
                            :options="typeDetailOptions"
                            warning-icon
                            required
                          />
                          <base-input-select
                            id="ageZone"
                            v-model="form.ageZone"
                            label="Age Zone"
                            :options="ageZoneOptions"
                            warning-icon
                            required
                          />
                          <base-input-select
                            id="rockFormation"
                            v-model="form.rockFormation"
                            label="Formation"
                            :options="formationOptions"
                            warning-icon
                            required
                          />
                          <base-input
                            id="yearResearch"
                            v-model="form.yearResearch"
                            label="Year Researched"
                            placeholder="Input year researched"
                            warning-icon
                            required
                          />
                          <base-input
                            id="location"
                            v-model="form.location"
                            label="Location"
                            placeholder="Input location"
                            warning-icon
                            required
                          />
                          <b-row>
                            <b-col>
                              <base-input
                                id="latitude"
                                v-model="form.latitude"
                                label="Latitude"
                                placeholder="(dalam satuan derajat)"
                                warning-icon
                                required
                              />
                            </b-col>
                            <b-col>
                              <base-input
                                id="longitude"
                                v-model="form.longitude"
                                label="Longitude"
                                placeholder="(dalam satuan derajat)"
                                warning-icon
                                required
                              />
                            </b-col>
                            <b-col>
                              <base-input
                                id="altitude"
                                v-model="form.altitude"
                                label="Altitude"
                                placeholder="(dalam satuan derajat))"
                                warning-icon
                                required
                              />
                            </b-col>
                          </b-row>
                          <p class="section__form pb-0 mb-2">Strike / Dip</p>
                          <b-row>
                            <b-col cols="4">
                              <base-input
                                id="strike"
                                v-model="form.strike"
                                placeholder="Input strike"
                                warning-icon
                                required
                              />
                            </b-col>
                            <b-col cols="1">
                              <h2 class="section__depth">°</h2>
                            </b-col>
                            <b-col cols="1">
                              <h1 class="section__depth">/</h1>
                            </b-col>
                            <b-col cols="4">
                              <base-input
                                id="dip"
                                v-model="form.dip"
                                placeholder="Input dip"
                                warning-icon
                                required
                              />
                            </b-col>
                            <b-col cols="1">
                              <h2 class="section__depth">°S</h2>
                            </b-col>
                          </b-row>
                        </b-form>
                      </base-modal>
                    </div>
                  </b-container>
                </section>
              </b-tab>
            </b-tabs>
          </b-col>
        </b-row>
      </b-container>
    </section>
  </div>
</template>

<script>
import Vue from 'vue'
import Chart from 'chart.js'
import Chartkick from 'vue-chartkick'

Vue.use(Chartkick.use(Chart))

export default {
  components: {},
  layout: 'landingpagelogin',
  async asyncData({ store }) {
    return {
      rockPending: await store.dispatch('getRockPending'),
      rockApproved: await store.dispatch('getRockApproved'),
      rockRejected: await store.dispatch('getRockRejected'),
      rockExcel: await store.dispatch('getRockExcel'),
      rockAll: await store.dispatch('getRockField'),
    }
  },
  data: () => {
    return {
      form: {
        id: '',
        author: '',
        lithologyName: '',
        type: '',
        typeDetail: '',
        ageZone: '',
        rockFormation: '',
        yearResearch: '',
        location: '',
        latitude: '',
        longitude: '',
        altitude: '',
        strike: '',
        dip: '',
      },
      fieldsPending: [
        { key: 'type', label: 'Type' },
        { key: 'typeDetail', label: 'Type Detail' },
        { key: 'lithologyName', label: 'Lithology Name' },
        { key: 'createAt', label: 'Tanggal Dikirim' },
        { key: 'updatedAt', label: 'Terakhir Diperbaharui' },
        { key: 'images', label: 'Gambar' },
      ],
      fields: [
        { key: 'type', label: 'Type' },
        { key: 'typeDetail', label: 'Type Detail' },
        { key: 'lithologyName', label: 'Lithology Name' },
        { key: 'komentar', label: 'Komentar' },
        { key: 'aksi', label: 'Aksi' },
      ],
      fieldsApproved: [
        { key: 'type', label: 'Type' },
        { key: 'typeDetail', label: 'Type Detail' },
        { key: 'lithologyName', label: 'Lithology Name' },
        { key: 'updatedAt', label: 'Tanggal Diterima' },
        { key: 'aksi', label: 'Aksi' },
      ],
      typeOptions: [
        { value: '', text: 'Select type' },
        { value: 'sedimen', text: 'Sedimen' },
        { value: 'metamorf', text: 'Metamorf' },
        { value: 'beku', text: 'Beku' },
      ],
      typeDetailOptions: [
        { value: '', text: 'Select type' },
        { value: 'coba1', text: 'Coba1' },
        { value: 'coba2', text: 'Coba2' },
        { value: 'coba3', text: 'Coba3' },
      ],
      ageZoneOptions: [
        { value: '', text: 'Select age zone' },
        { value: 'pilosen', text: 'Pilosen (N18-N21)' },
        { value: 'milosenAkhir', text: 'Milosen Akhir (N13-N17)' },
        { value: 'milosenTengah', text: 'Milosen Tengah (N9-N12)' },
        { value: 'milosenAwal', text: 'Milosen Awal (N4-N8)' },
        { value: 'oligosenAkhir', text: 'Oligosen Akhir (P21-P22)' },
        { value: 'oligosenAwal', text: 'Oligosen Awal (P18-P20)' },
        { value: 'eosenAkhir', text: 'Eosen Akhir (P15-P17)' },
        { value: 'eosenTengah', text: 'Eosen Tengah (P10-P14)' },
        { value: 'eosenAwal', text: 'Eosen Awal (P5-P9)' },
      ],
      formationOptions: [
        { value: '', text: 'Select formation' },
        { value: 'wungkalGamping', text: 'Wungkal Gamping' },
        { value: 'keboButak', text: 'Kebo Butak' },
        { value: 'semilir', text: 'Semilir' },
        { value: 'nglanggran', text: 'Nglanggran' },
        { value: 'sambipitu', text: 'Sambipitu' },
        { value: 'oyo', text: 'Oyo' },
        { value: 'wonosari', text: 'Wonosari' },
        { value: 'kepek', text: 'Kepek' },
        { value: 'nanggulan', text: 'Nanggulan' },
        { value: 'oaf', text: 'OAF' },
        { value: 'sentolo', text: 'Sentolo' },
        { value: 'jonggrangan', text: 'Jonggrangan' },
      ],
      formPic: {
        image: '',
      },
      preview: '',
      isModalEdit: false,
      isModalImage: false,
      isLoading: false,
      perPagePending: 5,
      currentPagePending: 1,
      perPageApproved: 5,
      currentPageApproved: 1,
      perPageRejected: 5,
      currentPageRejected: 1,
    }
  },
  computed: {
    pendingXlsData() {
      return this.rockAll.filter(
        (item) => item.status === 'xls' || item.status === 'pnd'
      )
    },
    totalData() {
      return (
        this.rockPending.length +
        this.rockExcel.length +
        this.rockApproved.length +
        this.rockRejected.length
      )
    },
    numberRockPending() {
      return [
        !this.rockPending.length && !this.rockExcel.length
          ? 'Anda belum pernah menginput batuan'
          : 'Menunggu Konfirmasi',
        !this.rockPending.length && !this.rockExcel.length
          ? 1
          : this.rockPending.length + this.rockExcel.length,
      ]
    },
    numberRockApproved() {
      return [
        !this.rockApproved.length ? '' : 'Data Diterima',
        !this.rockApproved.length ? '' : this.rockApproved.length,
      ]
    },
    numberRockRejected() {
      return [
        !this.rockRejected.length ? '' : 'Data Ditolak',
        !this.rockRejected.length ? '' : this.rockApproved.length,
      ]
    },
    chartColor() {
      return [
        !this.rockPending.length ? 'grey' : '#E3CF1B',
        !this.rockApproved.length ? '#6a40951a' : '#24C021',
        !this.rockApproved.length ? '#6a40951a' : '#F73A18',
      ]
    },
    rowsPending() {
      return this.pendingXlsData.length
    },
    rowsApproved() {
      return this.rockApproved.length
    },
    rowsRejected() {
      return this.rockRejected.length
    },
  },
  methods: {
    handleAccepted(id) {
      this.$router.push(`/dashboard/StatusData/accepted/${id}`)
    },
    showModalImage(id) {
      this.isModalImage = true
      this.form = { ...this.form, id }
    },
    imageSelected(e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      this.formPic.image = files[0]
      this.createImage(files[0])
    },
    createImage(file) {
      const reader = new FileReader()
      const vm = this
      reader.onload = (e) => {
        vm.preview = e.target.result
      }
      reader.readAsDataURL(file)
    },
    async handleSendImage() {
      const config = {
        headers: { 'content-type': 'multipart/form-data' },
      }
      const rockId = this.form.id
      const formData = new FormData()
      for (const data in this.formPic) {
        formData.append(data, this.formPic[data])
      }
      try {
        await this.$axios.$post(
          `http://ec2-54-235-59-243.compute-1.amazonaws.com/api/contrib-rock/${rockId}/image`,
          formData,
          config
        )
        this.isModalImage = false
        this.handleRefreshList()
      } catch (e) {
        console.log(e)
      }
    },
    showModalEdit({
      item: {
        id,
        author,
        lithologyName,
        type,
        typeDetail,
        ageZone,
        rockFormation,
        yearResearch,
        location,
        latitude,
        longitude,
        altitude,
        strike,
        dip,
      },
    }) {
      this.isModalEdit = true
      this.form = {
        ...this.form,
        id,
        author,
        lithologyName,
        type,
        typeDetail,
        ageZone,
        rockFormation,
        yearResearch,
        location,
        latitude,
        longitude,
        altitude,
        strike,
        dip,
      }
    },
    handleEditData() {
      const { id } = this.form
      this.isLoading = true
      this.$store
        .dispatch('updateRejectedRock', [
          id,
          {
            author: this.form.author,
            lithologyName: this.form.lithologyName,
            type: this.form.type,
            typeDetail: this.form.typeDetail,
            ageZone: this.form.ageZone,
            rockFormation: this.form.rockFormation,
            yearResearch: this.form.yearResearch,
            location: this.form.location,
            latitude: this.form.latitude,
            longitude: this.form.longitude,
            altitude: parseFloat(this.form.altitude),
            strike: this.form.strike,
            dip: this.form.dip,
          },
        ])
        .then(() =>
          this.handleRefreshList().then(() => (this.isLoading = false))
        )
        .catch(() => (this.isLoading = false))
    },
    formatDate(dateISO) {
      const date = new Date(dateISO)
      return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      })
    },
    async handleRefreshList() {
      this.rockPending = await this.$store.dispatch('getRockPending')
      this.rockApproved = await this.$store.dispatch('getRockApproved')
      this.rockRejected = await this.$store.dispatch('getRockRejected')
      this.rockAll = await this.$store.dispatch('getRockField')
    },
  },
}
</script>

<style lang="scss">
* {
  font-family: 'Nunito Sans';
}
.section {
  &__introduction {
    padding-top: 0px;
    padding-bottom: 20px;
  }
  &__chart {
    background: #6a40951a;
  }
  &__title {
    font-size: 36px;
    font-weight: bold;
    color: black;
    &--white {
      color: white;
    }
  }
  &__subtitle {
    font-size: 24px;
    &--white {
      color: white;
      font-weight: 300;
    }
  }
  &__text {
    font-size: 20px;
    &--purple {
      color: #6a4095;
    }
  }
  &__form {
    font-size: 16px;
    color: black;
    padding-top: 10px;
  }
  &__depth {
    color: black;
    margin-right: 10px;
  }
}
.status {
  &__title {
    font-size: 24px;
    font-weight: bold;
  }
  &__text {
    font-size: 16px;
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
.tabs {
  font-size: 20px;
  color: rgb(155, 155, 155);
  font-weight: bold;
  &--active {
    font-weight: bold;
    color: black;
    border-bottom: 5px solid #e3bb1b;
  }
  &:hover {
    text-decoration: none;
    color: rgb(94, 94, 94);
  }
}
.nav-pills {
  font-size: 14px;
  background-color: #eee9f3;
  border-radius: 4px;
  border: unset;
  padding: 5px;
  text-align: center;
  .nav-link {
    background-color: #eee9f3;
    color: grey;
    font-weight: bold;
    width: 210px;
    height: 39px;
    &.active {
      font-size: 14px;
      font-weight: bold;
      background-color: #6a4095;
      color: #e3bb1b;
    }
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
.custom-select {
  height: 40px;
  padding-left: 15px;
  padding-right: 40px;
  vertical-align: middle;
  background: url('~assets/img/icon-arrow-down.svg') no-repeat right 12px
    center/16px 16px;
  background-color: white;
  border: 1 solid black;
  border-radius: 5px;
  -webkit-appearance: none;
  &:hover,
  &:active {
    box-shadow: none;
  }
  &:focus {
    box-shadow: none;
    cursor: pointer;
    outline: #6a4095;
  }
  option:first-child {
    color: black;
  }
}
.table-text {
  font-size: 16px;
  font-weight: 400;
}
.gambarPending {
  color: #cca713;
  font-weight: 500;
  &:hover {
    color: #aa8b0d;
  }
}
@media screen and (max-width: 600px) {
  .section {
    &__title {
      font-size: 28px;
    }
  }
}
</style>
