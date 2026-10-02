import { getTranslations } from 'next-intl/server';
import { Props } from '../../../layout';

export async function generateMetadata() {
  const t = await getTranslations('ioesco.metadati');

  return {
    title: t('accedierroretitle'),
    description: t('accedierroredescription'),
  };
}

export default function AccessErrorLayout({ children }: Props) {
  return children;
}
