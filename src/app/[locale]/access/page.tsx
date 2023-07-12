import { getTranslator } from 'next-intl/server';

interface IProps {
  readonly params: {
    readonly locale: string;
  };
}

const Accesso = async ({ params: { locale } }: IProps): Promise<React.ReactElement> => {
  const t = await getTranslator(locale, 'access');
  return <h1>{t('hello')}</h1>;
};

export default Accesso;
