<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <h2 class="pb-1">Predictions</h2>
        <v-divider></v-divider>
      </v-col>
    </v-row>
    <v-row> </v-row>
    <v-row>
      <v-col>
        <v-container fluid>
          <v-checkbox
            class="pt-0 mt-0"
            :input-value="enabled"
            @change="setEnabled(!enabled)"
            label="Enabled"
          ></v-checkbox>

          <v-form class="pl-1" :disabled="!enabled">
            <v-text-field
              label="Amount"
              type="number"
              v-model="amount"
            ></v-text-field>
          </v-form>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Macro",
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  computed: {
    enabled() {
      return this.data.enabled;
    },
    config() {
      return this.data.config;
    },
    amount: {
      get() {
        return this.config.amount;
      },
      set(val) {
        this.setConfig("amount", parseInt(val));
      },
    },
  },
  methods: {
    setConfig(fieldName, value) {
      this.$emit("change", {
        ...this.data,
        config: {
          ...this.config,
          [fieldName]: value,
        },
      });
    },
    setEnabled(value) {
      this.$emit("change", {
        ...this.data,
        enabled: value,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>