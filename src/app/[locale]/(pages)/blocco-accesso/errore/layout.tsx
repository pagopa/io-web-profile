import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const metadata = {
  title: 'Non è possibile bloccare l’app IO',
  description:
    'C’è un problema sui nostri sistemi, non è possibile bloccare l’accesso a IO in questo momento. Riprova più tardi o contatta l’assistenza.',
};
export default function LockAccessErrorLayout({ children }: Props) {
  return children;
}
