import mixpanel from 'mixpanel-browser';

const ANALYTICS_ENABLE = process.env.NEXT_PUBLIC_ANALYTICS_ENABLE;
const ANALYTICS_MOCK = process.env.NEXT_PUBLIC_ANALYTICS_MOCK;
const ANALYTICS_TOKEN = process.env.NEXT_PUBLIC_ANALYTICS_TOKEN || '';
const ANALYTICS_API_HOST = process.env.NEXT_PUBLIC_ANALYTICS_API_HOST;
const ANALYTICS_PERSISTENCE = process.env.NEXT_PUBLIC_ANALYTICS_PERSISTENCE;
const ANALYTICS_LOG_IP = process.env.NEXT_PUBLIC_ANALYTICS_LOG_IP === 'true' ? true : false;
const ANALYTICS_DEBUG = process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === 'true' ? true : false;

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
        debug: ANALYTICS_DEBUG,
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
