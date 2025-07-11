import { Props } from '../../../layout';

export async function generateMetadata(props: Props) {
  const params = await props.params;
  const { locale } = params;
  const messages = (await import(`../../../../../dictionaries/${locale}.json`)).default;

  return {
    title: messages.ioesco.metadati.bloccoaccessomagiclinkscadutotitle,
    description: messages.ioesco.metadati.bloccoaccessomagiclinkscadutodescription,
  };
}
export default function MagicLinkExpiredLayout({ children }: Props) {
  return children;
}
