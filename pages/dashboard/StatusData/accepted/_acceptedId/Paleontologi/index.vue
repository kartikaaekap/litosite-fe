<template>
  <div>
    <section id="introduction" class="section__introduction">
      <div fluid class="breadcrumb__container">
        <b-breadcrumb>
          <b-breadcrumb-item
            href="/dashboard/InputData/"
            class="ml-3 pl-0 ml-md-5 pl-md-4"
            >Input Data</b-breadcrumb-item
          >
          <b-breadcrumb-item href="/dashboard/StatusData/"
            >Status Data</b-breadcrumb-item
          >
          <b-breadcrumb-item href="/dashboard/StatusData/"
            >Data Diterima</b-breadcrumb-item
          >
          <b-breadcrumb-item active
            >Details Data Laboratorium</b-breadcrumb-item
          >
        </b-breadcrumb>
      </div>
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
          <p>
            Anda belum menginput data hasil laboratorium paleontologi untuk
            batuan ini. Klik button di bawah ini untuk menginput data hasil
            laboratorium.
          </p>
          <base-button class="mb-5 mt-4" @click="inputPaleo()">
            Input Hasil Lab
          </base-button>
        </b-col>
        <div v-else>
          <b-row>
            <b-col cols="12" class="col-md-8 mt-1 mx-auto mt-0 mt-md-3">
              <table
                id="table-detail"
                v-for="item in rockById.paleolabs"
                :key="item.id"
              >
                <tbody v-if="item.foram.length && !item.nanno.length">
                  <tr>
                    <th>Jenis Fossil:</th>
                    <td>{{ item.jenis }}</td>
                  </tr>
                  <tr>
                    <th>Umur Batuan:</th>
                    <td>{{ item.umur_batuan }}</td>
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
                      <b-img :src="itemForam.planktonic_img" fluid />
                      <p>2. Benthic Fossil Image</p>
                      <b-img :src="itemForam.benthic_img" fluid />
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
export default {
  layout: 'landingpagelogin',
  async asyncData({ store, params }) {
    return {
      rockById: await store.dispatch('getRockById', params.acceptedId),
    }
  },
  data: () => {
    return {}
  },
  methods: {
    lapanganLink() {
      this.$router.push(
        `/dashboard/StatusData/accepted/${this.$route.params.acceptedId}`
      )
    },
    petrografiLink() {
      this.$router.push(
        `/dashboard/StatusData/accepted/${this.$route.params.acceptedId}/Petrografi`
      )
    },
    inputPaleo() {
      this.$router.push(
        `/dashboard/StatusData/accepted/${this.$route.params.acceptedId}/Paleontologi/InputPaleo`
      )
    },
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
  &__emptyState {
    font-size: 20px;
    color: rgb(155, 155, 155);
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
.breadcrumb {
  background-color: #6a40951a;
  padding: 10px 0;
}
.center {
  margin-left: auto;
  margin-right: auto;
}
.breadcrumb-item {
  * {
    font-family: 'Nunito Sans';
    font-size: 14px;
    font-weight: bold;
    color: #8e8e8e;
  }
  &.active * {
    color: #e3bb1b;
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
@media screen and (max-width: 600px) {
  .section {
    &__title {
      font-size: 28px;
    }
  }
}
</style>
