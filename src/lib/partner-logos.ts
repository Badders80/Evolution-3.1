export type PartnerLogo = {
  name: string;
  imagePath: string;
  url?: string;
  type: 'publication' | 'partner';
  tone?: 'mono' | 'accent';
  imageClassName?: string;
};

export const partnerLogos: PartnerLogo[] = [
  {
    name: 'Investing.com',
    imagePath: '/images/partners/1_Investing_comLOGO.png',
    type: 'publication',
    tone: 'accent',
  },
  {
    name: 'BusinessDesk',
    imagePath: '/images/partners/2_businessdesk-Logo.jpg',
    type: 'publication',
    tone: 'accent',
  },
  {
    name: 'Singularry',
    imagePath: '/images/partners/3_SingularryLOGO.png',
    type: 'partner',
    tone: 'accent',
  },
  {
    name: 'Tokinvest',
    imagePath: '/images/partners/4_New Logo - White & Green.png',
    type: 'partner',
    tone: 'accent',
  },
  {
    name: 'Trackside NZ',
    imagePath: '/images/partners/6_tracksideNZ-logo.png',
    type: 'publication',
    tone: 'accent',
  },
  {
    name: 'NZTR',
    imagePath: '/images/partners/8_NZTR_LOGO_WHITE.png',
    type: 'partner',
  },
  {
    name: 'Stephen Grey Racing',
    imagePath: '/images/partners/9_StephenGreyRacingLogo.png',
    type: 'partner',
    tone: 'accent',
  },
  {
    name: 'Arabian Business',
    imagePath: '/images/partners/10_arabian-bussiness-logo.png',
    type: 'publication',
    imageClassName: 'max-w-[115px] max-h-[60px]',
  },
  {
    name: 'NZTR Authorised Syndicator',
    imagePath: '/images/partners/11 NZTR Auth_Synd.png',
    type: 'partner',
    imageClassName: 'max-w-[115px] max-h-[60px]',
  },
];
