import { getTranslations } from 'next-intl/server';
import { Props } from '../../../layout';

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ioesco.metadati' });

  return {
    title: t('ripristinoaccessol3title'),
    description: t('ripristinoaccessol3description'),
  };
}

export default function RestoreAccessAccessL3Layout({ children }: Props) {
  return children;
}
