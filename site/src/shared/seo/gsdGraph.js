import { primarySiteImage } from './gsdCommon';
import {datePublished, dateModified, baseUrl, nameLawrenceMcDaniel} from './gsdCommon';

/*
More specific Types
AboutPage
ContactPage
FAQPage
ItemPage
ProfilePage

QAPage
CheckoutPage
CollectionPage
MedicalWebPage
RealEstateListing
SearchResultsPage
 */
const pageTypes = (pageType) => {

   if (pageType !== "") return ["WebPage", pageType];
   return "WebPage";
} 

const pageName = (webpageName) => {
   return nameLawrenceMcDaniel + " - " + webpageName
}

const pageImage = (imageUrl, url) => {

   if (imageUrl !== "") return {
      "@type":"ImageObject",
      "url":imageUrl
    }
   return primarySiteImage;
}

export const gsdGraph = (slug, webpageName, webpageDescription, primaryImageUrl="", pageType="", relatedLink="", extraData=[]) => {


   const retVal = {
   "@context":"https://schema.org",
   "@graph":[
      {
         "@type":"WebSite",
         "@id":baseUrl+"/#website",
         "url":baseUrl+"/",
         "name":nameLawrenceMcDaniel,
         "description":"Personal web site",
         "publisher":{
            "@id":baseUrl+"#me"
         },
         "inLanguage":"en-US"
      },
      pageImage(primaryImageUrl, primarySiteImage),
     {
         "@type":pageTypes(pageType),
         "@id":baseUrl+"/"+slug+"/#webpage",
         "url":baseUrl+"/"+slug+"/",
         "name":nameLawrenceMcDaniel,
         "isPartOf":{
            "@id":baseUrl+"/#website"
         },
         "image":pageImage(primaryImageUrl, primarySiteImage),
         "datePublished":datePublished,
         "dateModified":dateModified,
         "description":webpageDescription,
         "relatedLink":relatedLink,
         "breadcrumb":{
            "@id":baseUrl+"/"+slug+"/#breadcrumb"
         },
         "inLanguage":"en-US",
         "potentialAction":[
            {
               "@type":"ReadAction",
               "target":[
                  baseUrl+"/"+slug+"/"
               ]
            }
         ]
      },
      {
         "@type":"BreadcrumbList",
         "@id":baseUrl+"/"+slug+"/#breadcrumb",
         "itemListElement":[
            {
               "@type":"ListItem",
               "position":1,
               "item":{
                  "@type":"WebPage",
                  "@id":baseUrl+"/",
                  "url":baseUrl+"/",
                  "name":"Home"
               }
            },
            {
               "@type":"ListItem",
               "position":2,
               "item":{
                  "@type":"WebPage",
                  "@id":baseUrl+"/home/",
                  "url":baseUrl+"/home/",
                  "name":"Home"
               }
            },
            {
               "@type":"ListItem",
               "position":3,
               "item":{
                  "@type":"WebPage",
                  "@id":baseUrl+"/"+slug+"/",
                  "url":baseUrl+"/"+slug+"/",
                  "name":pageName(webpageName)
               }
            }
         ].concat(extraData)
      }
   ]
   };

   return retVal;

}