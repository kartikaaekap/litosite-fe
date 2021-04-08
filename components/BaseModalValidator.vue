<template>
  <b-modal
    centered
    :title="title"
    :hide-footer="hideFooter"
    :visible="isVisible"
    @ok="handleOk"
    @click="handleClick"
    @cancel="handleCancel"
    @change="handleChange"
    @close="handleClose"
  >
    <template v-slot:right-modal-header="{ close }" class="modal-header">
      <base-button variant="text" icon-only icon="x" @click="close()">
        {{ closeLabel }}
      </base-button>
    </template>
    <template v-slot:modal-footer="{ ok, click }">
      <!-- <base-button
        v-if="!hideCancel"
        variant="secondary"
        size="small"
        @click="cancel()"
      >
        {{ cancelLabel }}
      </base-button> -->
      <base-button
        v-if="!hideClick"
        variant="tertiary"
        size="small"
        :is-long="clickLabel.length > 6"
        @click="click()"
      >
        {{ clickLabel }}
      </base-button>
      <base-button
        v-if="!hideOk"
        variant="primary"
        size="small"
        :is-long="okLabel.length > 6"
        @click="ok()"
      >
        {{ okLabel }}
      </base-button>
    </template>
    <slot />
  </b-modal>
</template>

<script>
export default {
  name: 'BaseModal',
  model: {
    prop: 'isVisible',
    event: 'change',
  },
  props: {
    title: {
      type: String,
      default: '',
      required: true,
    },
    okLabel: {
      type: String,
      default: 'Ok',
    },
    clickLabel: {
      type: String,
      default: 'Tolak',
    },
    cancelLabel: {
      type: String,
      default: 'Cancel',
    },
    closeLabel: {
      type: String,
      default: '',
    },
    isDanger: {
      type: Boolean,
      default: false,
    },
    isVisible: {
      type: Boolean,
      default: false,
    },
    hideCancel: {
      type: Boolean,
      default: false,
    },
    hideTolak: {
      type: Boolean,
      default: false,
    },
    hideOk: {
      type: Boolean,
      default: false,
    },
    hideFooter: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleOk(e) {
      this.$emit('ok', e)
    },
    handleClick(e) {
      this.$emit('tolak', e)
    },
    handleCancel(e) {
      this.$emit('cancel', e)
    },
    handleClose(e) {
      this.$emit('close', e)
    },
    handleChange(e) {
      this.$emit('change', e)
    },
  },
}
</script>
