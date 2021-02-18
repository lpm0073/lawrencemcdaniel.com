const d = new Date();
const baseUrl = "https://lawrencemcdaniel.com";
const datePublished = '2017-01-15';
const dateModified = d.toISOString();

/* i copied this pattern from the home page of blog.lawrencemcdaniel.com */
const gsdGraph = (slug, webpageName, webpageDescription, primaryImageUrl="", pageType="") => {


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
          "@type":[
            "WebPage",
            "CollectionPage"
         ],
          "@id":baseUrl+"/"+slug+"/#webpage",
          "url":baseUrl+"/"+slug+"/",
          "name":"Lawrence McDaniel",
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
                   "name":webpageName
                }
             }
          ]
       }
    ]
    }
 }