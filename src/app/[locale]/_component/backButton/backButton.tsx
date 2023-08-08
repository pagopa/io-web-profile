import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ButtonNaked } from '@pagopa/mui-italia';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next-intl/client';
import { localeFromStorage } from '../../_utils/common';

type BackButtonProps = {
  href?: string;
  text?: string;
};

export const BackButton = ({ href = '/', text, ...props }: BackButtonProps) => {
  const t = useTranslations('ioesco.common');
  const router = useRouter();

  return (
    <ButtonNaked
      onClick={() => router.push(`${href}`, { locale: localeFromStorage })}
      startIcon={<ArrowBackIcon />}
      color="primary"
      sx={{ marginBottom: '41px' }}
      {...props}
    >
      {text || t('backtoprofile')}
    </ButtonNaked>
  );
};
