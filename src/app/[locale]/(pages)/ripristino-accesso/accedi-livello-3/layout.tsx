import { Props } from '../../../layout';

export async function generateMetadata({ params }: Props) {
  const { locale } = params;
  const messages = (await import(`../../../../../dictionaries/${locale}.json`)).default;

  return {
    title: messages.ioweb.metadati.ripristinoaccessol3title,
    description: messages.ioweb.metadati.ripristinoaccessol3description,
  };
}

export default function RestoreAccessAccessL3Layout({ children }: Props) {
  return children;
}
