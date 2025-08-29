/*
   Educational history + Courses completed.
   Added to Education page.
 */

const EducationalOccupationalCredential = (
  courseName,
  description,
  url,
  providerName,
  providerUrl,
  dateCreated,
  is_university
) => {
  return {
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'certificate',
    name: courseName,
    description: description,
    url: url,
    recognizedBy: {
      '@type': is_university === 'true' ? 'CollegeOrUniversity' : 'Organization',
      name: providerName,
      sameAs: providerUrl,
    },
    dateCreated: dateCreated,
  }
}

const EducationalOccupationalCredentialUNT = {
  '@type': 'EducationalOccupationalCredential',
  name: 'Bachelor of Science in Computer Science and Mathematics',
  description:
    'Bachelor of Science in Computer Science and Mathematics, Minors in Physics and English.',
  credentialCategory: 'degree',
  educationalLevel: 'Bachelors or equivalent',
  url: 'https://www.unt.edu/',
  recognizedBy: {
    '@type': 'CollegeOrUniversity',
    name: 'University of North Texas',
    sameAs: 'https://www.unt.edu/',
  },
  dateCreated: '1992-08-01',
}

export const gsdQualifications = (courses) => {
  /*
    courses: an array of objects like this
    {
        "id": 3467,
        "date": "2023-05-12T02:25:59",
        "type": "post",
        "link": "https://api.lawrencemcdaniel.com/2023/05/12/mit-data-science-certificate/",
        "title": {
            "rendered": "Massachusetts Institute of Technology, Data Science and Machine Learning: Making Data Driven Decisions"
        },
        "acf": {
            "institution": "Massachusetts Institute of Technology",
            "course_summary": "Completed an intensive 12-week online program offered by MIT’s ...",
            "course_title": "Data Science and Machine Learning: Making Data Driven Decisions",
            "type": "certificate",
            "institution_url": "https://web.mit.edu/",
            "certificate_url": "https://www.mygreatlearning.com/certificate/OHMJTCTD",
            "is_university": "true"
        }
    },

   */

  const certificates = courses
    .filter((course) => course.acf?.type === 'certificate')
    .map((course) => {
      const institution = course?.acf?.institution || 'Unknown Institution'
      const course_title = course?.acf?.course_title || 'Unknown Course Title'
      const course_summary = course?.acf?.course_summary || 'Unknown Course Summary'
      const institution_url = course?.acf?.institution_url || 'Unknown Institution URL'
      const is_university = course?.acf?.is_university || true
      const course_date = course?.date
      const certificate = course?.acf?.certificate

      return EducationalOccupationalCredential(
        course_title,
        course_summary,
        certificate,
        institution,
        institution_url,
        course_date,
        is_university
      )
    })

  return [EducationalOccupationalCredentialUNT, ...certificates]
}
