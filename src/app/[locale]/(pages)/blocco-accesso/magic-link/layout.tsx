import { Props } from '../../../layout';

export async function generateMetadata(props: Props) {
  const params = await props.params;
  const { locale } = params;
  const messages = (await import(`../../../../../dictionaries/${locale}.json`)).default;

  return {
    title: messages.ioesco.metadati.bloccoaccessomagiclinktitle,
    description: messages.ioesco.metadati.bloccoaccessomagiclinkdescription,
  };
}
export default function MagicLinkLayout({ children }: Props) {
  return children;
}
