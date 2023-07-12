import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@pagopa/mui-italia';
import { store } from '@/redux/store';
import '@fontsource/dm-mono/400.css';
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const App = ({ Component, pageProps }: AppProps) => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  </Provider>
);

export default appWithTranslation(App);
