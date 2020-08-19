/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require('tailwindcss/plugin');

const tailwindSansFontFamily =
  'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';
const sansFontFamily = `"Open Sans", ${tailwindSansFontFamily}`;
const textMessageFontFamily = `Muli, ${sansFontFamily}`;

module.exports = {
  purge: ['./components/**/*.{js,jsx,ts,tsx}', './pages/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      sans: sansFontFamily,
      'text-message': textMessageFontFamily,
    },
    extend: {
      maxHeight: {
        '24': '6rem',
        lg: '32rem',
      },
      minHeight: {
        '48': '12rem',
      },
      gridTemplateRows: {
        fullPage: 'auto minmax(0, 1fr)',
        chatBox: 'min-content 1fr',
      },
      gridRowEnd: {
        last: '100000000',
      },
      borderWidth: {
        '48': '48px',
      },
    },
  },
  variants: {
    opacity: ['disabled'],
    display: ['responsive', 'group-hover'],
    backgroundColor: ['responsive', 'hover', 'focus', 'odd'],
    margin: ['responsive', 'important'],
  },
  plugins: [
    // Add border colors for top, bottom, left, right
    // e.g. border-t-blue-600 for a blue top border color
    plugin(({ addUtilities, theme, e }) => {
      const borderTopColor = Object.entries(theme('colors')).map(
        ([colorName, variants]) =>
          Object.entries(variants).map(([variantNumber, variantColorCode]) => ({
            [`.${e(`border-t-${colorName}-${variantNumber}`)}`]: {
              borderTopColor: variantColorCode,
            },
            [`.${e(`border-b-${colorName}-${variantNumber}`)}`]: {
              borderBottomColor: variantColorCode,
            },
            [`.${e(`border-l-${colorName}-${variantNumber}`)}`]: {
              borderLeftColor: variantColorCode,
            },
            [`.${e(`border-r-${colorName}-${variantNumber}`)}`]: {
              borderRightColor: variantColorCode,
            },
          })),
      );

      addUtilities(borderTopColor);
    }),
    // This plugin adds a `spin` class
    plugin(({ addBase, addUtilities }) => {
      addBase({
        '@keyframes spinner': {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '100%': {
            transform: 'rotate(360deg)',
          },
        },
      });

      addUtilities({
        '.spin': {
          animation: 'spinner 1.5s linear infinite',
        },
      });
    }),
    // Add important variant
    // see https://github.com/tailwindlabs/tailwindcss/issues/493#issuecomment-610907147
    plugin(({ addVariant }) => {
      addVariant('important', ({ container }) => {
        container.walkRules(rule => {
          rule.selector = `.\\!${rule.selector.slice(1)}`;
          rule.walkDecls(decl => {
            decl.important = true;
          });
        });
      });
    }),
  ],
};
