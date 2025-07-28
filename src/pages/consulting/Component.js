
import React from 'react'
import RenderPageTitle from '../../components/pagetitle/pageTitleComponent'
import { LinkedinBadge } from '../../components/linkedinBadge/Component'
//import BlankSpace from '../../components/blankSpace/Component'
import { Helmet } from 'react-helmet'
import { URL_SITE } from '../../shared/constants'
import './styles.css'

const codeSamples = [
  {
    category: 'Data Science',
    links: [
      {
        name: 'openai-embeddings',
        url: 'https://github.com/FullStackWithLawrence/openai-embeddings',
        description: 'Demonstrates how to use OpenAI embeddings for semantic search and NLP tasks, including setup, API usage, and practical Python code examples.'
      },
      {
        name: 'azureml-example',
        url: 'https://github.com/FullStackWithLawrence/azureml-example',
        description: 'Sample project for deploying and managing machine learning models using Azure ML Studio, with workflow automation and deployment scripts.'
      },
      {
        name: 'aws-rekognition',
        url: 'https://github.com/FullStackWithLawrence/aws-rekognition',
        description: 'Code samples for AWS Rekognition, showing how to analyze images and videos for object, scene, and facial recognition using AWS SDK.'
      },
      {
        name: 'openai-hello-world',
        url: 'https://github.com/FullStackWithLawrence/openai-hello-world',
        description: 'A simple hello world project to get started with OpenAI APIs, including authentication, basic prompts, and response handling.'
      },
      {
        name: '009-scikit-learn-random-forest',
        url: 'https://github.com/FullStackWithLawrence/009-scikit-learn-random-forest',
        description: 'Random Forest classification and regression examples using scikit-learn, with data preparation, training, and evaluation steps.'
      },
      {
        name: '007-scikit-learn-svm',
        url: 'https://github.com/FullStackWithLawrence/007-scikit-learn-svm',
        description: 'Support Vector Machine (SVM) examples for classification problems, including kernel tricks and hyperparameter tuning in scikit-learn.'
      },
      {
        name: '008-scikit-learn-decision-trees',
        url: 'https://github.com/FullStackWithLawrence/008-scikit-learn-decision-trees',
        description: 'Decision tree models for classification and regression, with visualization and feature importance analysis using scikit-learn.'
      },
    ],
  },
  {
    category: 'Python and React programming techniques',
    links: [
      {
        name: 'lawrencemcdaniel.com',
        url: 'https://github.com/lpm0073/lawrencemcdaniel.com',
        description: 'The source code for this website, demonstrating advanced React and Python integration, static site generation, and deployment best practices.'
      },
      {
        name: 'django_with_react',
        url: 'https://github.com/lpm0073/django_with_react',
        description: 'A boilerplate for full-stack web apps using Django REST Framework and React, with authentication, API, and frontend integration.'
      },
      {
        name: 'react-mdr',
        url: 'https://github.com/FullStackWithLawrence/react-mdr',
        description: 'React component library for Markdown rendering, supporting custom plugins, syntax highlighting, and extensible UI features.'
      },
      {
        name: 'pydantic-example',
        url: 'https://github.com/FullStackWithLawrence/pydantic-example',
        description: 'Examples of using Pydantic for data validation and settings management in Python, with FastAPI integration and type enforcement.'
      },
      {
        name: 'secure-logger',
        url: 'https://github.com/FullStackWithLawrence/secure-logger',
        description: 'A secure logging utility for Python applications, featuring encryption, structured logs, and integration with cloud logging services.'
      },
    ],
  },
  {
    category: 'Open edX code samples',
    links: [
      {
        name: 'cookiecutter-openedx-devops',
        url: 'https://github.com/cookiecutter-openedx/cookiecutter-openedx-devops',
        description: 'DevOps templates and automation for Open edX deployments, including Docker, CI/CD, and infrastructure-as-code examples.'
      },
      {
        name: 'youtube-26-coding-tips',
        url: 'https://github.com/FullStackWithLawrence/youtube-26-coding-tips',
        description: 'A collection of coding tips and best practices for Open edX and Python, as featured in the YouTube video series.'
      },
      {
        name: 'openedx-plugin-example',
        url: 'https://github.com/cookiecutter-openedx/openedx-plugin-example',
        description: 'A sample Open edX plugin project, showing how to extend and customize the platform with reusable components.'
      },
      {
        name: 'django-memberpress-client',
        url: 'https://github.com/cookiecutter-openedx/django-memberpress-client',
        description: 'Django client for integrating MemberPress with Open edX, enabling membership management and SSO features.'
      },
      {
        name: 'edx-oauth2-wordpress-backend',
        url: 'https://github.com/cookiecutter-openedx/edx-oauth2-wordpress-backend',
        description: 'OAuth2 backend for connecting Open edX with WordPress, supporting secure authentication and user sync.'
      },
      {
        name: 'cookiecutter-openedx-plugin',
        url: 'https://github.com/cookiecutter-openedx/cookiecutter-openedx-plugin',
        description: 'Cookiecutter template for building Open edX plugins, with best practices for structure, testing, and deployment.'
      },
      {
        name: 'tutor-contrib-s3',
        url: 'https://github.com/cookiecutter-openedx/tutor-contrib-s3',
        description: 'Tutor plugin for S3 storage integration with Open edX, enabling scalable file storage and backup.'
      },
    ],
  },
]

