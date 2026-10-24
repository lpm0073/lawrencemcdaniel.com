import React from 'react'
import { Helmet } from 'react-helmet'
import PageMeta from '../../components/PageMeta'

import BlankSpace from '../../components/blankSpace/Component'
import RenderPageTitle from '../../components/pagetitle/pageTitleComponent'
import { gsdArticle } from '../../shared/seo/gsdArticle'
import { gsdGraph } from '../../shared/seo/gsdGraph'
import {
  gsdPersonLawrenceMcDaniel,
  hasOccupation,
} from '../../shared/seo/gsdPersonLawrence'
import { APP_CONFIG } from '../../shared/constants'
import SmarterChat from './SmarterChat'
import {
  SMARTER_DEVELOPER_BOT,
  SMARTER_IDEAS,
  SMARTER_REPOS,
  SMARTER_URLS,
  type SmarterIdea,
} from './content'

import './styles.css'

const description =
  'Lawrence McDaniel is the author and principal maintainer of The Smarter Project, ' +
  'an open source platform for LLM applications that he has built since March 2023 ' +
  'and that runs in production at University of British Columbia.'

/** The project in numbers. The counts are rounded down, so they stay true as it grows. */
const STATS = [
  { value: '2023', text: 'Started, in March' },
  { value: '~500K', text: 'Lines of code across smarter-sh' },
  { value: '7,600+', text: 'Commits to the platform' },
  { value: '700+', text: 'Releases' },
  { value: '24', text: 'Public repositories' },
  { value: 'UBC', text: 'In production since January 2026' },
]

