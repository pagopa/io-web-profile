/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'test' | 'production';

    NEXT_PUBLIC_URL_SPID_LOGIN: string;
    NEXT_PUBLIC_URL_IO: string;
    NEXT_PUBLIC_JWT_SPID_LEVEL_VALUE_L1: string;
    NEXT_PUBLIC_JWT_SPID_LEVEL_VALUE_L2: string;
    NEXT_PUBLIC_JWT_SPID_LEVEL_VALUE_L3: string;
  }
}
interface Window {
  Stripe: any;
}
