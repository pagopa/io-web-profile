import { getTranslations } from 'next-intl/server';
import { Props } from '../../../layout';

export async function generateMetadata() {
  const t = await getTranslations('ioesco.metadati');

  return {
    title: t('erroretitle'),
    description: t('erroredescription'),
  };
}

export default function LogOutErrorLayout({ children }: Props) {
  return children;
}
