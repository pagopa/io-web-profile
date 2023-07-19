import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ButtonProps } from '@mui/material';
import { ButtonNaked } from '@pagopa/mui-italia';
import Link from 'next/link';

interface BackButtonProps extends ButtonProps {
  href?: string;
  text?: string;
}

export function BackButton({
  href = '/profile',
  text = 'Torna al profilo',
  ...props
}: BackButtonProps) {
  return (
    <Link href={href}>
      <ButtonNaked
        startIcon={<ArrowBackIcon />}
        color="primary"
        sx={{ marginBottom: '41px' }}
        {...props}
      >
        {text}
      </ButtonNaked>
    </Link>
  );
}
