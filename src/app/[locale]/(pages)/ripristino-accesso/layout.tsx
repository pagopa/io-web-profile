import { getTranslations } from 'next-intl/server';
import { Props } from '../../layout';

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ioesco.metadati' });

  return {
    title: t('ripristinoaccessol2title'),
    description: t('ripristinoaccessol2description'),
  };
}

export default function RestoreAccessLayout({ children }: Props) {
  return children;
}
