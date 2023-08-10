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
};

const CommonLayoutRestore = ({
  title,
  summary,
  summaryColumns = { xs: 12, md: 7.5 },
}: CommonLayoutRestoreProps) => (
  <>
    <BackButton />
    <Introduction title={title} summary={summary} summaryColumns={summaryColumns} />

    <IdpListOnApp />
  </>
);

export default CommonLayoutRestore;
