<template>
  <div>
    <section id="introduction" class="section__introduction">
      <div fluid class="breadcrumb__container">
        <b-breadcrumb>
          <b-breadcrumb-item active class="ml-3 pl-0 ml-md-5 pl-md-4">
            Input Data
          </b-breadcrumb-item>
        </b-breadcrumb>
      </div>
      <b-container>
        <b-row class="mt-4">
          <b-col class="d-flex my-auto">
            <b-link class="tabs tabs--active mb-0 mr-4"> Input Data </b-link>
            <b-link class="tabs" to="/dashboard/StatusData">
              Status Data
            </b-link>
          </b-col>
        </b-row>
        <b-row class="mt-5">
          <b-col>
            <b-tabs
              pills
              small
              class="p-0"
              nav-wrapper-class="pills d-flex justify-content-center"
            >
              <b-tab title="Upload Dari Excel" @click="handleInputExcel()" />
              <b-tab title="Input Secara Langsung" class="mb-0 mb-md-3" active>
                <b-row>
                  <b-col class="text-center">
                    <h1 class="section__title mt-5 mb-3">
                      INPUT DATA HASIL LAPANGAN
                    </h1>
                  </b-col>
                </b-row>
                <div>
                  <b-row>
                    <b-col cols="12" class="col-md-8 mx-auto mt-3">
                      <div class="section__blacktext">
                        Attachment <b-icon icon="paperclip" />
                      </div>
                      <p class="section__paragraph">
                        Supported format: .JPG, .JPEG, .PNG,
                      </p>
                      <div>
                        <b-card class="card text-center">
                          <img
                            v-if="preview"
                            class="img-fluid"
                            style="
                              border-radius: 10px;
                              box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.7);
                            "
                            :src="preview"
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
                            src="../../../../../../assets/img/no-image.jpg"
                          />
                        </b-card>
                        <input
                          ref="image"
                          class="hide-input mt-3 mb-3"
                          type="file"
                          accept="image/*"
                          @change="imageSelected"
                        />
                      </div>
                      <base-button
                        type="submit"
                        :disabled="isLoading || areAllInputsEmpty"
                        class="mx-auto mt-5"
                        is-full
                        @click="submitImageRock()"
                      >
                        Submit
                      </base-button>
                    </b-col>
                  </b-row>
                </div>
              </b-tab>
            </b-tabs>
          </b-col>
        </b-row>
      </b-container>
    </section>
  </div>
</template>

<script>
import BaseButton from '~/components/BaseButton.vue'

export default {
  components: { BaseButton },
  layout: 'landingpagelogin',
  data: () => {
    return {
      form: {
        image: '',
      },
      preview: '',
      isLoading: false,
    }
  },
  computed: {
    areAllInputsEmpty() {
      return Object.values(this.form).some((value) => !value)
    },
  },
  methods: {
    handleInputExcel() {
      this.$router.push('/dashboard/InputData')
    },
    imageSelected(e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      this.form.image = files[0]
      this.createImage(files[0])
    },
    createImage(file) {
      // let image = new Image();
      const reader = new FileReader()
      const vm = this
      reader.onload = (e) => {
        vm.preview = e.target.result
      }
      reader.readAsDataURL(file)
    },
    async submitImageRock() {
      const config = {
        headers: { 'content-type': 'multipart/form-data' },
      }
      const formData = new FormData()
      for (const data in this.form) {
        formData.append(data, this.form[data])
      }
      try {
        await this.$axios.$post(
          `http://ec2-54-198-153-24.compute-1.amazonaws.com/api/contrib-rock/${this.$route.params.inputimagesId}/image`,
          formData,
          config
        )
        this.$router.push('/dashboard/StatusData')
      } catch (e) {
        console.log(e)
      }
    },
    submitform() {
      this.$swal({
        title: 'Both passwords must match',
        icon: 'warning',
        showCloseButton: true,
      })
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
}
.breadcrumb {
  background-color: #6a40951a;
  padding: 10px 0;
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
.nav-pills {
  font-size: 14px;
  background-color: #eee9f3;
  border-radius: 4px;
  border: unset;
  padding: 5px;
  text-align: center;
  .nav-link {
    background-color: #eee9f3;
    color: grey;
    font-weight: bold;
    width: 210px;
    height: 39px;
    &.active {
      font-size: 14px;
      font-weight: bold;
      background-color: #6a4095;
      color: #e3bb1b;
    }
  }
}
.card {
  background-color: #e3bb1b54;
}
#preview {
  display: flex;
  justify-content: center;
  align-items: center;
}

#preview img {
  max-width: 100%;
  max-height: 500px;
}
.custom-select {
  height: 40px;
  padding-left: 15px;
  padding-right: 40px;
  vertical-align: middle;
  background: url('~assets/img/icon-arrow-down.svg') no-repeat right 12px
    center/16px 16px;
  background-color: white;
  border: 1 solid black;
  border-radius: 5px;
  -webkit-appearance: none;
  &:hover,
  &:active {
    box-shadow: none;
  }
  &:focus {
    box-shadow: none;
    cursor: pointer;
    outline: #6a4095;
  }
  option:first-child {
    color: black;
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
