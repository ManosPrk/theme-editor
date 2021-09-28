export const FEATURES = {
  CHURN_ANALYSIS: "churn_analysis",
  PREDICTIONS: "predictions",
  KB: "kb",
  MACRO: "macro",
  SIMILAR_TICKETS: "similar_tickets",
  MAJOR_INCIDENTS: "major_incidents",
};

export const FEATURE_TITLES = [
  "Churn Analysis",
  "Predictions",
  "KB",
  "Macro",
  "Similar Tickets",
  "Major Incidents"
];

export const FEATURE_TITLES_MAP = {
  churn_analysis: "Churn Analysis",
  predictions: "Predictions",
  kb: "KB",
  macro: "Macro",
  similar_tickets: "Similar Tickets",
  major_incidents: "Major Incidents",
}

export const FEATURES_CONFIG = {
  churn_analysis: {
    labels: ['red', 'green', 'blue'],
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
  kb: {
    // The maximum amount of KBs to show
    amount: null,
    // The  amount of KBs to skip
    skip: null,
  },
  macro: {
    // The maximum amount of macro to show
    amount: null,
  },
  major_incidents: {
    // The maximum amount of major incidents to show
    amount: null,
  },
  predictions: {
    // An array of fieldMappingId(s) that should be not shown
    excludeFields: [],
  },
  similar_tickets: {
    // The maximum amount of similar tickets to show
    amount: null,
  }
};