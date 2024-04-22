import { Props } from '../../../layout';

export async function generateMetadata({ params }: Props) {
  const { locale } = params;
  const messages = (await import(`../../../../../dictionaries/${locale}.json`)).default;

  return {
    title: messages.ioweb.metadati.bloccoaccessomagiclinkscadutotitle,
    description: messages.ioweb.metadati.bloccoaccessomagiclinkscadutodescription,
  };
}
export default function MagicLinkExpiredLayout({ children }: Props) {
  return children;
}
