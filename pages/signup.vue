<template>
  <b-row class="mx-0">
    <b-col cols="12" md="7" lg="7" xl="7" class="content-desktop p-0">
      <div class="align-items-center">
        <b-img
          class="backgroundSignup"
          src="../assets/img/welcome-signup.png"
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
      <p class="signup__text text-center mt-2">Sign up for an account</p>
      <b-form class="d-flex flex-column" @submit.prevent="handleSubmit">
        <base-input
          id="email"
          v-model="form.email"
          label="Email"
          type="email"
          size="large"
          placeholder="Input your Email"
          required
        />
        <base-input
          id="password"
          v-model="form.password1"
          label="Password"
          size="large"
          placeholder="Input your Password"
          required
          :type="isPaswordVisible ? 'text' : 'password'"
          :append="isPaswordVisible ? 'eye' : 'eye-slash'"
          @click="togglePassword"
        />
        <span class="signup__note"
          >Your password must be at least 8 characters.</span
        >
        <base-input
          id="confirmPassword"
          v-model="form.password2"
          label="Re-type password"
          size="large"
          placeholder="Re-enter password"
          required
          class="mt-3"
          :type="isConfirmPaswordVisible ? 'text' : 'password'"
          :append="isConfirmPaswordVisible ? 'eye' : 'eye-slash'"
          @click="toggleConfirmPassword"
        />
        <base-button
          type="submit"
          :disabled="isLoading || areAllInputsEmpty"
          class="mx-auto mt-4"
        >
          <span>Sign Up</span>
        </base-button>
      </b-form>
      <b-link
        to="/login"
        class="signup__link d-flex justify-content-center mb-5 mt-3"
      >
        Sign in instead
      </b-link>
    </b-col>
  </b-row>
</template>

<script>
export default {
  middleware: 'role',
  props: {
    isLink: {
      type: Boolean,
      default: false,
    },
  },
  data: () => {
    return {
      form: {
        email: '',
        password1: '',
        password2: '',
      },
      isPaswordVisible: false,
      isConfirmPaswordVisible: false,
      isLoading: false,
    }
  },
  computed: {
    areAllInputsEmpty() {
      return Object.values(this.form).some((value) => !value)
    },
  },
  methods: {
    togglePassword() {
      this.isPaswordVisible = !this.isPaswordVisible
    },
    toggleConfirmPassword() {
      this.isConfirmPaswordVisible = !this.isConfirmPaswordVisible
    },
    handleSubmit() {
      const { email, password1, password2 } = this.form
      const { token } = this.$route.query
      const query = {}
      if (password1 !== password2) {
        this.$swal({
          title: 'Both passwords must match',
          icon: 'warning',
          showCloseButton: true,
        })
      }
      if (token) {
        query.token = token
      }
      this.isLoading = true
      this.$store
        .dispatch('createUser', [{ email, password1, password2 }, query])
        .then(({ message }) => {
          this.isLoading = false
          this.$router.push(`/login`)
        })
        .catch(() => (this.isLoading = false))
    },
  },
}
</script>

<style lang="scss" scoped>
* {
  font-family: 'Nunito Sans';
}
.signup {
  &__text {
    font-size: 14px;
  }
  &__link {
    font-size: 12px;
    color: rgb(0, 162, 255);
  }
  &__note {
    font-size: 12px;
    color: gray;
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
.backgroundSignup {
  width: 100%;
  height: auto;
}
@media screen and (max-width: 600px) {
  .content-desktop {
    display: none;
  }
}
</style>
