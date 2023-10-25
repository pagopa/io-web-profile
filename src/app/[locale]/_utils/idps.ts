import { isEnvConfigEnabled } from './common';

export type IdentityProvider = {
  identifier: string;
  entityId: string;
  name: string;
  imageUrl: string;
};

const IDPS: { identityProviders: IdentityProvider[]; richiediSpid: string } = {
  identityProviders: [
    {
      identifier: 'Aruba',
      entityId: 'arubaid',
      name: 'Aruba.it ID',
      imageUrl: 'https://assets.cdn.io.italia.it/spid/idps/spid-idp-arubaid.png',
    },
    {
      identifier: 'Poste',
      entityId: 'posteid',
      name: 'Poste ID',
      imageUrl: 'https://assets.cdn.io.italia.it/spid/idps/spid-idp-posteid.png',
    },
    {
      identifier: 'Infocert',
      entityId: 'infocertid',
      name: 'Infocert ID',
      imageUrl: 'https://assets.cdn.io.italia.it/spid/idps/spid-idp-infocertid.png',
    },
    {
      identifier: 'IntesiGroup',
      entityId: 'intesiid',
      name: 'Intesi Group SPID',
      imageUrl: 'https://assets.cdn.io.italia.it/spid/idps/spid-idp-intesigroupspid.png',
    },
    {
      identifier: 'Register',
      entityId: 'spiditalia',
      name: 'SpidItalia',
      imageUrl: 'https://assets.cdn.io.italia.it/spid/idps/spid-idp-spiditalia.png',
    },
    {
      identifier: 'Sielte',
      entityId: 'sielteid',
      name: 'Sielte id',
      imageUrl: 'https://assets.cdn.io.italia.it/spid/idps/spid-idp-sielteid.png',
    },
    {
      identifier: 'Namirial',
      entityId: 'namirialid',
      name: 'Namirial ID',
      imageUrl: 'https://assets.cdn.io.italia.it/spid/idps/spid-idp-namirialid.png',
    },
    {
      identifier: 'Tim',
      entityId: 'timid',
      name: 'TIM id',
      imageUrl: 'https://assets.cdn.io.italia.it/spid/idps/spid-idp-timid.png',
    },
    {
      identifier: 'Lepida',
      entityId: 'lepidaid',
      name: 'Lepida',
      imageUrl: 'https://assets.cdn.io.italia.it/spid/idps/spid-idp-lepidaid.png',
    },
    {
      identifier: 'TeamSystem',
      entityId: 'teamsystemid',
      name: 'TeamSystem',
      imageUrl: 'https://assets.cdn.io.italia.it/spid/idps/spid-idp-teamsystemid.png',
    },
    {
      identifier: 'EtnaHitech',
      entityId: 'ehtid',
      name: 'Etna Hitech S.C.p.A.',
      imageUrl: 'https://assets.cdn.io.italia.it/spid/idps/spid-idp-etnaid.png',
    },
    {
      identifier: 'InfoCamere',
      entityId: 'infocamereid',
      name: 'InfoCamere S.C.p.A.',
      imageUrl: 'https://assets.cdn.io.italia.it/spid/idps/spid-idp-infocamereid.png',
    },
  ].sort(() => 0.5 - Math.random()),
  richiediSpid: 'https://www.spid.gov.it/cos-e-spid/come-attivare-spid/',
};

if (isEnvConfigEnabled(process.env.NEXT_PUBLIC_SPID_TEST_ENV_ENABLED)) {
  // eslint-disable-next-line functional/immutable-data
  IDPS.identityProviders.push({
    identifier: 'test',
    entityId: 'xx_testenv2',
    name: 'test',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/11/Test-Logo.svg',
  });
}

if (isEnvConfigEnabled(process.env.NEXT_PUBLIC_SPID_TEST_ENV_UAT_ENABLED)) {
  // eslint-disable-next-line functional/immutable-data
  IDPS.identityProviders.push({
    identifier: 'test',
    entityId: 'xx_validator',
    name: 'test',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/11/Test-Logo.svg',
  });
}

if (isEnvConfigEnabled(process.env.NEXT_PUBLIC_CIE_UAT_LOGIN_ENABLED)) {
  // eslint-disable-next-line functional/immutable-data
  IDPS.identityProviders.push({
    identifier: 'test',
    entityId: 'xx_servizicie_test',
    name: 'test_cie',
    imageUrl: 'https://idserver.servizicie.interno.gov.it/idp/images/cielogo.png',
  });
}

export { IDPS };

// TODO remove this temporary flag isIdpKnownafter getSessionsList API is ready in a future version
export const isIdpKnown = (): boolean => process.env.NEXT_PUBLIC_FEATURE_FLAG === 'true';

export const goCIE = (spidLevel: string) => {
  // MANDATORY !!
  // FIX ME WHEN CIE WILL BE AVAILABLE
  // MISSING LOGIN INFO ON loginInfo VAR for MIXPANEL LOGIN TECH EVENT
  //
  // storageLoginInfoOps.write({
  //   idpId: 'CIE',
  //   idpName: 'CIE',
  //   idpSecurityLevel: spidLevel,
  // });
  window.location.assign(
    `${process.env.NEXT_PUBLIC_URL_SPID_LOGIN}?entityID=${process.env.NEXT_PUBLIC_SPID_CIE_ENTITY_ID}&authLevel=Spid${spidLevel}&RelayState=ioapp`
  );
};
