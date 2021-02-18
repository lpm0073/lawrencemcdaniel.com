import { baseUrl, datePublished, dateModified, primarySiteImage } from './gsdCommon';

export const gsdArticle = (slug, headline) => {

    return {
        "@type":"Article",
        "@id":baseUrl+"/"+slug+"/#article",
        "isPartOf":{
           "@id":baseUrl+"/"+slug+"/#webpage"
        },
        "author":{
           "@id":baseUrl+"/#me"
        },
        "headline":headline,
        "datePublished":datePublished,
        "dateModified":dateModified,
        "mainEntityOfPage":{
           "@id":baseUrl+"/"+slug+"/#webpage"
        },
        "commentCount":0,
        "publisher":baseUrl+"/#me",
        "image":primarySiteImage,
        "articleSection":slug,
        "inLanguage":"en-US"
     }

}