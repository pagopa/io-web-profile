import { Props } from '../../../layout';

export async function generateMetadata(props: Props) {
  const params = await props.params;
  const { locale } = params;
  const messages = (await import(`../../../../../dictionaries/${locale}.json`)).default;

  return {
    title: messages.ioesco.metadati.ripristinoaccessoerroretitle,
    description: messages.ioesco.metadati.ripristinoaccessoerroredescription,
  };
}
export default function RestoreAccessErrorLayout({ children }: Props) {
  return children;
}
