module.exports = {
  theme: {
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
    padding: ['first'],
  },
};
