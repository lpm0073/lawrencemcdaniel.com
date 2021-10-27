import {datePublished, dateModified, baseUrl, nameLawrenceMcDaniel} from './gsdCommon';

const defaultPageDescription = (webpageDescription) => {

   if (webpageDescription !== "") return webpageDescription;
   return "Full Stack Web Developer and Open edX® Consultant specializing in Python, Django, ReactJS, Redux, AngularJS, and AWS.";

}
 
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
   return {
      "@type":"WebSite",
      "@id":baseUrl+"/#website",
      "url":baseUrl+"/",
      "name":nameLawrenceMcDaniel,
      "description":"Personal Web Site & Portfoio",
      "publisher":{
         "@id":baseUrl+"#me"
      },
      "inLanguage":"en-US"
   };
}

const webPage = (pageType, slug, webpageName, webpageDescription, relatedLink, primaryImageUrl) => {

      var retVal = {
         "@type":pageTypes(pageType),
         "@id":baseUrl+"/"+slug+"/#webpage",
         "url":baseUrl+"/"+slug+"/",
         "name":webpageName,
         "isPartOf":{
            "@id":baseUrl+"/#website"
         },
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
      };
      if (relatedLink !== "") retVal.relatedLink = relatedLink;
      if (primaryImageUrl !== "") retVal.primaryImageUrl = pageImage(primaryImageUrl);
      if (pageType === "BlogPosting") {
         retVal.headline = webpageName;
         retVal.image = primaryImageUrl;
         }
      return retVal;
}

const listItem = (position, slug, itemName, pageType="WebPage", pageImage) => {

   var listItemUrl = baseUrl+"/"+slug+"/";
   if (slug === "") listItemUrl = baseUrl+"/";
   
   var item ={
      "@type":pageType,
      "@id":listItemUrl+"#breadcrumb",
      "url":listItemUrl,
      "name":itemName
   }

   if (pageType === "BlogPosting") {
      item.headline = itemName;
      item.image = pageImage;
   }
   return {
      "@type":"ListItem",
      "position":position,
      "item":item
   };
}

const breadcrumbList = (slug, webpageName, pageType, pageImage) => {

   var itemListElement = [
      listItem(1, "home", "Home")
   ];
   if (slug !== "home") itemListElement.push(listItem(2, slug, pageName(webpageName), pageType, pageImage));

   return {
      "@type":"BreadcrumbList",
      "@id":baseUrl+"/"+slug+"/#breadcrumb",
      "itemListElement":itemListElement,
      "name":"Breadcrumb-"+slug
   };
}

/*
   This is the main entry point for adding Google Structured Data
   to the <head> of a page.
 */
export const gsdGraph = (slug, webpageName, webpageDescription, primaryImageUrl="", pageType="", relatedLink="", extraData=[]) => {

   return {
      "@context":"https://schema.org",
      "@graph":extraData.concat([
         webSite(),
         /* pageImage(primaryImageUrl), */
         webPage(pageType, slug, webpageName, defaultPageDescription(webpageDescription), relatedLink, pageImage(primaryImageUrl)),
         breadcrumbList(slug, webpageName, pageType, pageImage(primaryImageUrl)),
      ])
   };

}