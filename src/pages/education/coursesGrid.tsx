import React, { type CSSProperties } from 'react'
import { useEducation } from '../../redux/hooks'

import { wpGetFeaturedImage } from '../../shared/wpGetFeaturedImage'
//import { Fade } from "react-animation-components";

interface CourseProps {
  item_style: CSSProperties
  course_summary: string
  institution: string
  course_title: string
}

function Course({ item_style, course_summary, institution, course_title }: CourseProps) {
  return (
    <React.Fragment>
      <div
        className="education-item mx-1 infinite"
        style={item_style}
        title={course_summary}
      ></div>
      <div style={{ marginTop: '-25px' }}>
        <h5 className="fw-normal fs-6 text-center w-100 mt-2 text-dark">{institution}</h5>
        <h4 className="fw-normal fs-6 text-center w-100 d-flex align-items-center justify-content-center px-3 text-dark">
          {course_title}
        </h4>
      </div>
    </React.Fragment>
  )
}

export default function CoursesGrid() {
  const education = useEducation()

  return (
    <section className="" aria-label="Courses Grid">
      <div className="row my-5 mx-0 py-5 px-0 text-center align-items-stretch">
        {education.data.map((course, indx) => {
          const institution = course?.acf?.institution || 'Unknown Institution'
          const course_title = course?.acf?.course_title || 'Unknown Course Title'
          const course_summary = course?.acf?.course_summary || 'Unknown Course Summary'
          /*
              const course_date = course?.date
              const course_year = course_date
                ? new Date(course_date).getFullYear()
                : 'Unknown Year'
              */
          const certificate_url =
            course?.acf?.certificate_url || course?.acf?.institution_url || null
          const aria_label = course?.title?.rendered

          // no size: the 'medium' image, the full image if there is none
          const item_url = wpGetFeaturedImage(course)
          const background_url = "url('" + item_url + "')"
          const item_style = {
            backgroundImage: background_url,
          }
          return (
            <React.Fragment key={indx}>
              <div className="col-lg-3 col-md-4 col-sm-6 px-0">
                <article
                  className="m-1 py-1 bg-white border rounded d-flex flex-column h-300"
                  aria-label={`Education credential ${aria_label}`}
                >
                  {certificate_url ? (
                    <a
                      href={certificate_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-decoration-none text-reset"
                    >
                      <Course
                        item_style={item_style}
                        course_summary={course_summary}
                        institution={institution}
                        course_title={course_title}
                      />
                    </a>
                  ) : (
                    <Course
                      item_style={item_style}
                      course_summary={course_summary}
                      institution={institution}
                      course_title={course_title}
                    />
                  )}
                </article>
              </div>
            </React.Fragment>
          )
        })}
      </div>
    </section>
  )
}
