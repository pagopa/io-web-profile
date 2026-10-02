import { getTranslations } from 'next-intl/server';
import { Props } from '../../../layout';

export async function generateMetadata() {
  const t = await getTranslations('ioesco.metadati');

  return {
    title: t('ripristinoaccessoerroretitle'),
    description: t('ripristinoaccessoerroredescription'),
  };
}

export default function RestoreAccessErrorLayout({ children }: Props) {
  return children;
}
