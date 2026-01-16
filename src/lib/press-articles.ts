export interface PressArticle {
  title: string;
  url: string;
  publisher: string;
  date: string;
  excerpt?: string;
  imageUrl?: string;
}

export const pressArticles: PressArticle[] = [
  {
    title: 'Tokinvest and Singularry Superapp Partner to Make Regulated Real-World Asset Investing Accessible to Everyone',
    url: 'https://www.investing.com/news/cryptocurrency-news/tokinvest-and-singularry-superapp-partner-to-make-regulated-realworld-asset-investing-accessible-to-everyone-4316762',
    publisher: 'Investing.com',
    date: '2024-12-19',
    excerpt: 'Strategic partnership bringing regulated real-world asset investing to mainstream audiences through innovative digital platforms.',
    imageUrl: '/images/press/Investing.com.png',
  },
  {
    title: 'Thoroughbred Ownership Reimagined',
    url: 'https://trackside.co.nz/article/thoroughbred-ownership-reimagined',
    publisher: 'Trackside',
    date: '2024-11-15',
    excerpt: 'How Evolution Stables is transforming traditional racehorse syndication through digital innovation and blockchain technology.',
    imageUrl: '/images/press/Trackside.png',
  },
  {
    title: 'Digital Investment in Thoroughbred Horses: The New Frontier',
    url: 'https://businessdesk.co.nz/article/sport/digital-investment-in-thoroughbred-horses-the-new-frontier',
    publisher: 'BusinessDesk',
    date: '2025-01-16',
    excerpt: 'To most people, a racehorse is a thoroughbred animal that runs around a racetrack. To an emerging group of investors, it represents a digital transaction on a blockchain.',
    imageUrl: '/images/press/BD-Digital investment.png',
  },
  {
    title: 'Tokinvest Appointed by Evolution Stables to Launch Tokenised Racehorse Leases',
    url: 'https://tokinvest.capital/insights-and-news/tokinvest-and-evolution-stables',
    publisher: 'Tokinvest',
    date: '2025-04-04',
    excerpt: 'Tokinvest, the VARA-regulated marketplace transforming real-world asset (RWA) investing, has been appointed by Evolution Stables.',
    imageUrl: '/images/press/Tokinvest.png',
  },
  {
    title: 'Tokinvest Raises $3.2m Pre-Seed for RWA Platform',
    url: 'https://fintech.global/2025/09/30/tokinvest-raises-3-2m-pre-seed-for-rwa-platform/',
    publisher: 'FinTech Global',
    date: '2025-09-30',
    excerpt: 'Founded to democratise access to premium assets, Tokinvest provides a platform for fractional ownership across diverse asset classes.',
    imageUrl: '/images/press/FinTechGlobal.png',
  },
  {
    title: 'Bringing Racing into the Digital Age',
    url: 'https://businessdesk.co.nz/article/technology/bringing-racing-into-the-digital-age',
    publisher: 'BusinessDesk',
    date: '2024-10-28',
    excerpt: 'New Zealand racing industry embraces digital transformation with Evolution Stables leading the charge.',
    imageUrl: '/images/press/BD-Bringing racing into the digital age.png',
  },
  {
    title: "New Zealand's Evolution Stables Teams Up with Tokinvest for Tokenised Racehorse Leases Ahead of Dubai World Cup",
    url: 'https://www.arabianbusiness.com/gcc/uae/new-zealands-evolution-stables-teams-up-with-tokinvest-for-tokenised-racehorse-leases-ahead-of-dubai-world-cup',
    publisher: 'Arabian Business',
    date: '2025-01-10',
    excerpt: 'Evolution Stables partners with Tokinvest to bring tokenised racehorse ownership to the Middle East market.',
    imageUrl: '/images/press/ArabianBusiness.png',
  },
];

export function getPressArticlesForStructuredData() {
  return pressArticles.map((article) => ({
    headline: article.title,
    url: article.url,
    publisher: article.publisher,
    datePublished: article.date,
  }));
}
