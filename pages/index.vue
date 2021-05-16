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
          <b-col cols="12" class="col-md-3 mx-0 px-0">
            <b-card class="filter-card mb-3 mb-md-0">
              <p class="section__text--purpleBold text-center mb-4">
                FILTER BATUAN
              </p>
              <!-- <base-input-select
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
              </div> -->
              <div>
                <div v-if="toggleFilterType === false">
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
                  <b-form-group>
                    <b-form-checkbox-group
                      id="selectedType"
                      v-model="selectedType"
                      :options="optionsType"
                      stacked
                    ></b-form-checkbox-group>
                  </b-form-group>
                </div>
              </div>
              <div>
                <div v-if="toggleFilterFormation === false">
                  <div class="d-flex">
                    <p class="mr-3 section__text-filter">Formasi Batuan</p>
                    <b-icon
                      class="h4"
                      icon="chevron-up"
                      color="#e3bb1b"
                      style="cursor: pointer"
                      @click="showListFormation()"
                    />
                  </div>
                </div>
                <div v-else>
                  <div class="d-flex">
                    <p class="mr-3 section__text-filter">Formasi Batuan</p>
                    <b-icon
                      class="h4"
                      icon="chevron-down"
                      color="#e3bb1b"
                      style="cursor: pointer"
                      @click="hideListFormation()"
                    />
                  </div>
                  <b-form-group>
                    <b-form-checkbox-group
                      id="selectedFormation"
                      v-model="selectedFormation"
                      :options="optionsFormation"
                      stacked
                    ></b-form-checkbox-group>
                  </b-form-group>
                </div>
              </div>
              <!-- <div>
                <b-form-group>
                  <b-form-checkbox-group
                    id="selectedAge"
                    v-model="selectedAge"
                    :options="optionsAge"
                    stacked
                  ></b-form-checkbox-group>
                </b-form-group>
              </div> -->
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
                <ul>
                  <li v-if="toggleFilterType === true" class="ml-0">
                    <input
                      type="checkbox"
                      id="Batu Sedimen"
                      v-model="isSedimen"
                      @click="selectAllSedimen()"
                    />
                    <label for="Batu Sedimen">Batu Sedimen</label>
                    <b-icon
                      class="h4"
                      icon="chevron-down"
                      color="#e3bb1b"
                      style="cursor: pointer"
                      @click="dropdownSubTypeSedimen()"
                    />
                  </li>
                  <ul>
                    <li v-if="isSubTypeSedimen" class="ml-1">
                      <input
                        type="checkbox"
                        id="coba1"
                        value="coba1"
                        v-model="selectedFilter.subtypes"
                        @click="selectSedimen()"
                      />
                      <label for="Coba 1">Coba 1</label>
                    </li>
                    <li v-if="isSubTypeSedimen" class="ml-1">
                      <input
                        type="checkbox"
                        id="coba2"
                        value="coba2"
                        v-model="selectedFilter.subtypes"
                        @click="selectSedimen()"
                      />
                      <label for="Coba 2">Coba 2</label>
                    </li>
                  </ul>
                  <li v-if="toggleFilterType === true" class="ml-0">
                    <input
                      type="checkbox"
                      id="Batu Beku"
                      value="Beku"
                      v-model="isBeku"
                      @click="selectAllBeku()"
                    />
                    <label for="Batu Beku">Batu Beku</label>
                    <b-icon
                      class="h4"
                      icon="chevron-down"
                      color="#e3bb1b"
                      style="cursor: pointer"
                      @click="dropdownSubTypeBeku()"
                    />
                  </li>
                  <ul>
                    <li v-if="isSubTypeBeku" class="ml-1">
                      <input
                        type="checkbox"
                        id="coba3"
                        value="coba3"
                        v-model="selectedFilter.subtypes"
                        @click="selectBeku()"
                      />
                      <label for="Coba 3">Coba 3</label>
                    </li>
                  </ul>
                  <li v-if="toggleFilterType === true" class="ml-0">
                    <input
                      type="checkbox"
                      id="Batu Metamorf"
                      value="Metamorf"
                      v-model="selectedFilter.subtypes"
                      @click="closeDetail()"
                    />
                    <label for="Batu Metamorf">Batu Metamorf</label>
                  </li>
                </ul>
              </div> -->
            </b-card>
          </b-col>
          <b-col cols="12" class="col-md-7 mx-0 px-0">
            <div id="map" class="bundle-map">
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
                    v-for="points in showMarker"
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
          <b-col cols="12" class="col-md-2 mx-0 px-0 mt-3 mt-md-0">
            <b-card class="legenda-card my-0 py-0">
              <p class="section__text--black mb-2"><u>KETERANGAN</u></p>
              <p class="mb-0">Skala 1:1.000.000</p>
            </b-card>
            <b-card class="legenda-card my-0 py-0">
              <b-card-text>
                <p class="section__text--black mb-2"><u>LEGENDA</u></p>
                <p class="section__legenda--textBold">
                  Batuan Sedimen dan Batuan Vulkanik yang Berselang-seling
                </p>
                <ul style="list-style-type: none; margin: 0; padding: 0">
                  <li class="section__legenda">
                    <b-icon
                      icon="square-fill"
                      color="#FE9A56"
                      class="border"
                    ></b-icon>
                    Breksi Gunung Api
                  </li>
                  <li class="section__legenda">
                    <b-icon
                      icon="square-fill"
                      color="#7EC288"
                      class="border"
                    ></b-icon>
                    Formasi Wungkal
                  </li>
                  <li class="section__legenda">
                    <b-icon
                      icon="square-fill"
                      color="#FFCC4F"
                      class="border"
                    ></b-icon>
                    Formasi Kebobutak
                  </li>
                  <li class="section__legenda">
                    <b-icon
                      icon="square-fill"
                      color="#FFF3D2"
                      class="border"
                    ></b-icon>
                    Formasi Semilir
                  </li>
                  <li class="section__legenda">
                    <b-icon
                      icon="square-fill"
                      color="#FFAC8F"
                      class="border"
                    ></b-icon>
                    Formasi Nglanggran
                  </li>
                  <li class="section__legenda">
                    <b-icon
                      icon="square-fill"
                      color="#FBFDCE"
                      class="border"
                    ></b-icon>
                    Formasi Sambipitu
                  </li>
                  <li class="section__legenda">
                    <b-icon
                      icon="square-fill"
                      color="#FEFFD5"
                      class="border"
                    ></b-icon>
                    Formasi Oyo
                  </li>
                  <li class="section__legenda">
                    <b-icon
                      icon="square-fill"
                      color="#4C99D7"
                      class="border"
                    ></b-icon>
                    Formasi Wonosari
                  </li>
                  <li class="section__legenda">
                    <b-icon
                      icon="square-fill"
                      color="#58C6CF"
                      class="border"
                    ></b-icon>
                    Formasi Kepek
                  </li>
                  <li class="section__legenda">
                    <b-icon
                      icon="square-fill"
                      color="#D2F6C9"
                      class="border"
                    ></b-icon>
                    Formasi Nanggulan
                  </li>
                  <li class="section__legenda">
                    <b-icon
                      icon="square-fill"
                      color="#FEFCD4"
                      class="border"
                    ></b-icon>
                    Formasi Sentolo
                  </li>
                  <li class="section__legenda">
                    <b-icon
                      icon="square-fill"
                      color="#65BF81"
                      class="border"
                    ></b-icon>
                    F. Jonggrangan
                  </li>
                </ul>
                <p class="section__legenda--textBold mt-3">Batuan Terobosan</p>
                <ul style="list-style-type: none; margin: 0; padding: 0">
                  <li class="section__legenda">
                    <b-icon
                      icon="square-fill"
                      color="#F70D3D"
                      class="border"
                    ></b-icon>
                    Dasit
                  </li>
                  <li class="section__legenda">
                    <b-icon
                      icon="square-fill"
                      color="#FF4269"
                      class="border"
                    ></b-icon>
                    Andesit
                  </li>
                </ul>
              </b-card-text>
            </b-card>
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
      getNglanggran: await store.dispatch('getNglanggranFormation'),
    }
  },
  data: () => {
    return {
      geojson: null,
      enableTooltip: true,
      iconSize: 64,
      isSedimen: false,
      isBeku: false,
      isSubTypeBeku: false,
      isSubTypeSedimen: false,
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
      toggleFilterFormation: false,
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
    // eslint-disable-next-line object-shorthand
    showMarker: function () {
      let markerPoint = this.pinPoints

      if (!this.selectedType.length && !this.selectedFormation.length) {
        return this.pinPoints
      }

      if (this.selectedType.length) {
        markerPoint = markerPoint.filter((point) =>
          this.selectedType.includes(point.type.toLowerCase())
        )
      }

      if (this.selectedFormation.length) {
        markerPoint = markerPoint.filter((point) =>
          this.selectedFormation.includes(point.rockFormation.toLowerCase())
        )
      }
      return markerPoint
    },
    // eslint-disable-next-line object-shorthand
    // showMarker: function () {
    //   const markerPoint = []
    //   console.log(this.selectedType)
    //   if (this.selectedType.includes('sedimen')) {
    //     markerPoint.push(this.getSedimen)
    //   }
    //   if (this.selectedType.includes('metamorf')) {
    //     markerPoint.push(this.getMetamorf)
    //   }
    //   if (this.selectedType.includes('beku')) {
    //     markerPoint.push(this.getBeku)
    //   }
    //   if (this.selectedFormation.includes('nglanggran')) {
    //     return this.getNglanggran
    //   } else {
    //     return this.pinPoints
    //   }
    // },
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
    showListFormation() {
      this.toggleFilterFormation = true
    },
    hideListFormation() {
      this.toggleFilterFormation = false
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
  &__legenda {
    font-size: 14px;
    &--textBold {
      font-size: 14px;
      font-weight: bold;
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
    &--black {
      font-size: 16px;
      color: #000000;
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
}
.legenda-card {
  background-color: #6a40951a;
  border-width: 1.5px;
}
.border-card {
  border-color: #e3bb1b;
  border-width: 1.5px;
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
