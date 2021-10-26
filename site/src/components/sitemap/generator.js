import { URL_SITE } from './shared/urls';

require("babel-register")({
    presets: ["es2015", "react"]
  });
   
  const router = require("./routes").default;
  const Sitemap = require("react-router-sitemap").default;
  
  function generateSitemap() {
      return (
        new Sitemap(router)
            .build({URL_SITE})
            .save("./public/sitemap.xml")
      );
  }
  
  generateSitemap();