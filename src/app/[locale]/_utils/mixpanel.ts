import mixpanel, { Mixpanel } from 'mixpanel-browser';

const ANALYTICS_ENABLE = true;
const ANALYTICS_MOCK = false;

const ANALYTICS_TOKEN = '';

const ANALYTICS_API_HOST = '';
const ANALYTICS_PERSISTENCE = '';
const ANALYTICS_LOG_IP = true;
const ANALYTICS_PROPERTY_BLACKLIST = [''];
const ANALYTICS_DEBUG = true;

/** To call in order to start the analytics service, otherwise no event will be sent */
export const initAnalytics = (): void => {
  if (ANALYTICS_ENABLE) {
    // eslint-disable-next-line functional/immutable-data, @typescript-eslint/no-explicit-any
    (window as any).initMixPanel = true;
    if (ANALYTICS_MOCK) {
      // eslint-disable-next-line no-console
      console.log('Mixpanel events mock on console log.');
    } else {
      mixpanel.init(ANALYTICS_TOKEN, {
        api_host: ANALYTICS_API_HOST,
        persistence: ANALYTICS_PERSISTENCE as 'cookie' | 'localStorage',
        ip: ANALYTICS_LOG_IP,
        property_blacklist: ANALYTICS_PROPERTY_BLACKLIST,
        debug: ANALYTICS_DEBUG,
        loaded(mixpanel: Mixpanel) {
          // this is useful to obtain a new distinct_id every session
          // the distinct_id is the user identifier that mixpanel automatically assign
          if (sessionStorage.getItem('user') === null) {
            mixpanel.reset();
          }
        },
      });
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
export const trackEvent = (event_name: string, properties?: any, callback?: () => void): void => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (ANALYTICS_ENABLE) {
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  properties?: any,
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
