<template>
  <b-container fluid class="px-0">
    <b-navbar
      fixed="top"
      class="navbar"
      :class="{ 'navbar--shadow': scrollPosition }"
    >
      <b-container class="px-0 px-md-3">
        <b-row>
          <b-col cols="4" class="d-block d-md-none">
            <base-button
              variant="secondary"
              size="small"
              icon="list"
              icon-only
              @click="toggleSidebar"
            />
          </b-col>
          <b-col cols="4" md="2" class="d-flex px-0 px-md-3">
            <base-logo is-link class="mx-auto mx-md-0" />
          </b-col>
          <b-col cols="4" md="10" class="d-flex justify-content-end ml-auto">
            <b-navbar-nav class="navbar__nav">
              <template>
                <base-button
                  variant="textWhite"
                  is-long
                  class="d-none d-md-flex"
                  >I want to tell you About Us</base-button
                >
                <base-button
                  variant="textWhite"
                  is-long
                  class="d-none d-md-flex"
                  >Features amazing star</base-button
                >
                <base-button
                  variant="textWhite"
                  is-long
                  class="d-none d-md-flex"
                  >Features Very Unique</base-button
                >
                <base-button
                  variant="text"
                  is-long
                  class="mr-3 d-none d-md-flex"
                  to="/"
                >
                  Home
                </base-button>
                <base-button
                  variant="tertiary"
                  size="small"
                  to="/signin"
                  class="d-none d-md-flex"
                  >Sign In</base-button
                >
                <base-button
                  variant="primary"
                  size="small"
                  to="/signup"
                  class="d-none d-sm-flex ml-md-3"
                  >Sign Up</base-button
                >
              </template>
            </b-navbar-nav>
          </b-col>
        </b-row>
      </b-container>
    </b-navbar>
    <aside class="sidebar" :class="{ 'sidebar--open': isSidebarOpen }">
      <b-container class="px-0">
        <b-navbar class="sidebar__header px-0">
          <b-col cols="4" class="d-block d-md-none">
            <base-button
              variant="secondary"
              size="small"
              icon="x"
              icon-only
              @click="toggleSidebar"
            />
          </b-col>
          <b-col cols="4" md="4" class="d-flex px-0 px-md-3">
            <base-logo is-link class="mx-auto mx-md-0" />
          </b-col>
          <b-col cols="4" class="text-right">
            <dropdown-menu v-model="isDropdownOpen" right hover>
              <base-button
                id="user"
                variant="secondary"
                icon="person"
                size="small"
                class="ml-3"
                icon-only
                is-circle
              />
              <div slot="dropdown">
                <b-link class="dropdown__item p-2" to="/signout"
                  >Sign Out</b-link
                >
              </div>
            </dropdown-menu>
          </b-col>
        </b-navbar>
        <div class="sidebar__menu px-3">
          <b-nav vertical>
            <div class="sidebar__menu--top">
              <template v-if="$route.path === '/'">
                <base-button variant="text" is-full to="/" @click="sidebarClose"
                  >Home</base-button
                >
              </template>
            </div>
            <div class="sidebar__menu--bottom">
              <base-button variant="tertiary" to="/signin" is-full
                >Sign In</base-button
              >
              <base-button to="/signup" class="mt-3" is-full
                >Sign Up</base-button
              >
            </div>
          </b-nav>
        </div>
      </b-container>
    </aside>
  </b-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
// import DropdownMenu from '@innologica/vue-dropdown-menu'

export default {
  name: 'TopNavigation',
  // components: { DropdownMenu },
  // async asyncData () {
  //   return {
  //     userAuth: await window.localStorage.getItem('user')
  //   }
  // },
  data: () => {
    return {
      scrollPosition: null,
      isDropdownOpen: false,
    }
  },
  computed: {
    ...mapState(['isSidebarOpen']),
  },
  mounted() {
    window.addEventListener('scroll', this.updateScroll)
  },
  destroy() {
    window.removeEventListener('scroll', this.updateScroll)
  },
  methods: {
    ...mapMutations(['toggleSidebar']),
    updateScroll() {
      this.scrollPosition = window.scrollY
    },
    sidebarClose() {
      this.toggleSidebar(false)
    },
  },
}
</script>

<style lang="scss" scoped>
.navbar {
  background-color: white;
  height: 70px;
  width: 100%;
  &__nav {
    display: flex;
    align-items: center;
  }
  &--shadow {
    box-shadow: 0px 5px 10px rgba(black, 0.12);
    transition: box-shadow 0.2s ease-in-out;
  }
}
.profil {
  &__name {
    font-size: 16px;
    font-weight: bold;
    color: rgb(92, 89, 89);
  }
  &__description {
    font-size: 12px;
    color: grey;
  }
}
.sidebar {
  position: fixed;
  top: 0;
  height: 100vh;
  width: 100%;
  z-index: 1040;
  background-color: white;
  transform: translateX(-100%);
  transition: transform 0.2s ease-in-out;
  &__header {
    height: 70px;
  }
  &__menu {
    ul {
      height: calc(100vh - 70px);
      justify-content: space-between;
    }
    &--top {
      margin-top: 20px;
    }
    &--bottom {
      margin-bottom: 15px;
      width: 100%;
    }
  }
  @media (max-width: 767.98px) {
    &--open {
      transform: translateX(0);
    }
  }
}
</style>
