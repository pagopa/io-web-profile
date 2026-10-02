import { getTranslations } from 'next-intl/server';
import { Props } from '../../../layout';

export async function generateMetadata() {
  const t = await getTranslations('ioesco.metadati');

  return {
    title: t('revokewalletthankyoutitle'),
    description: t('revokewalletthankyoudescription'),
  };
}

export default function WalletInstanceRevokeThankyouLayout({ children }: Props) {
  return children;
}
