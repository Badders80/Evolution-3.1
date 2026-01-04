/**
 * Press Articles & Media Coverage
 * 
 * Centralized list of external articles and press mentions.
 * Add new articles here to automatically update SEO structured data
 * and the press mentions section.
 */

export interface PressArticle {
  title: string;
  url: string;
  publisher: string;
  date: string; // ISO format: YYYY-MM-DD
  excerpt?: string;
}

export const pressArticles: PressArticle[] = [
  {
    title: 'Tokinvest and Singularry Superapp Partner to Make Regulated Real-World Asset Investing Accessible to Everyone',
    url: 'https://www.investing.com/news/cryptocurrency-news/tokinvest-and-singularry-superapp-partner-to-make-regulated-realworld-asset-investing-accessible-to-everyone-4316762',
    publisher: 'Investing.com',
    date: '2024-12-19',
    excerpt: 'Strategic partnership bringing regulated real-world asset investing to mainstream audiences through innovative digital platforms.',
  },
  {
    title: 'Thoroughbred Ownership Reimagined',
    url: 'https://trackside.co.nz/article/thoroughbred-ownership-reimagined',
    publisher: 'Trackside',
    date: '2024-11-15',
    excerpt: 'How Evolution Stables is transforming traditional racehorse syndication through digital innovation and blockchain technology.',
  },
  {
    title: 'Bringing Racing into the Digital Age',
    url: 'https://businessdesk.co.nz/article/technology/bringing-racing-into-the-digital-age',
    publisher: 'BusinessDesk',
    date: '2024-10-28',
    excerpt: 'New Zealand racing industry embraces digital transformation with Evolution Stables leading the charge in modernizing ownership structures.',
  },
  {
    title: "New Zealand's Evolution Stables Teams Up with Tokinvest for Tokenised Racehorse Leases Ahead of Dubai World Cup",
    url: 'https://www.arabianbusiness.com/gcc/uae/new-zealands-evolution-stables-teams-up-with-tokinvest-for-tokenised-racehorse-leases-ahead-of-dubai-world-cup',
    publisher: 'Arabian Business',
    date: '2025-01-10',
    excerpt: 'Evolution Stables partners with Tokinvest to bring tokenised racehorse ownership to the Middle East market ahead of the prestigious Dubai World Cup.',
  },
];

/**
 * Convert press articles to structured data format
 */
export function getPressArticlesForStructuredData() {
  return pressArticles.map(article => ({
    headline: article.title,
    url: article.url,
    publisher: article.publisher,
    datePublished: article.date,
  }));
}
