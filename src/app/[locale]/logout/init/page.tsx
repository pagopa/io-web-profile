import { getTranslator } from 'next-intl/server';

interface IProps {
  readonly params: {
    readonly locale: string;
  };
}

const Index = async ({ params: { locale } }: IProps): Promise<React.ReactElement> => {
  const t = await getTranslator(locale, 'logout');
  return <h1>{t('title')}</h1>;
};

export default Index;
