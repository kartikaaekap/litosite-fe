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
            <base-button class="mb-5" @click="cobaMap">
              Lihat Peta
            </base-button>
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
          <div id="map" style="height: 100vh">
            <client-only>
              <l-map
                :zoom="9"
                :center="[-7.6145, 110.7122]"
                :options="options"
                :options-style="styleFunction"
              >
                <!-- <l-map :zoom="8" :center="[47.31322, -1.319482]"> -->
                <l-tile-layer
                  url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                ></l-tile-layer>
                <l-geo-json
                  :geojson="geojson"
                  :options="options"
                  :options-style="styleFunction"
                ></l-geo-json>
                <l-marker :lat-lng="markerLatLng"></l-marker>
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
  layout: 'landingpage',
  async asyncData({ store }) {
    return {
      pinPoints: await store.dispatch('getPinPoints'),
    }
  },
  data: () => {
    return {
      geojson: null,
      enableTooltip: true,
      // markerLatLng: ['-7.614500000000000', '110.712200000000000'],
    }
  },
  computed: {
    options() {
      return {
        onEachFeature: this.onEachFeatureFunction,
      }
    },
    onEachFeatureFunction() {
      if (!this.enableTooltip) {
        return () => {}
      }
      return (feature, layer) => {
        layer.bindTooltip(
          '<div>Nama Formasi Batuan:' +
            feature.properties.NAME +
            '</div><div>Nama Lembar: ' +
            feature.properties.NM_LEMBAR +
            '</div>',
          { permanent: false, sticky: true }
        )
        this.styleFunction.fillColor = feature.properties.fill
        // console.log(feature.properties.fill)
      }
    },
    styleFunction() {
      return {
        weight: 2,
        color: '#000000',
        opacity: 1,
        fillColor: '',
        fillOpacity: 0.8,
      }
    },
    // markerLatLng() {
    //   for (const index in this.pinPoints) {
    //     return [this.pinPoints[index].latitude, this.pinPoints[index].longitude]
    //   }
    // },
    // eslint-disable-next-line vue/return-in-computed-property
    markerLatLng() {
      const points = this.pinPoints
      // return ['-7.614500000000000', '110.712200000000000']
      // eslint-disable-next-line no-unreachable-loop
      for (const index in points) {
        const latud = points[index].latitude
        const longi = points[index].longitude
        // const arrayPoints = [points[index].latitude, points[index].longitude]
        // for (const index1 in arrayPoints) {

        // }
        // return [latud, longi]
        console.log([latud, longi])
        // return [points[i].latitude, points[i].longitude]
      }
    },
  },
  async created() {
    const response = await fetch(
      'https://raw.githubusercontent.com/Litosite/GeoJSON/main/Geology-DIY.geojson'
    )
    this.geojson = await response.json()
  },
  methods: {
    // cobaMap() {
    //   for (const index in this.pinPoints) {
    //     console.log([
    //       this.pinPoints[index].latitude,
    //       this.pinPoints[index].longitude,
    //     ])
    //   }
    // },
    // markerLatLng() {
    //   for (const index in this.pinPoints) {
    //     [this.pinPoints[index].latitude, this.pinPoints[index].longitude]
    //   }
    // },
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
strong {
  font-weight: bold;
}
</style>
