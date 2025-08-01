import { DEFAULT_IMAGE } from "../constants"

const TIMEZONE = 'T00:00:00-06:00'

function getToday() {
  const d = new Date()
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}


export const gsdVideoObject = (url, name, description, uploadDate) => {
  const validDate = uploadDate || getToday()
  return {
    '@type': 'VideoObject',
    name: name,
    description: description,
    uploadDate: validDate + TIMEZONE,
    thumbnailUrl: DEFAULT_IMAGE,
    contentUrl: url,
    author: {
      '@type': 'Person',
      name: 'Lawrence McDaniel',
      url: 'https://lawrencemcdaniel.com/',
    },
  }
}

export const gsdVideoObjectList_FSWL = [
  gsdVideoObject(
    'https://youtu.be/XolFLX1u9Kg',
    'About the Smarter Platform',
    'A brief overview of the Smarter Platform.',
    '2024-04-01'
  ),
  gsdVideoObject(
    'https://youtu.be/-hZEO9sMm1s',
    'Smarter developer onboarding',
    'A tutorial on how to get started with the Smarter Platform.',
    '2024-03-02'
  ),
  gsdVideoObject(
    'https://youtu.be/oZAC85qgTzg',
    'How I Manage Sensitive Data Across The Entire Stack and my CI-CD Processes',
    'Learn  how to safely and securely work with sensitive data like passwords and API keys in your source code, CI-CD processes, and all of your operating environments including Kubernetes and Serverless.',
    '2024-01-15'
  ),
  gsdVideoObject(
    'https://youtu.be/Vr65B823lbk',
    'OpenAI API: Docker Deployment Method',
    'Deploy the Python OpenAI API using Docker in only five minutes with this handy tutorial that I use in an AI course that I teach at University of British Columbia. Happy learning!!! Also, here is a brief tutorial that better explains the OpenAI "Hello World!" Python application: https://youtu.be/RS9vH9FhGRI',
    '2023-12-20'
  ),
  gsdVideoObject(
    'https://youtu.be/RS9vH9FhGRI',
    'OpenAI API: Python 1-Minute Quick Start',
    'Get the OpenAI API working in your dev environment in less than a minute with this great GitHub scaffolding repo that I use as a teaching tool for my AI course at University of British Columbia.',
    '2024-01-15'
  ),
  gsdVideoObject(
    'https://youtu.be/ymMduca3_g0',
    'OpenAI API on AWS Lambda: 12-Factor Methodology',
    'Deploy the OpenAI API to AWS Lambda in accordance with the 12-Factor methodology.',
    '2024-01-15'
  ),
  gsdVideoObject(
    'https://youtu.be/hGlYHa5nNVk',
    'Pro Tips for publishing your Python project to PyPi',
    'Lets go through my entire pre-check process for preparing for and publishing a Python project to PyPi.',
    '2023-12-15'
  ),
  gsdVideoObject(
    'https://youtu.be/1w2y_0noo7g',
    'GitHub CI-CD Tutorial',
    'Leverage GitHub Actions, Dependabot, Mergify and pre-commit to automate your projects package version bumps, pull requests and semantic version releases.',
    '2023-11-01'
  ),
  gsdVideoObject(
    'https://youtu.be/IUgvj0lPYVM',
    'Pro Tips For Setting Up Your GitHub Repo - Part I',
    'Learn how to setup your GitHub repository like a pro: automated unit tests and PR evaluations, semantic version releases, code style enforcement and safeguards to prevent leaking your credentials and sensitive data.',
    '2023-11-01'
  ),
  gsdVideoObject(
    'https://youtu.be/5Jf34t_UlZA',
    'AWS Lambda Layers Crash Course',
    'When should you use Layers with your AWS Lambda function, and more importantly, how?',
    '2023-10-01'
  ),
  gsdVideoObject(
    'https://youtu.be/emW0E8E6M0c',
    'Build a ChatGPT chatbot with React and AWS Serverless',
    'This is a full stack implementation of each of the 30 example applications found in the OpenAI API official documentation, implemented using ReactJS, ViteJS, Terraform and the AWS Serverless components, API Gateway and Lambda. There are example Terraform implementations for Lambda using both Python and Node.js.',
    '2023-10-01'
  ),
  gsdVideoObject(
    'https://youtu.be/kVO0eYhN6dE',
    "How 'm Using GitHub CoPilot In VS Code",
    "Here is how I'm using the new generative AI features of Github's completely redesigned CoPilot, inside of VS Code, to help me with mundane daily coding chores.",
    '2023-10-01'
  ),
  gsdVideoObject(
    'https://youtu.be/IHEe3IZPFLg',
    'AWS Bedrock vs OpenAI',
    "Check out my review of AWS Bedrock, Amazon's competitive response to the OpenAI API, which includes ChatGPT, DALL·E and other generative AI models.",
    '2023-09-01'
  ),
  gsdVideoObject(
    'https://youtu.be/a_g_wYoEi68',
    '"What is ChatGTP Doing ... and Why Does It Work?" - Quick Summary',
    '"What is ChatGTP Doing ... and Why Does It Work?" by Stephen Wolfram is a must read if you aspire to become a Prompt Engineer for ChatGPT. Check out my review of this groundbreaking text.',
    '2023-09-01'
  ),
  gsdVideoObject(
    'https://youtu.be/FqARAi8nS2M',
    'OpenAI API With AWS Serverless: Quick Start',
    `Deploy your OpenAI application in one hour with this serverless solution based on AWS API Gateway + Lambda and the OpenAI
      Python Code: https://github.com/FullStackWithLawrence/aws-openai/tree/main/api/terraform/python
      Blog Article: https://blog.lawrencemcdaniel.com/openai-api-with-aws-lambda/'`,
    '2024-09-01'
  ),
  gsdVideoObject(
    'https://youtu.be/dBX5_u_wOHU',
    'LAWRENCE MCDANIEL ENTREVISTA 24HORAS Noticias en Español',
    'Entrevista con Lawrence McDaniel, creador de Smarter, sobre la Inteligencia Artificial y su impacto en la educación y el trabajo.',
    '2023-08-01'
  ),
  gsdVideoObject(
    'https://youtu.be/MPzaHnKq-VY',
    'Scikit-learn Logistic Regression model in 10 minutes',
    'Follow along using the Jupyter Notebook in the code sample Github repository to create a Scikit-Learn Logistic Regression model. You can clone or fork the Github repository presented in this video to create your own production-ready predictive model.',
    '2024-08-01'
  ),
  gsdVideoObject(
    'https://youtu.be/rUeCcBrMPrY',
    'Production-Ready With AWS Elastic Kubernetes Service  - Part III',
    `Production-ready Terraform scaffolding for AWS Elastic Kubernetes Service + supporting software packages.
      Source Code: https://github.com/FullStackWithLawrence/production-ready-aws-eks
      Blog Article: https://blog.lawrencemcdaniel.com/production-ready-aws-elastic-kubernetes-service/

      Learn how to use Terraform scaffolding to create a production-ready Kubernetes cluster running inside its own VPC. Sets up spot pricing for EC2 instances, and installs and configures commonly needed packages including:
      - Nginx Ingress Controller
      - cert-manager
      - metrics-server
      - Prometheus
      - Vertical Pod Autoscaler
      - Karpenter`,
    '2024-07-01'
  ),
  gsdVideoObject(
    'https://youtu.be/DG_Jg9Qi6T8',
    'Production-Ready With AWS Elastic Kubernetes Service  - Part II',
    `Production-ready Terraform scaffolding for AWS Elastic Kubernetes Service + supporting software packages.
      Source Code: https://github.com/FullStackWithLawrence/production-ready-aws-eks
      Blog Article: https://blog.lawrencemcdaniel.com/production-ready-aws-elastic-kubernetes-service/

      Learn how to use Terraform scaffolding to create a production-ready Kubernetes cluster running inside its own VPC. Sets up spot pricing for EC2 instances, and installs and configures commonly needed packages including:
      - Nginx Ingress Controller
      - cert-manager
      - metrics-server
      - Prometheus
      - Vertical Pod Autoscaler
      - Karpenter`,
    '2024-07-01'
  ),
  gsdVideoObject(
    'https://youtu.be/vVgUT4okdsY',
    'Production-Ready With AWS Elastic Kubernetes Service  - Part I',
    `Production-ready Terraform scaffolding for AWS Elastic Kubernetes Service + supporting software packages.
      Source Code: https://github.com/FullStackWithLawrence/production-ready-aws-eks
      Blog Article: https://blog.lawrencemcdaniel.com/production-ready-aws-elastic-kubernetes-service/

      Learn how to use Terraform scaffolding to create a production-ready Kubernetes cluster running inside its own VPC. Sets up spot pricing for EC2 instances, and installs and configures commonly needed packages including:
      - Nginx Ingress Controller
      - cert-manager
      - metrics-server
      - Prometheus
      - Vertical Pod Autoscaler
      - Karpenter`,
    '2024-07-01'
  ),
]

