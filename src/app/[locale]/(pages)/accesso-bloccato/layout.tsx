import { Props } from '../../layout';

export async function generateMetadata(props: Props) {
  const params = await props.params;
  const { locale } = params;
  const messages = (await import(`../../../../dictionaries/${locale}.json`)).default;

  return {
    title: messages.ioesco.metadati.accessobloccatotitle,
    description: messages.ioesco.metadati.accessobloccatodescription,
  };
}
export default function AcessLockedLayout({ children }: Props) {
  return children;
}
