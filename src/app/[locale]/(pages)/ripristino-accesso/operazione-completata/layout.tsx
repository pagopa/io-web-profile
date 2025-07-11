import { Props } from '../../../layout';

export async function generateMetadata(props: Props) {
  const params = await props.params;
  const { locale } = params;
  const messages = (await import(`../../../../../dictionaries/${locale}.json`)).default;

  return {
    title: messages.ioesco.metadati.ripristinoacessoopcompletatatitle,
    description: messages.ioesco.metadati.ripristinoacessoopcompletatadescription,
  };
}
export default function RestoreAccessCompletedLayout({ children }: Props) {
  return children;
}
