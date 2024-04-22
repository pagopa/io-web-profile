import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ButtonNaked } from '@pagopa/mui-italia';
import { useTranslations } from 'next-intl';
import useLocalePush from '../../_hooks/useLocalePush';

type BackButtonProps = {
  href?: string;
  text?: string;
};

export const BackButton = ({ href = '/', text, ...props }: BackButtonProps) => {
  const t = useTranslations('ioweb.common');
  const pushWithLocale = useLocalePush();

  return (
    <ButtonNaked
      onClick={() => pushWithLocale(href)}
      startIcon={<ArrowBackIcon />}
      color="primary"
      sx={{ marginBottom: '41px' }}
      {...props}
    >
      {text || t('backtoprofile')}
    </ButtonNaked>
  );
};
