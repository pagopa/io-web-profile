import { getTranslator } from 'next-intl/server';

type LocaleProps = {
  params: {
    readonly locale: string;
  };
};

const Index = async ({ params: { locale } }: LocaleProps): Promise<React.ReactElement> => {
  const t = await getTranslator(locale, 'home');
  return (
    <div>
      <h1>{t('template')}</h1>
    </div>
  );
};

export default Index;
