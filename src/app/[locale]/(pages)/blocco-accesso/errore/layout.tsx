import { Props } from '../../../layout';

export async function generateMetadata(props: Props) {
  const params = await props.params;
  const { locale } = params;
  const messages = (await import(`../../../../../dictionaries/${locale}.json`)).default;

  return {
    title: messages.ioesco.metadati.bloccoaccessoerroretitle,
    description: messages.ioesco.metadati.bloccoaccessoerroredescription,
  };
}
export default function LockAccessErrorLayout({ children }: Props) {
  return children;
}
