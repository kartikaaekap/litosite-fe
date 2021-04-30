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
        <!-- <b-col> -->
        <b-row>
          <b-col class="text-center">
            <h1 class="section__title mt-5 mb-5">PETA GEOLOGI</h1>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12" class="col-md-3 mr-0 pr-0">
            <b-card class="filter-card">
              <p class="section__text--purpleBold text-center mb-4">
                FILTER BATUAN
              </p>
              <base-input-select
                id="filterType"
                v-model="form.filterType"
                label="Pilih filter berdasarkan"
                :options="filterTypeOptions"
              />
              <div v-if="form.filterType === 'tipe'">
                <b-form-group>
                  <b-form-checkbox-group
                    id="selectedType"
                    v-model="selectedType"
                    :options="optionsType"
                    stacked
                  ></b-form-checkbox-group>
                </b-form-group>
              </div>
              <div v-else-if="form.filterType === 'formasi'">
                <b-form-group>
                  <b-form-checkbox-group
                    id="selectedFormation"
                    v-model="selectedFormation"
                    :options="optionsFormation"
                    stacked
                  ></b-form-checkbox-group>
                </b-form-group>
              </div>
              <div v-else-if="form.filterType === 'age'">
                <b-form-group>
                  <b-form-checkbox-group
                    id="selectedAge"
                    v-model="selectedAge"
                    :options="optionsAge"
                    stacked
                  ></b-form-checkbox-group>
                </b-form-group>
              </div>
              <!-- <div v-if="toggleFilterType === false">
                <div class="d-flex">
                  <p class="mr-3 section__text-filter">Tipe Batuan</p>
                  <b-icon
                    class="h4"
                    icon="chevron-up"
                    color="#e3bb1b"
                    style="cursor: pointer"
                    @click="showListType()"
                  />
                </div>
              </div>
              <div v-else>
                <div class="d-flex">
                  <p class="mr-3 section__text-filter">Tipe Batuan</p>
                  <b-icon
                    class="h4"
                    icon="chevron-down"
                    color="#e3bb1b"
                    style="cursor: pointer"
                    @click="hideListType()"
                  />
                </div>
                <div v-for="(typeRock, index) in optionsType" :key="typeRock">
                  <label
                    ><input
                      type="checkbox"
                      :value="index"
                      v-model="selectedType"
                      :disabled="
                        selectedType.length >= max &&
                        selectedType.indexOf(index) == -1
                      "
                    />
                    {{ typeRock }}</label
                  >
                </div>
              </div> -->
            </b-card>
          </b-col>
          <b-col cols="12" class="col-md-9 ml-0 pl-0">
            <div id="map" style="height: 100vh">
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
                    <!-- <l-icon
                    :icon-size="dynamicSize"
                    :icon-anchor="dynamicAnchor"
                    icon-url="../assets/img/hammer.png"
                  >
                  </l-icon> -->
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
        </b-row>
        <!-- </b-col> -->
      </b-container>
    </section>
  </div>
</template>

<script>
// import '../assets/img/hammer.png'
export default {
  layout: 'landingpage',
  async asyncData({ store }) {
    return {
      pinPoints: await store.dispatch('getPinPoints'),
      getSedimen: await store.dispatch('getSedimenRock'),
      getMetamorf: await store.dispatch('getMetamorfRock'),
      getBeku: await store.dispatch('getBekuRock'),
    }
  },
  data: () => {
    return {
      geojson: null,
      enableTooltip: true,
      iconSize: 64,
      optionsType: [
        // 'Sedimen',
        // 'Metamorf',
        // 'Beku',
        { value: 'sedimen', text: 'Sedimen', notEnabled: false },
        { value: 'metamorf', text: 'Metamorf', notEnabled: false },
        { value: 'beku', text: 'Beku', notEnabled: false },
      ],
      optionsFormation: [
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
      optionsAge: [
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
      toggleFilterType: false,
      selectedType: [],
      selectedFormation: [],
      selectedAge: [],
      max: 1,
      form: {
        filterType: '',
      },
      filterTypeOptions: [
        { value: '', text: 'Pilih filter' },
        { value: 'tipe', text: 'Tipe Batuan' },
        {
          value: 'formasi',
          text: 'Formasi Batuan',
        },
        {
          value: 'age',
          text: 'Age Zone',
        },
      ],
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
        this.styleFunction.fillColor = feature.properties.fill
        // this.getColor.featureColor = feature.properties.FORMATION
        this.styleFunction.color = null
        // console.log(feature.properties.FORMATION)
        layer.bindTooltip(
          '<div>Nama Formasi Batuan:' +
            feature.properties.NAME +
            '</div><div>Nama Lembar: ' +
            feature.properties.NM_LEMBAR +
            '</div>',
          { permanent: false, sticky: true }
        )
      }
    },
    styleFunction() {
      // console.log(this.getColor(feature.properties.FORMATION))
      // console.log(feature.properties.fill)
      return {
        // fillColor: feature.properties.fill,
        fillColor: '',
        fillOpacity: 0.8,
        color: '',
      }
    },
    showMarker() {
      const sedimenRock = this.getSedimen
      const metamorfRock = this.getMetamorf
      const bekuRock = this.getBeku
      const allPoints = this.pinPoints
      if (this.selectedType === 'sedimen') {
        return {
          sedimenRock,
        }
      } else if (this.selectedType === 'metamorf') {
        return {
          metamorfRock,
        }
      } else if (this.selectedType === 'beku') {
        return {
          bekuRock,
        }
      } else {
        return {
          allPoints,
        }
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
      this.$router.push(`/dashboard/details/${id}`)
    },
    showListType() {
      this.toggleFilterType = true
    },
    hideListType() {
      this.toggleFilterType = false
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
    &--purpleBold {
      font-size: 20px;
      color: #6a4095;
      font-weight: bold;
    }
  }
  &__text-filter {
    font-weight: bold;
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
.filter-card {
  border-color: #e3bb1b;
  border-right-color: white;
  border-width: 1.5px;
  height: 610px;
}
</style>
