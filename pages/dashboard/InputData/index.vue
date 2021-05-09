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
              <b-tab title="Upload Dari Excel" active>
                <b-card class="filter-card mt-5" bg-variant="light">
                  <div class="h4 d-flex">
                    <b-icon
                      icon="exclamation-triangle-fill"
                      color="#e3bb1b"
                    ></b-icon>
                    <p
                      class="section__text pl-3"
                      style="color: red; font-weight: bold"
                    >
                      Perlu diperhatikan!
                    </p>
                  </div>
                  Catatan saat mengisi:
                  <ol>
                    <li>
                      Unduh template data Excel dengan mengklik
                      <a href="#" style="font-weight: bold">Download Disini</a>
                    </li>
                    <li>Semua kolom pada data lapangan <b>wajib diisi</b></li>
                    <li>
                      Setiap kolom pada berkas template Excel memiliki deskripsi
                      mengenai kolom tersebut. Silakan isi data pada kolom yang
                      sesuai.
                    </li>
                    <li>
                      Setelah melakukan pengisian data, upload ulang file Excel
                      pada kolom upload di bawah kartu peringatan ini. Pastikan
                      file yang diupload berekstensi .xls
                    </li>
                    <li>Berlaku untuk pengisian gambar data lapangan:</li>
                    <ul style="margin-left: 20px; list-style-type: circle">
                      <li>
                        Setelah berhasil melakukan upload file, Anda akan
                        diarahkan ke halaman menunggu konfirmasi.
                      </li>
                      <li>
                        Anda dapat melengkapi gambar data lapangan dengan
                        meng-klik <b>Tambah Gambar</b> pada list table di
                        halaman menunggu konfirmasi.
                      </li>
                      <li>
                        Lengkapi gambar sesuai dnegan data yang dipilih,
                        kemudian klik <b>Kirim</b>
                      </li>
                    </ul>
                  </ol>
                  <br />
                </b-card>
                <b-card class="upload-card mt-5" bg-variant="light">
                  <div class="container">
                    <p>
                      Masukkan template Excel yang telah diisi data lapangan,
                      disini :
                    </p>
                    <div class="container">
                      <div class="large-12 medium-12 small-12 cell">
                        <label
                          >File
                          <input
                            id="file_uploaded"
                            ref="file_uploaded"
                            type="file"
                            @change="handleFileUpload()"
                          />
                        </label>
                        <br />
                        <b-progress
                          class="mt-3"
                          max="100"
                          :value.prop="uploadPercentage"
                          show-progress
                          animated
                          variant="success"
                        ></b-progress>
                        <br />
                        <base-button
                          type="submit"
                          :disabled="isLoading || areAllInputsEmpty"
                          @click="submitFile()"
                          >Upload</base-button
                        >
                      </div>
                    </div>
                  </div>
                </b-card>
              </b-tab>
              <b-tab
                title="Input Secara Langsung"
                class="mb-0 mb-md-3"
                @click="handleInputForm()"
              >
              </b-tab>
            </b-tabs>
          </b-col>
        </b-row>
      </b-container>
    </section>
  </div>
</template>

<script>
export default {
  layout: 'landingpagelogin',
  data() {
    return {
      form: {
        file_uploaded: '',
      },
      uploadPercentage: 0,
      isLoading: false,
    }
  },
  computed: {
    areAllInputsEmpty() {
      return Object.values(this.form).some((value) => !value)
    },
  },
  methods: {
    handleInputForm() {
      this.$router.push('/dashboard/InputData/InputDataForm')
    },
    handleFileUpload() {
      this.form.file_uploaded = this.$refs.file_uploaded.files[0]
    },
    async submitFile() {
      const config = {
        headers: { 'content-type': 'multipart/form-data' },
      }
      const formData = new FormData()
      for (const data in this.form) {
        formData.append(data, this.form[data])
      }
      try {
        await this.$axios.$post(
          'http://ec2-54-235-59-243.compute-1.amazonaws.com/api/extractor/',
          formData,
          config,
          {
            onUploadProgress: function (progressEvent) {
              this.uploadPercentage = parseInt(
                Math.round((progressEvent.loaded / progressEvent.total) * 100)
              )
            }.bind(this),
          }
        )
        this.$router.push('/dashboard/StatusData')
        console.log('SUCCESS!!')
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
  background-color: #efefef;
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
.filter-card {
  border-color: #6a4095;
  color: black;
  border-width: 2px;
  font-size: 16px;
  font-weight: 400;
}
.upload-card {
  border-color: #e3bb1b;
  color: black;
  border-width: 2px;
  font-size: 16px;
  font-weight: 400;
  border-radius: 20px;
}
@media screen and (max-width: 600px) {
  .section {
    &__title {
      font-size: 28px;
    }
  }
}
</style>
