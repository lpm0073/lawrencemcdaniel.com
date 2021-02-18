import {datePublished, dateModified, baseUrl, nameLawrenceMcDaniel} from './gsdCommon';

const brandLogo = {
   "@id":baseUrl+"/#logo"
}

const pageTypes = (pageType) => {

   if (pageType !== "") return ["WebPage", pageType];
   return "WebPage";
} 

const pageName = (webpageName) => {
   return nameLawrenceMcDaniel + " - " + webpageName
}

const pageImage = (imageUrl) => {

   if (imageUrl !== "") return {
      "@type":"ImageObject",
      "url":imageUrl
    };
   return brandLogo;
}

const webSite = () => {
   return       {
      "@type":"WebSite",
      "@id":baseUrl+"/#website",
      "url":baseUrl+"/",
      "name":nameLawrenceMcDaniel,
      "description":"Personal web site",
      "publisher":{
         "@id":baseUrl+"#me"
      },
      "inLanguage":"en-US"
   };
}

const webPage = (pageType, slug, webpageName, webpageDescription, relatedLink, primaryImageUrl) => {

      return {
         "@type":pageTypes(pageType),
         "@id":baseUrl+"/"+slug+"/#webpage",
         "url":baseUrl+"/"+slug+"/",
         "name":webpageName,
         "isPartOf":{
            "@id":baseUrl+"/#website"
         },
         "image":pageImage(primaryImageUrl),
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
      };
}

const listItem = (position, slug, itemName) => {

      return {
         "@type":"ListItem",
         "position":position,
         "item":{
            "@type":"WebPage",
            "@id":baseUrl+"/"+slug+"/",
            "url":baseUrl+"/"+slug+"/",
            "name":itemName
         }
      };
}

const breadcrumbList = (slug, webpageName) => {

   var itemListElement = [
      listItem(1, "", "Home"),
      listItem(2, "home", "Home")
   ];
   if (slug !== "home") itemListElement.push(listItem(3, slug, pageName(webpageName)));

   return {
      "@type":"BreadcrumbList",
      "@id":baseUrl+"/"+slug+"/#breadcrumb",
      "itemListElement":itemListElement
   };
}

export const gsdGraph = (slug, webpageName, webpageDescription, primaryImageUrl="", pageType="", relatedLink="", extraData=[]) => {

   return {
      "@context":"https://schema.org",
      "@graph":extraData.concat([
         webSite(),
         pageImage(primaryImageUrl),
         webPage(pageType, slug, webpageName, webpageDescription, relatedLink, primaryImageUrl),
         breadcrumbList(slug, webpageName),
      ])
   };

}