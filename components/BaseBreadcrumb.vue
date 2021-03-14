<template>
  <b-container fluid class="breadcrumb__container">
    <b-container class="px-0 px-sm-3">
      <b-breadcrumb>
        <b-breadcrumb-item :to="`/${firstItem.to}`" :active="!lastItem">{{
          firstItem.text
        }}</b-breadcrumb-item>
        <template v-if="middleItems.length && screenSize > 575">
          <b-breadcrumb-item
            v-for="(item, index) in middleItems"
            :key="item.text"
            :to="`/${item.to}`"
            :active="index === items.length - 1"
            >{{ item.text }}</b-breadcrumb-item
          >
          <!-- <b-breadcrumb-item v-if="middleItems.text === 'Addons'" disabled /> -->
        </template>
        <b-breadcrumb-item
          v-else-if="middleItems.length && screenSize <= 575"
          active
          >...</b-breadcrumb-item
        >
        <b-breadcrumb-item v-if="lastItem" :to="`/${lastItem.to}`" active>{{
          lastItem.text
        }}</b-breadcrumb-item>
      </b-breadcrumb>
    </b-container>
  </b-container>
</template>

<script>
export default {
  name: 'BaseBreadcrumb',
  data: () => ({
    screenSize: window.innerWidth,
    customRoutes: {
      accepted: 'Data Diterima',
    },
  }),
  computed: {
    items() {
      const routePaths = this.$route.path.split('/').filter((path) => path)
      const routeNames = this.$route.name.split('-')

      return routePaths.map((route, index) => ({
        text: this.customRoutes[routeNames[index]] || routeNames[index],
        to: routePaths.slice(0, routePaths.indexOf(route) + 1).join('/'),
      }))
    },
    firstItem() {
      return this.items[0]
    },
    lastItem() {
      return this.items.length > 1 ? this.items[this.items.length - 1] : null
    },
    middleItems() {
      const items = [...this.items]
      return items.length > 2 ? items.slice(1, items.length - 1) : []
    },
  },
  mounted() {
    this.$nextTick(() => window.addEventListener('resize', this.onResize))
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    onResize(s) {
      this.screenSize = window.innerWidth
    },
  },
}
</script>

<style lang="scss" scoped>
.breadcrumb {
  background-color: rgb(253, 163, 163);
  padding: 10px 0;
  margin: 1rem 0;
  &__container {
    background-color: rgb(255, 196, 196);
  }
}

.breadcrumb-item {
  * {
    font-family: 'Nunito Sans';
    font-size: 14px;
    text-transform: capitalize;
    color: grey;
  }
  &.active * {
    color: black;
  }
}
</style>
