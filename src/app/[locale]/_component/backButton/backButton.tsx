import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ButtonProps } from '@mui/material';
import { ButtonNaked } from '@pagopa/mui-italia';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

interface BackButtonProps extends ButtonProps {
  href?: string;
  text?: string;
}

export function BackButton({ href = '/profile', text, ...props }: BackButtonProps) {
  const t = useTranslations('ioesco.common');
  return (
    <Link href={href}>
      <ButtonNaked
        startIcon={<ArrowBackIcon />}
        color="primary"
        sx={{ marginBottom: '41px' }}
        {...props}
      >
        {text || t('backtoprofile')}
      </ButtonNaked>
    </Link>
  );
}
