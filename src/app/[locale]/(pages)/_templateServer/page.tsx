import { useTranslations } from 'next-intl';

const Index = () => {
  const t = useTranslations('ioesco');
  <div>
    <h1>{t('template')}</h1>
  </div>;
};

export default Index;
