<template>
  <b-col
    tag="aside"
    class="sidebar p-0"
    :class="{ 'sidebar--open': isSidebarOpen }"
  >
    <div class="sidebar__menu">
      <b-nav vertical>
        <div class="sidebar__menu--top px-3">
          <sidebar-menu
            v-for="menu in filteredMenus"
            :key="menu.name"
            :name="menu.name"
            :icon="menu.icon"
            :path="menu.path"
            :pages="menu.pages"
          />
        </div>
      </b-nav>
    </div>
  </b-col>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import SidebarMenu from '~/components/SidebarMenu'

export default {
  name: 'SideNavigation',
  components: { SidebarMenu },
  props: {
    menus: {
      type: Array,
      default: () => [
        {
          icon: 'house-door',
          name: 'Beranda',
          path: '/verifikator/',
        },
      ],
    },
  },
  data: () => ({
    search: '',
  }),
  computed: {
    ...mapState(['isSidebarOpen']),
    filteredMenus() {
      const flattenedMenus = []
      this.menus.forEach((menu) => {
        if (!menu.pages) {
          flattenedMenus.push(menu)
        } else {
          menu.pages.forEach((submenu) => flattenedMenus.push(submenu))
        }
      })
      const filteredMenus = this.search
        ? flattenedMenus.filter(({ name }) => {
            return name
              .toLowerCase()
              .split(' ')
              .join()
              .includes(this.search.trim().toLowerCase())
          })
        : this.menus
      return filteredMenus
    },
  },
  methods: {
    ...mapMutations(['toggleSidebar']),
  },
}
</script>

<style lang="scss" scoped>
* {
  font-family: 'Nunito Sans';
}
.sidebar {
  min-width: 200px;
  height: calc(100vh - 70px);
  background-color: white;
  border-right: 2px solid rgb(235, 235, 235);
  transition: transform 0.2s ease-in-out;
  &__menu {
    ul {
      height: 100%;
      justify-content: space-between;
    }
    &--top {
      margin-top: 20px;
    }
    &--bottom {
      margin-bottom: 10px;
      width: 100%;
    }
  }
  @media (max-width: 767.98px) {
    position: fixed;
    left: 0;
    z-index: 1040;
    transform: translateX(-100%);
    &--open {
      transform: translateX(0);
    }
  }
}
</style>
