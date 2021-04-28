<template>
  <div>
    <section id="introduction" class="section__introduction">
      <b-container>
        <b-row class="mt-4">
          <b-col class="d-flex my-auto">
            <b-link class="tabs mb-0 mr-5" @click="lapanganLink()">
              Data Lapangan
            </b-link>
            <b-link class="tabs mb-0 mr-5" @click="petrografiLink()">
              Data Lab Petrografi
            </b-link>
            <b-link class="tabs tabs--active"> Data Lab Paleontologi </b-link>
          </b-col>
        </b-row>
        <b-row class="mt-5">
          <b-col cols="12" class="text-center col-md-8 mx-auto">
            <h1 class="section__title my-4">
              DATA HASIL LABORATORIUM PALEONTOLOGI
            </h1>
          </b-col>
        </b-row>
        <b-col
          v-if="!rockById.paleolabs.length"
          cols="12"
          class="section__emptyState text-center mt-1 col-md-8 mx-auto"
        >
          <b-img src="../../../../../assets/img/animasi-3.png" fluid />
        </b-col>
        <div v-else>
          <b-row>
            <b-col cols="12" class="col-md-8 mt-1 mx-auto mt-0 mt-md-3">
              <table
                v-for="item in rockById.paleolabs"
                id="table-detail"
                :key="item.id"
              >
                <tbody v-if="!item.foram.length && item.nanno.length">
                  <tr>
                    <th>Jenis Fossil:</th>
                    <td>{{ item.jenis }}</td>
                  </tr>
                  <tr>
                    <th>Umur Batuan:</th>
                    <td>{{ item.umurBatuan }}</td>
                  </tr>
                  <tr>
                    <th>Age Zone:</th>
                    <td>{{ item.zona }}</td>
                  </tr>
                  <tr>
                    <th>Abundance:</th>
                    <td>{{ item.abundance }}</td>
                  </tr>
                  <tr v-for="itemNanno in item.nanno" :key="itemNanno.id">
                    <th>Spesies Nannofossil:</th>
                    <td>{{ itemNanno.spesies }}</td>
                  </tr>
                  <tr v-for="itemNanno in item.nanno" :key="itemNanno.id">
                    <th>Attachment:</th>
                    <td>
                      <b-img :src="itemNanno.image" fluid />
                    </td>
                  </tr>
                </tbody>
                <tbody v-else-if="item.foram.length && !item.nanno.length">
                  <tr>
                    <th>Jenis Fossil:</th>
                    <td>{{ item.jenis }}</td>
                  </tr>
                  <tr>
                    <th>Umur Batuan:</th>
                    <td>{{ item.umurBatuan }}</td>
                  </tr>
                  <tr>
                    <th>Age Zone:</th>
                    <td>{{ item.zona }}</td>
                  </tr>
                  <tr>
                    <th>Abundance:</th>
                    <td>{{ item.abundance }}</td>
                  </tr>
                  <tr v-for="itemForam in item.foram" :key="itemForam.id">
                    <th>Planktonic Fossil Name:</th>
                    <td>{{ itemForam.planktonic }}</td>
                  </tr>
                  <tr v-for="itemForam in item.foram" :key="itemForam.id">
                    <th>Benthic Fossil Name:</th>
                    <td>{{ itemForam.benthic }}</td>
                  </tr>
                  <tr v-for="itemForam in item.foram" :key="itemForam.id">
                    <th>Depositional Environment:</th>
                    <td>{{ itemForam.depositional }}</td>
                  </tr>
                  <tr v-for="itemForam in item.foram" :key="itemForam.id">
                    <th>Attachment:</th>
                    <td>
                      <p>1. Planktonic Fossil Image</p>
                      <b-img :src="itemForam.planktonicImg" fluid />
                      <p>2. Benthic Fossil Image</p>
                      <b-img :src="itemForam.benthicImg" fluid />
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
// import '../../../../../assets/img/animasi-3.png'
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
