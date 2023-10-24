declare const OneTrust: {
  NoticeApi: {
    Initialized: Promise<unknown>;
    LoadNotices: (urls: unknown[]) => void;
  };
};

export const onLoadPrivacyPolicy = (otNoticeId: string) =>
  new Promise((resolve, reject) => {
    OneTrust.NoticeApi.Initialized.then(function () {
      OneTrust.NoticeApi.LoadNotices([
        `https://privacyportalde-cdn.onetrust.com/77f17844-04c3-4969-a11d-462ee77acbe1/privacy-notices/${otNoticeId}.json`,
      ]);
      resolve(true);
    }).catch(() => {
      reject(false);
    });
  });
