<template>
  <div>
    <section id="introduction" class="section__introduction">
      <b-container>
        <b-row class="my-5">
          <b-col cols="12" sm="6">
            <p class="section__text mb-3">
              <span class="section__text--purple"> Portal Geologi </span>
              Yogyakarta
            </p>
            <h1 class="section__title mb-3">
              INFORMASI GEOLOGI DAN SINGKAPAN BATUAN DI WILAYAH YOGYAKARTA
            </h1>
            <p class="section__text mb-2">
              <span class="section__text--purple"> Cari lokasi </span> batuan
              yang ingin dipelajari
            </p>
            <p class="section__text mb-2">
              <span class="section__text--purple"> Telusuri info </span> batuan
              di Yogyakarta
            </p>
            <p class="section__text mb-3">
              <span class="section__text--purple"> Ikut berkontribusi </span>
              dalam bidang Geologi
            </p>
            <base-button class="mb-5"> Lihat Peta </base-button>
          </b-col>
          <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center my-3 my-md-0"
          >
            <b-img src="../assets/img/animasi-1.png" fluid />
          </b-col>
        </b-row>
      </b-container>
    </section>
    <section id="peta">
      <b-container>
        <b-col>
          <b-row>
            <b-col class="text-center">
              <h1 class="section__title mt-5 mb-5">PETA GEOLOGI</h1>
            </b-col>
          </b-row>
        </b-col>
      </b-container>
    </section>
  </div>
</template>

<script>
// import { Carousel, Slide } from 'vue-carousel'

export default {
  layout: 'landingpagelogin',
  data: () => {
    return {
      testimonials: [
        {
          id: 1,
          testi:
            'getdebug’s great! The service helped us a lot in finding bugs in our system. I can’t reccomend them enough. Keep it up!',
          client: 'Budi',
          company: ' PT. Fiction Labs',
        },
        {
          id: 2,
          testi:
            'Disini banyak sekali freelancer QA yang bisa membantu perkembangan dalam pengembangan perusahaan kami',
          client: 'Joko',
          company: 'PT. Hokya Hokya',
        },
        {
          id: 3,
          testi:
            'Berkat GetDeBug perusahaan saya yang tidak memiliki QA bisa sangat terbantu, dan kami jadi dapat menemukan masalah dengan cepat, thank you..',
          client: 'Alien',
          company: 'PT. Abadi',
        },
      ],
    }
  },
  // computed: {
  //   ctaLink () {
  //     return this.user ? (this.user.isAdmin ? '/admin' : '/dashboard') : '/signup'
  //   }
  // }
}
</script>

<style lang="scss" scoped>
* {
  font-family: 'Nunito Sans';
}
.section {
  &__title {
    font-size: 36px;
    font-weight: bold;
    &--white {
      color: white;
    }
  }
  &__subtitle {
    font-size: 24px;
    &--white {
      color: white;
      font-weight: 300;
    }
  }
  &__text {
    font-size: 20px;
    &--purple {
      color: #6a4095;
    }
  }
  &__introduction {
    padding-top: 90px;
    padding-bottom: 20px;
  }
  &__testimonial {
    text-align: center;
    padding-top: 60px;
    padding-bottom: 60px;
    background: grey;
  }
}
@media screen and (max-width: 600px) {
  .section {
    &__title {
      font-size: 25px;
    }
    &__text {
      font-size: 18px;
    }
  }
}
</style>
