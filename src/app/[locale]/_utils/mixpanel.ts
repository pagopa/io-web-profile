import mixpanel from 'mixpanel-browser';
import { hasConsent } from '../_hooks/useConsent';
import { cookieRead } from './cookie-utils';
import { isBrowser, isEnvConfigEnabled } from './common';

const ANALYTICS_ENABLE = process.env.NEXT_PUBLIC_ANALYTICS_ENABLE;
const ANALYTICS_MOCK = isEnvConfigEnabled(process.env.NEXT_PUBLIC_ANALYTICS_MOCK);
const ANALYTICS_TOKEN = process.env.NEXT_PUBLIC_ANALYTICS_TOKEN || '';
const ANALYTICS_API_HOST = process.env.NEXT_PUBLIC_ANALYTICS_API_HOST;
const ANALYTICS_PERSISTENCE = process.env.NEXT_PUBLIC_ANALYTICS_PERSISTENCE;
const ANALYTICS_LOG_IP = isEnvConfigEnabled(process.env.NEXT_PUBLIC_ANALYTICS_LOG_IP);
const ANALYTICS_DEBUG = isEnvConfigEnabled(process.env.NEXT_PUBLIC_ANALYTICS_DEBUG);
const DEVICE_ID = isBrowser() && cookieRead('device_id', 'string');
const IS_SUBDOMAIN = isEnvConfigEnabled(process.env.NEXT_PUBLIC_IS_ACCOUNT_SUBDOMAIN);

type EventCategory = 'KO' | 'TECH' | 'UX';

type EventType =
  | 'action'
  | 'control'
  | 'exit'
  | 'micro_action'
  | 'screen_view'
  | 'confirm'
  | 'error'
  | undefined;

export interface EventProperties {
  event_type?: EventType;
  event_category?: EventCategory;
  [key: string]: unknown;
}

/** To call in order to start the analytics service, otherwise no event will be sent */
// eslint-disable-next-line sonarjs/cognitive-complexity
export const initAnalytics = (): void => {
  if (ANALYTICS_ENABLE) {
    if (ANALYTICS_MOCK) {
      // eslint-disable-next-line no-console
      console.log('Mixpanel events mock on console log.');
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (isBrowser() && !(window as any).initMixPanel) {
        mixpanel.init(ANALYTICS_TOKEN, {
          api_host: ANALYTICS_API_HOST,
          persistence: ANALYTICS_PERSISTENCE as 'cookie' | 'localStorage',
          ip: ANALYTICS_LOG_IP,
          debug: ANALYTICS_DEBUG,
        });
        // eslint-disable-next-line functional/immutable-data, @typescript-eslint/no-explicit-any
        (window as any).initMixPanel = true;
        // decomment only to make some tests
        // const baseUrl = isBrowser() && window.location.origin;
        // if (baseUrl === 'http://sub.localhost:3000') {
        //   cookieWrite(
        //     'device_id',
        //     '19474d3c9bd23ad-0d6f3263d3123f-1e525636-1d73c0-19474d3c9bd23ad',
        //     'string',
        //     {
        //       domain: '.localhost', // makes the cookie valid on the sub domains
        //       path: '/', // makes the cookie valid for all pages
        //       maxAge: 60 * 60 * 24 * 30, // cookie duration
        //       secure: false, // if value is false "https" is NOT required
        //       sameSite: 'none', // if "none" the cookie is available on all domains insert in "domain" value.
        //                            Otherwise the cookie is available only on the current domain
        //     }
        //   );
        // }
      }
      /**
       * This ‘identify’ call is only made if the user
       * is landing on the portal from the showcase site.
       * Only in this case does it have the device_id in the cookies
       */
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (DEVICE_ID && IS_SUBDOMAIN && !(window as any).mixPanelIdentify) {
        mixpanel.identify(DEVICE_ID);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, functional/immutable-data
        (window as any).mixPanelIdentify = true;
      }
    }
  }
};

/**
 * To notify an event through the analytics tool:
 * @property event_name: the name of the event
 * @property properties: the additional payload sent with the event
 * @property callback: an action taken when the track has completed (If the action taken immediately after the track is an exit action from the application, it's better to use this callback to perform the exit, in order to give to mixPanel the time to send the event)
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const trackEvent = (
  event_name: string,
  properties?: EventProperties,
  callback?: () => void
): void => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (ANALYTICS_ENABLE && (window as any).initMixPanel && hasConsent()) {
    if (ANALYTICS_MOCK) {
      // eslint-disable-next-line no-console
      console.log(event_name, properties);
      if (callback) {
        callback();
      }
    } else {
      trackEventThroughAnalyticTool(event_name, properties, callback);
    }
  } else {
    if (callback) {
      callback();
    }
  }
};

const trackEventThroughAnalyticTool = (
  event_name: string,
  // eslint-disable-next-line
  properties?: EventProperties,
  callback?: () => void
): void => {
  // eslint-disable-next-line functional/no-let
  let called = false;
  const wrappedCallback = callback
    ? () => {
        try {
          called = true;
          callback();
        } catch (reason) {
          // eslint-disable-next-line no-console
          console.error(
            `Something gone wrong while calling trackEvent ${event_name} callback`,
            reason
          );
        }
      }
    : undefined;
  try {
    mixpanel.track(
      event_name,
      {
        ...properties,
      },
      wrappedCallback ? { send_immediately: true } : undefined,
      wrappedCallback
    );
  } catch (reason) {
    // eslint-disable-next-line no-console
    console.error('Something gone wrong while sending data to mixpanel:', reason);
    // eslint-disable-next-line no-console
    console.log(event_name, properties);

    if (wrappedCallback && !called) {
      wrappedCallback();
    }
  }
};
