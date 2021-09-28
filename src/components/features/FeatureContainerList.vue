<template>
  <v-card elevation="0">
    <v-card-actions>
      <v-card-title>Feature Containers</v-card-title>
      <v-spacer></v-spacer>
      <add-feature-container-dialog
        :current-feature-name-list="featureContainerNames"
        @change="addFeatureContainer"
      />
    </v-card-actions>
    <v-card-text>
      <v-expansion-panels v-if="data.length">
        <v-expansion-panel v-for="container in data" :key="container.name">
          <v-expansion-panel-header>
            <v-row>
              <v-col class="d-flex align-center">
                <h3>{{ container.name }}</h3>
              </v-col>

              <v-col class="d-flex justify-end">
                <custom-icon-button
                  tooltip="Edit Feature Container name"
                  iconName="mdi-pencil"
                  color="blue darken-2"
                  small
                />
                <delete-feature-container-dialog
                  :containerName="container.name"
                  @confirm="deleteFeatureContainer"
                />
              </v-col>
            </v-row>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-checkbox
              :input-value="container.enabled"
              @change="
                updateFeatureContainers(
                  container.name,
                  'enabled',
                  !container.enabled
                )
              "
              label="Enabled"
            ></v-checkbox>
            <feature-list
              :disabled="!container.enabled"
              v-if="container.name"
              @change="
                updateFeatureContainers(container.name, 'sections', $event)
              "
              :data="container.sections"
            />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-card-title v-else
        >Click on
        <v-icon color="blue darken-2">mdi-plus</v-icon>
        to add a new feature container
      </v-card-title>
    </v-card-text>
  </v-card>
</template>

<script>
import CustomIconButton from "../shared/CustomIconButton.vue";
import AddFeatureContainerDialog from "./dialogs/AddFeatureContainerDialog.vue";
import DeleteFeatureContainerDialog from "./dialogs/DeleteFeatureContainerDialog.vue";
import FeatureList from "./FeatureList.vue";
export default {
  name: "FeatureContainerList",
  components: {
    FeatureList,
    AddFeatureContainerDialog,
    CustomIconButton,
    DeleteFeatureContainerDialog,
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  computed: {
    featureContainerNames() {
      return this.data.map((data) => data.name);
    },
  },
  methods: {
    addFeatureContainer(name) {
      this.$emit("change", [
        ...this.data,
        {
          name,
          enabled: true,
          sections: [],
        },
      ]);
    },
    updateFeatureContainers(containerName, fieldName, value) {
      const updatedFeatures = this.data.map((container) => {
        if (container.name === containerName) {
          return { ...container, [fieldName]: value };
        }
        return container;
      });
      this.$emit("change", updatedFeatures);
    },
    deleteFeatureContainer(containerName) {
      const filteredFeatures = this.data.filter(
        (container) => container.name !== containerName
      );
      this.$emit("change", filteredFeatures);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>