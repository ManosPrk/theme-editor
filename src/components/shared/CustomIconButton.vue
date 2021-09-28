<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        @click.stop="onClick"
        v-on="on"
        v-bind="{ ...attrs, ...restProps }"
        icon
      >
        <v-icon :color="color">{{ iconName }}</v-icon>
      </v-btn>
    </template>
    <span>{{ tooltip }}</span>
  </v-tooltip>
</template>

<script>
export default {
  name: "CustomIconButton",
  props: {
    iconName: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "",
    },
    tooltip: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    small: {
      type: Boolean,
      default: false,
    },
    large: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onClick(event) {
      this.$emit("click", event);
    },
  },
  computed: {
    restProps() {
      // eslint-disable-next-line no-unused-vars
      const { iconName, tooltip, ...restProps } = this.$props;
      return restProps;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>