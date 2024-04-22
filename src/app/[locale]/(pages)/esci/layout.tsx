import { Props } from '../../layout';

export async function generateMetadata({ params }: Props) {
  const { locale } = params;
  const messages = (await import(`../../../../dictionaries/${locale}.json`)).default;

  return {
    title: messages.ioweb.metadati.escititle,
    description: messages.ioweb.metadati.escidescription,
  };
}

export default function LogOutLayout({ children }: Props) {
  return children;
}
