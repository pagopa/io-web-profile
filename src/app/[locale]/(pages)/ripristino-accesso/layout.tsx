import { Props } from '../../layout';

export async function generateMetadata({ params }: Props) {
  const { locale } = params;
  const messages = (await import(`../../../../dictionaries/${locale}.json`)).default;

  return {
    title: messages.ioesco.metadati.ripristinoaccessol2title,
    description: messages.ioesco.metadati.ripristinoaccessol2description,
  };
}
export default function RestoreAccessLayout({ children }: Props) {
  return children;
}
