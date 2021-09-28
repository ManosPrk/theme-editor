<template>
  <v-row>
    <v-col>
      <v-tabs show-arrows :value="layoutIdx">
        <v-tab
          :key="`${layoutName}-${layoutIdx}`"
          v-for="layoutName in layouts"
          @change="onLayoutChange(layoutName)"
        >
          {{ layoutName }}
        </v-tab>
      </v-tabs>
      <component
        @change="onFeatureChange"
        :is="getSectionComponentType"
        :data="data.sections"
      />
    </v-col>
  </v-row>
</template>

<script>
import FeatureList from "./features/FeatureList.vue";
import FeatureContainerList from "./features/FeatureContainerList.vue";
import CustomRadioGroup from "./shared/CustomRadioGroup.vue";
import { LAYOUTS } from "@/enums/layouts";
export default {
  components: { CustomRadioGroup, FeatureContainerList, FeatureList },
  name: "ThemeSection",
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    layouts() {
      return Object.values(LAYOUTS);
    },
    getSectionComponentType() {
      switch (this.layout) {
        case LAYOUTS.COLUMNS:
          return FeatureList;
        default:
          return FeatureContainerList;
      }
    },
    layout() {
      return this.data.layout;
    },
    layoutIdx() {
      return this.layouts.findIndex((layout) => layout === this.layout);
    },
  },
  methods: {
    onLayoutChange(layout) {
      // On layout change, the section structure changes
      // one way of dealing with this is to reset the structure when
      // the user changes layout from or to column
      if (this.layout === LAYOUTS.COLUMNS || layout === LAYOUTS.COLUMNS) {
        this.$emit("change", {
          ...this.data,
          layout,
          sections: [],
        });
        return;
      }
      this.$emit("change", {
        ...this.data,
        layout,
      });
    },
    onFeatureChange(feature) {
      this.$emit("change", {
        ...this.data,
        sections: feature,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>