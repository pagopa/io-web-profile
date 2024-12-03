import { Props } from '../../layout';

export async function generateMetadata({ params }: Props) {
  const { locale } = params;
  const messages = (await import(`../../../../dictionaries/${locale}.json`)).default;

  return {
    title: messages.ioesco.metadati.esciconfermatitle,
    description: messages.ioesco.metadati.esciconfermadescription,
  };
}

export default function LogOutConfirmLayout({ children }: Props) {
  return children;
}
