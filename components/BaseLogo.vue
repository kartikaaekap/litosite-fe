<template>
  <div class="logo">
    <a class="logo__img">
      <b-img
        src="../assets/img/logo-litosite.png"
        :class="{ 'logo__img--small': isSmall }"
        fluid
      />
    </a>
  </div>
</template>

<script>
export default {
  name: 'BaseLogo',
  props: {
    isLink: {
      type: Boolean,
      default: false,
    },
    isSmall: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  &__img {
    img {
      max-height: 80px;
      &.logo__img--small {
        max-height: 50px;
        padding-bottom: 5px;
      }
    }
  }
}
</style>
