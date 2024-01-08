import { useState, useEffect } from 'react';

type Mobile = {
  isMobile: boolean;
};

const useIsMobile = (): Mobile => {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768 ? true : false);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768 ? true : false);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { isMobile };
};

export default useIsMobile;
