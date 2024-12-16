import React from 'react'
import PropTypes from 'prop-types'
import Loading from '../../components/Loading'

const SpecialtyColumn = (props) => {
  const iconClass = 'fa fa-3x ' + props.icon

  return (
    <React.Fragment>
      <div className="col-lg-4 col-md-6 px-0">
        <div className="p-2">
          <h4>{props.title}</h4>
          <div className="row m-0">
            <div className="col-2 m-1 p-0 specialties-banner-icon">
              <i className={iconClass}></i>
            </div>
            <div className="col text-justify specialties-banner-text">
              <p>{props.description}</p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

const SpecialtiesBanner = (props) => {
  return (
    <React.Fragment>
      {props.isLoading ? (
        <Loading />
      ) : (
        <div className="row specialties-banner mx-3 my-5 p-3">
          <SpecialtyColumn
            title="INFRASTRUCTURE"
            icon="fa-cog"
            description="Designing infrastructure environments for machine learning projects is quite different from most web services and apps. High data throughput and horizontal scalability are critical. Moreover, providers like AWS are constantly evolving and introducing new services for extremely large data sets, analytics and map-reduce parallelism."
          />

          <SpecialtyColumn
            title="DATA"
            icon="fa-database"
            description="Designing data sets for machine learning projects is rapidly evolving into its own trade craft. Beyond traditional data QC and analysis and database skills you also need intuition into how algorithms work (or don't work) and how changing/increasing learning and cross-validation sets can move a project forward."
          />

          <SpecialtyColumn
            title="ALGORITHMS"
            icon="fa-github-alt"
            description="The good news is that few if any of the algorithms currently in use are new. The bad news is that understanding when to use each and their respective strengths and weaknesses is an ongoing and fast-evolving process."
          />
        </div>
      )}
    </React.Fragment>
  )
}

SpecialtiesBanner.propTypes = {
  isLoading: PropTypes.bool.isRequired,
}

SpecialtyColumn.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

export default SpecialtiesBanner
