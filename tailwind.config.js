const tailwindSansFontFamily =
  'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';
const sansFontFamily = `"Open Sans", ${tailwindSansFontFamily}`;
const textMessageFontFamily = `Muli, ${sansFontFamily}`;

module.exports = {
  theme: {
    fontFamily: {
      sans: sansFontFamily,
      'text-message': textMessageFontFamily,
    },
    extend: {
      maxHeight: {
        '24': '6rem',
      },
      minHeight: {
        '48': '12rem',
      },
      gridTemplateColumns: {
        chat: 'minmax(0, 1fr) 1px minmax(0, 1fr)',
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
  },
};
