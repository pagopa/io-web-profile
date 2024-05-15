import { Props } from '../../../layout';

export async function generateMetadata({ params }: Props) {
  const { locale } = params;
  const messages = (await import(`../../../../../dictionaries/${locale}.json`)).default;
  return {
    title: messages.ioesco.metadati.ripristinoaccessoerroretitle,
    description: messages.ioesco.metadati.ripristinoaccessoerroredescription,
  };
}
export default function DisableWalletErrorLayout({ children }: Props) {
  return children;
}
