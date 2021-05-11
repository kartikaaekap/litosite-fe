<template>
  <div>
    <section id="introduction" class="section__introduction">
      <div fluid class="breadcrumb__container">
        <b-breadcrumb>
          <b-breadcrumb-item active class="ml-3 pl-0 ml-md-5 pl-md-4">
            Input Data
          </b-breadcrumb-item>
        </b-breadcrumb>
      </div>
      <b-container>
        <b-row class="mt-4">
          <b-col class="d-flex my-auto">
            <b-link class="tabs tabs--active mb-0 mr-4"> Input Data </b-link>
            <b-link class="tabs" to="/dashboard/StatusData">
              Status Data
            </b-link>
          </b-col>
        </b-row>
        <b-row class="mt-5">
          <b-col>
            <b-tabs
              pills
              small
              class="p-0"
              nav-wrapper-class="pills d-flex justify-content-center"
            >
              <b-tab title="Upload Dari Excel" @click="handleInputExcel()" />
              <b-tab title="Input Secara Langsung" class="mb-0 mb-md-3" active>
                <b-row>
                  <b-col class="text-center">
                    <h1 class="section__title mt-5 mb-3">
                      INPUT DATA HASIL LAPANGAN
                    </h1>
                  </b-col>
                </b-row>
                <div>
                  <b-row>
                    <b-col cols="12" class="col-md-8 mx-auto">
                      <!-- <form-wizard
                        ref="wizard"
                        title=""
                        subtitle=""
                        step-size="xs"
                        color="#E3BB1B"
                        error-color="#24C021"
                      >
                        <tab-content title="Input Data Lapangan" class="mb-5"> -->
                      <b-row>
                        <b-col>
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
                            <base-button
                              type="submit"
                              :disabled="isLoading || areAllInputsEmpty"
                              class="mx-auto mt-5"
                              is-full
                              @click="submitGeneralRock()"
                            >
                              Selanjutnya
                            </base-button>
                          </b-row>
                        </b-col>
                      </b-row>
                    </b-col>
                  </b-row>
                </div>
              </b-tab>
            </b-tabs>
          </b-col>
        </b-row>
      </b-container>
    </section>
  </div>
</template>

<script>
// import { FormWizard, TabContent } from 'vue-form-wizard'
import BaseInputSelect from '~/components/BaseInputSelect.vue'

export default {
  components: { BaseInputSelect },
  layout: 'landingpagelogin',
  // async asyncData({ store }) {
  //   return {
  //     allRocks: await store.dispatch('getRockField'),
  //   }
  // },
  data: () => {
    return {
      form: {
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
      isLoading: false,
    }
  },
  computed: {
    areAllInputsEmpty() {
      return Object.values(this.form).some((value) => !value)
    },
  },
  methods: {
    handleInputExcel() {
      this.$router.push('/dashboard/InputData')
    },
    // handleInputFoto(id) {
    //   this.$router.push(`/dashboard/InputData/InputDataForm/${id}`)
    // },
    submitform() {
      this.$swal({
        title: 'Both passwords must match',
        icon: 'warning',
        showCloseButton: true,
      })
    },
    async submitGeneralRock() {
      try {
        await this.$store
          .dispatch('createRockField', {
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
          })
          .then((response) => {
            this.$swal({
              title: 'Berhasil menyimpan data',
              icon: 'success',
              showCloseButton: true,
            })
            // console.log(response.data.id)
            // console.log(response.id)
            console.log(response.id)
            this.$router.push(
              `/dashboard/InputData/InputDataForm/inputimages/${response.id}`
            )
          })
      } catch (error) {
        console.log(error)
        this.$swal({
          title: 'Data yang dimasukkan salah',
          icon: 'error',
          showCloseButton: true,
        })
      }
    },
  },
}
</script>

<style lang="scss">
* {
  font-family: 'Nunito Sans';
}
.section {
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
    &--purplehover {
      font-size: 16px;
      color: #379ed8;
      &:hover {
        color: #2e76a0;
        cursor: pointer;
      }
    }
  }
  &__blacktext {
    font-size: 20px;
    color: black;
    &:hover {
      text-decoration: none;
      color: black;
    }
  }
  &__paragraph {
    font-size: 16px;
    color: rgb(155, 155, 155);
    &:hover {
      text-decoration: none;
      color: rgb(155, 155, 155);
    }
  }
  &__introduction {
    padding-top: 0px;
    padding-bottom: 20px;
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
.card {
  background-color: #efefef;
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
@media screen and (max-width: 600px) {
  .section {
    &__title {
      font-size: 28px;
    }
  }
}
</style>
