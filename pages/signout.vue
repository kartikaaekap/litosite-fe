<script>
export default {
  async created() {
    await this.$auth.logout()
    this.$axios.setToken(false)
    // this.$store.commit('deleteUser')
    this.$store
      .dispatch('logout', {})
      .then(({ message }) => {
        this.isLoading = false
        this.$router.push(`/login`)
      })
      .catch(() => (this.isLoading = false))
    // this.$axios.setHeader('', null)
  },
}
</script>
