const plugin = require('tailwindcss/plugin')


module.exports = {
  purge: [
    './src/**/*.{vue,js}'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
    plugin(function ({ addUtilities, addComponents, e, prefix, config }) {
      const spacing = config().theme.spacing;

      const newUtilities = {

      }

      Object.entries(spacing).forEach(e => {
        newUtilities[`.grid-cols-fill-${e[0]}`] = {
          'grid-template-columns': `repeat(auto-fill, ${e[1]})`
        };
        newUtilities[`.grid-rows-fill-${e[0]}`] = {
          'grid-template-rows': `repeat(auto-fill, ${e[1]})`
        };
      })

      addUtilities([newUtilities])
    })
  ],
}
