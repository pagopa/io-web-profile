import { Props } from '../../../layout';

export async function generateMetadata(props: Props) {
  const params = await props.params;
  const { locale } = params;
  const messages = (await import(`../../../../../dictionaries/${locale}.json`)).default;

  return {
    title: messages.ioesco.metadati.escioperazionecompletatatitle,
    description: messages.ioesco.metadati.escioperazionecompletatadescription,
  };
}
export default function LogOutCompletedLayout({ children }: Props) {
  return children;
}
