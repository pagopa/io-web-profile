import { getTranslations } from 'next-intl/server';
import { Props } from '../../layout';

export async function generateMetadata() {
  const t = await getTranslations('ioesco.metadati');

  return {
    title: t('bloccoaccessotitle'),
    description: t('bloccoaccessodescription'),
  };
}

export default function LockAccessLayout({ children }: Props) {
  return children;
}
