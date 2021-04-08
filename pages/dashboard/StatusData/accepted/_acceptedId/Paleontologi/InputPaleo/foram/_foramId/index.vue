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
          <b-breadcrumb-item @click="inputPaleontologiLink"
            >Input Data Lab Paleontologi</b-breadcrumb-item
          >
          <b-breadcrumb-item active>Input Foraminifera</b-breadcrumb-item>
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
          <b-col cols="12" class="col-md-8 mt-3 mx-auto">
            <b-col>
              <base-input
                id="planktonic"
                v-model="form.planktonic"
                label="Planktonic Fossil Name"
                placeholder="Input planktonic fossil name"
                warning-icon
                required
              />
              <base-input
                id="benthic"
                v-model="form.benthic"
                label="Benthic Fossil Name"
                placeholder="Input benthic fossil name"
                warning-icon
                required
              />
              <base-input-select
                id="depositional"
                v-model="form.depositional"
                label="Depositional Environment"
                :options="depositionalOptions"
                warning-icon
                required
              />
              <div>
                <div class="section__blacktext">
                  Attachment <b-icon icon="paperclip" />
                </div>
                <p class="section__paragraph">
                  Supported format: .JPG, .JPEG, .PNG,
                </p>
                <div>
                  <p>1. Planktonic Fossil</p>
                  <b-card class="card text-center">
                    <img
                      v-if="previewPlanktonic"
                      class="img-fluid"
                      style="
                        border-radius: 10px;
                        box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.7);
                      "
                      :src="previewPlanktonic"
                      alt
                    />
                    <img
                      v-else
                      class="img-fluid"
                      style="
                        width: 600px;
                        border-radius: 10px;
                        box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.7);
                      "
                      src="../../../../../../../../../assets/img/no-image.jpg"
                    />
                  </b-card>
                  <input
                    ref="image"
                    class="hide-input mt-3 mb-3"
                    type="file"
                    accept="image/*"
                    @change="imageSelectedPlanktonic"
                  />
                </div>
                <div class="mt-3">
                  <p>2. Benthic Fossil</p>
                  <b-card class="card text-center">
                    <img
                      v-if="previewBenthic"
                      class="img-fluid"
                      style="
                        border-radius: 10px;
                        box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.7);
                      "
                      :src="previewBenthic"
                      alt
                    />
                    <img
                      v-else
                      class="img-fluid"
                      style="
                        width: 600px;
                        border-radius: 10px;
                        box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.7);
                      "
                      src="../../../../../../../../../assets/img/no-image.jpg"
                    />
                  </b-card>
                  <input
                    ref="image"
                    class="hide-input mt-3 mb-3"
                    type="file"
                    accept="image/*"
                    @change="imageSelectedBenthic"
                  />
                </div>
              </div>
            </b-col>
            <base-button
              type="submit"
              :disabled="isLoading || areAllInputsEmpty"
              class="mx-auto mt-5"
              is-full
              @click="submitForam()"
            >
              Submit
            </base-button>
          </b-col>
        </b-row>
      </b-container>
    </section>
  </div>
</template>

<script>
export default {
  layout: 'landingpagelogin',
  data: () => {
    return {
      form: {
        planktonic: '',
        benthic: '',
        depositional: '',
        benthicImg: null,
        planktonicImg: null,
      },
      depositionalOptions: [
        { value: '', text: 'Select type' },
        { value: 'darat', text: 'Darat' },
        { value: 'transisi', text: 'Transisi' },
        { value: 'neritik', text: 'Neritik' },
        { value: 'batial', text: 'Batial' },
        { value: 'abisal', text: 'Abisal' },
      ],
      isLoading: false,
      previewPlanktonic: '',
      previewBenthic: '',
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
    inputPaleontologiLink() {
      this.$router.push(
        `/dashboard/StatusData/accepted/${this.$route.params.acceptedId}/Paleontologi/InputPaleo`
      )
    },
    imageSelectedPlanktonic(e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      this.form.planktonicImg = files[0]
      this.createImagePlanktonic(files[0])
    },
    createImagePlanktonic(file) {
      const reader = new FileReader()
      const vm = this
      reader.onload = (e) => {
        vm.previewPlanktonic = e.target.result
      }
      reader.readAsDataURL(file)
    },
    imageSelectedBenthic(e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      this.form.benthicImg = files[0]
      this.createImageBenthic(files[0])
    },
    createImageBenthic(file) {
      const reader = new FileReader()
      const vm = this
      reader.onload = (e) => {
        vm.previewBenthic = e.target.result
      }
      reader.readAsDataURL(file)
    },
    async submitForam() {
      const config = {
        headers: { 'content-type': 'multipart/form-data' },
      }
      const formData = new FormData()
      for (const data in this.form) {
        formData.append(data, this.form[data])
      }
      try {
        await this.$axios.$post(
          `http://ec2-54-198-153-24.compute-1.amazonaws.com/api/paleo/${this.$route.params.foramId}/foram`,
          formData,
          config
        )
        this.$router.push(
          `/dashboard/StatusData/accepted/${this.$route.params.acceptedId}/Paleontologi`
        )
      } catch (e) {
        console.log(e)
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
