import { gsdQualifications } from './gsdQualifications';
import { gsdKnowsAbout } from './gsdKnowsAbout';
import { baseUrl, sameAs, imagesLawrenceMcDaniel, brandLawrenceMcDaniel, nameLawrenceMcDaniel, lastReviewed, brandLogo, baseTitle} from './gsdCommon';
import {hourlyRate} from './gsdCommon';

const knowsAbout = (includeExtraData = false, props = null) => {
  
   if (!props || !includeExtraData) return [];
   if (includeExtraData) return gsdKnowsAbout(props);
 }
 
const qualifications = (includeExtraData = false) => {

   if (includeExtraData) return gsdQualifications;
   return [];
}

const hasOccupation = (includeExtraData = false) => {

   const retVal = {
      "@context":"https://schema.org/",
      "@type":"Occupation",
      "additionalType": "https://www.wikidata.org/wiki/Q96072517",
      "name":baseTitle,
      "mainEntityOfPage":{
         "@type":"WebPage",
         "@id":"https://lawrencemcdaniel.com/",
         "lastReviewed":lastReviewed
      },
      "description":"I’m an American full stack developer with significant experience with classic backend stacks and front-end frameworks including Django, React, Angular, and WordPress. I also work extensively with the Open edX® learning management system. I am a veteran of multiple startups and early-stage ventures with dozens of successful product launches in multiple industries and markets around the world. I advocate for open source, try to keep things DRY and well-documented and when possible I adhere to the principals of 12-factor development. I’m a passionate learner and frequent blogger, currently interested in machine learning, AI and quantum computing.",
      "estimatedSalary":{
         "@type":"MonetaryAmountDistribution",
         "name":"base",
         "currency":"USD",
         "median":hourlyRate,
         "percentile10":hourlyRate,
         "percentile25":hourlyRate,
         "percentile75":hourlyRate,
         "percentile90":hourlyRate,
         "duration":"PT1H"
      },
      "occupationLocation":[
         {
            "@type":"City",
            "name":"Cambridge"
         },
         {
            "@type":"City",
            "name":"Mexico City"
         }
      ],
      "qualifications":qualifications(includeExtraData)
   }
   if (includeExtraData) return retVal;
   return {}
}

const subjectOf = (url) => {
   return {
      "@context":"https://schema.org/",
      "@type":"Url",
      "@id": url+"#news-article",
      "url":url
   };
}

const personExtraData =  {
      "logo":{
         "@id":baseUrl+"/#logo"
      },
      "additionalType": "https://www.wikidata.org/wiki/Q96072517",
      "identifier":"https://lawrencemcdaniel.com/",
      "brand":brandLawrenceMcDaniel,
      "birthPlace":"Houston, TX, USA",
      "nationality":"American",
      "birthDate":"1966-12-31",
      "height":"183 cm",
      "familyName":"McDaniel",
      "givenName":"Lawrence",
      "gender":"Male",
      "address":{
         "@type":"PostalAddress",
         "addressLocality":"Cambridge",
         "addressRegion":"MA",
         "postalCode":"02139",
         "streetAddress":"210 Broadway Street"
      },
      "affiliation":[
         {
            "@type":"Organization",
            "name":"Open edX Marketplace",
            "url":"https://open.edx.org/marketplace/lawrence-mcdaniel/"
         }
      ],
      "alumniOf":[
         {
            "@type":"CollegeOrUniversity",
            "name":"University of North Texas",
            "url":"https://www.unt.edu/",
            "sameAs":"https://www.unt.edu/"
         }
      ],
      "subjectOf":[
         subjectOf("https://iblnews.org/installing-and-deploying-an-open-edx-instance-a-view-of-developer-and-author-mcdaniel/"),
         subjectOf("https://opensource.com/user_articles/224351"),
         subjectOf("https://opensource.com/article/18/6/getting-started-open-edx"),
         subjectOf("https://open.edx.org/marketplace/lawrence-mcdaniel/"),
         subjectOf("https://openedx2018.sched.com/lpm0073"),
         subjectOf("http://geek.ly/lmcdaniel")
      ],
      "knowsLanguage":[
         {
            "@type":"Language",
            "name":"English"
         },
         {
            "@type":"Language",
            "name":"Spanish"
         }
      ]
}

export const gsdPersonLawrenceMcDaniel = (includeEducation = false, includeTechnologies = false, includeExtraData=false, props) => {

   const retVal = {
      "@context":"https://schema.org/",
      "@type":[
         "Person",
         "Organization"
      ],
      "@id":"https://lawrencemcdaniel.com/#me",
      "email":"mailto:lpm0073@gmail.com",
      "name":nameLawrenceMcDaniel,
      "description":"Personal web site for "+nameLawrenceMcDaniel,
      "jobTitle":baseTitle,
      "telephone":"+1 (617) 834-6172",
      "url":"https://lawrencemcdaniel.com",
      "sameAs":sameAs,
      "image":imagesLawrenceMcDaniel,
      "hasOccupation": hasOccupation(includeEducation),
      "knowsAbout": knowsAbout(includeTechnologies, props)
   }
   if (includeExtraData) return {...retVal, ...personExtraData}
   return retVal;

}