import { Props } from '../../layout';

export async function generateMetadata({ params }: Props) {
  const { locale } = params;
  const messages = (await import(`../../../../dictionaries/${locale}.json`)).default;

  return {
    title: messages.ioesco.metadati.bloccoaccessotitle,
    description: messages.ioesco.metadati.bloccoaccessodescription,
  };
}

export default function LockAccessLayout({ children }: Props) {
  return children;
}
