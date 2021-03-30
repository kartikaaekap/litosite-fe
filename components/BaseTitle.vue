<template>
  <h1><slot /></h1>
</template>

<script>
export default {
  name: 'BaseTitle',
}
</script>

<style lang="scss" scoped>
* {
  font-family: 'Nunito Sans';
}
h1 {
  font-size: 32px;
  font-weight: bold;
  text-transform: capitalize;
  margin-bottom: 30px;
}
</style>
