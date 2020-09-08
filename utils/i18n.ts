import path from 'path';
import NextI18Next from 'next-i18next';

export default new NextI18Next({
  defaultLanguage: 'en',
  otherLanguages: ['de'],
  localePath: path.resolve('./public/static/locales'),
});
