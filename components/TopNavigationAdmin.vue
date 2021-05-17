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
                  >Features amazing star light</base-button
                >
                <base-button
                  variant="textWhite"
                  is-long
                  class="d-none d-md-flex"
                  >Features Very Unique</base-button
                >
                <base-button
                  variant="textWhite"
                  is-long
                  class="d-none d-md-flex"
                  >Pricing in cheap ya guys</base-button
                >
                <base-button
                  variant="textWhite"
                  is-long
                  class="d-none d-md-flex mr-3"
                  >Help</base-button
                >
              </template>
              <dropdown-menu v-model="isDropdownOpen" right hover>
                <base-button
                  id="user"
                  variant="primary"
                  icon="person-fill"
                  size="small"
                  icon-only
                  class="ml-3"
                  is-circle
                />
                <div slot="dropdown">
                  <template>
                    <p
                      v-if="this.$auth.user.nama === null"
                      class="profil__name pl-2 py-0 mt-0"
                    >
                      Admin Litosite
                    </p>
                    <p v-else class="profil__name pl-2 py-0 mt-0">
                      {{ this.$auth.user.nama }}
                    </p>
                    <p class="profil__description pl-2 pt-0 pb-3 mt-0">
                      {{ this.$auth.user.email }}
                    </p>
                    <b-link class="dropdown__item p-2" to="/signout">
                      Sign out
                    </b-link>
                  </template>
                </div>
              </dropdown-menu>
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
      color: rgb(36, 152, 219);
    }
  }
  &--shadow {
    box-shadow: 0px 5px 10px rgba(black, 0.12);
    transition: box-shadow 0.2s ease-in-out;
  }
}
.white-text {
  color: white;
}
.profil {
  &__name {
    font-size: 16px;
    font-weight: bold;
    color: rgb(92, 89, 89);
  }
  &__description {
    font-size: 13px;
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
