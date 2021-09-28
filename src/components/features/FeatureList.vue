<template>
  <v-card :disabled="disabled" elevation="0">
    <v-card-actions>
      <v-card-title>Features</v-card-title>
      <v-spacer></v-spacer>
      <add-feature-dialog
        :features-selection="featuresSelection"
        @change="onAddFeature"
      />
    </v-card-actions>

    <v-card-text>
      <component
        v-for="feature in data"
        :key="feature.name"
        :is="getFeatureComponentType(feature.name)"
        :data="feature"
        @change="onFeatureChange"
      />
      <v-card-title v-if="data.length === 0"
        >Click on
        <v-icon color="blue darken-2">mdi-plus</v-icon>
        to add a new feature
      </v-card-title>
    </v-card-text>
  </v-card>
</template>

<script>
import {
  FEATURES,
  FEATURES_CONFIG,
  FEATURE_TITLES_MAP,
} from "@/enums/features.js";
import ChurnAnalysis from "./ChurnAnalysis.vue";
import Macro from "./Macro.vue";
import KB from "./KB.vue";
import MajorIncidents from "./MajorIncidents.vue";
import SimilarTickets from "./SimilarTickets.vue";
import Predictions from "./Predictions.vue";
import AddFeatureDialog from "./dialogs/AddFeatureDialog.vue";
export default {
  components: {
    ChurnAnalysis,
    Macro,
    KB,
    MajorIncidents,
    SimilarTickets,
    Predictions,
    AddFeatureDialog,
  },
  name: "FeatureList",
  props: {
    data: {
      type: Array,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    featureNames() {
      return Object.values(FEATURES);
    },
    featureConfigList() {
      return FEATURES_CONFIG;
    },
    featureTitlesMap() {
      return FEATURE_TITLES_MAP;
    },
    featuresSelection() {
      const currentFeatureNames = this.data.map((feature) => feature.name);
      return this.featureNames
        .filter((featureName) => !currentFeatureNames.includes(featureName))
        .map((feature) => ({
          value: feature,
          text: this.featureTitlesMap[feature],
        }));
    },
  },
  methods: {
    onFeatureChange(value) {
      this.$emit(
        "change",
        this.data.map((feature) => {
          if (feature.name === value.name) {
            return { ...feature, ...value };
          }
          return feature;
        })
      );
    },
    onAddFeature(name) {
      this.$emit("change", [
        ...this.data,
        {
          name,
          enabled: true,
          config: { ...this.featureConfigList[this.featureToAdd] },
        },
      ]);
    },
    getFeatureComponentType(featureName) {
      switch (featureName) {
        case FEATURES.CHURN_ANALYSIS:
          return ChurnAnalysis;
        case FEATURES.KB:
          return KB;
        case FEATURES.MAJOR_INCIDENTS:
          return MajorIncidents;
        case FEATURES.PREDICTIONS:
          return Predictions;
        case FEATURES.SIMILAR_TICKETS:
          return SimilarTickets;
        case FEATURES.MACRO:
          return Macro;
        default:
          return null;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>