import { getTranslations } from 'next-intl/server';
import { Props } from '../../../layout';

export async function generateMetadata() {
  const t = await getTranslations('ioesco.metadati');

  return {
    title: t('confirmedemailtitle'),
    description: t('confirmedemaildescription'),
  };
}

export default function AccessLayout({ children }: Props) {
  return children;
}
