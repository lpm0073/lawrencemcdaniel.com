import { gsdKnowsAbout } from './gsdKnowsAbout';

const knowsAbout = (include = false) => {
  
  if (include) return gsdKnowsAbout;
  return [];
}

export const gsdLocalBusinessLawrenceMcDaniel =  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "additionalType": "https://www.wikidata.org/wiki/Q96072517",
    "image": "https://cdn.lawrencemcdaniel.com/social-1200x675.jpg",
    "@id": "https://lawrencemcdaniel.com/#business",
    "brand": {
        "@id": "https://lawrencemcdaniel.com/"
    },
    "name": "Lawrence McDaniel - Full Stack Developer",
    "priceRange":"$$",
    "employee":[
      {
        "@id":"https://lawrencemcdaniel.com/#me"
      }
    ],
    "address":[
       {
        "@type":"PostalAddress",
        "addressLocality":"Colonia Hipodromo Condesa",
        "addressRegion":"CDMX",
        "postalCode":"06100",
        "streetAddress":"Avenida Amsterdam 240, Piso 4",
        "addressCountry":"Mexico"
      },
      {
         "@type":"PostalAddress",
         "addressLocality":"Cambridge",
         "addressRegion":"MA",
         "postalCode":"02139",
         "streetAddress":"210 Broadway Street"
       }
     ],
    "url": "https://lawrencemcdaniel.com/",
    "telephone":"+1 (617) 834-6172",
    "email":"mailto:lpm0073@gmail.com",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "08:00",
        "closes": "18:00"
      }
    ],
    "knowsAbout": knowsAbout()
}
