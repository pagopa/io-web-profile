export const extractToken = (): string => {
  const URL = window.location.href;
  const tokenIndex = URL.indexOf('#Token=');
  if (tokenIndex !== -1) {
    return URL.substring(tokenIndex + 7);
  } else {
    return '';
  }
};

export const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};
