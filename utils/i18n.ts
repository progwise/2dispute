import path from 'path';
import NextI18Next, { UseTranslation } from 'next-i18next';

const nextI18Next = new NextI18Next({
  defaultLanguage: 'en',
  otherLanguages: ['de'],
  localePath: path.resolve('./public/static/locales'),
});

export const useTranslation: UseTranslation = () =>
  nextI18Next.useTranslation();

export const Trans = nextI18Next.Trans;

export default nextI18Next;
