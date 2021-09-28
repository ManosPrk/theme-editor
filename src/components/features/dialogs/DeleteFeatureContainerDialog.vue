<template>
  <div>
    <custom-icon-button
      :tooltip="`Delete ${containerName}`"
      iconName="mdi-delete"
      color="red darken-2"
      small
      @click="openDialog"
    />
    <v-dialog v-model="open" class="grey lighten-4" max-width="500px">
      <v-card>
        <v-card-title>
          Are you sure you want to delete {{ containerName }}?
        </v-card-title>
        <v-divider></v-divider>
        <v-card-actions class="justify-space-between">
          <v-btn text @click="onCancel">
            <span>Cancel</span>
          </v-btn>
          <v-btn color="red darken-1" text @click="onConfirmation">
            <span>Confirm</span>
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
  name: "DeleteFeatureContainerDialog",
  props: {
    containerName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      open: false,
    };
  },
  methods: {
    openDialog() {
      this.open = true;
    },
    onConfirmation() {
      this.$emit("confirm", this.containerName);
      this.open = false;
    },
    onCancel() {
      this.open = false;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>