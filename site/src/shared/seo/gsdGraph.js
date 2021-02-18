import { primarySiteImage } from './gsdCommon';

const d = new Date();
const baseUrl = "https://lawrencemcdaniel.com";
const basePageName = "Lawrence McDaniel";
const datePublished = '2017-01-15';
const dateModified = d.toISOString();

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
   return basePageName + " - " + webpageName
}

const pageImage = (imageUrl, url) => {

   if (imageUrl !== "") return {
      "@type":"ImageObject",
      "url":imageUrl
    }
   return primarySiteImage;
}

export const gsdGraph = (slug, webpageName, webpageDescription, primaryImageUrl="", pageType="") => {


   return {
   "@context":"https://schema.org",
   "@graph":[
      {
         "@type":[
            "Person",
            "Organization"
         ],
         "@id":baseUrl+"#me"
      },
      {
         "@type":"WebSite",
         "@id":baseUrl+"/#website",
         "url":baseUrl+"/",
         "name":"Lawrence McDaniel",
         "description":"Personal web site",
         "publisher":{
            "@id":baseUrl+"#me"
         },
         "inLanguage":"en-US"
      },
      {
         "@type":pageTypes(pageType),
         "@id":baseUrl+"/"+slug+"/#webpage",
         "url":baseUrl+"/"+slug+"/",
         "name":"Lawrence McDaniel",
         "isPartOf":{
            "@id":baseUrl+"/#website"
         },
         "image":pageImage(primaryImageUrl, primarySiteImage),
         "datePublished":datePublished,
         "dateModified":dateModified,
         "description":webpageDescription,
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
                  "@id":baseUrl+"/"+slug+"/",
                  "url":baseUrl+"/"+slug+"/",
                  "name":pageName(webpageName)
               }
            }
         ]
      }
   ]
   }
}