import { Props } from '../../layout';

export async function generateMetadata(props: Props) {
  const params = await props.params;
  const { locale } = params;
  const messages = (await import(`../../../../dictionaries/${locale}.json`)).default;

  return {
    title: messages.ioesco.metadati.accedititle,
    description: messages.ioesco.metadati.accedidescription,
  };
}

export default function AccessLayout({ children }: Props) {
  return children;
}
