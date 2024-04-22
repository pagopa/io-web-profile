import { Props } from '../../../layout';

export async function generateMetadata({ params }: Props) {
  const { locale } = params;
  const messages = (await import(`../../../../../dictionaries/${locale}.json`)).default;

  return {
    title: messages.ioweb.metadati.esciconfermatitle,
    description: messages.ioweb.metadati.esciconfermadescription,
  };
}

export default function LogOutConfirmLayout({ children }: Props) {
  return children;
}
