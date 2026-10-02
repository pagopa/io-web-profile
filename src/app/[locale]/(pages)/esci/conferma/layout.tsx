import { getTranslations } from 'next-intl/server';
import { Props } from '../../../layout';

export async function generateMetadata() {
  const t = await getTranslations('ioesco.metadati');

  return {
    title: t('esciconfermatitle'),
    description: t('esciconfermadescription'),
  };
}

export default function LogOutConfirmLayout({ children }: Props) {
  return children;
}
