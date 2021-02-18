import {datePublished, dateModified, lastReviewed} from './gsdCommon';

const question = (q, a) => {

    return {
      "@type": "Question",
      "name": q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": a
      }
    };
}

export const gsdFAQ = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "name":"FAQ: Open edX",
        "alternateName":"Frequently Asked Questions about Open edX",
        "url":"https://lawrencemcdaniel.com/openedx",
        "image":{
          "@type": "ImageObject",
          "url": "https://cdn-blog.lawrencemcdaniel.com/wp-content/uploads/2017/10/22125438/edx-install-banner.jpg",
          "height": 374,
          "width": 196,
          "caption":"Open edX Instllation Banner"
        },
        "lastReviewed": lastReviewed,
        "dateModified":dateModified,
        "datePublished":datePublished,
        "about":"Open edX",
        "author":{
          "@id":"https://lawrencemcdaniel.com/#me"
        },
        "editor":{
          "@id":"https://lawrencemcdaniel.com/#me"
        }, 
        "publisher":{
          "@id":"https://lawrencemcdaniel.com/"
        },
        "sdDatePublished":"2021-02-15",
        "sdPublisher":{
          "@id":"https://lawrencemcdaniel.com/"
        },
        "timeRequired":"PT5M",
        "keywords":"open edx, saas, native build, installation, budget, cost",
        "inLanguage":"us-en",
        "mainEntity": [
          question("How much does Open edX cost?", "<p>The Open edX software, inclusive of all system software and third party libraries, is free to download and free to use. edX releases a major update to the software around once per year. The software is controlled by edX but maintained by a consortium of community users consting mostly the engineering team at edX itself along with contributions from member universities around the world. This group does not charge fees for access to their regular software updates. Your only costs will be external consulting costs, if any, for the installation and configuration, and recurring cloud computing costs. My blog article, '<a href='https://blog.lawrencemcdaniel.com/how-much-does-open-edx-cost/' target='_blank'>How Much Does Open edX Cost?</a>' includes summaries of itemized projects costs that have been voluntarily submitted by user in the Open edX community over the last few years.</p>"),
          question("Are there any consulting firms who specialize in Open edX?", "<p>Yes, there are several. The best place to start looking is the official <a href='https://open.edx.org/marketplace-category/service-partners/' target='_blank' rel='noopener noreferrer'>Open edX Service Providers Marketplace</a> managed by edX, Inc. In addition, I have worked with or collaborated with several for whom I can vouch, including (in no particular order)</p><ul> <li><a href='https://www.edunext.co/' target='_blank' rel='noopener noreferrer'>eduNEXT</a></li><li><a href='https://www.appsembler.com/' target='_blank' rel='noopener noreferrer'>appsembler</a></li><li><a href='https://opencraft.com/' target='_blank' rel='noopener noreferrer'>OpenCraft</a></li><li><a href='https://raccoongang.com/' target='_blank' rel='noopener noreferrer'>Raccoon Gang</a></li><li><a href='https://abc-ld.org/' target='_blank' rel='noopener noreferrer'>ABC MOOCs</a></li></ul> <p>I am also included in the marketplace, however, edX charges me a fee if you contact from their site, so it'll be cheaper for you and me if you contact me via email at <a href='mailto:lpm0073@gmail.com'>lpm0073@gmail.com</a></p>"),
          question("Should we run our own installation or use one of the recomended Application Service Providers?", "<p>The answer depends a host of factors, but there are some generalizations on which you can safely rely.</p><ul> <li>Use a platform provider if you're just getting started and you lack technical support and your budget permits. All Open edX providers will leave you in complete control of your data, so you'll always have the option of migrating the platform to your own private installation at a later date.</li><li>Start with Tutor if you're just evaluating the platform and you're on a tight budget, as this is the easiest to get up and running quickly.</li><li>Consider creating your own native build if <ul> <li>you're a startup and you are actively deciding on the feature set you want to offer customers.</li><li>you have a team in place who is competent in supporting enterprise Django platforms.</li><li>you intend to customize the software.</li><li>you do not need customizations, and, your user base will be small.</li></ul> </li></ul>"),
          question("What size server do we need?", "<p><strong>(Using AWS EC2 server types as a reference)</strong></p><p>t2.large (2-processor with 8gb of RAM) is the smallest server size on which Open edX will run reliably. I generally use this server size during development and for very small implementations intended for no more than a few dozen users. For any other size rollout I generally use t2.xlarge servers (4-processor with 16gb of RAM) in conjunction with the platform scaling principals that I outline in my blog article, <a href='https://blog.lawrencemcdaniel.com/scaling-open-edx/' target='_blank'>'Scaling Open edX'.</a> The Open edX platform is infinitely scalable, as you can plainly see from the flagship site edx.org. However, scaling is a complex topic -- you've been warned.</p>"),
          question("Does Open edX integrate with the single sign-on system at my school?", "<p>Open edX is designed to 'easily' integrate with a variety of third party authentication protocols including SAML, oAuth and LTI. In simplest cases such as 'Login with Facebook' and 'Login with Google' for example, you can get things working in less than an hour using nothin more than the yml configuration files for the LMS and CMS. However, educational institutions frequently required far deeper levels of integration such as Grade Synching and User Profile Synching to name two common examples which, while entirely technically feasible, usually require thorough exploration with a trained professional from the Open edX community.</p>"),
          question("How do we backup and restore our data?", "<p>Open edX stores its data in multiple formats including MySQL, mongoDB and the Ubuntu file system. You can read my blog article, <a href='https://blog.lawrencemcdaniel.com/open-edx-complete-backup-solution/' target='_blank'>'Open edX Complete Backup Solution'</a> to get a better sense of what's involved in backing up the data.</p>"),
          question("Can Open edX operate in cloud platforms other than AWS?", "<p>Yes. However, I would strongly encourage you to consider using AWS to host your production platform. I've successfully installed Open edX on all major cloud platforms: AWS, Azure, Google Compute Cloud; as well as at other smaller providers including Digital Ocean and at some regional cloud providers. I can confidently share with you that a.) the exact distribution/version of Ubuntu that you choose does matter (as the authors of the official Open edX documentation claim), and b) I've always gotten the platform to work eventually, even in cases where I did not use the suggested distribution. Net-net, I've found the alternative providers to be good, lower-cost alternatives to AWS during development activities, and AWS to be preferable for production.</p>"),
          question("Is it possible to migrate to/from Tutor?", "<p>Yes, barring a few rare outlying circumstances. I have more experience migrating from Tutor to a native build, since this is a natural trajectory for platform scaling purposes. However, I have successfully migrated in both directions.</p>"),
          question("Which version of Open edX should we install?", "<p>You should almost always use the most recent named release; the rare exception being that your organization is desperately awaiting the release of a new feature. edX publishes their 'named releases' here, at <a href='https://edx.readthedocs.io/projects/edx-developer-docs/en/latest/named_releases.html' target='_blank'>'Open edX Named Releases'</a>.</p>"),
          question("What skills are required to support Open edX after we go live?", "<p>Open edX is a highly stable, well-behaved platform once you've got it up and running. edX has a world-class engineering team, and they take testing really seriously. With that in mind, and assuming minimal or no customizations to the platform, you can reasonably assume that your platform will essentially be maintenance free other than activities related to scaling (only if your user base grows) and occasional software updates of at least once per year.</p><p>If on the other hand, you plan to be actively developing new features on the platform then the following might be of interest to you. Open edX is architected as a traditional enterprise-grade Python-Django web application. It is very large and very complex, and it makes use of the entire family of enterprise scaling technologies that one could possibly encounter in a Django project. As of the Koa release the front end is nearly entirely built with ReactJS. There is a substantial learning curve, even if your team are experienced Django/ReactJS folks. The most common technologies that I find myself using are as follows:</p><ul> <li>Ubuntu command line and bash scripting</li><li>Git / GitHub</li><li>basic TCP/IP networking stuff</li><li>Lots of AWS cloud services stuff</li><li>Python / Django -- albeit with a lot more emphasis on Django</li><li>JSON and YML file formats</li><li>ReactJS</li><li>Bootstrap</li><li>MySQL -- mostly from the query tool provided in MySQL Workbench</li></ul> <p>Additionally, Open edX makes uses of a broad range of libraries from Pip and NPM and Ubuntu's apt-get; many of which you'll need to become more familiar.</p>"),
      ]
    }
    