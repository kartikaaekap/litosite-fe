<template>
  <div>
    <top-navigation-login />
    <div class="content pb-5">
      <nuxt />
    </div>
    <footer class="section__footer py-3 px-0">
      <b-row class="mx-0 my-0 my-md-4">
        <b-col md="2" class="text-md-left text-center">
          <b-img src="../assets/img/logo-putih.png" fluid />
        </b-col>
        <b-col md="3" class="text-md-left text-center">
          <p class="section__text--white mb-1">
            LitoSite adalah sebuah portal informasi litologi. Dilengkapi dengan
            peta geologi DIY, Anda dapat melakukan filter batuan berdasarkan
            tipenya dan melihat detail informasi dari batuan tersebut.
          </p>
        </b-col>
        <b-col cols="12" md="4" class="text-md-right text-center">
          <p class="section__text--whiteBold mb-1">Our Developer Teams</p>
          <div class="section__text--white">
            <p class="mb-1">Kartika Eka Putri</p>
            <p class="mb-1">Theofilus Marcel I.S</p>
            <p class="mb-1">Taris Hibatul Haqqi</p>
          </div>
        </b-col>
        <b-col cols="12" md="3" class="text-md-right text-center">
          <ul class="px-2 mb-0">
            <li
              v-for="(link, filename) in socialMedia"
              :key="filename"
              :link="link"
            >
              <a :href="link" class="mx-3">
                <b-img
                  width="24"
                  :src="require(`~/assets/img/icon-sosmed/${filename}.svg`)"
                  fluid
                />
              </a>
            </li>
          </ul>
        </b-col>
      </b-row>
    </footer>
    <footer class="section__footerDark py-3 px-0">
      <b-row class="align-items-center mx-0">
        <b-col md="3" />
        <b-col cols="12" md="6">
          <ul class="px-2 mb-0 text-center">
            <li>
              <p class="section__text--white mb-sm-0">
                Design By : @LitoSite2020
              </p>
            </li>
          </ul>
        </b-col>
        <b-col cols="12" md="3" class="text-md-right text-center">
          <p class="section__text--white mb-0">Version 1.0.0</p>
        </b-col>
      </b-row>
    </footer>
  </div>
</template>

<script>
import TopNavigationLogin from '~/components/TopNavigationLogin'

export default {
  components: { TopNavigationLogin },
  data: () => {
    return {
      socialMedia: {
        facebook: 'https://www.facebook.com/qatrosdotcom',
        instagram: 'https://instagram.com/qatros.teknologi?igshid=gr1y32ryqlqx',
        twitter: 'https://twitter.com/Qatrosteknologi?s=08',
      },
    }
  },
}
</script>

<style lang="scss" scoped>
* {
  font-family: 'Nunito Sans';
}
.section {
  &__footer {
    background: #6a4095;
    ul li {
      list-style: none;
      display: inline-block;
    }
  }
  &__footerDark {
    background: #492869;
    ul li {
      list-style: none;
      display: inline-block;
    }
  }
  &__company {
    font-size: 18px;
    strong {
      font-weight: bold;
    }
    &--white {
      color: white;
    }
  }
  &__text {
    font-size: 16px;
    &--white {
      color: white;
    }
    &--whiteBold {
      color: white;
      font-weight: bolder;
    }
  }
}
</style>
