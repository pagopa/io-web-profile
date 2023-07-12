'use client';

import { useTranslations } from 'next-intl';

const Index = (): React.ReactElement => {
  const t = useTranslations('home');
  return <h1>{t('hello')}</h1>;
};

export default Index;
