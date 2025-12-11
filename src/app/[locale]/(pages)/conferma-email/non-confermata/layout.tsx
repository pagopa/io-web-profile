import { Props } from '../../../layout';

export async function generateMetadata({ params }: Props) {
  const { locale } = params;
  const messages = (await import(`../../../../../dictionaries/${locale}.json`)).default;

  return {
    title: messages.ioesco.metadati.confirmerrorgenerictitle,
    description: messages.ioesco.metadati.confirmerrorgenericdescription,
  };
}

export default function AccessLayout({ children }: Props) {
  return children;
}
