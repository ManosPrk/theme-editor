<template>
  <v-app>
    <v-container fluid class="grey lighten-3">
      <v-row>
        <v-col>
          <h2>Theme Editor</h2>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-form>
            <v-container fluid>
              <v-row>
                <v-col>
                  <div>
                    <custom-radio-group
                      key="position-radio-group"
                      title="Select Theme Section"
                      :options="themeSectionNames"
                      v-model="currentThemeSectionName"
                    />
                    <theme-section
                      v-if="currentThemeSection"
                      :data="currentThemeSection"
                      @change="onThemeSectionChange"
                    />
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import CustomRadioGroup from "./components/shared/CustomRadioGroup.vue";
import ThemeSection from "./components/ThemeSection.vue";
export default {
  name: "App",
  components: {
    CustomRadioGroup,
    ThemeSection,
  },
  data() {
    return {
      currentThemeSectionName: "",
      themeSections: [
        {
          name: "top",
          layout: "tabs",
          sections: [],
        },
        {
          name: "main",
          layout: "accordion",
          sections: [
            {
              name: "resolution",
              enabled: true,
              sections: [
                {
                  name: "churn_analysis",
                  enabled: false,
                  config: {
                    colors: {
                      alpha: 1,
                      hex: "#408669",
                      hexa: "#408669FF",
                      hsla: {
                        h: 154.7663551401869,
                        s: 0.3544018058690745,
                        l: 0.3892401041666666,
                        a: 1,
                      },
                      hsva: {
                        h: 154.7663551401869,
                        s: 0.5233333333333333,
                        v: 0.5271874999999999,
                        a: 1,
                      },
                      hue: 154.7663551401869,
                      rgba: { r: 64, g: 134, b: 105, a: 1 },
                    },
                  },
                },
                {
                  name: "predictions",
                  enabled: true,
                  config: {
                    excludeFields: [],
                  },
                },
                {
                  name: "kb",
                  enabled: true,
                  config: {
                    amount: 2,
                    skip: 0,
                  },
                },
                {
                  name: "macro",
                  enabled: true,
                  config: {
                    amount: 2,
                  },
                },
              ],
            },
            {
              name: "recommendations",
              enabled: true,
              sections: [
                {
                  name: "macro",
                  enabled: true,
                  config: {
                    amount: 2,
                  },
                },
                {
                  name: "kb",
                  enabled: true,
                  config: {
                    amount: 3,
                    skip: 2,
                  },
                },
                {
                  name: "similar_tickets",
                  enabled: true,
                  config: {
                    amount: 3,
                  },
                },
                {
                  name: "major_incidents",
                  enabled: true,
                  config: {
                    amount: 2,
                  },
                },
              ],
            },
          ],
        },
        {
          name: "bottom",
          layout: "columns",
          sections: [],
        },
      ],
    };
  },
  computed: {
    themeSectionNames() {
      return this.themeSections.map((themeSection) => themeSection.name);
    },
    currentThemeSection() {
      return this.themeSections.find(
        (themeSection) => themeSection.name === this.currentThemeSectionName
      );
    },
  },
  methods: {
    onThemeSectionChange(value) {
      this.themeSections = this.themeSections.map((themeSection) =>
        themeSection.name === value.name ? value : themeSection
      );
    },
  },
};
</script>
