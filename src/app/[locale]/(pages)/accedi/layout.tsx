import { getTranslations } from 'next-intl/server';
import { Props } from '../../layout';

export async function generateMetadata() {
  const t = await getTranslations('ioesco.metadati');

  return {
    title: t('accedititle'),
    description: t('accedidescription'),
  };
}

export default function AccessLayout({ children }: Props) {
  return children;
}
