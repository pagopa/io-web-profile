import { Props } from '../../../layout';

export async function generateMetadata({ params }: Props) {
  const { locale } = params;
  const messages = (await import(`../../../../../dictionaries/${locale}.json`)).default;

  return {
    title: messages.ioesco.metadati.erroretitle,
    description: messages.ioesco.metadati.erroredescription,
  };
}
export default function LogOutErrorLayout({ children }: Props) {
  return children;
}
