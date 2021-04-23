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
              <l-map :zoom="9" :center="[-7.6145, 110.7122]">
                <!-- <l-map :zoom="8" :center="[47.31322, -1.319482]"> -->
                <l-tile-layer
                  url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                ></l-tile-layer>
                <l-geo-json
                  :geojson="geojson"
                  :options="options"
                  :options-style="styleFunction"
                ></l-geo-json>
                <!-- <l-marker :lat-lng="markerLatLng"></l-marker> -->
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
        this.getColor.f = feature.properties.FORMATION
        this.styleFunction.color = null
        // console.log(feature.properties.FORMATION)
        // console.log(feature.properties.SYMBOLS)
        // console.log(this.styleFunction.fillColor)
      }
    },
    getColor(f) {
      return f === 'Andesite'
        ? '#FF4269'
        : f === 'LavaDomeandFlow'
        ? '#FF6E83'
        : f === 'Dacite'
        ? '#F70D3D'
        : f === 'BrecciatedRocks'
        ? '#974788'
        : f === 'Metamorphicrock'
        ? '#DA255C'
        : f === 'AvalancheDep.(Ladus)FromNueeArdente'
        ? '#FF6650'
        : f === 'Alluvium'
        ? '#F7FFE5'
        : f === 'Alluvium'
        ? '#F7FFE5'
        : f === 'Alluvium'
        ? '#F7FFE5'
        : f === 'Alluvium'
        ? '#E4ECEA'
        : f === 'Alluvium'
        ? '#F7FFE5'
        : f === 'Coastaldeposits'
        ? '#E5E8D3'
        : f === 'Volcanicbreccia'
        ? '#FE9A56'
        : f === 'BaturetnoFormation'
        ? '#EDF8FA'
        : f === 'Colluvium'
        ? '#FFFDD5'
        : f === 'Cinderconeashdeposits'
        ? '#F99C94'
        : f === 'Condongvolcanic'
        ? '#893243'
        : f === 'GilipetungVolcanic'
        ? '#E0A13B'
        : f === 'GiantiVolcanics'
        ? '#FFA3A6'
        : f === 'JembanganVolcanic'
        ? '#D497A1'
        : f === 'LawuLahar'
        ? '#FCFCFC'
        : f === 'SumbingLava'
        ? '#CD3146'
        : f === 'YoungvolcanicdepositsofMerapi'
        ? '#FFE8D6'
        : f === 'OldVolcanicDepositsofMerapiVolcano'
        ? '#F45940'
        : f === 'KabuhFormation'
        ? '#F8EC14'
        : f === 'KaligetasFormation'
        ? '#F4C090'
        : f === 'Andesiteporphyryandlahar'
        ? '#8F0E19'
        : f === 'NotopuroFormation'
        ? '#FBC5C1'
        : f === 'PucanganFormation'
        ? '#F5E464'
        : f === 'SumbingVolcanics'
        ? '#A6667F'
        : f === 'OldSumbingVolcanics'
        ? '#E77634'
        : f === 'OldSumbingVolcanics'
        ? '#FFAB78'
        : f === 'SundoroVolcanic'
        ? '#ED5B84'
        : f === 'Terracedeposits'
        ? '#FEF9D4'
        : f === 'OlderAluvium'
        ? '#FDFFF4'
        : f === 'DamarFormation'
        ? '#FFE6A4'
        : f === 'LigungFormation'
        ? '#F8BF9D'
        : f === 'UndifferentiatedVolcanicRocks'
        ? '#EEB193'
        : f === 'NanggulanFormation'
        ? '#D2F6C9'
        : f === 'WungkalFormation'
        ? '#7EC288'
        : f === 'JonggranganFormation'
        ? '#65BF81'
        : f === 'KerekFormation'
        ? '#DFD42D'
        : f === 'NampolFormation'
        ? '#FFD894'
        : f === 'FormasiNgalanggran'
        ? '#FFAC8F'
        : f === 'OyoFormation'
        ? '#FEFFD5'
        : f === 'PenosoganFormation'
        ? '#FFF0B4'
        : f === 'HalangFormation'
        ? '#FBC064'
        : f === 'HalangFormation'
        ? '#EBDC73'
        : f === 'KalibengFormation'
        ? '#C5E0DB'
        : f === 'KepekFormation'
        ? '#58C6CF'
        : f === 'SentoloFormation'
        ? '#FEFCD4'
        : f === 'SemilirFormation'
        ? '#FFF3D2'
        : f === 'SemilirFormation'
        ? '#FFCB78'
        : f === 'SambipituFormation'
        ? '#FBFDCE'
        : f === 'WuniFormation'
        ? '#FFDE57'
        : f === 'WaturandaFormation'
        ? '#FFE200'
        : f === 'WonosariFormation'
        ? '#4C99D7'
        : f === 'WaturondaFormation'
        ? '#FA9F58'
        : f === 'KebobutakFormation'
        ? '#FFCC4F'
        : f === 'KebobutakFormation'
        ? '#FFA886'
        : f === 'MandalikaFormation'
        ? '#FD8063'
        : f === 'TotoganFormation'
        ? '#EFD509'
        : f === 'Penduldiorite'
        ? '#FF6E96'
        : f === 'PenironFormation'
        ? '#FAD1CA'
        : '#FABDA4'
    },
    styleFunction(feature) {
      return {
        fillColor: this.getColor(),
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
