<template>
  <div>
    <custom-icon-button
      tooltip="Add Feature Container"
      iconName="mdi-plus"
      color="blue darken-2"
      @click="openDialog"
      small
    />
    <v-dialog v-model="open" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Enter new feature container name</span>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="newFeatureContainerName"
                label="Feature Container.."
                :rules="[rules.required, rules.unique]"
                @update:error="isTextFieldDirty = $event"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="onCancel">
            <span>Close</span>
          </v-btn>
          <v-btn
            color="blue darken-2"
            :disabled="isTextFieldDirty"
            text
            @click="onSave"
          >
            <span>Save</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import CustomIconButton from "../../shared/CustomIconButton.vue";
export default {
  components: { CustomIconButton },
  name: "AddFeatureContainerDialog",
  props: {
    currentFeatureNameList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      newFeatureContainerName: "",
      open: false,
      isTextFieldDirty: true,
      rules: {
        required: (value) => !!value || "Required.",
        unique: (value) =>
          this.isDuplicateFeatureName(value) || "Name already exists.",
      },
    };
  },
  methods: {
    openDialog() {
      this.open = true;
    },
    onSave() {
      this.$emit("change", this.newFeatureContainerName);
      this.open = false;
    },
    onCancel() {
      this.open = false;
    },
    isDuplicateFeatureName(newName) {
      return !this.currentFeatureNameList.some((name) => {
        return name.toLowerCase() === newName.toLowerCase();
      });
    },
  },
  watch: {
    open(newValue) {
      if (!newValue) {
        this.newFeatureContainerName = "";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>