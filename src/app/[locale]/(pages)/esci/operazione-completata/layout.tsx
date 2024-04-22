import { Props } from '../../../layout';

export async function generateMetadata({ params }: Props) {
  const { locale } = params;
  const messages = (await import(`../../../../../dictionaries/${locale}.json`)).default;

  return {
    title: messages.ioweb.metadati.escioperazionecompletatatitle,
    description: messages.ioweb.metadati.escioperazionecompletatadescription,
  };
}
export default function LogOutCompletedLayout({ children }: Props) {
  return children;
}
