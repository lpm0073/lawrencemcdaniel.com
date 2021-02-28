/*
  SEO for blog article https://blog.lawrencemcdaniel.com/open-edx-installation/
 */
export const gsdHowToInstallOpenEdx = {
  "@context": "http://schema.org",
  "@type": "HowTo",
  "url":"https://blog.lawrencemcdaniel.com/open-edx-installation/",
  "name": "Open edX Step-By-Step Production Installation Guide",
  "dateCreated":"2021-01-27",
  "dateModified":"2021-01-27",
  "datePublished":"2021-01-27",
  "creator":{
    "@id":"https://blog.lawrencemcdaniel.com/#/schema/person/5cde4301ca9b99abf63feb5401a7a7b1"
  },
  "alternateName":"How To Install Open edX",
  "description": "Get your first Open edX platform up and running with this detailed step-by-step how-to guide that provides detailed instructions on how to build your AWS EC2 Ubuntu Linux server, execute the Open edX native build scripts, and configure your new platform.",
  "image": {
    "@type": "ImageObject",
    "url": "https://cdn-blog.lawrencemcdaniel.com/wp-content/uploads/2017/10/22125438/edx-install-banner.jpg",
    "height": 374,
    "width": 196
  },
  "tool": [{
    "@type": "HowToTool",
    "name": "SSH device",
    "description": "Any internet-enabled device capable of maintaining an SSH connection"
  },{
    "@type": "HowToTool",
    "name": "Internet Browser"
  }],
  "supply": [
    {
      "@type": "HowToSupply",
      "name": "Ubuntu 20.04 LTS virtual server instance, ideally from AWS"
    }, {
      "@type": "HowToSupply",
      "name": "Open edX software repository, available free of charge from https://github.com/edx/edx-platform"
    }, {
      "@type": "HowToSupply",
      "name": "My installation scripts, available free of charge from https://github.com/lpm0073/edx.scripts"
    }
  ],
  "step": [
    {
      "@type": "HowToStep",
      "name": "I. Create a new AWS EC2 instance",
      "url": "https://blog.lawrencemcdaniel.com/open-edx-installation/#1",
      "itemListElement": [{
        "@type": "HowToDirection",
        "text": "Step 1: Choose AMI. AWS provides you with a pick list of several common server operating systems. Technically speaking, each of these options is an AMI (Amazon Machine Image) that AWS internally maintains and makes available to their customers. For you, this means that you’re able to spin up an Ubuntu server in a few seconds, without needing to worry about where the operating system repo might be located and so on."
      }, {
        "@type": "HowToDirection",
        "text": "Step 2: Server Sizing. AWS EC2 Server Sizing: After prolonged experimentation I have gravitated to AWS EC2 T2.Large servers as my virtual server configuration of choice. Generalizing, this provides 2 cpu’s and 8gb of memory, which is sufficient resource for a small production implementation. As of September 2018 AWS charges $0.0928 per Hour ($67 USD per month) for a t2.large server. You can dramatically reduce the cost of the server by purchasing a one-year contract for the server instance, in which case the cost reduces to $42 USD per month. I launch these with 100gb of drive space, which thus far has been far more than sufficient for my needs. Bear in mind that my recommendation is almost exactly double that provided in the official edX documentation. My view on this is that it’s already challenging enough to get this platform up and running without adding unnecessary challenge by under-sizing your equipment. Very generally speaking, this server config should handle a couple hundred concurrent learners. Look at the bottom of this page for links to downstream repos that are part of a simple horizontal scaling strategy for small (but not tiny) institutions."
      }, {
        "@type": "HowToDirection",
        "text": "Step 3: Instance Details. The default values provided in this screen are what you want. Later on it would be a great idea to revisit these settings to get a better understanding of your infrastructure-level configuration options."
      }, {
        "@type": "HowToDirection",
        "text": "Step 4: Add Storage. AWS instances by default come with 8gb of “hard drive” storage. However, you can modify this. You’ll need at least 50gb of storage for Open edX plus normal amounts of data. I suggest doubling that amount, to 100gb. I have not seen that this impacts the cost of the server in any meaningful way."
      }, {
        "@type": "HowToDirection",
        "text": "Step 5: Add Tags. Tags are a way to identify AWS resources inside your account. This is only important if you have many resources (for example, many server instances) in existence in your AWS account. Otherwise you can skip this step."
      }, {
        "@type": "HowToDirection",
        "text": "Step 6: Security Profile. This is important. You manage server port settings separately from the server itself. Generalizing, you create a port security profile, and then assign this profile to your EC2 instance. Open edX uses many ports as part of the standard installation. Note that this script installs ALL modules, and you therefore need to open many ports. Open edX default http addressing uses port numbers rather than subdomains or url paths/routes. The ports in the screen shot that follows correspond with the following Open edX modules."
      }, {
        "@type": "HowToDirection",
        "text": "Step 7: Review Instance Prior to Launch. "
      }, {
        "@type": "HowToDirection",
        "text": "Step 8: Setup an SSH key pair. You’ll use a terminal emulator via SSH to connect to your server. If you’re unfamiliar with how to connect to a linux server then you can start your journey here: http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/putty.html. Note that you will run this script as well as execute nearly all Open edX admin utilities from a linux command line. So, if you’re new to this then you should bite the bullet and do some online self-study on using linux terminal emulators and SSH."
      }, {
        "@type": "HowToDirection",
        "text": "Step 9: Launch Status. Click the blue “View Instances” button at the bottom-right of this screen."
      }, {
        "@type": "HowToDirection",
        "text": "Step 10: EC2 Instance Console. If this is your very first EC2 instance then you’ll see a single row on this screen that shows the vital signs of your new Linux virtual server. It will take a few minutes for the server to instantiate itself and come online. When the server is ready the “Instance State” field will read “Running” and the icon color will change from yellow to green."
      }],
      "image": {
        "@type": "ImageObject",
        "url": "https://cdn-blog.lawrencemcdaniel.com/wp-content/uploads/2018/01/22125455/aws-ec2-1.png"
      }
    }, {
      "@type": "HowToStep",
      "name": "II. Execute the script",
      "url": "https://blog.lawrencemcdaniel.com/open-edx-installation/#2",
      "itemListElement": [{
        "@type": "HowToTip",
        "text": "I suggest using up to three additional terminal windows to monitor progress of the script.<ul><li>the linux top command is similar to Windows and OSX’s “System Activities” or “System Monitor” windows. The server cpu usage will remain steady at around 50% cumulative usage while the script is running.</li><li>the command sudo /edx/bin/supervisorctl status will print the Open edX processes that are currently running. You’ll see this list grow as the script progresses</li><li>using ls to explore the children folders of /edx/ will at a minimum be informative.</li></ul>"
      }, {
        "@type": "HowToDirection",
        "text": "This script takes around ONE HOUR to run and is intended to be spawned on a background process as follows:"
      }],
      "image": {
        "@type": "ImageObject",
        "url": "https://cdn-blog.lawrencemcdaniel.com/wp-content/uploads/2021/02/15200701/how-to-screenshot.png"
      }
    }, {
      "@type": "HowToStep",
      "name": "III. Verify that the script worked",
      "url": "https://blog.lawrencemcdaniel.com/open-edx-installation/#3",
      "itemListElement": [{
        "@type": "HowToDirection",
        "text": "Once the script is complete you should be able to open the landing pages for both the LMS and the CMS. See below for additional information about the many port assignments and URL oddities of Open edX. More immediately, the landing pages for the LMS and CMS should look like the following:"
      }, {
        "@type": "HowToDirection",
        "text": "Using the following admin command line script, you can view which Open edX modules are currently running: sudo /edx/bin/supervisorctl status"
      }, {
        "@type": "HowToDirection",
        "text": "If the installation was successful then you should see the following:"
      }],
      "image": [{
        "@type": "ImageObject",
        "url": "https://cdn-blog.lawrencemcdaniel.com/wp-content/uploads/2018/05/08111832/open-edx-lms-homepage.png"
      },{
        "@type": "ImageObject",
        "url": "https://cdn-blog.lawrencemcdaniel.com/wp-content/uploads/2018/01/22125453/edx-screen-cms.png"
      },{
        "@type": "ImageObject",
        "url": "https://cdn-blog.lawrencemcdaniel.com/wp-content/uploads/2018/01/22125453/full-stack-pristine-modules.png"
      }]
    }, {
      "@type": "HowToStep",
      "name": "IV. Create an admin account",
      "url": "https://blog.lawrencemcdaniel.com/open-edx-installation/#4",
      "itemListElement": [{
        "@type": "HowToDirection",
        "text": "You can save yourself a lot of future busy work by creating a root / admin account in this instance, prior to creating your AMI. Following are the commands to create a new superuser from the terminal command line:"
      }],
      "image": {
        "@type": "ImageObject",
        "url": "https://cdn-blog.lawrencemcdaniel.com/wp-content/uploads/2021/02/15201246/how-to-screenshot-2.png",
        "height": 1464,
        "width": 460
      }
    }, {
      "@type": "HowToStep",
      "name": "V. Create an AWS AMI",
      "url": "https://blog.lawrencemcdaniel.com/open-edx-installation/#5",
      "itemListElement": [{
        "@type": "HowToDirection",
        "text": "Read more here to learn about what an AMI (Amazon Machine Image) is, and how it is used: http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.customenv.html. Meanwhile, here’s a screen shot short cut that at least points you in the right direction of where to go and what to do."
      }, {
        "@type": "HowToDirection",
        "text": "It will take around 15 minutes for the AWS Image to render. Once the process has completed, and only after the process has completed, you can terminate the original EC2 instance from the EC2 instance console."
      }],
      "image": {
        "@type": "ImageObject",
        "url": "https://cdn-blog.lawrencemcdaniel.com/wp-content/uploads/2018/01/22125455/aws-ami-create.png"
      }
    }, {
      "@type": "HowToStep",
      "name": "VI. Configure Your LMS & Studio Applications",
      "url": "https://blog.lawrencemcdaniel.com/open-edx-installation/#6",
      "itemListElement": [{
        "@type": "HowToDirection",
        "text": "The native installation program creates four json files located in /edx/app/edxapp/ which contain the most important Django application parameters for your Open edX platform including for example, the name of your platform and the domain name. Unfortunately, the files are not user friendly, and to make matters worse, there is no way to add documentation to a JSON file."
      }, {
        "@type": "HowToDirection",
        "text": "Some basic configuration guidelines<ul><li>There are only four configuration files for the entire platform. These are located in /edx/app/edxapp</li><li>Avoid editing lms.auth.json and cms.auth.json. These two files contain the dozens of passwords that the Open edX platform created during the native installation procedure. Other than setting the password for your SMTP email account, there is virtually no reason for you to edit either of these files. A copy of the original password values exists in the file ~/my-passwords.yml.</li><li>Any changes to any of these four jason files take effect after restarting the platform. The following command line instructions will restart your platform.</li></ul>"
      }],
      "image": {
        "@type": "ImageObject",
        "url": "https://cdn-blog.lawrencemcdaniel.com/wp-content/uploads/2021/02/15202001/how-to-screen-shot-3.png"
      }
    }, {
      "@type": "HowToStep",
      "name": "VII. Deploy to Production",
      "url": "https://blog.lawrencemcdaniel.com/open-edx-installation/#7",
      "itemListElement": [{
        "@type": "HowToDirection",
        "text": "Bear in mind that there are additional steps that you still need to take in order to prepare your environment for a production deployment. Following will get you started on the most common additional platform requirements for most types of institutions and organizations."
      }],
      "image": {}
    }
  ],
  "totalTime": "PT8H"
}