import { isIdpKnown } from '../../_utils/idps';
import { BackButton } from '../backButton/backButton';
import { IdpListOnApp } from '../idpListOnApp/idpListOnApp';
import { Introduction } from '../introduction/introduction';

type CommonLayoutRestoreProps = {
  title: string;
  summary: string;
  summaryColumns?: {
    xs: number;
    sm?: number;
    md: number;
  };
  hideBackButton?: boolean;
};

const CommonLayoutRestore = ({
  title,
  summary,
  summaryColumns = { xs: 12, md: 7.5 },
  hideBackButton,
}: CommonLayoutRestoreProps) => (
  <>
    {!hideBackButton ? <BackButton /> : null}
    <Introduction title={title} summary={summary} summaryColumns={summaryColumns} />

    {isIdpKnown() && <IdpListOnApp />}
  </>
);

export default CommonLayoutRestore;
