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
          <b-breadcrumb-item
            href="/dashboard/StatusData/accepted/_acceptedId/Petrografi"
            >Details Data Laboratorium</b-breadcrumb-item
          >
          <b-breadcrumb-item active>Input Data Laboratorium</b-breadcrumb-item>
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
            <form-wizard
              ref="wizard"
              title=""
              subtitle=""
              class="mx-auto"
              step-size="xs"
              color="#E3BB1B"
              error-color="#24C021"
            >
              <tab-content title="Pilih jenis fosil" class="mb-5">
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
              </tab-content>
              <tab-content title="Input data fosil" class="mb-5">
                <b-col v-if="form.fosilType === 'foraminifera'">
                  <base-input
                    id="planktonic"
                    v-model="formSecond.planktonic"
                    label="Planktonic Fossil Name"
                    placeholder="Input planktonic fossil name"
                    warning-icon
                    required
                  />
                  <base-input
                    id="benthic"
                    v-model="formSecond.benthic"
                    label="Benthic Fossil Name"
                    placeholder="Input benthic fossil name"
                    warning-icon
                    required
                  />
                  <base-input-select
                    id="depositional"
                    v-model="formSecond.depositional"
                    label="Depositional Environment"
                    :options="depositionalOptions"
                    warning-icon
                    required
                  />
                  <div class="section__blacktext">
                    Attachment <b-icon icon="paperclip" />
                  </div>
                  <p class="section__paragraph">
                    Supported format: .JPG, .JPEG, .PNG,
                  </p>
                  <div>
                    <p>1. Planktonic</p>
                    <b-card class="card py-5">
                      <div class="text-center section__text--purplehover">
                        <b-icon icon="card-image" font-scale="2" />
                        <p>Tambah Foto</p>
                      </div>
                    </b-card>
                  </div>
                  <div class="mt-4">
                    <p>2. Benthic</p>
                    <b-card class="card py-5">
                      <div class="text-center section__text--purplehover">
                        <b-icon icon="card-image" font-scale="2" />
                        <p>Tambah Foto</p>
                      </div>
                    </b-card>
                  </div>
                </b-col>
                <b-col v-else-if="form.fosilType === 'nannofossil'">
                  <base-input
                    id="planktonic"
                    v-model="formSecond.planktonic"
                    label="Planktonic Fossil Name"
                    placeholder="Input planktonic fossil name"
                    warning-icon
                    required
                  />
                  <div class="section__blacktext">
                    Attachment <b-icon icon="paperclip" />
                  </div>
                  <p class="section__paragraph">
                    Supported format: .JPG, .JPEG, .PNG,
                  </p>
                  <div>
                    <p>1. Planktonic</p>
                    <b-card class="card py-5">
                      <div class="text-center section__text--purplehover">
                        <b-icon icon="card-image" font-scale="2" />
                        <p>Tambah Foto</p>
                      </div>
                    </b-card>
                  </div>
                  <div>
                    <p>2. Benthic</p>
                    <b-card class="card py-5">
                      <div class="text-center section__text--purplehover">
                        <b-icon icon="card-image" font-scale="2" />
                        <p>Tambah Foto</p>
                      </div>
                    </b-card>
                  </div>
                </b-col>
              </tab-content>
              <template slot="footer" slot-scope="props">
                <div class="text-center">
                  <base-button
                    v-if="!props.isLastStep"
                    id="btnNext"
                    slot="next"
                    variant="primary"
                    :disabled="isLoading || areAllInputsEmpty"
                    is-full
                    class="text-center"
                    @click.native="props.nextTab(), submitnext()"
                    >Selanjutnya</base-button
                  >
                  <base-button
                    v-else
                    id="btnSubmit"
                    slot="next"
                    variant="primary"
                    :disabled="isLoading || areAllInputsSecondEmpty"
                    is-full
                    class="text-center"
                    @click.native="submitform()"
                  >
                    {{ props.isLastStep ? 'Kirim' : 'Selanjutnya' }}
                  </base-button>
                </div>
              </template>
            </form-wizard>
          </b-col>
        </b-row>
      </b-container>
    </section>
  </div>
</template>

<script>
import { FormWizard, TabContent } from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'

export default {
  components: { FormWizard, TabContent },
  layout: 'landingpagelogin',
  data: () => {
    return {
      form: {
        fosilType: '',
        ageRock: '',
        ageZone: '',
        abundance: '',
      },
      formSecond: {
        planktonic: '',
        benthic: '',
      },
      fosilTypeOptions: [
        { value: '', text: 'Select type' },
        { value: 'foraminifera', text: 'Foraminifera' },
        { value: 'nannofossil', text: 'Nannofossil/Nannoplankton' },
      ],
      ageZoneOptions: [
        { value: '', text: 'Select age zone' },
        { value: 'pilosen', text: 'Pilosen (N18-N21)' },
        { value: 'milosen-akhir', text: 'Milosen Akhir (N13-N17)' },
        { value: 'milosen-tengah', text: 'Milosen Tengah (N9-N12)' },
        { value: 'milosen-awal', text: 'Milosen Awal (N4-N8)' },
        { value: 'oligosen-akhir', text: 'Oligosen Akhir (P21-P22)' },
        { value: 'oligosen-awal', text: 'Oligosen Awal (P18-P20)' },
        { value: 'eosen-akhir', text: 'Eosen Akhir (P15-P17)' },
        { value: 'eosen-tengah', text: 'Eosen Tengah (P10-P14)' },
        { value: 'eosen-awal', text: 'Eosen Awal (P5-P9)' },
      ],
      isLoading: false,
    }
  },
  computed: {
    areAllInputsEmpty() {
      return Object.values(this.form).some((value) => !value)
    },
    areAllInputsSecondEmpty() {
      return Object.values(this.formSecond).some((value) => !value)
    },
  },
  methods: {
    submitform() {
      const { fosilType } = this.form
      if (fosilType === 'foraminifera') {
        this.$swal({
          title: 'This is foraminifera',
          icon: 'warning',
          showCloseButton: true,
        })
      } else if (fosilType === 'nannofossil') {
        this.$swal({
          title: 'This is nannofossil',
          icon: 'warning',
          showCloseButton: true,
        })
      }
    },
    submitnext() {
      this.$swal({
        title: 'Cobain dulu',
        icon: 'warning',
        showCloseButton: true,
      })
    },
  },
  // computed: {
  //   ctaLink () {
  //     return this.user ? (this.user.isAdmin ? '/admin' : '/dashboard') : '/signup'
  //   }
  // }
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
    padding-top: 90px;
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
