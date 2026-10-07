import { getTranslations } from 'next-intl/server';
import { Props } from '../../../layout';

export async function generateMetadata() {
  const t = await getTranslations('ioesco.metadati');

  return {
    title: t('bloccoaccessoopcompletatatitle'),
    description: t('bloccoaccessoopcompletatadescription'),
  };
}

export default function LockAccessCompleteLayout({ children }: Props) {
  return children;
}
