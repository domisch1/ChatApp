const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    // colors: {
    //   gray: colors.trueGray,
    //   purple: colors.purple,
    //   green: colors.green,
    //   red: colors.red,
    // },
    extend: {
      fontFamily: {
        main: ["Montserrat"],
        display: ["Rock Salt"],
      },
      maxWidth: {
        "2/3": "66.6666%",
      },
      gridTemplateRows: {
        8: "repeat(8, minmax(0, 1fr))",
      },
      gridRow: {
        "span-7": "span 7 / span 8",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [colors],
};
