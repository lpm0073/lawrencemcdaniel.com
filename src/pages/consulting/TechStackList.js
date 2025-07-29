import React from 'react'

const techStack = [
  'Python, Django',
  'ReactJS',
  'MySql, MongoDB, Redis, ElasticSearch',
  'Kubernetes, Docker',
  'Terraform',
  'AWS',
  'Azure AI machine learning studio and Cognitive Services',
]

const TechStackList = () => (
  <ul>
    {techStack.map(item => (
      <li key={item}>{item}</li>
    ))}
  </ul>
)

export default TechStackList
