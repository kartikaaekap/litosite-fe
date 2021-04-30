<template>
  <div>
    <section id="introduction" class="section__introduction">
      <div fluid class="breadcrumb__container">
        <b-breadcrumb>
          <b-breadcrumb-item
            href="/dashboard/InputData/"
            class="ml-3 pl-0 ml-md-5 pl-md-4"
            >Input Data</b-breadcrumb-item
          >
          <b-breadcrumb-item href="/dashboard/StatusData/"
            >Status Data</b-breadcrumb-item
          >
          <b-breadcrumb-item href="/dashboard/StatusData/"
            >Data Diterima</b-breadcrumb-item
          >
          <b-breadcrumb-item @click="paleontologiLink"
            >Details Data Laboratorium</b-breadcrumb-item
          >
          <b-breadcrumb-item active
            >Input Data Lab Paleontologi</b-breadcrumb-item
          >
        </b-breadcrumb>
      </div>
      <b-container>
        <b-row class="mt-5">
          <b-col cols="12" class="text-center col-md-8 mx-auto">
            <h1 class="section__title my-4">
              INPUT DATA HASIL LABORATORIUM PALEONTOLOGI
            </h1>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12" class="col-md-8 mx-auto">
            <b-col>
              <base-input-select
                id="fosilType"
                v-model="form.fosilType"
                label="Jenis Fosil"
                :options="fosilTypeOptions"
                warning-icon
                required
              />
              <base-input
                id="ageRock"
                v-model="form.ageRock"
                label="Umur Batuan"
                placeholder="Input umur batuan"
                warning-icon
                required
              />
              <base-input-select
                id="ageZone"
                v-model="form.ageZone"
                label="Age Zone"
                :options="ageZoneOptions"
                warning-icon
                required
              />
              <base-input
                id="abundance"
                v-model="form.abundance"
                label="Abundance"
                placeholder="Input abundance"
                warning-icon
                required
              />
            </b-col>
            <base-button
              type="submit"
              :disabled="isLoading || areAllInputsEmpty"
              class="mx-auto mt-5"
              is-full
              @click="submitPaleoRock()"
            >
              Selanjutnya
            </base-button>
          </b-col>
        </b-row>
      </b-container>
    </section>
  </div>
</template>

<script>
export default {
  // components: { FormWizard, TabContent },
  layout: 'landingpagelogin',
  data: () => {
    return {
      form: {
        fosilType: '',
        ageRock: null,
        ageZone: '',
        abundance: '',
      },
      // formSecond: {
      //   planktonic: '',
      //   benthic: '',
      // },
      fosilTypeOptions: [
        { value: '', text: 'Select type' },
        { value: 'Foraminifera', text: 'Foraminifera' },
        {
          value: 'Nannofossil/Nannoplankton',
          text: 'Nannofossil/Nannoplankton',
        },
      ],
      ageZoneOptions: [
        { value: '', text: 'Select age zone' },
        { value: 'pilosen', text: 'Pilosen (N18-N21)' },
        { value: 'milosenAkhir', text: 'Milosen Akhir (N13-N17)' },
        { value: 'milosenTengah', text: 'Milosen Tengah (N9-N12)' },
        { value: 'milosenAwal', text: 'Milosen Awal (N4-N8)' },
        { value: 'oligosenAkhir', text: 'Oligosen Akhir (P21-P22)' },
        { value: 'oligosenAwal', text: 'Oligosen Awal (P18-P20)' },
        { value: 'eosenAkhir', text: 'Eosen Akhir (P15-P17)' },
        { value: 'eosenTengah', text: 'Eosen Tengah (P10-P14)' },
        { value: 'eosenAwal', text: 'Eosen Awal (P5-P9)' },
      ],
      isLoading: false,
    }
  },
  computed: {
    areAllInputsEmpty() {
      return Object.values(this.form).some((value) => !value)
    },
  },
  methods: {
    paleontologiLink() {
      this.$router.push(
        `/dashboard/StatusData/accepted/${this.$route.params.acceptedId}/Paleontologi`
      )
    },
    async submitPaleoRock() {
      // const { id } = this.$route.params.acceptedId
      const { fosilType } = this.form
      try {
        await this.$axios
          .$post(
            `http://ec2-54-198-153-24.compute-1.amazonaws.com/api/contrib-rock/${this.$route.params.acceptedId}/paleo`,
            {
              jenis: this.form.fosilType,
              umurBatuan: this.form.ageRock,
              zona: this.form.ageZone,
              abundance: this.form.abundance,
            }
          )
          // await this.$store
          //   .dispatch('createRockPaleo', [
          //     id,
          //     {
          //       jenis: this.form.fosilType,
          //       umur_batuan: this.form.ageRock,
          //       zona: this.form.ageZone,
          //       abundance: this.form.abundance,
          //     },
          //   ])
          .then((response) => {
            this.$swal({
              title: 'Berhasil menyimpan data',
              icon: 'success',
              showCloseButton: true,
            })
            // console.log(response.data.id)
            // console.log(response.id)
            console.log(response.id)
            if (fosilType === 'Foraminifera') {
              this.$router.push(
                `/dashboard/StatusData/accepted/${this.$route.params.acceptedId}/Paleontologi/InputPaleo/foram/${response.id}`
              )
            } else if (fosilType === 'Nannofossil/Nannoplankton') {
              this.$router.push(
                `/dashboard/StatusData/accepted/${this.$route.params.acceptedId}/Paleontologi/InputPaleo/nannofossil/${response.id}`
              )
            }
          })
      } catch (error) {
        console.log(error)
        this.$swal({
          title: 'Data yang dimasukkan salah',
          icon: 'error',
          showCloseButton: true,
        })
      }
    },
  },
}
</script>

<style lang="scss">
* {
  font-family: 'Nunito Sans';
}
.section {
  &__title {
    font-size: 36px;
    font-weight: bold;
    color: black;
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
    &--purplehover {
      font-size: 16px;
      color: #379ed8;
      &:hover {
        color: #2e76a0;
        cursor: pointer;
      }
    }
  }
  &__blacktext {
    font-size: 20px;
    color: black;
    font-weight: 600;
    &:hover {
      text-decoration: none;
      color: black;
    }
  }
  &__paragraph {
    font-size: 16px;
    color: rgb(155, 155, 155);
    &:hover {
      text-decoration: none;
      color: rgb(155, 155, 155);
    }
  }
  &__introduction {
    padding-top: 0px;
    padding-bottom: 20px;
  }
  &__form {
    font-size: 16px;
    color: black;
    padding-top: 10px;
  }
  &__depth {
    color: black;
    margin-right: 10px;
  }
  &__emptyState {
    font-size: 20px;
    color: rgb(155, 155, 155);
  }
}
.tabs {
  font-size: 20px;
  color: rgb(155, 155, 155);
  font-weight: bold;
  &--active {
    font-weight: bold;
    color: black;
    border-bottom: 5px solid #e3bb1b;
  }
  &:hover {
    text-decoration: none;
    color: rgb(94, 94, 94);
  }
}
.breadcrumb {
  background-color: #6a40951a;
  padding: 10px 0;
}
.center {
  margin-left: auto;
  margin-right: auto;
}
.breadcrumb-item {
  * {
    font-family: 'Nunito Sans';
    font-size: 14px;
    font-weight: bold;
    color: #8e8e8e;
  }
  &.active * {
    color: #e3bb1b;
  }
}
@media screen and (max-width: 600px) {
  .section {
    &__title {
      font-size: 28px;
    }
  }
}
</style>
