/*
   Educational history + Courses completed.
   Added to Education page.
 */

const course = (courseName, description, url, providerName, providerUrl, dateCreated) => {
  return {
    '@type': 'Course',
    name: courseName,
    description: description,
    url: url,
    provider: {
      '@type': 'Organization',
      name: providerName,
      sameAs: providerUrl,
    },
    educationalCredentialAwarded: 'Verified Certificate',
    dateCreated: dateCreated,
  }
}

export const gsdQualifications = [
  {
    '@type': 'EducationalOccupationalCredential',
    name: 'University of North Texas',
    url: 'https://www.unt.edu/',
    educationalLevel: 'Bachelors or equivalent',
    description:
      'Bachelor of Science in Computer Science and Mathematics, Minors in Physics and English.',
    dateCreated: '1992-08-01',
  },
  course(
    'Web App Development With AngularJS',
    'Web App Development With AngularJS',
    'https://www.coursera.org/learn/single-page-web-apps-with-angularjs/home/welcome',
    'Johns Hopkins University',
    'https://www.jhu.edu/',
    '2017-06-01'
  ),
  course(
    'HTML, CSS, and Javascript for Web Developers',
    'HTML, CSS, and Javascript for Web Developers',
    'https://www.coursera.org/learn/html-css-javascript-for-web-developers',
    'Johns Hopkins University',
    'https://www.jhu.edu/',
    '2017-07-01'
  ),
  course(
    'Ruby on Rails: An Introduction',
    'Ruby on Rails: An Introduction',
    'https://www.coursera.org/learn/ruby-on-rails-intro',
    'Johns Hopkins University',
    'https://www.jhu.edu/',
    '2017-08-01'
  ),
  course(
    'Rails with Active Record and Action Pack',
    'Rails with Active Record and Action Pack',
    'https://www.coursera.org/learn/rails-with-active-record',
    'Johns Hopkins University',
    'https://www.jhu.edu/',
    '2017-08-01'
  ),
  course(
    'Front-End Web Development with ReactJS',
    'Front-End Web Development with ReactJS',
    'https://www.coursera.org/learn/front-end-react/home/welcome',
    'Hong Kong University of Science and Technology',
    'https://hkust.edu.hk/',
    '2020-03-01'
  ),
  course(
    'Accounting Analytics Certification',
    'Accounting Analytics Certification',
    'https://www.coursera.org/learn/accounting-analytics/home/welcome',
    'Wharton University of Pennsylvania',
    'https://www.wharton.upenn.edu/',
    '2017-08-01'
  ),
  course(
    'People Analytics Certification',
    'People Analytics Certification',
    'https://www.coursera.org/learn/wharton-operations-analytics/home/welcome',
    'Wharton University of Pennsylvania',
    'https://www.wharton.upenn.edu/',
    '2017-08-01'
  ),
  course(
    'Operations Analytics Certification',
    'Operations Analytics Certification',
    'https://www.coursera.org/learn/wharton-people-analytics/home/welcome',
    'Wharton University of Pennsylvania',
    'https://www.wharton.upenn.edu/',
    '2017-09-01'
  ),
  course(
    'Customer Analytics Certification',
    'Customer Analytics Certification',
    'https://www.coursera.org/learn/wharton-customer-analytics/home/welcome',
    'Wharton University of Pennsylvania',
    'https://www.wharton.upenn.edu/',
    '2017-09-01'
  ),
  course(
    'Data Science',
    'Data Science Certification',
    'https://www.coursera.org/learn/data-science/home/welcome',
    'Stanford University',
    'https://www.stanford.edu/',
    '2016-21-31'
  ),
  course(
    'CS193P Developing Applications in iOS',
    'CS193P Developing Applications in iOS',
    'https://cs193p.sites.stanford.edu/',
    'Stanford University',
    'https://www.stanford.edu/',
    '2012-06-30'
  ),
]
