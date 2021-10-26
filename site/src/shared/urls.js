export const baseUrl = 'http://localhost:3001/';

export const protocol = "https";
export const domainName = "lawrencemcdaniel.com";

export const CORSOrigins = '*.' + domainName;

export const siteUrl = protocol + '://'  + domainName;
export const apiUrl = protocol + '://api.' + domainName;
export const cdnUrl = protocol + '://cdn.' + domainName;

export const resumeUrl = cdnUrl + '/doc/Resume-Lawrence-McDaniel-202006.pdf';
export const backendUrl = apiUrl + '/wp-json/wp/v2/';

// Wordpress API Content URL end points
export const APISpecialtiesURL = backendUrl + "posts?categories=43&_embed&per_page=100";
export const APIPortfolioURL = backendUrl + "posts?categories=47&_embed&per_page=100";
export const APIEducationURL = backendUrl + "posts?categories=44&_embed&per_page=100";
export const APIRecommendationsURL = backendUrl + "posts?categories=45&_embed&per_page=100";
export const APIProjectsURL = backendUrl + "media?include=2324,2320,2319,2300,2295,2296,2297,2298,2299,2301,2302,2303";
export const APIClientsURL = backendUrl + "posts?categories=46&_embed&per_page=100";
