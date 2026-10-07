import { getTranslations } from 'next-intl/server';
import { Props } from '../../../layout';

export async function generateMetadata() {
  const t = await getTranslations('ioesco.metadati');

  return {
    title: t('bloccoaccessomagiclinktitle'),
    description: t('bloccoaccessomagiclinkdescription'),
  };
}

export default function MagicLinkLayout({ children }: Props) {
  return children;
}
