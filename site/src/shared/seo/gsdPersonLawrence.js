import { gsdQualifications } from './gsdQualifications';
import { primarySiteImage } from './gsdPrimarySiteImage';
import { gsdKnowsAbout } from './gsdKnowsAbout';

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
      "name":"Full Stack Developer",
      "mainEntityOfPage":{
         "@type":"WebPage",
         "@id":"https://lawrencemcdaniel.com/",
         "lastReviewed":"2021-02-14"
      },
      "description":"I’m an American full stack developer with significant experience with classic backend stacks and front-end frameworks including Django, React, Angular, and WordPress. I also work extensively with the Open edX® learning management system. I am a veteran of multiple startups and early-stage ventures with dozens of successful product launches in multiple industries and markets around the world. I advocate for open source, try to keep things DRY and well-documented and when possible I adhere to the principals of 12-factor development. I’m a passionate learner and frequent blogger, currently interested in machine learning, AI and quantum computing.",
      "estimatedSalary":{
         "@type":"MonetaryAmountDistribution",
         "name":"base",
         "currency":"USD",
         "median":75.00,
         "percentile10":75.00,
         "percentile25":75.00,
         "percentile75":75.00,
         "percentile90":75.00,
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

export const gsdPersonLawrenceMcDaniel = (includeEducation = false, includeTechnologoes = false, props) => {

   const retVal = {
      "@context":"https://schema.org/",
      "@type":[
         "Person",
         "Organization"
      ],
      "@id":"https://lawrencemcdaniel.com/#me",
      "identifier":"https://lawrencemcdaniel.com/",
      "email":"mailto:lpm0073@gmail.com",
      "familyName":"McDaniel",
      "givenName":"Lawrence",
      "name":"Lawrence McDaniel",
      "description":"Full Stack Developer",
      "jobTitle":"Full Stack Developer",
      "telephone":"+1 (617) 834-6172",
      "url":"https://lawrencemcdaniel.com",
      "birthPlace":"Houston, TX, USA",
      "nationality":"American",
      "birthDate":"1966-12-31",
      "height":"183 cm",
      "gender":"Male",
      "address":{
         "@type":"PostalAddress",
         "addressLocality":"Cambridge",
         "addressRegion":"MA",
         "postalCode":"02139",
         "streetAddress":"210 Broadway Street"
      },
      "sameAs":[
         "https://lawrencemcdaniel.com/",
         "https://blog.lawrencemcdaniel.com/",
         "https://www.linkedin.com/in/lawrencemcdaniel/",
         "https://www.facebook.com/lawrence.p.mcdaniel",
         "https://open.edx.org/marketplace/lawrence-mcdaniel/",
         "https://github.com/lpm0073",
         "https://angel.co/p/lpm0073-gmail-com",
         "https://www.codementor.io/@lawrencemcdaniel",
         "http://geek.ly/lmcdaniel"
      ],
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
         "https://blog.lawrencemcdaniel.com/",
         "https://iblnews.org/installing-and-deploying-an-open-edx-instance-a-view-of-developer-and-author-mcdaniel/",
         "https://opensource.com/user_articles/224351",
         "https://opensource.com/article/18/6/getting-started-open-edx",
         "https://open.edx.org/marketplace/lawrence-mcdaniel/",
         "https://openedx2018.sched.com/lpm0073",
         "http://geek.ly/lmcdaniel"
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
      ],
      "image":[primarySiteImage,
         {
         "@type":"ImageObject",
         "@id":"https://lawrencemcdaniel.com/#personlogo",
         "inLanguage":"en-US",
         "url":"https://cdn-blog.lawrencemcdaniel.com/wp-content/uploads/2018/01/22125438/Lawrence19.jpg",
         "width":338,
         "height":500,
         "caption":"Lawrence McDaniel"
      }],
      "logo":{
         "@id":"https://lawrencemcdaniel.com/#personlogo"
      },
      "hasOccupation": hasOccupation(includeEducation),
      "knowsAbout": knowsAbout(includeTechnologoes, props)
   }
   return retVal;

}