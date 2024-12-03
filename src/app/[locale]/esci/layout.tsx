import { Props } from '../layout';

export async function generateMetadata({ params }: Props) {
  const { locale } = params;
  const messages = (await import(`../../../dictionaries/${locale}.json`)).default;

  return {
    title: messages.ioesco.metadati.escititle,
    description: messages.ioesco.metadati.escidescription,
  };
}

export default function LogOutLayout({ children }: Props) {
  return children;
}
