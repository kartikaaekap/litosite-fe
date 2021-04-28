<template>
  <div>
    <section id="introduction" class="section__introduction">
      <b-container>
        <b-row class="mt-4">
          <b-col class="d-flex my-auto">
            <b-link class="tabs tabs--active mb-0 mr-5"> Data Lapangan </b-link>
            <b-link class="tabs mb-0 mr-5"> Data Lab Petrografi </b-link>
            <b-link class="tabs"> Data Lab Paleontologi </b-link>
          </b-col>
        </b-row>
        <b-row class="mt-5">
          <b-col class="text-center">
            <h1 class="section__title my-4">DATA HASIL LAPANGAN</h1>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12" class="col-md-8 mt-1 mx-auto mt-0 mt-md-3">
            <table id="table-detail">
              <tbody>
                <tr>
                  <th>Author Name:</th>
                  <td>{{ rockById.author }}</td>
                </tr>
                <tr>
                  <th>Lithology Name:</th>
                  <td>{{ rockById.lithologyName }}</td>
                </tr>
                <tr>
                  <th>Type:</th>
                  <td>{{ rockById.type }}</td>
                </tr>
                <tr>
                  <th>Type Detail:</th>
                  <td>{{ rockById.typeDetail }}</td>
                </tr>
                <tr>
                  <th>Age Zone:</th>
                  <td>{{ rockById.ageZone }}</td>
                </tr>
                <tr>
                  <th>Formation:</th>
                  <td>{{ rockById.rockFormation }}</td>
                </tr>
                <tr>
                  <th>Year Researched:</th>
                  <td>{{ rockById.yearResearch }}</td>
                </tr>
                <tr>
                  <th>Location:</th>
                  <td>{{ rockById.location }}</td>
                </tr>
                <tr>
                  <th>Latitude:</th>
                  <td>{{ rockById.latitude }}°</td>
                </tr>
                <tr>
                  <th>Longitude:</th>
                  <td>{{ rockById.longitude }}°</td>
                </tr>
                <tr>
                  <th>Altitude:</th>
                  <td>{{ rockById.altitude }}°</td>
                </tr>
                <tr>
                  <th>Strike / Dip:</th>
                  <td>{{ rockById.strike }}° / {{ rockById.dip }}°S</td>
                </tr>
                <tr v-for="item in rockById.images" :key="item.id">
                  <th>Attachment:</th>
                  <td>
                    <b-img :src="item.image" fluid />
                  </td>
                </tr>
              </tbody>
            </table>
          </b-col>
        </b-row>
      </b-container>
    </section>
  </div>
</template>

<script>
// import '../../../../assets/img/'
export default {
  layout: 'landingpagelogin',
  async asyncData({ store, params }) {
    return {
      rockById: await store.dispatch('getRockById', params.detailsloginId),
    }
  },
  data: () => {
    return {}
  },
  computed: {},

  methods: {},
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
