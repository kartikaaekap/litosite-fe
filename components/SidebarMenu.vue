<template>
  <div>
    <b-nav-item
      :to="path"
      exact-active-class="sidebar__menu--active"
      class="sidebar__menu py-0 py-md-2"
      @click="sidebarClose"
    >
      <div class="sidebar__menu--icon">
        <b-icon :icon="icon" />
      </div>
      <span>{{ name }}</span>
    </b-nav-item>
    <template v-if="pages.length">
      <b-nav-item
        v-for="page in pages"
        :key="page.name"
        :to="page.path"
        exact-active-class="sidebar__menu--active"
        class="sidebar__page"
        @click="sidebarClose"
      >
        <div class="sidebar__menu--icon">
          <b-icon :icon="page.icon" />
        </div>
        <span>{{ page.name }}</span>
      </b-nav-item>
    </template>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'SidebarMenu',
  props: {
    name: {
      type: String,
      default: 'Home',
    },
    icon: {
      type: String,
      default: '',
    },
    path: {
      type: String,
      default: '',
    },
    pages: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    ...mapMutations(['toggleSidebar']),
    sidebarClose() {
      this.toggleSidebar(false)
    },
  },
}
</script>

<style lang="scss" scoped>
* {
  font-family: 'Nunito Sans';
}
.sidebar {
  &__menu {
    transition: background 0.1s ease-in;
    a {
      font-size: 16px;
      display: flex;
      height: 40px;
      color: black;
      border-right: 4px solid transparent;
      &.sidebar__menu--active {
        background-color: #6a40951a;
        border-right: 4px solid #e3bb1b;
      }
    }
    &--icon {
      margin-right: 10px;
      position: relative;
      top: -2px;
    }
    &--active {
      background-color: #6a40951a;
    }
    &:hover {
      background-color: #6a40951a;
    }
  }
  &__page {
    a {
      padding-left: 3rem;
    }
  }
}
</style>
