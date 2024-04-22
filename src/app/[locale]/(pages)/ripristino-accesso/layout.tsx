import { Props } from '../../layout';

export async function generateMetadata({ params }: Props) {
  const { locale } = params;
  const messages = (await import(`../../../../dictionaries/${locale}.json`)).default;

  return {
    title: messages.ioweb.metadati.ripristinoaccessol2title,
    description: messages.ioweb.metadati.ripristinoaccessol2description,
  };
}
export default function RestoreAccessLayout({ children }: Props) {
  return children;
}
