import { Props } from '../../../layout';

export async function generateMetadata({ params }: Props) {
  const { locale } = params;
  const messages = (await import(`../../../../../dictionaries/${locale}.json`)).default;

  return {
    title: messages.ioweb.metadati.accedierroretitle,
    description: messages.ioweb.metadati.accedierroredescription,
  };
}
export default function AccessErrorLayout({ children }: Props) {
  return children;
}
