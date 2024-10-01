export const COMMON_PADDING_HERO = {
  pt: {
    xs: 5,
    sm: 5,
    md: 10,
  },
  pb: {
    xs: 5,
    sm: 5,
    md: 20,
  },
  pl: {
    xs: 4,
    sm: 4,
    md: 20,
  },
  pr: {
    xs: 4,
    sm: 4,
    md: 20,
  },
};
export const commonBackground = {
  backgroundColor: 'background.default',
  padding: {
    xs: 4,
    sm: 3,
    md: 20,
  },
  paddingBottom: {
    sm: 8,
  },
};

export const commonBackgroundFullHeight = {
  ...commonBackground,
  height: '100vh'
};

export const loaderOverlay = {
  position: 'fixed',
  display: 'flex',
  WebkitBoxAlign: 'center',
  alignItems: 'center',
  WebkitBoxPack: 'center',
  justifyContent: 'center',
  inset: '0px',
  WebkitTapHighlightColor: 'transparent',
  backgroundColor: 'rgba(23, 50, 77, 0.7)',
  'z-index': '1',
};

export const commonBackgroundWithBack = {
  backgroundColor: 'background.default',
  paddingTop: '34px',
  paddingBottom: {
    xs: 5,
    sm: 8,
  },
  paddingX: {
    xs: 4,
    sm: 3,
    md: 3,
    lg: 17.5,
  },
};

export const commonBackgroundLightWithBack = {
  backgroundColor: 'primary.paper',
  paddingTop: '34px',
  paddingBottom: {
    xs: 5,
    sm: 8,
  },
  paddingX: {
    xs: 4,
    sm: 3,
    md: 3,
    lg: 17.5,
  },
};

export const commonBackgroundDark = {
  backgroundColor: 'primary.dark',
  pt: COMMON_PADDING_HERO.pt,
  pb: COMMON_PADDING_HERO.pb,
  pl: COMMON_PADDING_HERO.pl,
  pr: COMMON_PADDING_HERO.pr,
};

export const commonBackgroundLight = {
  backgroundColor: 'primary.paper',
  pt: COMMON_PADDING_HERO.pt,
  pb: COMMON_PADDING_HERO.pb,
  pl: COMMON_PADDING_HERO.pl,
  pr: COMMON_PADDING_HERO.pr,
};

export const commonCardStyle = {
  backgroundColor: 'background.paper',
  height: '100%',
  boxShadow: '0px 8px 38px 7px #002B551A',
  borderRadius: '16px',
};

export const commonBackgroundLightFullHeight = {
  ...commonBackgroundLight,
  height: '100vh'
};
