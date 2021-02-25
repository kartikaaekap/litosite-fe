<template>
  <div>
    <section id="introduction" class="section__introduction">
      <b-container>
        <b-row class="mt-3">
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
    <section>
      <b-container>
        <b-row class="py-5 order-2 order-sm-1 order-md-1">
          <b-col class="text-left">
            <div class="d-flex">
              <div class="mr-0 mr-md-5">
                <div class="h1 pb-0 d-flex">
                  <b-icon icon="file-text" color="#337EE1" />
                  <b-col cols="12 pb-2">
                    <p class="status__text mb-0 pb-0">Total Data yang Dibuat</p>
                    <p class="status__title">10</p>
                  </b-col>
                </div>
                <div class="h1 d-flex">
                  <b-icon icon="file-text" color="#F73A18" />
                  <b-col cols="12 pb-2">
                    <p class="status__text mb-0 pb-0">Menunggu Konfirmasi</p>
                    <p class="status__title">6</p>
                  </b-col>
                </div>
              </div>
              <div>
                <div class="h1 d-flex">
                  <b-icon icon="file-text" color="#F73A18" />
                  <b-col cols="12 pb-2">
                    <p class="status__text mb-0 pb-0">Data Diterima</p>
                    <p class="status__title">6</p>
                  </b-col>
                </div>
                <div class="h1 d-flex">
                  <b-icon icon="file-text" color="#3B3B3B" />
                  <b-col cols="12">
                    <p class="status__text mb-0 pb-0">Data Ditolak</p>
                    <p class="status__title">1</p>
                  </b-col>
                </div>
              </div>
            </div>
          </b-col>
          <b-col>
            <pie-chart
              :donut="true"
              :data="[
                ['Validating', 3],
                ['Accepted', 6],
                ['Rejected', 1],
              ]"
              :colors="['#E3CF1B', '#24C021', '#F73A18']"
            ></pie-chart
          ></b-col>
        </b-row>
      </b-container>
    </section>
    <!-- <section id="chart" class="section__chart">
      <b-container>
        <b-row class="py-5 order-2 order-sm-1 order-md-1">
          <b-col class="text-left">
            <div class="h1 pb-0 d-flex">
              <b-icon icon="file-text" color="#337EE1" />
              <b-col cols="12 pb-2">
                <p class="status__text mb-0 pb-0">Menunggu Konfirmasi</p>
                <p class="status__title">3</p>
              </b-col>
            </div>
            <div class="h1 d-flex">
              <b-icon icon="file-text" color="#F73A18" />
              <b-col cols="12 pb-2">
                <p class="status__text mb-0 pb-0">Data Diterima</p>
                <p class="status__title">6</p>
              </b-col>
            </div>
            <div class="h1 d-flex">
              <b-icon icon="file-text" color="#3B3B3B" />
              <b-col cols="12">
                <p class="status__text mb-0 pb-0">Data Ditolak</p>
                <p class="status__title">1</p>
              </b-col>
            </div>
          </b-col>
          <pie-chart
            :donut="true"
            :data="[
              ['Menunggu Konfirmasi', 3],
              ['Data Diterima', 6],
              ['Data Ditolak', 1],
            ]"
            :colors="['#E3CF1B', '#24C021', '#F73A18']"
            width="200px"
            height="250px"
          />
        </b-row>
      </b-container>
    </section> -->
  </div>
</template>

<script>
import Vue from 'vue'
import Chart from 'chart.js'
import Chartkick from 'vue-chartkick'
// import { Carousel, Slide } from 'vue-carousel'

Vue.use(Chartkick.use(Chart))

export default {
  components: {},
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
  &__introduction {
    padding-top: 90px;
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
