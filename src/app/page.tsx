'use client'
import { HeaderAccount } from "@pagopa/mui-italia";

export default function Home() {
  return (
    <>
      <HeaderAccount
        rootLink={{
          ariaLabel: "string",
          href: "string",
          label: "string",
          title: "string",
        }}
        loggedUser={false}
        onAssistanceClick={(): void => {
          // eslint-disable-next-line no-console
          console.log("Clicked/Tapped on Assistance");
        }}
        onLogin={(): void => {
          // eslint-disable-next-line no-console
          console.log("User login");
        }}
      />
    </>
  );
}
