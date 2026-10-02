import { getTranslations } from 'next-intl/server';
import { Props } from '../../../layout';

export async function generateMetadata() {
  const t = await getTranslations('ioesco.metadati');

  return {
    title: t('bloccoaccessomagiclinkscadutotitle'),
    description: t('bloccoaccessomagiclinkscadutodescription'),
  };
}

export default function MagicLinkExpiredLayout({ children }: Props) {
  return children;
}
