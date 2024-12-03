import { Props } from '../../layout';

export async function generateMetadata({ params }: Props) {
  const { locale } = params;
  const messages = (await import(`../../../../dictionaries/${locale}.json`)).default;

  return {
    title: messages.ioesco.metadati.ripristinoaccessol3title,
    description: messages.ioesco.metadati.ripristinoaccessol3description,
  };
}

export default function RestoreAccessAccessL3Layout({ children }: Props) {
  return children;
}
