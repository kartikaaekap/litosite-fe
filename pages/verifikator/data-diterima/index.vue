<template>
  <div>
    <b-row>
      <b-col>
        <base-title v-if="!rockApprovedValidator.length"
          >DATA DITERIMA (0)</base-title
        >
        <base-title v-else
          >DATA DITERIMA ({{ rockApprovedValidator.length }})</base-title
        >
      </b-col>
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
