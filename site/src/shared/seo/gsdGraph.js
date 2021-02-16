export const gsdGraph = (url, webpageName, webpageDescription, primaryImageUrl) => {

   const baseUrl = "https://lawrencemcdaniel.com";

   var retval = {
      "@context":"https://schema.org",
      "@graph":[
         {
            "@type":"WebSite",
            "@id":baseUrl + "/#website",
            "url":baseUrl + "/",
            "name":"Lawrence McDaniel",
            "description":"Personal Web Site",
            "publisher":{
               "@id":baseUrl + "/#me"
            },
            "inLanguage":"en-US"
         },
         {
            "@type":"ImageObject",
            "@id":baseUrl + "/#personlogo"
         },
         {
            "@type":"WebPage",
            "@id":url + "/#webpage",
            "url":url,
            "name":webpageName,
            "isPartOf":{
               "@id":baseUrl + "/#website"
            },
            "primaryImageOfPage":{
              "@type":"ImageObject",
              "url":primaryImageUrl,
              "@id":url + "/#primaryimage"
            },
            "datePublished":"2021-01-14T21:44:38+00:00",
            "dateModified":"2021-02-16T16:27:14+00:00",
            "description":webpageDescription,
            "breadcrumb":{
               "@id": url + "/#breadcrumb"
            },
            "inLanguage":"en-US",
            "potentialAction":[
               {
                  "@type":"ReadAction",
                  "target":[
                     url
                  ]
               }
            ]
         },
         {
            "@type":"BreadcrumbList",
            "@id":url + "/#breadcrumb",
            "itemListElement":[
               {
                  "@type":"ListItem",
                  "position":1,
                  "item":{
                     "@type":"WebPage",
                     "@id":baseUrl + "/",
                     "url":baseUrl + "/",
                     "name":"Home"
                  }
               },
               {
                  "@type":"ListItem",
                  "position":2,
                  "item":{
                     "@type":"WebPage",
                     "@id":baseUrl + "/home/",
                     "url":baseUrl + "/home/",
                     "name":"Home"
                  }
               },
               {
                  "@type":"ListItem",
                  "position":3,
                  "item":{
                     "@type":"WebPage",
                     "@id":url + "/#thisListItem",
                     "url":url,
                     "name":webpageName
                  }
               }
            ]
         },
         {
            "@type":"Article",
            "@id":url + "/#article",
            "isPartOf":{
               "@id":url + "/#webpage"
            },
            "author":{
               "@id":baseUrl + "/#me"
            },
            "headline":webpageName,
            "datePublished":"2021-01-14T21:44:38+00:00",
            "dateModified":"2021-02-16T16:27:14+00:00",
            "mainEntityOfPage":{
               "@id":url + "/#webpage"
            },
            "publisher":{
               "@id":baseUrl + "/#me"
            },
            "image":{
               "@id":url + "/#primaryimage"
            },
            "articleSection":"Open edX",
            "inLanguage":"en-US"
         },
         {
            "@type":[
               "Person",
               "Organization"
            ],
            "@id":baseUrl + "/#me",
         }
      ]
     };
     return retval;
 }