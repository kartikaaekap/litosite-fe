<template>
  <div>
    <section id="introduction" class="section__introduction">
      <b-container>
        <b-row class="mt-3">
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
              <b-tab title="Upload Dari Excel" />
              <b-tab title="Input Secara Langsung" class="mb-0 mb-md-3">
                <b-form class="d-flex flex-column">
                  <b-row>
                    <b-col class="text-center">
                      <h1 class="section__title mt-5 mb-5">
                        INPUT DATA HASIL LAPANGAN
                      </h1>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col class="col-12 col-md-8 mx-auto">
                      <base-input
                        id="author"
                        v-model="form.author"
                        label="Author Name"
                        placeholder="Input author name"
                        warning-icon
                        required
                      />
                      <base-input
                        id="lithology"
                        v-model="form.lithology"
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
                        id="formation"
                        v-model="form.formation"
                        label="Formation"
                        :options="formationOptions"
                        warning-icon
                        required
                      />
                      <base-input
                        id="year"
                        v-model="form.year"
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
                    </b-col>
                  </b-row>
                  <base-button class="mb-5 mt-5 mx-auto"> Kirim </base-button>
                </b-form>
              </b-tab>
            </b-tabs>
          </b-col>
        </b-row>
      </b-container>
    </section>
  </div>
</template>

<script>
import BaseInputSelect from '~/components/BaseInputSelect.vue'
// import { Carousel, Slide } from 'vue-carousel'

export default {
  components: { BaseInputSelect },
  layout: 'landingpagelogin',
  data: () => {
    return {
      form: {
        author: '',
        lithology: '',
        type: '',
        typeDetail: '',
        ageZone: '',
        formation: '',
        year: '',
        location: '',
        latitude: '',
        longitude: '',
        altitude: '',
      },
      typeOptions: [
        { value: '', text: 'Select type' },
        { value: 'sedimen', text: 'Sedimen' },
        { value: 'metamorf', text: 'Metamorf' },
        { value: 'beku', text: 'Beku' },
      ],
      ageZoneOptions: [
        { value: '', text: 'Select age zone' },
        { value: 'pilosen', text: 'Pilosen (N18-N21)' },
        { value: 'milosen-akhir', text: 'Milosen Akhir (N13-N17)' },
        { value: 'milosen-tengah', text: 'Milosen Tengah (N9-N12)' },
        { value: 'milosen-awal', text: 'Milosen Awal (N4-N8)' },
        { value: 'oligosen-akhir', text: 'Oligosen Akhir (P21-P22)' },
        { value: 'oligosen-awal', text: 'Oligosen Awal (P18-P20)' },
        { value: 'eosen-akhir', text: 'Eosen Akhir (P15-P17)' },
        { value: 'eosen-tengah', text: 'Eosen Tengah (P10-P14)' },
        { value: 'eosen-awal', text: 'Eosen Awal (P5-P9)' },
      ],
      formationOptions: [
        { value: '', text: 'Select formation' },
        { value: 'wungkal-gamping', text: 'Wungkal Gamping' },
        { value: 'kebo-butak', text: 'Kebo Butak' },
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
    }
  },
  // computed: {
  //   ctaLink () {
  //     return this.user ? (this.user.isAdmin ? '/admin' : '/dashboard') : '/signup'
  //   }
  // }
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
  }
  &__introduction {
    padding-top: 90px;
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
