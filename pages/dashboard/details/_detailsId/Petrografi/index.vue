<template>
  <div>
    <section id="introduction" class="section__introduction">
      <b-container>
        <b-row class="mt-4">
          <b-col class="d-flex my-auto">
            <b-link class="tabs mb-0 mr-5" @click="lapanganLink()">
              Data Lapangan
            </b-link>
            <b-link class="tabs tabs--active mb-0 mr-5">
              Data Lab Petrografi
            </b-link>
            <b-link class="tabs" @click="paleontologiLink()">
              Data Lab Paleontologi
            </b-link>
          </b-col>
        </b-row>
        <b-row class="mt-5">
          <b-col cols="12" class="text-center col-md-8 mx-auto">
            <h1 class="section__title my-4">
              DATA HASIL LABORATORIUM PETROGRAFI
            </h1>
          </b-col>
        </b-row>
        <b-col
          v-if="!rockById.petrolabs.length"
          cols="12"
          class="section__emptyState text-center mt-1 col-md-8 mx-auto"
        >
          <b-img src="../../../../../assets/img/animasi-3.png" fluid />
        </b-col>
        <div v-else>
          <b-row>
            <b-col cols="12" class="col-md-8 mt-1 mx-auto mt-0 mt-md-3">
              <table id="table-detail">
                <tbody v-for="item in rockById.petrolabs" :key="item.id">
                  <tr>
                    <th>Lithology Name:</th>
                    <td>{{ item.lithologyName }}</td>
                  </tr>
                  <tr>
                    <th>Petrography Composition:</th>
                    <td>{{ item.composition }}</td>
                  </tr>
                  <tr>
                    <th>Petrography Structure:</th>
                    <td>{{ item.structure }}</td>
                  </tr>
                  <tr>
                    <th>Petrography Texture:</th>
                    <td>{{ item.texture }}</td>
                  </tr>
                  <tr>
                    <th>Petrography Name:</th>
                    <td>{{ item.petroName }}</td>
                  </tr>
                  <tr>
                    <th>Attachment:</th>
                    <td>
                      <p>1. Plane-Polarized Light (PPL)</p>
                      <b-img :src="item.pplImgPath" fluid />
                      <p>2. Crossed-Polarized Light (PPL)</p>
                      <b-img :src="item.cplImgPath" fluid />
                    </td>
                  </tr>
                </tbody>
              </table>
            </b-col>
          </b-row>
        </div>
      </b-container>
    </section>
  </div>
</template>

<script>
// import '../../../../assets/img/'
export default {
  layout: 'landingpage',
  async asyncData({ store, params }) {
    return {
      rockById: await store.dispatch(
        'getRockByIdUnauthorized',
        params.detailsId
      ),
    }
  },
  data: () => {
    return {}
  },
  computed: {},

  methods: {
    lapanganLink() {
      this.$router.push(`/dashboard/details/${this.$route.params.detailsId}`)
    },
    petrografiLink() {
      this.$router.push(
        `/dashboard/details/${this.$route.params.detailsId}/Petrografi`
      )
    },
    paleontologiLink() {
      this.$router.push(
        `/dashboard/details/${this.$route.params.detailsId}/Paleontologi`
      )
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
#table-detail {
  border-collapse: collapse;
  width: 100%;
  border: 1px solid #6a4095;
}

#table-detail td,
#table-detail th {
  padding: 6px;
  border: 1px solid #6a4095;
}

#table-detail td {
  font-size: 16px;
}

#table-detail th {
  padding-top: 6px;
  padding-bottom: 6px;
  background-color: #ffffff;
  color: black;
  font-size: 17px;
}
strong {
  font-weight: bold;
}
</style>
