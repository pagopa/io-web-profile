import { useLocale } from 'next-intl';
import { notFound } from 'next/navigation';

interface IObj {
  readonly children: React.ReactNode;
  readonly params: {
    readonly locale: string;
  };
}

const LocaleLayout = ({ children, params }: IObj): React.ReactElement => {
  const locale = useLocale();
  // Show a 404 error if the user requests an unknown locale
  if (params.locale !== locale) {
    notFound();
  }
  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
};

export default LocaleLayout;
