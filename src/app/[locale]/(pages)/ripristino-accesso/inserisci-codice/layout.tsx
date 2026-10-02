import { getTranslations } from 'next-intl/server';
import { Props } from '../../../layout';

export async function generateMetadata() {
  const t = await getTranslations('ioesco.metadati');

  return {
    title: t('ripristinoaccessoinseriscicodtitle'),
    description: t('ripristinoaccessoinseriscicoddescription'),
  };
}

export default function InsertCodeLayout({ children }: Props) {
  return children;
}
