export const baseUrl = 'http://localhost:3001/';
export const apiUrl = 'https://api.lawrencemcdaniel.com';
export const siteUrl = 'https://lawrencemcdaniel.com';
export const cdnUrl = 'https://cdn.lawrencemcdaniel.com';
export const resumeUrl = cdnUrl + '/doc/Resume-Lawrence-McDaniel-202006.pdf';
export const backendUrl = apiUrl + '/wp-json/wp/v2/';

// Wordpress API Content URL end points
export const CDNSpecialtiesURL = backendUrl + "posts?categories=43&_embed&per_page=100";
export const CDNPortfolioURL = backendUrl + "posts?categories=47&_embed&per_page=100";
export const CDNEducationURL = backendUrl + "posts?categories=44&_embed&per_page=100";
export const CDNRecommendationsURL = backendUrl + "posts?categories=45&_embed&per_page=100";
export const CDNProjectsURL = backendUrl + "media?include=2324,2320,2319,2300,2295,2296,2297,2298,2299,2301,2302,2303";
export const CDNClientsURL = backendUrl + "posts?categories=46&_embed&per_page=100";
