<template>
  <div>
    <b-row>
      <b-col>
        <base-title>BERANDA</base-title>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-card class="statistic text-center">
          <span>Menunggu Konfirmasi</span>
          <h2 v-if="!rockPendingValidator.length">0</h2>
          <h2 v-else>{{ rockPendingValidator.length }}</h2>
        </b-card>
      </b-col>
      <b-col>
        <b-card class="statistic text-center">
          <span>Data Diterima</span>
          <h2 v-if="!rockApprovedValidator.length">0</h2>
          <h2 v-else>{{ rockApprovedValidator.length }}</h2>
        </b-card>
      </b-col>
      <b-col>
        <b-card class="statistic text-center">
          <span>Data Ditolak</span>
          <h2 v-if="!rockRejectedValidator.length">0</h2>
          <h2 v-else>{{ rockRejectedValidator.length }}</h2>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="d-flex align-items-center justify-content-center mt-4">
      <b-img src="../../assets/img/animasi.png" fluid />
    </b-row>
  </div>
</template>

<script>
export default {
  layout: 'verifikator',
  async asyncData({ store }) {
    return {
      rockPendingValidator: await store.dispatch('getRockPendingValidator'),
      rockApprovedValidator: await store.dispatch('getRockApprovedValidator'),
      rockRejectedValidator: await store.dispatch('getRockRejectedValidator'),
    }
  },
}
</script>

<style lang="scss" scoped>
* {
  font-family: 'Nunito Sans';
}
.statistic {
  background-color: #6a40951a;
  &__text {
    font-size: 16px;
  }
  h2 {
    font-weight: bold;
  }
}
</style>
