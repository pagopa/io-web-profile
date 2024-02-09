import Loader from './_component/loader/loader';

// USED WITH NEXT.JS FOR SSR
// WE ARE CURRENLTY USING SSG WITH SUSPENS COMPONENT WRAPPER
// DOC at: https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming

export default function Loading() {
  return <Loader />;
}
