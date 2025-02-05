import mixpanel, { Persistence } from 'mixpanel-browser';
import { hasConsent } from '../_hooks/useConsent';
import { isEnvConfigEnabled } from './common';

const ANALYTICS_ENABLE = process.env.NEXT_PUBLIC_ANALYTICS_ENABLE;
const ANALYTICS_MOCK = isEnvConfigEnabled(process.env.NEXT_PUBLIC_ANALYTICS_MOCK);
const ANALYTICS_TOKEN = process.env.NEXT_PUBLIC_ANALYTICS_TOKEN || '';
const ANALYTICS_API_HOST = process.env.NEXT_PUBLIC_ANALYTICS_API_HOST;
const ANALYTICS_PERSISTENCE = process.env.NEXT_PUBLIC_ANALYTICS_PERSISTENCE;
const ANALYTICS_LOG_IP = isEnvConfigEnabled(process.env.NEXT_PUBLIC_ANALYTICS_LOG_IP);
const ANALYTICS_DEBUG = isEnvConfigEnabled(process.env.NEXT_PUBLIC_ANALYTICS_DEBUG);

type EventCategory = 'KO' | 'TECH' | 'UX';

type WindowMPValues = {
  initMixPanelIoWeb?: boolean;
} & Window;

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
// eslint-disable-next-line prefer-const, @typescript-eslint/no-unused-vars
let mockSuperProperties: Record<string, unknown> = {};

const addIsIoWebSuperProperty = () => {
  if (ANALYTICS_MOCK) {
    mockSuperProperties = {
      ...mockSuperProperties,
      IS_IOWEB: true,
    };
  } else {
    mixpanel.register({
      IS_IOWEB: true,
    });
  }
};

/** To call in order to start the analytics service, otherwise no event will be sent */
export const initAnalytics = (): void => {
  if (ANALYTICS_ENABLE && !(window as WindowMPValues).initMixPanelIoWeb) {
    if (ANALYTICS_MOCK) {
      console.log('Mixpanel events mock on console log.');
    } else {
      mixpanel.init(ANALYTICS_TOKEN, {
        api_host: ANALYTICS_API_HOST,
        persistence: ANALYTICS_PERSISTENCE as Persistence,
        cookie_expiration: 0,
        secure_cookie: true, // change this value as false if you run in local .env
        cookie_domain: '.ioapp.it', // change this value with your dev domain
        ip: ANALYTICS_LOG_IP,
        debug: ANALYTICS_DEBUG,
      });
    }
    // eslint-disable-next-line functional/immutable-data
    (window as WindowMPValues).initMixPanelIoWeb = true;
    // In order the IS_IOWEB super property setted in every moment
    // and in every event is better call this function after the init
    addIsIoWebSuperProperty();
  }
};

/**
 * To notify an event through the analytics tool:
 * @property event_name: the name of the event
 * @property properties: the additional payload sent with the event
 * @property callback: an action taken when the track has completed (If the action taken immediately after the track is an exit action from the application, it's better to use this callback to perform the exit, in order to give to mixPanel the time to send the event)
 */
export const trackEvent = (
  event_name: string,
  properties?: EventProperties,
  callback?: () => void
): void => {
  if (ANALYTICS_ENABLE && (window as WindowMPValues).initMixPanelIoWeb && hasConsent()) {
    if (ANALYTICS_MOCK) {
      // eslint-disable-next-line no-console
      console.log(event_name, { ...mockSuperProperties, ...properties });
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
  properties?: EventProperties,
  callback?: () => void
): void => {
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
