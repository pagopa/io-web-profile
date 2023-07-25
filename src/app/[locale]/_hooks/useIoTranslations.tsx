import { useTranslations } from 'next-intl';

const useIoTranslations = (key: string) => useTranslations(`ioesco.${key}`);

export default useIoTranslations;
