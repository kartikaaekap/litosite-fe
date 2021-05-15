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
            <base-button class="mb-5" to="#peta"> Lihat Peta </base-button>
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
          <div id="map-wrap" class="bundle-map">
            <client-only>
              <l-map :zoom="9" :center="[-7.6145, 110.7122]">
                <l-tile-layer
                  url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                ></l-tile-layer>
                <l-geo-json
                  :geojson="geojson"
                  :options="options"
                  :options-style="styleFunction"
                ></l-geo-json>
                <l-marker
                  v-for="points in pinPoints"
                  :key="points.id"
                  :lat-lng="[points.latitude, points.longitude]"
                >
                  <l-popup>
                    <table id="table-detail">
                      <tbody>
                        <tr>
                          <th>Lithology Name:</th>
                          <td>{{ points.lithologyName }}</td>
                        </tr>
                        <tr>
                          <th>Type:</th>
                          <td>{{ points.type }}</td>
                        </tr>
                        <tr>
                          <th>Type Detail:</th>
                          <td>{{ points.typeDetail }}</td>
                        </tr>
                        <tr>
                          <th>Age Zone:</th>
                          <td>{{ points.ageZone }}</td>
                        </tr>
                      </tbody>
                    </table>
                    <b-link
                      class="text-center"
                      @click="handleDetailsRock(points.id)"
                      ><p>Lihat Detail Batuan</p></b-link
                    >
                  </l-popup>
                </l-marker>
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
  async asyncData({ store }) {
    return {
      pinPoints: await store.dispatch('getPinPoints'),
    }
  },
  data: () => {
    return {
      geojson: null,
      enableTooltip: true,
      iconSize: 64,
    }
  },
  computed: {
    dynamicSize() {
      return [this.iconSize, this.iconSize * 1.15]
    },
    dynamicAnchor() {
      return [this.iconSize / 2, this.iconSize * 1.15]
    },
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
        console.log(feature)
        layer.bindTooltip(
          '<div>Nama Formasi Batuan:' +
            feature.properties.NAME +
            '</div><div>Nama Lembar: ' +
            feature.properties.NM_LEMBAR +
            '</div>',
          { permanent: false, sticky: true }
        )
        layer.setStyle({ fillColor: feature.properties.fill })
      }
    },
    styleFunction() {
      return {
        fillColor: '',
        fillOpacity: 0.8,
        color: '',
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
    handleDetailsRock(id) {
      this.$router.push(`/dashboard/detailslogin/${id}`)
    },
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
.bundle-map {
  height: 100vh;
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
  .bundle-map {
    height: 50vh;
  }
}
</style>
