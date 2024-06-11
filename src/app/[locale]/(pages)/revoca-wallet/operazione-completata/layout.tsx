import { Props } from '../../../layout';

export async function generateMetadata({ params }: Props) {
  const { locale } = params;
  const messages = (await import(`../../../../../dictionaries/${locale}.json`)).default;

  return {
    title: messages.ioesco.metadati.revokewalletthankyoutitle,
    description: messages.ioesco.metadati.revokewalletthankyoudescription,
  };
}

export default function WalletInstanceRevokeThankyouLayout({ children }: Props) {
  return children;
}
