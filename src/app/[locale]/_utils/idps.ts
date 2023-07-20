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
    {
      identifier: 'test',
      entityId: 'xx_validator',
      name: 'test',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/11/Test-Logo.svg',
    },
  ].sort(() => 0.5 - Math.random()),
  richiediSpid: 'https://www.spid.gov.it/cos-e-spid/come-attivare-spid/',
};

export { IDPS };

export const isIDPKnown = false;
