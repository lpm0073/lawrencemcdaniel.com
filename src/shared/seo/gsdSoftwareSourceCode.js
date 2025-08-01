
export const gsdSoftwareSourceCode = (url, programming_language, description) => {
   // example: https://github.com/FullStackWithLawrence/openai-embeddings
   const name = url.split('/').filter(Boolean).pop();
    return {
      '@type': 'SoftwareSourceCode',
      '@id': url + '#software-source-code',
      name: name,
      codeRepository: url,
      author: {
        '@type': 'Person',
        name: 'Lawrence McDaniel',
        url: 'https://lawrencemcdaniel.com/'
      },
      programmingLanguage: programming_language,
      description: description
    }
};

export const gsdSoftwareRepoList_FSWL = [
    gsdSoftwareSourceCode(
        'https://github.com/FullStackWithLawrence/openai-embeddings',
        'Python',
        'A Hybrid Search and Augmented Generation prompting solution using Python OpenAI API Embeddings persisted to a Pinecone vector database index and managed by LangChain.'
    ),
    gsdSoftwareSourceCode(
      'https://github.com/FullStackWithLawrence/openai-hello-world',
      'Python',
      'A Python "Hello World" application that demonstrates the OpenAI API and usage of Docker Compose to containerize your project. This is a command line utility that returns the value "Hello World" in the written language of your choice.'
    ),
    gsdSoftwareSourceCode(
      'https://github.com/FullStackWithLawrence/aws-rekognition',
      'Python',
      'A facial recognition microservice built with AWS Rekognition, DynamoDB, S3, IAM, CloudWatch, API Gateway and Lambda.'
    ),
    gsdSoftwareSourceCode(
      'https://github.com/FullStackWithLawrence/secure-logger',
      'Python',
      'A Python decorator to generate redacted and nicely formatted log entries. Works on all callables: class, class methods, Python module functions. Recursively redacts Python dictionary key values based on a customizable list of case-insensitive keys. Prevents your sensitive application data like cloud provider key-pairs from leaking into your application logs.'
    ),
    gsdSoftwareSourceCode(
      'https://github.com/FullStackWithLawrence/aws-openai',
      'Python',
      'A React + AWS Serverless full stack implementation of the example applications found in the official OpenAI API documentation. See this system architectural diagram for details. This is an instructional tool for the YouTube channel "Full Stack With Lawrence" and for University of British Columbia course, "Artificial Intelligence Cloud Technology Implementation".'
    ),
    gsdSoftwareSourceCode(
      'https://github.com/FullStackWithLawrence/azureml-example',
      'Python',
      `Demonstrate basic usage of Azure Machine Learning Automated ML service. Implements the following:
        AzureAIMLWorkspace: Azure AI ML Studio workspace helper class. generates an authenticated instance of a workspace.
        AzureAIMLAssetsDataset: Azure AI ML Studio data set. Provides helpers for managing ML Studio data sets, and for porting to/from kaggle data sets and local csv and Excel files.
        AzureAIMLStudioComputeCluster: Azure AI ML Studio Compute - compute cluster object with helpers for instantitation.
        AzureAIMLStudioAssetsBatchEndpoint: Azure AI ML Studio Assets - batch end point. Providers helpers for managing end points.
        AzureAIMLStudioAuthoringAutomatedML: Azure AI ML Studio Authoring - Automated ML. Helper class for managing life cycle of 'automated ml' jobs.`
    ),
    gsdSoftwareSourceCode(
      'https://github.com/FullStackWithLawrence/pydantic-example',
      'Python',
      `Pydantic is the most widely used data validation library for Python. This repo demonstrates three popular use cases for Pydantic:
      Validation. Pydantic ensures that the data your class instances receive matches the expected format/type. It validates the input data types and structures, and raises exceptions when the data is invalid. See the example Python class in this repo.
      Data Parsing and Serialization. See the JSON validator in this repo for an example of how to validate a JSON string against a schema. Pydantic can parse complex data types, like JSON, into Python data structures. It can also serialize Python objects back into JSON.
      Exception Handling. See the custom exceptions in this repo which demonstrate how you catch Pydantic exceptions, analyze them, and then raise your own custom exceptions.`
    ),
    gsdSoftwareSourceCode(
      'https://github.com/FullStackWithLawrence/react-mdr',
      'React',
      'React Matrix Digital Rain Effect gives you your favorite Matrix movie screen effect in the form of a React component. The source originates from an October 2021 blog article written by Adam Nagy, "Matrix raining code effect using JavaScript".'
    ),
    gsdSoftwareSourceCode(
      'https://github.com/FullStackWithLawrence/006-scikit-learn-logistic-regression',
      'Python',
      'A simple example of how to setup a Logistic Regression predictive model using Python with Pandas, MatPlotLib, Seaborn and Scikit Learn. This is the source code for FullStackWithLawrence Youtube Video -- "Scikit-learn Logistic Regression model in 10 minutes"'
    ),
    gsdSoftwareSourceCode(
      'https://github.com/FullStackWithLawrence/production-ready-aws-eks',
      'Terraform',
      'This is the source code for my Blog Article, https://blog.lawrencemcdaniel.com/production-ready-aws-elastic-kubernetes-service/,  and FullStackWithLawrence Youtube Video, https://www.youtube.com/watch?v=vVgUT4okdsY'
    ),
    gsdSoftwareSourceCode(
      'https://github.com/FullStackWithLawrence/009-scikit-learn-random-forest',
      'Python',
      'A simple example of how to setup a Random Forest predictive model using Python with Pandas, MatPlotLib, Seaborn and Scikit Learn.'
    ),
    gsdSoftwareSourceCode(
      'https://github.com/FullStackWithLawrence/007-scikit-learn-svm',
      'Python',
      'A simple example of how to setup a Support Vector Machine predictive model using Python with Pandas, MatPlotLib, Seaborn and Scikit Learn.'
    ),
    gsdSoftwareSourceCode(
      'https://github.com/FullStackWithLawrence/008-scikit-learn-decision-trees',
      'Python',
      'A simple example of how to setup a Decision Tree predictive model using Python with Pandas, MatPlotLib, Seaborn and Scikit Learn.'
    )
]

