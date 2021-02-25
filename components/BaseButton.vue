<template>
  <b-button
    variant="custom"
    :href="href"
    :to="to"
    :type="type"
    :block="isFull"
    :class="classes"
    :disabled="disabled"
    @click="handleClick"
  >
    <span class="button__content">
      <slot v-if="!iconOnly" />
      <b-icon
        v-if="icon"
        :icon="icon"
        class="button__icon"
        :class="{ 'ml-1': !iconOnly }"
      />
    </span>
  </b-button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    href: {
      type: String,
      default: '',
    },
    to: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'button',
    },
    variant: {
      type: String,
      default: 'primary',
    },
    size: {
      type: String,
      default: 'large',
    },
    isFull: {
      type: Boolean,
      default: false,
    },
    isLong: {
      type: Boolean,
      default: false,
    },
    isCircle: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    iconOnly: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: '',
    },
  },
  computed: {
    classes() {
      let classes = `button button--${this.variant} button--${this.size}`
      if (this.isLong) {
        classes += ' button--long'
      }
      if (this.isCircle) {
        classes += ' button--circle'
      }
      if (this.iconOnly) {
        classes += ' button--icon'
      }
      return classes
    },
  },
  methods: {
    handleClick(e) {
      if (!this.disabled) {
        this.$emit('click', e)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.button {
  font-size: 14px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  padding: 0 2rem;
  border-radius: 4px;
  transition: background-color 0.2s ease-in;

  &:focus {
    box-shadow: unset;
  }

  // disabled
  &.disabled {
    color: white;
    background-color: rgb(158, 155, 155);
    border: 1px solid rgb(158, 155, 155);
    cursor: default;
  }

  // element
  &__content {
    display: inline-flex;
    flex: 1;
    align-items: center;
    justify-content: center;
  }
  &__icon {
    font-size: 1rem;
  }

  // variants
  &--primary {
    &:not(.disabled) {
      background-color: #e3bb1b;
      color: white;
      font-weight: bold;
      box-shadow: 0px 0.25rem 0.5rem rgba(#e3bb1b, 0.25);
      &:hover {
        // background-color: #fa2222;
        background-color: darken(#e3bb1b, 10);
      }
      &:active {
        // background-color: #d5132f;
        background-color: darken(#e3bb1b, 15);
      }
    }
  }
  &--secondary {
    &:not(.disabled) {
      background-color: rgb(241, 241, 241);
      color: rgb(116, 116, 116);
      border: 1px solid rgb(182, 181, 181);
      box-shadow: 0px 0.25rem 0.5rem rgba(black, 0.04);
      &:hover {
        background-color: white;
      }
      &:active {
        background-color: grey;
      }
    }
    &.disabled {
      background-color: grey;
    }
  }
  &--tertiary {
    &:not(.disabled) {
      background-color: white;
      color: darken(#e3bb1b, 10);
      border: 1px solid #e3bb1b;
      box-shadow: 0px 0.25rem 0.5rem rgba(black, 0.04);
      &:hover {
        background-color: rgb(241, 241, 241);
      }
      &:active {
        background-color: rgb(241, 241, 241);
      }
    }
    &.disabled {
      background-color: grey;
      border: 1px solid rgb(104, 104, 104);
    }
  }
  // &--fourth {
  //   &:not(.disabled) {
  //     background-color: $blue-1;
  //     color: $white;
  //     border: 1px solid $blue-1;
  //     box-shadow: 0px 0.25rem 0.5rem rgba($black, 0.04);
  //     &:hover {
  //       background-color: darken($blue-1, 10);
  //     }
  //     &:active {
  //       background-color: darken($blue-1, 15);
  //     }
  //   }
  //   &.disabled {
  //     background-color: $light-grey-3;
  //   }
  // }
  // &--fifth {
  //   &:not(.disabled) {
  //     background-color: $light-red;
  //     color: $color-primary;
  //     border: 1px solid $light-red;
  //     box-shadow: 0px 0.25rem 0.5rem rgba($black, 0.04);
  //     &:hover {
  //       background-color: darken($light-red, 10);
  //     }
  //     &:active {
  //       background-color: darken($light-red, 15);
  //     }
  //   }
  //   &.disabled {
  //     background-color: $light-grey-3;
  //   }
  // }
  &--text {
    padding: 0.25rem 1rem;
    color: rgb(17, 160, 255);
    font-weight: bold;
    transition: color 0.2s ease-in;
    &:not(.disabled) {
      &:hover {
        color: darken(rgb(17, 160, 255), 25);
        text-decoration: underline;
      }
      &:active {
        color: darken(rgb(17, 160, 255), 20);
        text-decoration: underline;
      }
    }
    &.disabled {
      background: unset;
      border: unset;
    }
  }

  // length
  &--long {
    padding: 0 1rem;
  }
  &--icon {
    padding: 0;
  }

  // vertical sizes
  &--large {
    height: 2.5rem;
    &.button--icon {
      width: 2.5rem;
    }
    &.button--circle {
      border-radius: 2.5rem;
    }
  }
  &--medium,
  &--small {
    height: 2.25rem;
    &.button--icon {
      width: 2.25rem;
    }
    &.button--circle {
      border-radius: 2.25rem;
    }
  }
}
</style>
