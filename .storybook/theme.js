const fontWeightLight = 300;
const fontWeightRegular = 400;
const fontWeightMedium = 500;
const fontWeightBold = 700;

const theme = {
  levels: {
    1: {
      top: "0 0 2px 0 rgba(0,0,0,0.09), 0 1px 2px 0 rgba(0,0,0,0.36)",
      bottom: "0 0 2px 0 rgba(0,0,0,0.09), 0 -1px 2px 0 rgba(0,0,0,0.36)"
    },
    2: {
      top: "0 0 4px 0 rgba(0,0,0,0.09), 0 2px 4px 0 rgba(0,0,0,0.27)",
      bottom: "0 0 4px 0 rgba(0,0,0,0.09), 0 -2px 4px 0 rgba(0,0,0,0.27)"
    },
    3: {
      top: "0 0 4px 0 rgba(0,0,0,0.09), 0 4px 9px 0 rgba(0,0,0,0.24)",
      bottom: "0 0 4px 0 rgba(0,0,0,0.09), 0 -4px 9px 0 rgba(0,0,0,0.24)"
    },
    4: {
      top: "0 0 4px 0 rgba(0,0,0,0.09), 0 9px 18px 0 rgba(0,0,0,0.18)",
      bottom: "0 0 4px 0 rgba(0,0,0,0.09), 0 -9px 18px 0 rgba(0,0,0,0.18)"
    },
    5: {
      top: "0 0 4px 0 rgba(0,0,0,0.09), 0 18px 36px 0 rgba(0,0,0,0.15)",
      bottom: "0 0 4px 0 rgba(0,0,0,0.09), 0 -6px 36px 0 rgba(0,0,0,0.15)"
    }
  },
  colors: {
    black: "#000",
    white: "#fff",
    // Pen colors
    red: "#e81a17",
    orange: "#ff6600",
    yellow: "#ffce00",
    chocolate: "#774835",
    magenta: "#d900b5",
    green: "#00a854",
    teal: "#00a3a3",
    oxford: "#007138",
    blue: "#0066ff",
    purple: "#aa00ff",
    indigo: "#5100f5",
    midnight: "#004183",
    overcast: "#f5f5fa",
    steel: "#bdccd4",
    concrete: "#7f8c8d",
    charcoal: "#282a30",
    abyss: "#191b1f",
    deepspace: "#111214",
    galaxy: "#4c4cff",
    // Highlighter colors
    nebula: "#8A4CFC",
    rose: "#ff003c",
    mango: "#ffc200",
    sunshine: "#ffee00",
    peach: "#ffa969",
    bloodorange: "#FF6969",
    pink: "#ff9df9",
    lime: "#b2e35a",
    toxic: "#2ee689",
    ocean: "#29cccc",
    ice: "#57d3ff",
    lavender: "#a470ff",
    cosmic: "#6565ff",
    sky: "#4ca2ff",
    cloud: "#fdfdff",
    silver: "#dfeaf0",
    stone: "#b0c5c7",
    // Shadows,
    shadows: {
      3: "rgba(0,0,0,0.03)",
      9: "rgba(0,0,0,0.09)",
      18: "rgba(0,0,0,0.18)",
      27: "rgba(0,0,0,0.27)",
      36: "rgba(0,0,0,0.36)",
      54: "rgba(0,0,0,0.54)",
      81: "rgba(0,0,0,0.81)"
    },
    lights: {
      3: "rgba(255, 255, 255, 0.03)",
      9: "rgba(255, 255, 255, 0.09)",
      18: "rgba(255, 255, 255, 0.18)",
      27: "rgba(255, 255, 255, 0.27)",
      36: "rgba(255, 255, 255, 0.36)",
      54: "rgba(255, 255, 255, 0.54)",
      81: "rgba(255, 255, 255, 0.81)"
    }
  },
  typography: {
    fontFamily: "Roboto, Lato, Helvetica Neue, sans-serif",
    fontSize: "16px",
    fontWeightLight,
    fontWeightRegular,
    fontWeightMedium,
    fontWeightBold,
    lineHeight: 1.625,

    headingOne: {
      fontWeight: "normal",
      fontSize: "2em",
      marginTop: "1.67em",
      marginBottom: "0.67em",
      lineHeight: 1.25
    },

    headingTwo: {
      fontWeight: "normal",
      fontSize: "1.5em",
      marginTop: "1.83em",
      marginBottom: "0.83em"
    },

    headingThree: {
      fontWeight: fontWeightMedium,
      fontSize: "1.17em",
      marginTop: "2em",
      marginBottom: "1em"
    },

    headingFour: {
      fontWeight: fontWeightMedium,
      fontSize: "1em",
      marginTop: "2.33em",
      marginBottom: "1.33em"
    },

    headingFive: {
      fontWeight: fontWeightMedium,
      fontSize: "0.95em",
      marginTop: "1em",
      marginBottom: "1em"
    },

    headingSix: {
      fontWeight: fontWeightMedium,
      fontSize: "0.9em",
      marginTop: "1em",
      marginBottom: "1em"
    },

    paragraph: {
      fontSize: "1em",
      fontWeight: fontWeightRegular,
      lineHeight: "inherit",
      marginTop: "1em",
      marginBottom: "1em"
    },

    system: {
      fontSize: "0.875em",
      lineHeight: "inherit",
      fontWeight: fontWeightRegular,
      marginTop: "0.5em",
      marginBottom: "0.5em"
    },

    subtle: {
      fontSize: "0.75em",
      lineHeight: "inherit",
      marginTop: "0.5em",
      marginBottom: "0.5em"
    }
  },
  spacing: {
    unit: 9,
    gutter: 45
  }
};

export default theme;
