<template>
  <section>
    <b-row class="mx-0">
      <b-col cols="12" md="7" lg="7" xl="7" class="content-desktop p-0">
        <div class="align-items-center">
          <b-img
            class="backgroundLogin"
            src="../assets/img/welcome-signin.png"
          />
        </div>
      </b-col>
      <b-col
        cols="12"
        md="4"
        lg="4"
        xl="4"
        class="item-align-center ml-0 ml-md-3 ml-lg-4 ml-xl-5 pl-xl-4"
      >
        <div is-link class="logo mt-5">
          <a class="logo__img">
            <b-img src="~/assets/img/logo-litosite-2.png" fluid />
          </a>
        </div>
        <p class="section__text text-center mt-2">Sign in to your account</p>
        <b-form class="d-flex flex-column" @submit.prevent="login">
          <label>Email</label>
          <base-input
            id="email"
            v-model="form.email"
            type="email"
            name="email"
            size="large"
            placeholder="Input your email"
            required
          />
          <label class="mt-3">Password</label>
          <base-input
            id="password"
            v-model="form.password"
            :type="type"
            name="password"
            size="large"
            placeholder="Input your password"
            :append="icon"
            required
            @click="togglePassword"
          />
          <base-button
            type="submit"
            :disabled="isLoading || areAllInputsEmpty"
            class="mx-auto mt-4"
          >
            <span>Sign In</span>
          </base-button>
        </b-form>
        <b-link
          to="/signup"
          class="section__link d-flex justify-content-center mb-5 mt-3"
        >
          Create an account
        </b-link>
      </b-col>
    </b-row>
  </section>
</template>

<script>
import { mapMutations } from 'vuex'
import BaseInput from '~/components/BaseInput'
import BaseButton from '~/components/BaseButton'

export default {
  components: { BaseInput, BaseButton },
  middleware: 'role',
  async asyncData({ store }) {
    return {
      adminList: await store.dispatch('getAdminList'),
    }
  },
  data: () => {
    return {
      form: {
        email: '',
        password: '',
      },
      isPaswordVisible: false,
      isLoading: false,
    }
  },
  computed: {
    type() {
      return this.isPaswordVisible ? 'text' : 'password'
    },
    icon() {
      return this.isPaswordVisible ? 'eye' : 'eye-slash'
    },
    areAllInputsEmpty() {
      return Object.values(this.form).some((value) => !value)
    },
  },
  methods: {
    ...mapMutations(['toggleSidebar']),
    sidebarClose() {
      this.toggleSidebar(false)
    },
    togglePassword(e) {
      this.isPaswordVisible = !this.isPaswordVisible
    },
    async login() {
      // const { email, password } = this.form
      this.isLoading = true
      try {
        // const user = await this.$store.dispatch('login', { email, password })
        // this.$store.commit('setUser', user)
        // this.$axios.setToken(user.token)
        await this.$auth.loginWith('local', {
          data: {
            email: this.form.email,
            password: this.form.password,
          },
        })
        this.isLoading = false
        this.sidebarClose()
        // this.$router.push('/indexlogin')
        let isAdmin = false
        for (const index in this.adminList) {
          if (this.adminList[index].email === this.form.email) {
            isAdmin = true
          }
        }
        if (isAdmin === true) {
          this.$router.push('/verifikator')
        } else {
          this.$router.push('/indexlogin')
        }
      } catch (error) {
        this.$swal({
          title: 'Wrong Email or Password',
          icon: 'warning',
          showCloseButton: true,
        })
        this.isLoading = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
* {
  font-family: 'Nunito Sans';
}
.section {
  &__text {
    font-size: 16px;
  }
  &__link {
    font-size: 12px;
    color: rgb(0, 162, 255);
  }
}
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  &__img {
    img {
      max-height: 80px;
      &.logo__img--small {
        max-height: 50px;
        padding-bottom: 5px;
      }
    }
  }
}
.backgroundLogin {
  width: 100%;
  height: auto;
}
@media screen and (max-width: 600px) {
  .content-desktop {
    display: none;
  }
}
</style>