const techStack = [
  'Python, Django',
  'ReactJS',
  'MySql, MongoDB, Redis, ElasticSearch',
  'Terraform',
  'AWS',
  'Azure AI machine learning studio and Cognitive Services',
]

const ConsultingServices = () => (
  <ul>
    <li>Data Science: Bespoke workflows to load and prepare data sets, train, test, evaluate, deploy and monitor models</li>
    <li>AI/Machine Learning containerized workload design, deploy and management</li>
    <li>Instructional design and production of online and in-person instructional course content for modern data science technologies</li>
  </ul>
)

const CodeSamplesTable = () => (
  <div className="table-responsive">
    <table className="table table-bordered table-striped mt-4">
      <thead className="thead-dark">
        <tr>
          <th>Category</th>
          <th>Repository</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {codeSamples.map((group) => (
          group.links.map((link, idx) => (
            <tr key={link.url}>
              {idx === 0 && (
                <td rowSpan={group.links.length} style={{ verticalAlign: 'middle' }}>
                  {group.category}
                </td>
              )}
              <td>
                <a href={link.url} target="_blank" rel="noopener noreferrer">{link.name}</a>
              </td>
              <td>{link.description}</td>
            </tr>
          ))
        ))}
      </tbody>
    </table>
  </div>
)

const TechStackList = () => (
  <ul>
    {techStack.map(item => (
      <li key={item}>{item}</li>
    ))}
  </ul>
)

const Consulting = () => {
  return (
    <div>
      <Helmet>
        <title>Data Science Consulting</title>
        <link rel="canonical" href={URL_SITE + '/data-science/'} />
        <meta
          name="description"
          content="Consulting services in data science, AI/ML, instructional design, and modern tech stack expertise."
        />
        <meta
          name="keywords"
          content="data science, AI, machine learning, consulting, python, react, aws, azure, terraform, django, lawrence mcdaniel"
        />
      </Helmet>
      <div className="site-page data-science-page">
        <RenderPageTitle
          theme="light"
          icon="fa-database"
          title="Data Science"
          boxed_title="Consulting"
        />
        <div className="row mt-5">
          <div className="col-lg-3 hide-medium">
            <div className="pl-3 text-center">
              <LinkedinBadge />
              <a
                className="mt-4 btn btn-danger"
                role="button"
                target="_self"
                href="/contact"
              >
                <i className="fa fa-phone"></i> Contact Me
              </a>
            </div>
          </div>
          <div className="col-lg-9 col-md-12">
            <div className="text-justify ml-lg-0 mr-lg-5 mx-2">
              <h3>Consulting Services</h3>
              <ConsultingServices />
              <h3 className="mt-5">Code Samples</h3>
              <CodeSamplesTable />
              <h3 className="mt-5">Tech Stack Highlights</h3>
              <TechStackList />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Consulting
