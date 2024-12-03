import { Props } from '../../layout';

export async function generateMetadata({ params }: Props) {
  const { locale } = params;
  const messages = (await import(`../../../../dictionaries/${locale}.json`)).default;

  return {
    title: messages.ioesco.metadati.ripristinoaccessoinseriscicodtitle,
    description: messages.ioesco.metadati.ripristinoaccessoinseriscicoddescription,
  };
}
export default function InsertCodeLayout({ children }: Props) {
  return children;
}
