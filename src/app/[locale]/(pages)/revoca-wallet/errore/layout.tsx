import { getTranslations } from 'next-intl/server';
import { Props } from '../../../layout';

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ioesco.metadati' });

  return {
    title: t('ripristinoaccessoerroretitle'),
    description: t('ripristinoaccessoerroredescription'),
  };
}

export default function DisableWalletErrorLayout({ children }: Props) {
  return children;
}
