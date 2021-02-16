/*
   List of technologies from Logocube. 
   Appended to Organization object for Skills and Specialties pages.
 */


 const softwareApplication = (applicationCategory, operatingSystem, appName, about, url, thumbnailUrl) => {

   return {
      "@context":"https://schema.org/",
      "@type":"SoftwareApplication",
        "applicationCategory": applicationCategory,
        "operatingSystem": operatingSystem,
        "thumbnailUrl":thumbnailUrl,
        "image":thumbnailUrl,
        "url":url,
        "name":appName,
        "sameAs": url,
        "@id":url + "/#software-app-id",
        "review":[
           {
              "@type":"Review",
              "author":"Lawrence McDaniel",
              "datePublished":"2021-02-14",
              "name":"Review by Lawrence",
              "reviewBody":"My self review of this product.",
              "reviewRating":{
                 "@type":"Rating",
                 "bestRating": 10,
                 "ratingValue":10,
                 "worstRating": 1
              }
           }
        ],
        "aggregateRating":{
           "@type":"AggregateRating",
           "ratingValue":10,
           "reviewCount":1,
           "bestRating":10,
           "worstRating":1
        },
        "about":about,
        "offers":{
           "@type": "Offer",
           "price": 1.00,
           "priceCurrency": "USD"
         }
     };

 }


