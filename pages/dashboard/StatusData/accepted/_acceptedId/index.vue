<template>
  <div>
    <!-- <section id="breadcrumb" class="section__breadcrumb">
      <b-row class="mt-3">
        <b-container> <b-breadcrumb :items="items"></b-breadcrumb></b-container>
      </b-row>
    </section> -->
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
          <b-breadcrumb-item active>Details Data Lapangan</b-breadcrumb-item>
        </b-breadcrumb>
      </div>
      <b-container>
        <b-row class="mt-4">
          <b-col class="d-flex my-auto">
            <b-link class="tabs tabs--active mb-0 mr-5"> Data Lapangan </b-link>
            <b-link class="tabs mb-0 mr-5" @click="petrografiLink()">
              Data Lab Petrografi
            </b-link>
            <b-link class="tabs" @click="paleontologiLink()">
              Data Lab Paleontologi
            </b-link>
          </b-col>
        </b-row>
        <b-row class="mt-5">
          <b-col class="text-center">
            <h1 class="section__title my-4">DATA HASIL LAPANGAN</h1>
          </b-col>
        </b-row>
        <b-row class="text-center">
          <b-col cols="12" class="text-center col-md-8 mt-1 mx-auto">
            <table>
              <tr>
                <th>Author Name:</th>
                <td>{{ rockApproved.author }}</td>
              </tr>
              <tr>
                <th>Lithology Name:</th>
                <td>{{ rockApproved.lithology_name }}</td>
              </tr>
              <tr>
                <th>Type:</th>
                <td>{{ rockApproved.type }}</td>
              </tr>
              <tr>
                <th>Type Detail:</th>
                <td>{{ rockApproved.type_detail }}</td>
              </tr>
              <tr>
                <th>Age Zone:</th>
                <td>{{ rockApproved.age_zone }}</td>
              </tr>
              <tr>
                <th>Formation:</th>
                <td>{{ rockApproved.rock_formation }}</td>
              </tr>
              <tr>
                <th>Year Researched:</th>
                <td>{{ rockApproved.year_research }}</td>
              </tr>
              <tr>
                <th>Location:</th>
                <td>{{ rockApproved.location }}</td>
              </tr>
              <tr>
                <th>Latitude:</th>
                <td>{{ rockApproved.latitude }}</td>
              </tr>
              <tr>
                <th>Longitude:</th>
                <td>{{ rockApproved.longitude }}</td>
              </tr>
              <tr>
                <th>Altitude:</th>
                <td>{{ rockApproved.altitude }}</td>
              </tr>
              <tr>
                <th>Strike / Dip:</th>
                <td>{{ rockApproved.strike }} / {{ rockApproved.dip }}</td>
              </tr>
              <tr>
                <th>Attachment:</th>
                <td>{{ rockApproved.images }}</td>
              </tr>
            </table>
          </b-col>
        </b-row>
      </b-container>
    </section>
  </div>
</template>

<script>
export default {
  layout: 'landingpagelogin',
  async asyncData({ store, params }) {
    return {
      rockPending: await store.dispatch('getRockPending'),
      rockApproved: await store.dispatch('getRockApproved', params.acceptedId),
      rockRejected: await store.dispatch('getRockRejected'),
    }
  },
  data: () => {
    return {
      items: [
        {
          text: 'Input Data',
          href: '#',
        },
        {
          text: 'Status Data',
          href: '#',
        },
        {
          text: 'Data Diterima',
          href: '#',
        },
        {
          text: 'Details Data Lapangan',
          active: true,
        },
      ],
    }
  },
  methods: {
    petrografiLink() {
      this.$router.push('/dashboard/StatusData/accepted/_acceptedId/Petrografi')
    },
    paleontologiLink() {
      this.$router.push(
        '/dashboard/StatusData/accepted/_acceptedId/Paleontologi'
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
@media screen and (max-width: 600px) {
  .section {
    &__title {
      font-size: 28px;
    }
  }
}
</style>
