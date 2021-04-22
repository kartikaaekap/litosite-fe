<template>
  <div>
    <div fluid class="breadcrumb__container">
      <b-breadcrumb>
        <b-breadcrumb-item
          href="/verifikator/data-ditolak/"
          class="ml-1 pl-0 pl-md-4"
          >List Data Ditolak
        </b-breadcrumb-item>
        <b-breadcrumb-item active>Detail Data</b-breadcrumb-item>
      </b-breadcrumb>
    </div>
    <table id="table-detail">
      <tbody>
        <tr>
          <th>Author Name:</th>
          <td>{{ rockByIdValidator.author }}</td>
        </tr>
        <tr>
          <th>Lithology Name:</th>
          <td>{{ rockByIdValidator.lithologyName }}</td>
        </tr>
        <tr>
          <th>Type:</th>
          <td>{{ rockByIdValidator.type }}</td>
        </tr>
        <tr>
          <th>Type Detail:</th>
          <td>{{ rockByIdValidator.typeDetail }}</td>
        </tr>
        <tr>
          <th>Age Zone:</th>
          <td>{{ rockByIdValidator.ageZone }}</td>
        </tr>
        <tr>
          <th>Formation:</th>
          <td>{{ rockByIdValidator.rockFormation }}</td>
        </tr>
        <tr>
          <th>Year Researched:</th>
          <td>{{ rockByIdValidator.yearResearch }}</td>
        </tr>
        <tr>
          <th>Location:</th>
          <td>{{ rockByIdValidator.location }}</td>
        </tr>
        <tr>
          <th>Latitude:</th>
          <td>{{ rockByIdValidator.latitude }}</td>
        </tr>
        <tr>
          <th>Longitude:</th>
          <td>{{ rockByIdValidator.longitude }}</td>
        </tr>
        <tr>
          <th>Altitude:</th>
          <td>{{ rockByIdValidator.altitude }}</td>
        </tr>
        <tr>
          <th>Strike / Dip:</th>
          <td>{{ rockByIdValidator.strike }} / {{ rockByIdValidator.dip }}</td>
        </tr>
        <tr v-for="item in rockByIdValidator.images" :key="item.id">
          <th>Attachment:</th>
          <td>
            <b-img :src="item.image" fluid />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  layout: 'verifikator',
  async asyncData({ store, params }) {
    return {
      rockByIdValidator: await store.dispatch(
        'getRockByIdValidator',
        params.ditolakId
      ),
    }
  },
  data: () => {
    return {}
  },
  methods: {},
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
#table-detail {
  border-collapse: collapse;
  width: 100%;
  border: 1px solid #6a4095;
}

#table-detail td,
#table-detail th {
  padding: 6px;
  border: 1px solid #6a4095;
}

#table-detail td {
  font-size: 16px;
}

#table-detail th {
  padding-top: 6px;
  padding-bottom: 6px;
  background-color: #ffffff;
  color: black;
  font-size: 17px;
}
</style>
