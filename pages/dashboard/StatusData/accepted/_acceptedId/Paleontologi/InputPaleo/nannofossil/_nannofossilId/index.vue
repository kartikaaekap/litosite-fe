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
          <b-breadcrumb-item active>Input Nannofossil</b-breadcrumb-item>
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
                id="spesies"
                v-model="form.spesies"
                label="Spesies Nannofossil"
                placeholder="Input spesies nannofossil name"
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
                  <b-card class="card text-center">
                    <img
                      v-if="previewSpesies"
                      class="img-fluid"
                      style="
                        border-radius: 10px;
                        box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.7);
                      "
                      :src="previewSpesies"
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
                    @change="imageSelectedSpesies"
                  />
                </div>
              </div>
            </b-col>
            <base-button
              type="submit"
              :disabled="isLoading || areAllInputsEmpty"
              class="mx-auto mt-5"
              is-full
              @click="submitNannofossil()"
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
        spesies: '',
        image: null,
      },
      isLoading: false,
      previewSpesies: '',
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
    imageSelectedSpesies(e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      this.form.image = files[0]
      this.createImageSpesies(files[0])
    },
    createImageSpesies(file) {
      const reader = new FileReader()
      const vm = this
      reader.onload = (e) => {
        vm.previewSpesies = e.target.result
      }
      reader.readAsDataURL(file)
    },
    async submitNannofossil() {
      const config = {
        headers: { 'content-type': 'multipart/form-data' },
      }
      const formData = new FormData()
      for (const data in this.form) {
        formData.append(data, this.form[data])
      }
      try {
        await this.$axios.$post(
          `http://ec2-54-235-59-243.compute-1.amazonaws.com/api/paleo/${this.$route.params.nannofossilId}/nanno`,
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