export const gsdSoftwareRepoList_Smarter = [
  gsdSoftwareSourceCode(
    'https://github.com/smarter-sh/smarter-vscode-yaml',
    'TypeScript',
    `A Visual Studio Code extension that provides enhanced support for working with Smarter YAML manifest files, similar to Kubernetes manifests. It includes syntax validation, semantic checking, and auto-completion for reserved keywords. A Smarter manifest will include the following two keys at the top of the document:
      apiVersion: smarter.sh/v1
      kind: Chatbot
      Valid manifest 'kind' values: Chatbot, Plugin, Account, SmarterAuthToken, User, Chat, ChatConfig, ChatHistory, ChatPluginUsage, ChatToolCall, SqlConnection, ApiConnection`
  ),
  gsdSoftwareSourceCode(
    'https://github.com/smarter-sh/smarter-python',
    'Python',
    'The Smarter Python library provides convenient access to the Smarter REST API from any Python 3.8+ application. The library includes type definitions for all request params and response fields.'
  ),
  gsdSoftwareSourceCode(
    'https://github.com/smarter-sh/web-integration-example',
    'JavaScript',
    `Demonstrates the basic pattern for integrating a SmarterChat npm component into an existing web page. This is a generic integration pattern that is intended to facilitate plugin tool development for any ecosystem, including for example, Microsoft Dynamics, Microsoft Sharepoint, SAP, salesforce.com, Wordpress, Drupal, Wix, Squarespace, Shopify, and others.
     Injects a lightweight react.js app into the DOM. The app itself is freely downloadable at @smarter.sh/ui-chat, or alternatively you can fork https://github.com/smarter-sh/smarter-chat.`
  ),
  gsdSoftwareSourceCode(
    'https://github.com/smarter-sh/smarter-chat',
    'React',
    'This project contains the source code for the interactive chatbot found in the Smarter web console developer workbench. It integrates natively with Smarter Saas and on-premise installations. You can optionally enable the meta data output behavior found in the Smarter sandbox. See Smarter Technical Overview This project is also suitable for all front-end cross-platform projects. For example, use this code base to create a react.js run-time for use inside of Wordpress plugins, salesforce.com apps, .net components and Sharepoint add-ins.'
  ),
  gsdSoftwareSourceCode(
    'https://github.com/smarter-sh/smarter-infrastructure',
    'Terraform',
    'AWS infrastructure as code for deploying Smarter API.'
  ),
  gsdSoftwareSourceCode(
    'https://github.com/smarter-sh/smarter-cli',
    'Golang',
    'The Smarter command-line interface for working with Smarter resources. Runs on Windows, macOS, Linux and DockerHub. Download it at https://smarter.sh/cli/'
  )
]
export const gsdSoftwareRepoList_CookieCutterOpenedx = []

export const gsdSoftwareSourceCodeList = [].concat(
  gsdSoftwareRepoList_FSWL,
  gsdSoftwareRepoList_Smarter,
  gsdSoftwareRepoList_CookieCutterOpenedx
);

