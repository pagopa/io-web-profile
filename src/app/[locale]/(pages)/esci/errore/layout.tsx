import { Props } from '../../../layout';

export async function generateMetadata({ params }: Props) {
  const { locale } = params;
  const messages = (await import(`../../../../../dictionaries/${locale}.json`)).default;

  return {
    title: messages.ioweb.metadati.erroretitle,
    description: messages.ioweb.metadati.erroredescription,
  };
}
export default function LogOutErrorLayout({ children }: Props) {
  return children;
}
