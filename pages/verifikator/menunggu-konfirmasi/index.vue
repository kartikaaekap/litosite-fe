<template>
  <div>
    <b-row>
      <b-col>
        <base-title>MENUNGGU KONFIRMASI (10)</base-title>
      </b-col>
    </b-row>
    <b-row>
      <b-container>
        <table id="table">
          <thead>
            <tr>
              <th>Author Name</th>
              <th>Lithology Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody v-for="item in menungguKonfirmasi" :key="item.id">
            <tr>
              <td>{{ item.author }}</td>
              <td>{{ item.lithology }}</td>
              <td>
                <b-link class="ml-2" @click="showPopUpDetails(item.id)">
                  Details
                </b-link>
              </td>
            </tr>
          </tbody>
        </table>
      </b-container>
    </b-row>
    <base-modal
      v-if="popUpDetails"
      v-model="popUpDetails"
      title="Detail Data"
      ok-label="Terima"
      @ok="handleAcceptData"
    >
      <table style="width: 100%" class="mx-auto">
        <tr>
          <th>Author Name:</th>
          <td>Bill Gates</td>
        </tr>
        <tr>
          <th>Lithology Name:</th>
          <td>555 77 854</td>
        </tr>
        <tr>
          <th>Type:</th>
          <td>555 77 855</td>
        </tr>
        <tr>
          <th>Type Detail:</th>
          <td>555 77 855</td>
        </tr>
        <tr>
          <th>Age Zone:</th>
          <td>555 77 855</td>
        </tr>
        <tr>
          <th>Formation:</th>
          <td>555 77 855</td>
        </tr>
        <tr>
          <th>Year Researched:</th>
          <td>555 77 855</td>
        </tr>
        <tr>
          <th>Location:</th>
          <td>555 77 855</td>
        </tr>
        <tr>
          <th>Latitude:</th>
          <td>555 77 855</td>
        </tr>
        <tr>
          <th>Longitude:</th>
          <td>555 77 855</td>
        </tr>
        <tr>
          <th>Altitude:</th>
          <td>555 77 855</td>
        </tr>
        <tr>
          <th>Strike / Dip:</th>
          <td>555 77 855</td>
        </tr>
        <tr>
          <th>Attachment:</th>
          <td>555 77 855</td>
        </tr>
      </table>
      <!-- <b-col class="mx-auto">
        <b-row class="mx-auto">
          <b-col cols="12" class="mx-auto">
            <table>
              <tr>
                <th>Author Name:</th>
                <td>Bill Gates</td>
              </tr>
              <tr>
                <th>Lithology Name:</th>
                <td>555 77 854</td>
              </tr>
              <tr>
                <th>Type:</th>
                <td>555 77 855</td>
              </tr>
              <tr>
                <th>Type Detail:</th>
                <td>555 77 855</td>
              </tr>
              <tr>
                <th>Age Zone:</th>
                <td>555 77 855</td>
              </tr>
              <tr>
                <th>Formation:</th>
                <td>555 77 855</td>
              </tr>
              <tr>
                <th>Year Researched:</th>
                <td>555 77 855</td>
              </tr>
              <tr>
                <th>Location:</th>
                <td>555 77 855</td>
              </tr>
              <tr>
                <th>Latitude:</th>
                <td>555 77 855</td>
              </tr>
              <tr>
                <th>Longitude:</th>
                <td>555 77 855</td>
              </tr>
              <tr>
                <th>Altitude:</th>
                <td>555 77 855</td>
              </tr>
              <tr>
                <th>Strike / Dip:</th>
                <td>555 77 855</td>
              </tr>
              <tr>
                <th>Attachment:</th>
                <td>555 77 855</td>
              </tr>
            </table>
          </b-col>
        </b-row>
      </b-col> -->
    </base-modal>
    <!-- <section id="table">
      <b-container>
        <b-table
          responsive
          striped
          hover
          :fields="fields"
          :busy="isLoading"
          :items="menungguKonfirmasi"
        >
          <template v-slot:cell(author)="{ item: { author } }">
            <span>{{ author }}</span>
          </template>
          <template v-slot:cell(lithology)="{ item: { lithology } }">
            <span>{{ lithology }}</span>
          </template>
          <template v-slot:cell(action)="row">
            <b-link @click="showPopUpDetails(row)"> Details </b-link>
          </template>
        </b-table>
      </b-container>
    </section> -->
  </div>
</template>

<script>
export default {
  layout: 'verifikator',
  data: () => {
    return {
      menungguKonfirmasi: [
        {
          id: 1,
          author: 'Kartika Eka Putri',
          lithology: 'Sedimen Type A',
        },
        {
          id: 2,
          author: 'Theofilus Marcel',
          lithology: 'Sedimen Type A',
        },
        {
          id: 3,
          author: 'Kartika Eka Putri',
          lithology: 'Sedimen Type A',
        },
        {
          id: 4,
          author: 'Taris Hibatul',
          lithology: 'Sedimen Type A',
        },
      ],
      form: {
        id: '',
      },
      popUpDetails: false,
    }
  },
  methods: {
    showPopUpDetails(id) {
      this.popUpDetails = true
      this.form = { ...this.form, id }
    },
  },
}
</script>

<style lang="scss" scoped>
* {
  font-family: 'Nunito Sans';
}
.statistic {
  background-color: #6a40951a;
  &__text {
    font-size: 16px;
  }
  h2 {
    font-weight: bold;
  }
}
#table {
  border-collapse: collapse;
  width: 100%;
}

#table td,
#table th {
  border: 1px solid #6a4095;
  padding: 6px;
}

#tabe tr:hover {
  background-color: #ddd;
}

#table td {
  font-size: 16px;
}

#table th {
  padding-top: 6px;
  padding-bottom: 6px;
  text-align: center;
  background-color: #e3bb1b;
  color: white;
  font-size: 17px;
}
table,
th,
td {
  border-collapse: collapse;
}
th,
td {
  padding: 5px;
  text-align: left;
}
</style>
