<template>
  <div>
    <section id="introduction" class="section__introduction">
      <b-container>
        <b-row class="my-5">
          <b-col cols="12" sm="6">
            <p class="section__text mb-3">
              <span class="section__text--purple"> Portal Geologi </span>
              Yogyakarta
            </p>
            <h1 class="section__title mb-3">
              INFORMASI GEOLOGI DAN SINGKAPAN BATUAN DI WILAYAH YOGYAKARTA
            </h1>
            <p class="section__text mb-2">
              <span class="section__text--purple"> Cari lokasi </span> batuan
              yang ingin dipelajari
            </p>
            <p class="section__text mb-2">
              <span class="section__text--purple"> Telusuri info </span> batuan
              di Yogyakarta
            </p>
            <p class="section__text mb-3">
              <span class="section__text--purple"> Ikut berkontribusi </span>
              dalam bidang Geologi
            </p>
            <base-button class="mb-5"> Lihat Peta </base-button>
          </b-col>
          <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center my-3 my-md-0"
          >
            <b-img src="../assets/img/animasi-1.png" fluid />
          </b-col>
        </b-row>
      </b-container>
    </section>
    <section id="peta">
      <b-container>
        <b-col>
          <b-row>
            <b-col class="text-center">
              <h1 class="section__title mt-5 mb-5">PETA GEOLOGI</h1>
            </b-col>
          </b-row>
          <div id="map-wrap" style="height: 100vh">
            <client-only>
              <l-map :zoom="9" :center="[-7.6145, 110.7122]">
                <l-tile-layer
                  url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                ></l-tile-layer>
                <l-geo-json :geojson="geojson"></l-geo-json>
                <!-- <l-marker :lat-lng="[-7.872954, 110.1440792]"></l-marker> -->
              </l-map>
            </client-only>
          </div>
        </b-col>
      </b-container>
    </section>
  </div>
</template>

<script>
// import { Carousel, Slide } from 'vue-carousel'

export default {
  layout: 'landingpagelogin',
  data: () => {
    return {
      geojson: null,
    }
  },
  async created() {
    const response = await fetch(
      'https://raw.githubusercontent.com/Litosite/GeoJSON/main/Geology-DIY.geojson'
    )
    this.geojson = await response.json()
  },
}
</script>

<style lang="scss" scoped>
* {
  font-family: 'Nunito Sans';
}
.section {
  &__title {
    font-size: 36px;
    font-weight: bold;
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
    padding-top: 0px;
    padding-bottom: 20px;
  }
  &__testimonial {
    text-align: center;
    padding-top: 60px;
    padding-bottom: 60px;
    background: grey;
  }
}
@media screen and (max-width: 600px) {
  .section {
    &__title {
      font-size: 25px;
    }
    &__text {
      font-size: 18px;
    }
  }
}
</style>
