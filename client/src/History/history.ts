import { createBrowserHistory } from 'history';

declare global {
  interface Window {
    dataLayer: unknown;
  }
}

export const history = createBrowserHistory();
