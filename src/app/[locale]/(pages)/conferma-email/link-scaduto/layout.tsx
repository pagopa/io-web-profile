import { getTranslations } from 'next-intl/server';
import { Props } from '../../../layout';

export async function generateMetadata() {
  const t = await getTranslations('ioesco.metadati');

  return {
    title: t('confirmexpiredlinkerrortitle'),
    description: t('confirmexpiredlinkerrordescription'),
  };
}

export default function AccessLayout({ children }: Props) {
  return children;
}
