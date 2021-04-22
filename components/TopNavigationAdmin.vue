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
          <!-- <b-col cols="4" md="2" class="d-flex px-0 px-md-3">
            <b-navbar-brand href="#" class="d-flex px-0 px-md-3">
              <b-img src="~/assets/img/logo-litosite.png" fluid />
            </b-navbar-brand>
          </b-col> -->
          <b-col cols="4" md="2" class="d-flex px-0">
            <base-logo is-link class="mx-auto mx-md-0" />
          </b-col>
          <dropdown-menu v-model="isDropdownOpen" right hover>
            <base-button
              id="user"
              variant="primary"
              icon="person-fill"
              size="small"
              class="ml-3"
              icon-only
              is-circle
            />
            <div slot="dropdown">
              <template v-if="isAuthenticated">
                <p class="profil__name pl-2 py-2 mb-0">Kartika Eka Putri</p>
                <p class="profil__description pl-2 pb-2 mt-0">
                  {{ loggedInUser.username }}
                </p>
                <b-link class="dropdown__item p-2" to="/signout">
                  Sign out
                </b-link>
              </template>
              <template v-else>
                <b-link
                  class="dropdown__item p-2"
                  to="/signout"
                  @click="$auth.logout()"
                >
                  Sign out
                </b-link>
              </template>
            </div>
          </dropdown-menu>
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
        </b-navbar>
        <div class="sidebar__menu px-3">
          <b-nav vertical>
            <div class="sidebar__menu--top">
              <template v-if="$route.path === '/'">
                <base-button variant="text" is-full to="/">Home</base-button>
              </template>
            </div>
            <div class="sidebar__menu--bottom">
              <base-button variant="secondary" to="/signin" is-full
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
import { mapState, mapMutations, mapGetters } from 'vuex'
import DropdownMenu from '@innologica/vue-dropdown-menu'

export default {
  name: 'TopNavigationAdmin',
  components: { DropdownMenu },
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
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
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
    a {
      color: blue;
    }
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
