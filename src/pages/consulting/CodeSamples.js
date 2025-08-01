import React from 'react'

//const CRFL = '\r\n'
const codeSamples = [
  {
    category: 'Data Science',
    html_id: 'data-science',
    links: [
      {
        name: 'openai-embeddings',
        url: 'https://github.com/FullStackWithLawrence/openai-embeddings',
        description: `A Hybrid Search and Augmented Generation prompting solution using Python OpenAI API Embeddings persisted
        to a Pinecone vector database index and managed by LangChain. Demonstrates the following: System Prompting, Templates,
        LangChain, PDF Loader, Pinecone, Retrieval Augmented Generation (RAG).`,
      },
      {
        name: 'azureml-example',
        url: 'https://github.com/FullStackWithLawrence/azureml-example',
        description: `How to use the Microsoft Azure Machine Learning SDK for Python command line, and for Jupyter Notebooks. Demonstrates basic usage of Azure Machine Learning's Automated ML service. Implements the following:
        AzureAIMLWorkspace, AzureAIMLAssetsDataset, AzureAIMLStudioComputeCluster, AzureAIMLStudioAssetsBatchEndpoint, AzureAIMLStudioAuthoringAutomatedML.
        Also provides scaffolding for production deployment of the model using Azure functions and Azure Container Instances.`,
      },
      {
        name: 'aws-rekognition',
        url: 'https://github.com/FullStackWithLawrence/aws-rekognition',
        description: `A Terraform based serverless facial recognition microservice built with AWS Rekognition, DynamoDB, S3, IAM, CloudWatch, API Gateway and Lambda.`,
      },
      {
        name: 'openai-hello-world',
        url: 'https://github.com/FullStackWithLawrence/openai-hello-world',
        description: `A Python "Hello World" application that also demonstrates the OpenAI API PyPi library and usage of Docker.`,
      },
      {
        name: '009-scikit-learn-random-forest',
        url: 'https://github.com/FullStackWithLawrence/009-scikit-learn-random-forest',
        description: `How to setup a Random Forest predictive model using Python with Pandas, MatPlotLib, Seaborn and Scikit Learn.`,
      },
      {
        name: '007-scikit-learn-svm',
        url: 'https://github.com/FullStackWithLawrence/007-scikit-learn-svm',
        description: `How to setup a Support Vector Machine predictive model using Python with Pandas, MatPlotLib, Seaborn and Scikit Learn.`,
      },
      {
        name: '008-scikit-learn-decision-trees',
        url: 'https://github.com/FullStackWithLawrence/008-scikit-learn-decision-trees',
        description: `How to setup a Decision Tree predictive model using Python with Pandas, MatPlotLib, Seaborn and Scikit Learn.`,
      },
    ],
  },
  {
    category: 'Python and React programming techniques',
    html_id: 'python-react',
    links: [
      {
        name: 'lawrencemcdaniel.com',
        url: 'https://github.com/lpm0073/lawrencemcdaniel.com',
        description: `The source code for this website, demonstrating React and some advanced coding techniques, including:
        Workbox for image prefetching, React Helmet for SEO, Redux for state management, and Progressive Web App (PWA) features.`,
      },
      {
        name: 'django_with_react',
        url: 'https://github.com/lpm0073/django_with_react',
        description: `demonstrates how to scaffold a hybrid Django + ReactJS pattern.`,
      },
      {
        name: 'react-mdr',
        url: 'https://github.com/FullStackWithLawrence/react-mdr',
        description: `Example React animation. React Matrix Digital Rain Effect gives you your favorite Matrix movie screen effect in the form of a React component.
        Also demonstrates: how to use React hooks, how to use the React Context API for state management, and publishing a React component to npm.`,
      },
      {
        name: 'pydantic-example',
        url: 'https://github.com/FullStackWithLawrence/pydantic-example',
        description: `demonstrates four popular use cases for Pydantic:
        Data modeling, Validation, Data Parsing and Serialization, and Exception Handling.`,
      },
      {
        name: 'secure-logger',
        url: 'https://github.com/FullStackWithLawrence/secure-logger',
        description: `Example Python decorator that also demonstrates publishing a Python package to PyPi, and
        automated semantic version management.`,
      },
    ],
  },
  {
    category: 'Open edX code samples',
    html_id: 'openedx',
    links: [
      {
        name: 'cookiecutter-openedx-devops',
        url: 'https://github.com/cookiecutter-openedx/cookiecutter-openedx-devops',
        description: `Example Jinja based Python Cookiecutter template for generating Terraform code for a broad variety of
        cloud infrastructure classes including: VPC, Route53, EC2, Kubernetes, Elastic Container Registry,
        Relational Database Service, Identity Access Management, Certificate Manager.`,
      },
      {
        name: 'openedx-plugin-example',
        url: 'https://github.com/cookiecutter-openedx/openedx-plugin-example',
        description: `An Open edX plugin showcasing a curated collection of code samples for extending and modifying the stock
        functionality of an Open edX installation using the built-in plugin architecture. This plugin can be installed in any
        Open edX installation version Juniper or later, independent of the installation method. This plugin currently runs in
        native builds, tutor installations, and Cookiecutter-openedx Kubernetes, amongst other proprietary installation methodologies.`,
      },
      {
        name: 'django-memberpress-client',
        url: 'https://github.com/cookiecutter-openedx/django-memberpress-client',
        description: `Django client for integrating MemberPress with Open edX, enabling membership management
        and SSO features. Also demonstrates how to use the Django REST Framework for building APIs, and publishing
        a Django app to PyPi.`,
      },
      {
        name: 'edx-oauth2-wordpress-backend',
        url: 'https://github.com/cookiecutter-openedx/edx-oauth2-wordpress-backend',
        description: `An Open edX oauth2 backend for Wordpress WP OAuth Server. Python Social Auth custom backend implentation
        This is a strongly-typed implementation that leverages an in-depth knowledge of the WP Oauth return objects to generate verbose,
        informative log data in lms.log that will help you to quickly get third party authentication working on your
        Open edX installation.`,
      },
      {
        name: 'cookiecutter-openedx-plugin',
        url: 'https://github.com/cookiecutter-openedx/cookiecutter-openedx-plugin',
        description: `An Open edX Plugin that implements customizations for deployment to Kubernetes. Implements the following:
        Hooks for openedx Django Signals for 'user_logged_in', 'user_logged_out', 'register_user', 'course_enrollment_created', 'certificate_created' and more.
        Demonstrates both the legacy, and the newer methodology for subscribing to and listening for Django signals.
        Scaffolding for waffle flag setup, including Django model initializations. These are currently only used to enable Django Signals.
        A custom badges backend that is compatible with django-storages backend for Amazon S3`,
      },
    ],
  },
  {
    category: 'Smarter',
    html_id: 'smarter',
    links: [
      {
        name: 'smarter-chat',
        url: 'https://github.com/smarter-sh/smarter-chat',
        description: `SmarterChat React.js component for smarter.sh. Contains the source code for the interactive chatbot found in
        the Smarter web console developer workbench. It integrates natively with Smarter Saas and on-premise installations.
        You can optionally enable the meta data output behavior found in the Smarter sandbox. See Smarter Technical Overview
        This project is also suitable for all front-end cross-platform projects. For example, use this code base to create a
        react.js run-time for use inside of Wordpress plugins, salesforce.com apps, .net components and Sharepoint add-ins.`,
      },
      {
        name: 'smarter-python',
        url: 'https://github.com/smarter-sh/smarter-python',
        description: `The official Python library for the Smarter platform. Provides Python wrappers for the Smarter API,
        enabling developers to build applications that interact with Smarter's extensible LLM-agnostic services for leveraging
        function calling features.`,
      },
      {
        name: 'smarter-infrastructure',
        url: 'https://github.com/smarter-sh/smarter-infrastructure',
        description: `Terraform code for creating the cloud infrastructure for a Smarter on-premise installation.
        Principal technologies deployed include: VPC, Route53, IAM, S3, CloudFront, EKS, RDS, EC2, ECR, Certificate Manager.`,
      },
    ],
  },
  {
    category: 'Online Training',
    html_id: 'online-training',
    links: [
      {
        name: 'sample-lecture',
        url: 'https://cdn.lawrencemcdaniel.com/ubc/cdl10/c-module-01.mp4',
        description: `Sample lecture demonstrating instructional design and delivery`,
      },
      {
        name: 'sample-laboratory',
        url: 'https://cdn.lawrencemcdaniel.com/ubc/cdl10/ubc-cdl10-module-01-lab-03.mp4',
        description: `Sample laboratory session showcasing hands-on`,
      },
    ],
  },
]

const CodeSamplesTable = () => (
  <div className="table-responsive">
    <table className="table table-bordered table-striped mt-4" id="code-samples-table">
      <thead className="thead-dark">
        <tr>
          <th style={{ width: '30%' }}>Repository</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {codeSamples.map((group) => (
          <React.Fragment key={group.category}>
            <tr id={group.html_id}>
              <td
                className="code-sample-category pt-4"
                colSpan={2}
                style={{ textAlign: 'left', fontWeight: 'bold', background: '#f8f9fa' }}
              >
                {group.category}
              </td>
            </tr>
            {group.links.map((link) => (
              <tr key={link.url}>
                <td>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.name}
                  </a>
                </td>
                <td>{link.description}</td>
              </tr>
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  </div>
)

export default CodeSamplesTable
