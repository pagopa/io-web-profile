import { getTranslations } from 'next-intl/server';
import { Props } from '../../../layout';

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ioesco.metadati' });

  return {
    title: t('confirmemailalreadytakenerrortitle'),
    description: t('confirmemailalreadytakenerrordescription'),
  };
}

export default function AccessLayout({ children }: Props) {
  return children;
}
