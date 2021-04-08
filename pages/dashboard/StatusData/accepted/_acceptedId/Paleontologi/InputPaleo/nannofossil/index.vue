<template>
  <div />
</template>

<script>
export default {
  mounted() {
    this.$router.push(
      `/dashboard/StatusData/accepted/${this.$route.params.acceptedId}/Paleontologi/InputPaleo`
    )
  },
}
</script>
