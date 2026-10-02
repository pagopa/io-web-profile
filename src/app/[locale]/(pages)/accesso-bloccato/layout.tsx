import { getTranslations } from 'next-intl/server';
import { Props } from '../../layout';

export async function generateMetadata() {
  const t = await getTranslations('ioesco.metadati');

  return {
    title: t('accessobloccatotitle'),
    description: t('accessobloccatodescription'),
  };
}

export default function AcessLockedLayout({ children }: Props) {
  return children;
}
