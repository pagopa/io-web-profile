import { Props } from '../../../layout';

export async function generateMetadata({ params }: Props) {
  const { locale } = params;
  const messages = (await import(`../../../../../dictionaries/${locale}.json`)).default;

  return {
    title: messages.ioweb.metadati.ripristinoacessoopcompletatatitle,
    description: messages.ioweb.metadati.ripristinoacessoopcompletatadescription,
  };
}
export default function RestoreAccessCompletedLayout({ children }: Props) {
  return children;
}
