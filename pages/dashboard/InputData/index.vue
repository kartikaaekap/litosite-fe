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
                    <li>
                      Semua kolom pada data lapangan <b>wajib diisi</b>, kecuali
                      <i>images (data gambar tambahan)</i>
                    </li>
                    <li>
                      Setiap kolom pada berkas template Excel memiliki deskripsi
                      mengenai kolom tersebut. Silakan isi data pada kolom yang
                      sesuai.
                    </li>
                    <li>Berlaku untuk gambar data lapangan:</li>
                    <ul style="margin-left: 20px; list-style-type: circle">
                      <li>
                        Kolom gambar(<i>images</i>) diisikan dengan
                        "NAMA_FILE.EKSTENSI" (contoh: "gambar.jpg" tanpa tanda
                        petik.)
                      </li>
                      <li>Isikan hanya 1 gambar saja di kolom <i>images</i></li>
                      <li>
                        Pastikan tidak ada spasi dalam nama berkas gambar
                        (berkas dengan nama "gambar 6.jpg" harus diubah menjadi
                        "gambar_6.jpg")
                      </li>
                    </ul>
                    <li>
                      <b
                        >Setelah melakukan pengisian data, simpan data excel
                        menjadi file berekstensi .csv, dengan cara:</b
                      >
                    </li>
                    <ol style="margin-left: 20px">
                      <li><b>Klik File -> Save As</b></li>
                      <li>
                        <b
                          >Dibawah kolom pengisian nama file, terdapat
                          <i>dropdown</i>. Tekan dropdown tersebut.</b
                        >
                      </li>
                      <li>
                        <b>Pilih 'CSV UTF-8' atau yang bertuliskan 'CSV'.</b>
                      </li>
                      <li><b>Ketikkan nama file baru -> tekan Save.</b></li>
                      <li>
                        <b
                          >File baru inilah yang akan digunakan dalam
                          pengunggahan data.</b
                        >
                      </li>
                    </ol>
                  </ol>
                  <br />
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
  methods: {
    handleInputForm() {
      this.$router.push('/dashboard/InputData/InputDataForm')
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
@media screen and (max-width: 600px) {
  .section {
    &__title {
      font-size: 28px;
    }
  }
}
</style>
