import { Props } from '../../layout';

export async function generateMetadata({ params }: Props) {
  const { locale } = params;
  const messages = (await import(`../../../../dictionaries/${locale}.json`)).default;

  return {
    title: messages.ioesco.metadati.bloccoaccessoopcompletatatitle,
    description: messages.ioesco.metadati.bloccoaccessoopcompletatadescription,
  };
}

export default function LockAccessCompleteLayout({ children }: Props) {
  return children;
}
