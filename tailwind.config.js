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
      gridTemplateColumns: {
        selectTweet: 'min-content 1fr',
        chatBox: 'minmax(0, 1fr) minmax(0, 2fr)',
      },
      gridTemplateRows: {
        fullPage: 'auto minmax(0, 1fr)',
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
  },
};