export const gsdKnowsAbout = 
    [
      softwareApplication("onlineEducation", "Ubuntu", "Open edX®", "Open edX learning management system", "https://open.edx.org", "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2020/05/28144740/open-edx-logo-with-reg.png"),

      softwareApplication("OS", "Open Source", "GNU", "", "https://www.gnu.org", "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2020/05/31140847/gnu-logo.png"),
      softwareApplication("OS", "Open Source", "Debian", "", "https://www.debian.org", "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2020/05/31140745/debian-logo.png"),
      softwareApplication("OS", "Open Source", "Red Hat", "", "https://www.redhat.com", "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2020/05/31140610/red-hat-logo.png"),
      softwareApplication("OS", "Open Source", "CentOS", "", "https://www.centos.org", "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2020/05/31140410/centos-logo.png"),
      softwareApplication("OS", "Open Source", "Ubuntu", "", "https://ubuntu.com", "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2020/05/30211843/ubuntu-logo.png"),

      softwareApplication("webBackendDevelopment", "Django", "Swagger", "", "https://swagger.io", "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2021/02/12213439/swagger_logo.png"),
      softwareApplication("webBackendDevelopment", "Django", "ReadTheDocs", "", "https://readthedocs.org", "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2021/02/12211139/readthedocs-logo.png"),
      softwareApplication("webBackendDevelopment", "Django", "Atlassian", "", "https://www.atlassian.com", "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2021/02/12211059/Atlassian-horizontal-blue%402x-rgb.png"),
      softwareApplication("webBackendDevelopment", "Django", "Django REST Framework", "", "https://www.django-rest-framework.org", "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2020/05/05193240/django-rest-framework.jpg"),
      softwareApplication("webBackendDevelopment", "Django", "Gunicorn", "", "https://gunicorn.org", "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2020/05/31135255/gunicorn-logo.png"),
      softwareApplication("webBackendDevelopment", "Django", "Sphinx Doc", "", "https://www.sphinx-doc.org/en/master", "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2020/05/05195915/sphinx-logo.jpg"),
      softwareApplication("webBackendDevelopment", "Django", "Mako", "", "https://www.makotemplates.org", "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2020/05/30214639/mako-logo.png"),

      softwareApplication("webBackendDevelopment", "Python", "BeautifulSoup", "", "https://www.crummy.com/software/BeautifulSoup", "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2020/05/31134448/beautiful-soup.png"),
      softwareApplication("webBackendDevelopment", "Python", "Scrapy", "", "https://scrapy.org", "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2020/05/05192528/scrapy-logo.png"),
      softwareApplication("webBackendDevelopment", "Python", "NumPy", "", "https://numpy.org", "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2020/05/31133826/numpy-logo.png"),
      softwareApplication("webBackendDevelopment", "Python", "SciPi", "", "https://www.scipy.org", "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2020/05/31132745/scipy-logo.png"),
      softwareApplication("webBackendDevelopment", "Python", "Django", "", "https://www.djangoproject.com", "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2020/05/01144338/django-logo.png"),
      softwareApplication("webBackendDevelopment", "Linux, Windows, OSX", "Python", "", "https://www.python.org", "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195644/python.png"),

      softwareApplication("webFrontendDevelopment", "Javascript", "D3 Data-Driven Documents", "", "https://d3js.org", "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195648/d3.png"),
      softwareApplication("webFrontendDevelopment", "Javascript", "NPM", "", "https://www.npmjs.com", "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2020/05/30224959/npm-logo.png"),
      softwareApplication("webFrontendDevelopment", "Javascript", "NodeJS", "", "https://nodejs.org", "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2020/05/30224856/nodejs-logo.png"),
      softwareApplication("webFrontendDevelopment", "Javascript", "score.js", "", "https://underscorejs.org", "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2020/05/17014701/underscore-logo.png"),
      softwareApplication("webFrontendDevelopment", "Javascript", "Redux", "", "https://redux.js.org", "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2020/05/17005525/Redux_Logo.png"),
      softwareApplication("webFrontendDevelopment", "Javascript", "ReactJS", "", "https://reactjs.org", "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2020/05/01144300/react-logo.png"),
      softwareApplication("webFrontendDevelopment", "Javascript", "Angular", "", "https://angular.io", "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195650/angularjs.png"),
      softwareApplication("webFrontendDevelopment", "Javascript", "Ionic", "", "https://ionicframework.com", "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195647/ionic.png"),
      softwareApplication("webFrontendDevelopment", "NodeJS", "Yarn", "", "https://yarnpkg.com", "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2020/05/30212611/yarn-js-logo.png"),

      softwareApplication("database", "Linux, Windows, OSX", "PostgreSQL", "", "https://www.postgresql.org", "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195645/postgresql.png"),
      softwareApplication("database", "Linux, Windows, OSX", "MySQL", "", "https://www.mysql.com", "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195646/mysql.png"),
      softwareApplication("database", "Linux, Windows, OSX", "SQLite", "", "https://www.sqlite.org", "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195644/sqlite.png"),
      softwareApplication("database", "Linux", "mongoDB", "", "https://www.mongodb.com", "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195647/mongodb.png"),
      softwareApplication("database", "Linux", "Apache Hadoop", "", "https://hadoop.apache.org", "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195648/hadoop.png"),
      softwareApplication("database", "Windows", "MS SQL Server", "", "https://www.microsoft.com/en-us/sql-server", "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195646/mssql-server.png"),

      softwareApplication("webBackendDevelopment", "Linux", "RabbitMQ", "", "https://www.rabbitmq.com", "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2020/05/17014531/rabbitmq-logo.png"),
      softwareApplication("webBackendDevelopment", "Linux", "Celery", "", "https://docs.celeryproject.org", "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2020/05/17014355/celery-transparent-django-1.png"),
      softwareApplication("webBackendDevelopment", "Linux", "Nginx", "", "https://www.nginx.com", "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2020/05/17014146/nginx-logo.png"),
      softwareApplication("webBackendDevelopment", "Linux", "Memcached", "", "https://memcached.org", "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2020/05/30212314/Memcached_logo.png"),
      softwareApplication("webBackendDevelopment", "Linux", "Lets Encrypt", "", "https://letsencrypt.org", "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2020/05/05221646/lets-encrypt-logo.png"),
      softwareApplication("webBackendDevelopment", "Linux", "Apache", "", "https://httpd.apache.org", "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195649/apache.png"),
      softwareApplication("webBackendDevelopment", "Linux", "PHP", "", "https://www.php.net", "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195645/php.png"),
      softwareApplication("webBackendDevelopment", "Linux", "Ruby on Rails", "", "https://rubyonrails.org", "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195644/ruby-on-rails.png"),

      softwareApplication("webBackendDevelopment", "Wordpress", "Woo Commerce", "", "https://woocommerce.com", "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195644/woocommerce.png"),

      softwareApplication("devops", "Linux", "Red Hat Ansible", "", "https://www.ansible.com", "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195650/ansible.png"),
      softwareApplication("devops", "Linux", "CHEF Progress", "", "https://www.chef.io", "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195649/chef.png"),
      softwareApplication("devops", "Linux", "Puppet", "", "https://puppet.com", "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195645/puppet.png"),
      softwareApplication("devops", "Linux", "Jenkins", "", "https://www.jenkins.io", "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195647/jenkins.png"),
      softwareApplication("devops", "Linux", "Qualcomm snapdragon", "", "https://www.qualcomm.com/snapdragon", "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195644/qualcomm-snapdragon.png"),
      softwareApplication("devops", "Linux", "LAMP Stack", "", "https://en.wikipedia.org/wiki/LAMP_(software_bundle)", "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195643/lamp-logo.png"),
      softwareApplication("devops", "Linux", "Linux", "", "https://www.linux.org", "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195647/linux.png"),

      softwareApplication("webBackendDevelopment", "PHP", "Wordpress", "", "https://wordpress.com", "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195643/wordpress-1.png"),


      softwareApplication("cloudPlatform", "cloudPlatform", "Digital Ocean", "", "https://www.digitalocean.com", "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2021/02/12210940/1200px-DigitalOcean_logo.png"),
      softwareApplication("cloudPlatform", "Various", "Amazon Web Services", "", "https://aws.amazon.com", "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195650/amazon-web-services.png"),

      softwareApplication("desktop", "Desktop", "Chrome", "", "https://www.google.com/chrome", "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2020/05/30213805/google-chrome-logo.png"),
      softwareApplication("desktop", "Windows, OSX", "Microsoft Excel", "", "https://www.microsoft.com/en-us/microsoft-365/excel", "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195648/excel.png"),
      softwareApplication("desktop", "Windows, OSX", "Microsoft Visual Basic For Applications", "", "https://docs.microsoft.com/en-us/office/vba/library-reference/concepts/getting-started-with-vba-in-office", "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195644/vba.png"),

      softwareApplication("webDevelopment", "Platform agnostic", "oAuth", "", "https://oauth.net", "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2020/05/31141608/oauth-logo.png"),
      softwareApplication("webDevelopment", "Platform Agnostic", "HTTP", "", "https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol", "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2020/05/30213049/HTTP-logo.png"),
      softwareApplication("webDevelopment", "Platform agnostic", "GitHub", "", "https://github.com", "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195648/github.png"),
      softwareApplication("webDevelopment", "Platform Agnostic", "XML", "", "https://www.w3.org/XML", "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195643/xml.png"),
      softwareApplication("webDevelopment", "Platform Agnostic", "JSON", "", "https://www.json.org", "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195647/json.png"),
      softwareApplication("webDevelopment", "Platform Agnostic", "git", "", "https://git-scm.com", "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195648/git.png"),

      softwareApplication("webFrontendDevelopment", "CSS", "bootstrap", "", "https://getbootstrap.com", "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195649/bootstrap.png"),
      softwareApplication("webFrontendDevelopment", "Platform Agnostic", "HTML5", "", "https://en.wikipedia.org/wiki/HTML5", "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195648/html5.png"),
      softwareApplication("webFrontendDevelopment", "Platform agnostic", "Javascript", "", "https://en.wikipedia.org/wiki/JavaScript", "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2020/05/30211510/js-logo.png"),
      softwareApplication("webFrontendDevelopment", "Platform agnostic", "CSS3", "", "https://en.wikipedia.org/wiki/CSS", "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2020/05/05221500/css3-logo.png"),
      softwareApplication("webFrontendDevelopment", "Platform agnostic", "HTML5", "", "https://en.wikipedia.org/wiki/HTML5", "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2014/09/22195648/html5.png"),

   ]
