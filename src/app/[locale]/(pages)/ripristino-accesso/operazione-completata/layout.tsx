import { getTranslations } from 'next-intl/server';
import { Props } from '../../../layout';

export async function generateMetadata() {
  const t = await getTranslations('ioesco.metadati');

  return {
    title: t('ripristinoacessoopcompletatatitle'),
    description: t('ripristinoacessoopcompletatadescription'),
  };
}

export default function RestoreAccessCompletedLayout({ children }: Props) {
  return children;
}
