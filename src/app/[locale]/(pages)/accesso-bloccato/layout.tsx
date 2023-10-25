import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const metadata = {
  title: 'L’accesso a IO è già bloccato',
  description:
    'Puoi entrare nell’app IO solo con la tua identità digitale con un livello di sicurezza 3.',
};
export default function AcessLockedLayout({ children }: Props) {
  return children;
}
