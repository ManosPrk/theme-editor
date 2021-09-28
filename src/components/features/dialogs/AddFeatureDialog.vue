<template>
  <div>
    <custom-icon-button
      :disabled="!featuresSelection.length"
      tooltip="Add Feature"
      iconName="mdi-plus"
      color="blue darken-2"
      @click="openDialog"
    />
    <v-dialog v-model="open" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Select feature</span>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-select
                :items="featuresSelection"
                v-model="newFeatureName"
              ></v-select>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="onCancel">Close</v-btn>
          <v-btn color="blue darken-1" text @click="onSave">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import CustomIconButton from "../../shared/CustomIconButton.vue";
export default {
  components: { CustomIconButton },
  name: "AddFeatureDialog",
  props: {
    featuresSelection: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      open: false,
      newFeatureName: "",
    };
  },
  methods: {
    openDialog() {
      this.open = true;
    },
    onSave() {
      this.$emit("change", this.newFeatureName);
      this.open = false;
    },
    onCancel() {
      this.open = false;
    },
  },
  watch: {
    open(newValue) {
      if (!newValue) {
        this.newFeatureName = "";
        return;
      }
      this.newFeatureName = this.featuresSelection[0].value;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>