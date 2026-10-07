import { getTranslations } from 'next-intl/server';
import { Props } from '../../layout';

export async function generateMetadata() {
  const t = await getTranslations('ioesco.metadati');

  return {
    title: t('escititle'),
    description: t('escidescription'),
  };
}

export default function LogOutLayout({ children }: Props) {
  return children;
}
