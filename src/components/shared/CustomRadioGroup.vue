<template>
  <div>
    <h3>{{ title }}</h3>
    <v-divider></v-divider>
    <v-radio-group v-model="lazyValue" row>
      <v-radio
        v-for="name in options"
        :key="name"
        :label="name"
        :value="name"
      ></v-radio>
    </v-radio-group>
  </div>
</template>

<script>
export default {
  name: "CustomRadioGroup",
  props: {
    title: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      internalValue: "",
    };
  },
  mounted() {
    this.internalValue = this.value;
  },
  computed: {
    lazyValue: {
      get() {
        return this.internalValue;
      },
      set(value) {
        this.internalValue = value;
        this.$emit("input", value);
      },
    },
  },
  watch: {
    value(newValue) {
      if (newValue !== this.internalValue) {
        this.internalValue = newValue;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>