import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const metadata = {
  title: 'Blocca l’accesso a IO',
  description:
    'Segui le istruzioni per bloccare l’accesso all’app IO con la tua identità digitale.',
};
export default function MagicLinkLayout({ children }: Props) {
  return children;
}
