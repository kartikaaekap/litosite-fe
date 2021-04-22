<template>
  <div class="content admin">
    <top-navigation-admin />
    <b-container>
      <b-row tag="section">
        <b-col cols="auto" md="0" class="column px-0">
          <side-navigation :menus="menus" />
        </b-col>
        <b-col class="column px-3 py-4">
          <nuxt />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import SideNavigation from '~/components/SideNavigation'
import TopNavigationAdmin from '~/components/TopNavigationAdmin'

export default {
  components: { SideNavigation, TopNavigationAdmin },
  data: () => ({
    menus: [
      {
        icon: 'house-door',
        name: 'Beranda',
        path: '/verifikator/',
      },
      {
        icon: 'stopwatch',
        name: 'Menunggu Konfirmasi',
        path: '/verifikator/menunggu-konfirmasi/',
      },
      {
        icon: 'file-earmark-check',
        name: 'Data Diterima',
        path: '/verifikator/data-diterima/',
      },
      {
        icon: 'file-earmark-excel',
        name: 'Data Ditolak',
        path: '/verifikator/data-ditolak/',
      },
    ],
  }),
}
</script>

<style lang="scss">
.content {
  background-color: rgb(255, 255, 255);
  min-height: 100vh;
  max-width: 100vw;
  padding-top: 70px;
  padding-bottom: 20px;
  overflow-y: hidden;
  &.admin {
    min-height: unset;
    height: 100vh;
  }
  .column {
    height: calc(100vh - 70px);
    overflow-y: scroll;
  }
}
</style>