const ExternalLink = ({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
)

const IdeaCard = ({ idea }: { idea: SmarterIdea }) => (
  <div className="col">
    <article className="smarter-idea h-100" aria-labelledby={'idea-' + idea.key}>
      <div className="smarter-idea-visual">
        {idea.image ? (
          <img src={idea.image.src} alt={idea.image.alt} loading="lazy" />
        ) : (
          <pre className="smarter-idea-code" aria-label="Code example">
            <code>{idea.code}</code>
          </pre>
        )}
      </div>
      <div className="smarter-idea-body">
        <h4 id={'idea-' + idea.key}>{idea.title}</h4>
        <p>{idea.summary}</p>
        <nav className="smarter-idea-links" aria-label={idea.title + ' links'}>
          {idea.links.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </article>
  </div>
)

export default function SmarterPage() {
  /* Google Structured Data */
  const slug = 'smarter'
  const webpageName = 'The Smarter Project'
  const primaryImageUrl = SMARTER_URLS.workbenchScreenshot
  const pageType = ''
  const relatedLink = SMARTER_URLS.site
  const person = { ...gsdPersonLawrenceMcDaniel, ...{ hasOccupation: hasOccupation } }
  const graphExtraData = [person, gsdArticle(slug, description)]

  return (
    <React.Fragment>
      <PageMeta
        path="/smarter"
        description={description}
        image={APP_CONFIG.static.images.share.smarter}
      />
      <Helmet>
        <meta
          name="keywords"
          content="Lawrence McDaniel, The Smarter Project, Smarter, open source, Django, React, Pydantic, LLM, Claude Code, University of British Columbia"
        />
        <script type="application/ld+json">
          {JSON.stringify(
            gsdGraph(
              slug,
              webpageName,
              description,
              primaryImageUrl,
              pageType,
              relatedLink,
              graphExtraData
            )
          )}
        </script>
      </Helmet>
      <main className="site-page smarter-page" aria-label="The Smarter Project">
        <RenderPageTitle
          theme="light"
          icon="fa-rocket"
          title="THE SMARTER"
          boxed_title="PROJECT"
        />

        <section className="row smarter-intro" aria-label="Introduction">
          <div className="col-lg-6">
            <h4 className="mb-3">
              My primary project, and my first large open source work as a solo author
            </h4>
            <p>
              <ExternalLink href={SMARTER_URLS.site}>Smarter</ExternalLink> is an open
              source platform for building and running LLM applications. Its own site
              explains what it does; this page is about building it.
            </p>
            <p>
              It started in March 2023, while I was teaching AI to non-programmers at
              University of British Columbia, as a small experiment with the OpenAI API
              that I put online as
              <BlankSpace />
              <ExternalLink href={SMARTER_URLS.firstPrototype}>
                openai.lawrencemcdaniel.com
              </ExternalLink>
              . It kept growing into a platform. The first MVP shipped in October 2025,
              and since January 2026 Smarter has run in production at UBC, where students
              use it in AI courses. The
              <BlankSpace />
              <ExternalLink href={SMARTER_URLS.about}>origin story</ExternalLink> is on
              smarter.sh.
            </p>
          </div>
          <figure className="col-lg-6 smarter-hero-figure">
            <img
              src={SMARTER_URLS.workbenchScreenshot}
              alt="The Smarter web console's prompt workbench, showing a chat with a weather chatbot and its tool calls"
              className="img-fluid"
            />
            <figcaption>The web console’s prompt workbench.</figcaption>
          </figure>
        </section>

        <section className="smarter-stats" aria-label="The project in numbers">
          <div className="row row-cols-2 row-cols-md-3 row-cols-lg-6 g-0">
            {STATS.map((stat) => (
              <div key={stat.text} className="col smarter-stat">
                <div className="smarter-stat-value">{stat.value}</div>
                <div className="smarter-stat-text">{stat.text}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="row smarter-story" aria-labelledby="smarter-story-heading">
          <div className="col-lg-9">
            <h3 id="smarter-story-heading">A public test of my work</h3>
            <p>
              I’ve worked in open source since 2010, but Smarter is the first large
              codebase that I designed and wrote on my own: about half a million lines
              across the
              <BlankSpace />
              <ExternalLink href={SMARTER_URLS.github}>smarter-sh</ExternalLink>
              <BlankSpace />
              repositories. That covers a Django and Celery platform, a React web console,
              a Go command line tool, SDKs in Python, Node.js and Go, a VS Code extension,
              chat plugins for WordPress, Drupal and Shopify, the documentation, and the
              Kubernetes infrastructure on AWS that runs it all.
            </p>
            <p>
              That makes it a fair test of what I can do as a full stack developer and
              architect. The architecture and design decisions are mine, from the data
              model to the release pipeline, and they are written down in more than thirty
              <BlankSpace />
              <ExternalLink href={SMARTER_URLS.adrs}>decision records</ExternalLink>. The
              code is public, so anyone can check it.
            </p>
          </div>
        </section>

        <section className="smarter-ideas" aria-labelledby="smarter-ideas-heading">
          <h3 id="smarter-ideas-heading">Ideas that started here</h3>
          <p className="smarter-section-lead">
            A few of Smarter’s solutions are my own. Each one has a full write-up on the
            blog, in the docs and in the code, so here is just enough to show what it is.
          </p>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 justify-content-center">
            {SMARTER_IDEAS.map((idea) => (
              <IdeaCard key={idea.key} idea={idea} />
            ))}
          </div>
        </section>

        <section
          className="row smarter-chat-section"
          aria-labelledby="smarter-chat-heading"
        >
          <div className="col-lg-5">
            <h3 id="smarter-chat-heading">
              Ask {SMARTER_DEVELOPER_BOT.assistant} about the code
            </h3>
            <p>
              {SMARTER_DEVELOPER_BOT.assistant}, the {SMARTER_DEVELOPER_BOT.appName}, is a
              Smarter chatbot running in production on UBC’s Smarter platform. It knows
              the project’s code and documentation, so it can explain hard technical
              questions about any of the ideas above, and show where they live in the
              code.
            </p>
            <p>
              It is declared in one
              <BlankSpace />
              <ExternalLink href={SMARTER_DEVELOPER_BOT.manifest}>
                YAML manifest
              </ExternalLink>
              , and embedded in this page with Smarter Chat, the project’s React chat
              component.
            </p>
          </div>
          <div className="col-lg-7">
            <SmarterChat bot={SMARTER_DEVELOPER_BOT} />
          </div>
        </section>

        <section className="smarter-repos" aria-labelledby="smarter-repos-heading">
          <h3 id="smarter-repos-heading">The repositories</h3>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3">
            {SMARTER_REPOS.map((group) => (
              <div key={group.name} className="col">
                <h5>{group.name}</h5>
                <ul className="list-unstyled">
                  {group.repos.map((repo) => (
                    <li key={repo}>
                      <a
                        href={SMARTER_URLS.github + '/' + repo}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fa fa-github" aria-hidden="true"></i> {repo}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <nav className="smarter-more" aria-label="More about Smarter">
            <a href={SMARTER_URLS.site} target="_blank" rel="noopener noreferrer">
              smarter.sh
            </a>
            <a href={SMARTER_URLS.docs} target="_blank" rel="noopener noreferrer">
              docs.smarter.sh
            </a>
            <a href={SMARTER_URLS.blog} target="_blank" rel="noopener noreferrer">
              blog.smarter.sh
            </a>
            <a href={SMARTER_URLS.github} target="_blank" rel="noopener noreferrer">
              github.com/smarter-sh
            </a>
          </nav>
        </section>
      </main>
    </React.Fragment>
  )
}
