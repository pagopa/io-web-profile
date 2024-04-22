import { Props } from '../../../layout';

export async function generateMetadata({ params }: Props) {
  const { locale } = params;
  const messages = (await import(`../../../../../dictionaries/${locale}.json`)).default;

  return {
    title: messages.ioweb.metadati.bloccoaccessoopcompletatatitle,
    description: messages.ioweb.metadati.bloccoaccessoopcompletatadescription,
  };
}

export default function LockAccessCompleteLayout({ children }: Props) {
  return children;
}
