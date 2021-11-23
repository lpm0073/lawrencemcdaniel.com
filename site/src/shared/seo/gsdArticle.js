import { baseUrl, datePublished, dateModified } from "./gsdCommon";

export const gsdArticle = (slug, headline) => {
  return {
    "@type": "Article",
    "@id": baseUrl + "/" + slug + "/#article",
    isPartOf: {
      "@id": baseUrl + "/" + slug + "/#webpage",
    },
    author: {
      "@id": baseUrl + "/#me",
    },
    headline: headline,
    datePublished: datePublished,
    dateModified: dateModified,
    mainEntityOfPage: {
      "@id": baseUrl + "/" + slug + "/#webpage",
    },
    commentCount: 0,
    publisher: baseUrl + "/#me",
    image: baseUrl + "/#logo",
    articleSection: slug,
    inLanguage: "en-US",
  };
};
