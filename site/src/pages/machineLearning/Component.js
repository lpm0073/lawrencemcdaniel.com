import React from "react";
import RenderPageTitle from "../../components/pagetitle/pageTitleComponent";
import SpecialtiesBanner from "./machinelearningBanner";
import { Helmet } from "react-helmet";
import { gsdGraph } from "../../shared/seo/gsdGraph";
import { gsdPersonLawrenceMcDaniel } from "../../shared/seo/gsdPersonLawrence";
import { gsdArticle } from "../../shared/seo/gsdArticle";
import { baseTitle } from "../../shared/seo/gsdCommon";
import { URL_SITE } from "../../shared/constants";

import "./styles.css";

const MachineLearning = (props) => {
  /* Google Structured Data */
  const slug = "machine-learning";
  const webpageName = "Machine Learning";
  const webpageDescription =
    "Machine learning and algorithms expert with experience using regression, nueral networks, support vector machines, anomoly detection, recommender systems, and unsupervised learning";
  const primaryImageUrl =
    "https://cdn.lawrencemcdaniel.com/wp-content/uploads/2020/06/05220349/machine-learning-certificate.jpg";
  const pageType = "BlogPosting";
  const relatedLink = "";
  const graphExtraData = [
    gsdPersonLawrenceMcDaniel,
    gsdArticle(slug, webpageName),
  ];

  return (
    <React.Fragment>
      <Helmet>
        <link rel="canonical" href={URL_SITE + "/machine-learning/"} />
        <meta
          name="description"
          content="Machine learning and algorithms expert with experience using regression, nueral networks, support vector machines, anomoly detection, recommender systems, and unsupervised learning"
        />
        <meta
          property="og:description"
          content="Machine learning and algorithms expert with experience using regression, nueral networks, support vector machines, anomoly detection, recommender systems, and unsupervised learning"
        />
        <meta
          name="keywords"
          content="Lawrence McDaniel, machine learning, algorithms, regression, nueral networks, support vector machines, anomoly detection, recommender systems, unsupervised learning"
        />
        <script type="application/ld+json">
          {JSON.stringify(
            gsdGraph(
              slug,
              webpageName,
              webpageDescription,
              primaryImageUrl,
              pageType,
              relatedLink,
              graphExtraData
            )
          )}
        </script>
      </Helmet>
      <div
        key="machine-learning-page"
        className="site-page machine-learning-page"
      >
        <RenderPageTitle
          theme="light"
          icon="fa-magic"
          title="MACHINE"
          boxed_title="LEARNING"
        />
        <div className="row mt-5 pl-2">
          <div className="column-left col-lg-4 col-md-6 col-sm-12 hide-medium">
            <img
              src="https://cdn.lawrencemcdaniel.com/wp-content/uploads/2020/06/05220017/lawrence-mcdaniel-portrait.jpg"
              alt="Lawrence McDaniel"
            />
            <div className="name-block mt-1 text-center">
              <h4 className="my-0">Lawrence McDaniel</h4>
              <h5 className="my-0">{baseTitle}</h5>
            </div>
          </div>
          <div className="col-lg-8 col-md-12 m-0 p-0">
            <div className="row ml-0 mr-0 pr-2">
              <div className="col-lg-6 col-md-12">
                <div>
                  <h4 className="mb-3">
                    You’ll be amazed by what’s become possible in the last three
                    years.
                  </h4>
                  <div className="text-justify">
                    <p>
                      Hi, I’m Lawrence McDaniel and I’m a technology freelancer.
                      The rapid evolution of IT infrastructure cloud services
                      combined with the sudden and staggering accumulation of
                      electronic data has catalyzed an explosion of applied
                      science and innovation for many ideas that only a few
                      years ago were still not much more than theory. The math
                      hasn’t gotten any easier, and IT infrastructure has
                      actually become a lot more complex, however, If you
                      understand both of these disciplines and you also are a
                      halfway decent software engineer then the sky is the limit
                      in terms of what you can do.
                    </p>
                  </div>
                </div>
              </div>
              <div className="column-right col-lg-6 col-md-12">
                <a href="https://www.coursera.org/account/accomplishments/verify/2MVW9YRMFYC9?utm_source=link&utm_campaign=copybutton_certificate&utm_product=course">
                  <img
                    src="https://cdn.lawrencemcdaniel.com/wp-content/uploads/2020/06/05220349/machine-learning-certificate.jpg"
                    alt="Machine Learning Certification"
                  />
                  <img
                    className="mt-3"
                    src="https://cdn.lawrencemcdaniel.com/wp-content/uploads/2016/12/22195700/machine-learning-grade.png"
                    alt="Machine Learning Grade Received"
                  />
                </a>
              </div>
            </div>
            <div className="row ml-0 mr-0 pr-2">
              <div className="col-12 mt-3">
                <p className="text-justify">
                  Fortunately some of the greatest minds on earth, like{" "}
                  <a
                    href="http://www.andrewng.org"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Dr. Andrew Ng
                  </a>{" "}
                  at Stanford University for example, have paved the way for
                  engineers like me to implement incredible machine learning and
                  artificial intelligence systems that leverage big data sets to
                  attack problem spaces like computer vision, pattern
                  recognition in highly dynamic environments (like&nbsp;debt,
                  equities and commodities secondary markets for example), big
                  data classification and insight problems, and robotics.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SpecialtiesBanner />
        <div className="row mx-5">
          <div className="col">
            <table class="table table-borderless">
              <tbody>
                <tr>
                  <td className="text-right">
                    <span className="fa fa-codepen fa-2x"></span>
                  </td>
                  <th scope="row">Regression</th>
                  <td>
                    Multi-variable Linear, Polynomial and Logistic regression
                    models leveraging a plethora of cost optimization strategies
                  </td>
                </tr>

                <tr>
                  <td className="text-right">
                    <span className="fa fa-code-fork fa-2x"></span>
                  </td>
                  <th scope="row">Neural Networks</th>
                  <td>
                    For image processing, compression, robotics, OCR and other
                    non-linear problem spaces.
                  </td>
                </tr>

                <tr>
                  <td className="text-right">
                    <span className="fa fa-sitemap fa-2x"></span>
                  </td>
                  <th scope="row">Support Vector Machines</th>
                  <td>
                    For classification problems in non-linear environments like
                    text categorization, image sorting and hand-written
                    character recognition
                  </td>
                </tr>

                <tr>
                  <td className="text-right">
                    <span className="fa fa-search fa-2x"></span>
                  </td>
                  <th scope="row">Anomaly Detection</th>
                  <td>
                    Supervised learning algorithms to identify potential service
                    failures, factory defects and other types of outliers in
                    highly dynamic and non-linear environments.
                  </td>
                </tr>

                <tr>
                  <td className="text-right">
                    <span className="fa fa-object-group fa-2x"></span>
                  </td>
                  <th scope="row">Recommender Systems</th>
                  <td>
                    Content-based recommendation engines e-commerce
                    optimizations and other predictive customer recommendations
                  </td>
                </tr>

                <tr>
                  <td className="text-right">
                    <span className="fa fa-magic fa-2x"></span>
                  </td>
                  <th scope="row">Unsupervised Learning</th>
                  <td>
                    Clustering and K-means algorithms for applications like
                    market segmentation, social network analysis and IT
                    infrastructure management
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MachineLearning;
