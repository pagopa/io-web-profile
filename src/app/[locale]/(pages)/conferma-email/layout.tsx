import { Props } from '../../layout';

export async function generateMetadata() {
  return {
    title: 'È la tua email?',
    description: 'Conferma il tuo indirizzo email per ricevere le comunicazioni da IO.',
  };
}

export default function AccessLayout({ children }: Props) {
  return children;
}
