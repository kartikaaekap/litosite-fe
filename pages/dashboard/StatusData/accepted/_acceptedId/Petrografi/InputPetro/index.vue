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
          <b-breadcrumb-item @click="petrografiLink()"
            >Details Data Laboratorium</b-breadcrumb-item
          >
          <b-breadcrumb-item active
            >Input Data Lab Petrografi</b-breadcrumb-item
          >
        </b-breadcrumb>
      </div>
      <b-container>
        <b-row class="mt-5">
          <b-col cols="12" class="text-center col-md-8 mx-auto">
            <h1 class="section__title my-4">
              INPUT DATA HASIL LABORATORIUM PETROGRAFI
            </h1>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12" class="col-md-8 mx-auto">
            <b-col>
              <base-input
                id="lithologyName"
                v-model="form.lithologyName"
                label="Lithology Name"
                placeholder="Input lithology name"
                warning-icon
                required
              />
              <base-input
                id="composition"
                v-model="form.composition"
                label="Petrography Composition"
                placeholder="Input petrography composition"
                warning-icon
                required
              />
              <base-input
                id="structure"
                v-model="form.structure"
                label="Petrography Structure"
                placeholder="Input petrography structure"
                warning-icon
                required
              />
              <base-input
                id="texture"
                v-model="form.texture"
                label="Petrography Texture"
                placeholder="Input petrography texture"
                warning-icon
                required
              />
              <base-input
                id="petroName"
                v-model="form.petroName"
                label="Petrography Name"
                placeholder="Input petrography name"
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
                  <p>1. Plane-Polarized Light (PPL)</p>
                  <b-card class="card text-center">
                    <img
                      v-if="previewPPL"
                      class="img-fluid"
                      style="
                        border-radius: 10px;
                        box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.7);
                      "
                      :src="previewPPL"
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
                      src="../../../../../../../assets/img/no-image.jpg"
                    />
                  </b-card>
                  <input
                    ref="image"
                    class="hide-input mt-3 mb-3"
                    type="file"
                    accept="image/*"
                    @change="imageSelectedPPL"
                  />
                </div>
                <div class="mt-3">
                  <p>2. Crossed-Polarized Light (PPL)</p>
                  <b-card class="card text-center">
                    <img
                      v-if="previewCPL"
                      class="img-fluid"
                      style="
                        border-radius: 10px;
                        box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.7);
                      "
                      :src="previewCPL"
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
                      src="../../../../../../../assets/img/no-image.jpg"
                    />
                  </b-card>
                  <input
                    ref="image"
                    class="hide-input mt-3 mb-3"
                    type="file"
                    accept="image/*"
                    @change="imageSelectedCPL"
                  />
                </div>
              </div>
              <base-button
                type="submit"
                :disabled="isLoading || areAllInputsEmpty"
                class="mx-auto mt-5"
                is-full
                @click="submitPetroRock()"
              >
                Submit
              </base-button>
            </b-col>
          </b-col>
        </b-row>
      </b-container>
    </section>
  </div>
</template>

<script>
// import '../../../../../../../assets/img/',
export default {
  layout: 'landingpagelogin',
  data: () => {
    return {
      form: {
        lithologyName: '',
        composition: '',
        structure: '',
        texture: '',
        petroName: '',
        pplImgPath: '',
        cplImgPath: '',
      },
      isLoading: false,
      previewPPL: '',
      previewCPL: '',
    }
  },
  computed: {
    areAllInputsEmpty() {
      return Object.values(this.form).some((value) => !value)
    },
  },
  methods: {
    petrografiLink() {
      this.$router.push(
        `/dashboard/StatusData/accepted/${this.$route.params.acceptedId}/Petrografi`
      )
    },
    imageSelectedPPL(e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      this.form.pplImgPath = files[0]
      this.createImagePPL(files[0])
    },
    createImagePPL(file) {
      const reader = new FileReader()
      const vm = this
      reader.onload = (e) => {
        vm.previewPPL = e.target.result
      }
      reader.readAsDataURL(file)
    },
    imageSelectedCPL(e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      this.form.cplImgPath = files[0]
      this.createImageCPL(files[0])
    },
    createImageCPL(file) {
      const reader = new FileReader()
      const vm = this
      reader.onload = (e) => {
        vm.previewCPL = e.target.result
      }
      reader.readAsDataURL(file)
    },
    async submitPetroRock() {
      const config = {
        headers: { 'content-type': 'multipart/form-data' },
      }
      const formData = new FormData()
      for (const data in this.form) {
        formData.append(data, this.form[data])
      }
      try {
        await this.$axios.$post(
          `http://ec2-54-235-59-243.compute-1.amazonaws.com/api/contrib-rock/${this.$route.params.acceptedId}/petro`,
          formData,
          config
        )
        this.$router.push(
          `/dashboard/StatusData/accepted/${this.$route.params.acceptedId}/Petrografi`
        )
      } catch (e) {
        console.log(e)
      }
    },
    // submitform() {
    //   const { fosilType } = this.form
    //   if (fosilType === 'foraminifera') {
    //     this.$swal({
    //       title: 'This is foraminifera',
    //       icon: 'warning',
    //       showCloseButton: true,
    //     })
    //   } else if (fosilType === 'nannofossil') {
    //     this.$swal({
    //       title: 'This is nannofossil',
    //       icon: 'warning',
    //       showCloseButton: true,
    //     })
    //   }
    // },
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