export const gsdVideoObjectList_Openedx = [
  gsdVideoObject(
    'https://youtu.be/tEgJA8t19Kc',
    'Open edX® Plugin Coding Tip #1 - Iterating Course Content',
    `Learn the Python code pattern to reliably reproduce the data that drives the Course Outline in Course Management Studio.
        Source Code:
        https://github.com/lpm0073/youtube-26-coding-tips/tree/main/coding-tip-01
        https://github.com/cookiecutter-openedx/openedx-plugin-example/tree/youtube-26-coding-tips/openedx_plugin_cms`,
    '2024-06-01'
  ),
  gsdVideoObject(
    'https://youtu.be/4TcSrEzciHA',
    'The Open edX® Example Plugin: Your One-stop-shop For Code Samples!',
    'Lawrence McDaniel presents the Open edX® Example Plugin code repository.',
    '2024-03-01'
  ),

  gsdVideoObject(
    'https://youtu.be/1891BK8RopU',
    'Open edX® Plugin Coding Tip #3 - Python Decorators',
    'Learn 10 commonly used Python decorators that will improve your code in terms of performance, security and readability.',
    '2024-08-01'
  ),
  gsdVideoObject(
    'https://youtu.be/E-ce3FcLj-4',
    'Open edX® Plugin Coding Tip #2 - Custom oAuth Backend for Wordpress',
    `Lawrence and Clifford Okorie show you how to create a Wordpress oAuth provider and a custom oauth backend for Open edX using plugin technology.
      Source Code:
      https://github.com/cookiecutter-openedx/openedx-plugin-example/blob/main/openedx_plugin/wordpress_oauth2_backend.py

      Getting Started With Open edX Plugins:
      - https://blog.lawrencemcdaniel.com/getting-started-with-open-edx-plugin-architecture/
      - https://blog.lawrencemcdaniel.com/the-open-edx-example-plugin/`,
    '2024-07-31'
  ),
]
export const gsdVideoObjectList = [].concat(
  gsdVideoObjectList_FSWL,
  gsdVideoObjectList_Openedx
)
