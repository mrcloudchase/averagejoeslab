import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  icon: string;
  description: ReactNode;
  link?: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: '🔬 Open Research',
    icon: '🔬',
    description: (
      <>
        Conduct meaningful research outside traditional academic institutions.
        No gatekeeping, no barriers - just pure scientific curiosity and collaboration.
      </>
    ),
    link: '/docs/intro',
  },
  {
    title: '🤝 Community Driven',
    icon: '🤝',
    description: (
      <>
        Join a global community of citizen researchers. Collaborate, learn, and
        contribute to projects that advance human knowledge.
      </>
    ),
    link: 'https://discord.gg/averagejoeslab',
  },
  {
    title: '📚 Democratized Knowledge',
    icon: '📚',
    description: (
      <>
        All research is open access and freely available. We believe knowledge
        should be accessible to everyone, not locked behind paywalls.
      </>
    ),
    link: '/about',
  },
];

function Feature({title, icon, description, link}: FeatureItem) {
  const cardContent = (
    <>
      <div className="text--center padding-horiz--md research-card-content">
        <Heading as="h3" className="text-gradient">{title}</Heading>
        <p>{description}</p>
        <div className="button button--primary button--sm" style={{marginTop: '1rem'}}>
          {link === '/docs/intro' ? 'Start Research Path →' : 
           link?.startsWith('http') ? 'Join Community →' : 
           link === '/about' ? 'Learn About Us →' : 'Learn More →'}
        </div>
      </div>
    </>
  );

  return (
    <div className={clsx('col col--4')}>
      {link ? (
        link.startsWith('http') ? (
          <a 
            href={link}
            className="research-feature-card research-feature-card--clickable"
            style={{textDecoration: 'none', color: 'inherit'}}
            target="_blank"
            rel="noopener noreferrer"
          >
            {cardContent}
          </a>
        ) : (
          <Link 
            to={link}
            className="research-feature-card research-feature-card--clickable"
            style={{textDecoration: 'none', color: 'inherit'}}
          >
            {cardContent}
          </Link>
        )
      ) : (
        <div className="research-feature-card">
          {cardContent}
        </div>
      )}
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        {/* Mission Statement - Prominent like EleutherAI */}
        <div className="text--center margin-bottom--xl">
          <p style={{
            fontSize: '1.5rem',
            maxWidth: '900px',
            margin: '0 auto 3rem auto',
            color: 'var(--ifm-color-content)',
            lineHeight: '1.6',
            fontWeight: '400'
          }}>
            We believe enabling broader participation and open science is key to increase transparency 
            and reduce potential harms from emerging research technologies.
          </p>
        </div>

        {/* Featured Learning Path */}
        <div className="margin-bottom--xl">
          <div className="text--center margin-bottom--lg">
            <Heading as="h2" className="text-gradient">
              🎓 Research Engineering Learning Path
            </Heading>
            <p className="hero__subtitle" style={{color: 'var(--ifm-color-content-secondary)', marginBottom: '2rem'}}>
              Your 16-week journey from curious beginner to contributing researcher
            </p>
          </div>
          
          <div className="row">
            <div className="col col--8 col--offset-2">
              <div className="research-path-featured" style={{
                background: 'var(--gradient-subtle)',
                border: '1px solid var(--ifm-color-emphasis-200)',
                borderRadius: 'var(--ifm-card-border-radius)',
                padding: '3rem',
                textAlign: 'center'
              }}>
                <Heading as="h3" style={{marginBottom: '1.5rem'}}>Start Your Research Journey Today</Heading>
                <p style={{fontSize: '1.1rem', marginBottom: '2rem', color: 'var(--ifm-color-content-secondary)'}}>
                  Our comprehensive program takes you from research foundations to community leadership. 
                  No PhD required - just curiosity and dedication.
                </p>
                <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'}}>
                  <Link 
                    to="/docs/intro" 
                    className="button button--primary button--lg"
                  >
                    Begin Learning Path →
                  </Link>
                  <Link 
                    to="/about" 
                    className="button button--secondary button--lg"
                  >
                    Learn More About Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Access Cards */}
        <div className="text--center margin-bottom--lg">
          <Heading as="h2" className="text-gradient">
            🚀 Get Involved
          </Heading>
          <p className="hero__subtitle" style={{color: 'var(--ifm-color-content-secondary)'}}>
            Multiple ways to participate in democratized research
          </p>
        </div>
        <div className="row margin-bottom--xl">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>

        {/* Research Focus Areas - Detailed like EleutherAI */}
        <div className="margin-top--xl">
          <div className="text--center margin-bottom--xl">
            <Heading as="h2" className="text-gradient">
              Research Focus Areas
            </Heading>
          </div>

          {/* Democratized Research Methods */}
          <div className="margin-bottom--xl">
            <div className="row">
              <div className="col col--12">
                <Heading as="h3" style={{marginBottom: '1rem'}}>Democratized Research Methods</Heading>
                <p style={{fontSize: '1.1rem', lineHeight: '1.7', color: 'var(--ifm-color-content-secondary)', marginBottom: '1.5rem'}}>
                  We're developing new methodologies that make research accessible to independent researchers and citizen scientists. 
                  Our approach breaks down traditional barriers by creating frameworks that don't require institutional affiliation 
                  or expensive resources. We focus on reproducible, transparent methods that can be peer-reviewed by the community.
                </p>
              </div>
            </div>
          </div>

          {/* Community-Driven Peer Review */}
          <div className="margin-bottom--xl">
            <div className="row">
              <div className="col col--12">
                <Heading as="h3" style={{marginBottom: '1rem'}}>Community-Driven Peer Review</Heading>
                <p style={{fontSize: '1.1rem', lineHeight: '1.7', color: 'var(--ifm-color-content-secondary)', marginBottom: '1.5rem'}}>
                  One of our core innovations is reimagining peer review for the modern age. Instead of relying on gatekeepers, 
                  we use community-driven review processes that value merit over credentials. Our system ensures quality while 
                  remaining accessible to researchers outside traditional academic institutions.
                </p>
              </div>
            </div>
          </div>

          {/* Open AI Research */}
          <div className="margin-bottom--xl">
            <div className="row">
              <div className="col col--12">
                <Heading as="h3" style={{marginBottom: '1rem'}}>Open AI Research</Heading>
                <p style={{fontSize: '1.1rem', lineHeight: '1.7', color: 'var(--ifm-color-content-secondary)', marginBottom: '1.5rem'}}>
                  We believe AI research should be accessible to everyone, not just large corporations and elite institutions. 
                  Our community works on developing ethical AI methodologies, creating open-source tools, and ensuring that 
                  AI development benefits humanity as a whole. We focus on transparency, safety, and democratized access to AI capabilities.
                </p>
              </div>
            </div>
          </div>

          {/* Citizen Science Initiatives */}
          <div className="margin-bottom--xl">
            <div className="row">
              <div className="col col--12">
                <Heading as="h3" style={{marginBottom: '1rem'}}>Citizen Science Initiatives</Heading>
                <p style={{fontSize: '1.1rem', lineHeight: '1.7', color: 'var(--ifm-color-content-secondary)', marginBottom: '1.5rem'}}>
                  Our citizen science projects demonstrate that meaningful research can be conducted by anyone with curiosity and dedication. 
                  We provide the tools, mentorship, and community support needed for independent researchers to make real contributions 
                  to human knowledge. From data collection to analysis, we're proving that science belongs to everyone.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Community Highlights */}
        <div className="margin-top--xl">
          <div className="text--center margin-bottom--lg">
            <Heading as="h2" className="text-gradient">
              Community Highlights
            </Heading>
            <p className="hero__subtitle" style={{color: 'var(--ifm-color-content-secondary)'}}>
              Real researchers making real impact
            </p>
          </div>
          <div className="row">
            <div className="col col--4">
              <div style={{
                background: 'var(--gradient-subtle)',
                border: '1px solid var(--ifm-color-emphasis-200)',
                borderRadius: 'var(--ifm-card-border-radius)',
                padding: '2rem',
                height: '100%'
              }}>
                <h4>Active Researchers</h4>
                <p style={{fontSize: '2rem', fontWeight: 'bold', color: 'var(--ifm-color-primary)', margin: '1rem 0'}}>50+</p>
                <p>Community members actively contributing to research projects</p>
              </div>
            </div>
            <div className="col col--4">
              <div style={{
                background: 'var(--gradient-subtle)',
                border: '1px solid var(--ifm-color-emphasis-200)',
                borderRadius: 'var(--ifm-card-border-radius)',
                padding: '2rem',
                height: '100%'
              }}>
                <h4>Open Publications</h4>
                <p style={{fontSize: '2rem', fontWeight: 'bold', color: 'var(--ifm-color-primary)', margin: '1rem 0'}}>12</p>
                <p>Research papers published with full open access</p>
              </div>
            </div>
            <div className="col col--4">
              <div style={{
                background: 'var(--gradient-subtle)',
                border: '1px solid var(--ifm-color-emphasis-200)',
                borderRadius: 'var(--ifm-card-border-radius)',
                padding: '2rem',
                height: '100%'
              }}>
                <h4>Learning Path Graduates</h4>
                <p style={{fontSize: '2rem', fontWeight: 'bold', color: 'var(--ifm-color-primary)', margin: '1rem 0'}}>25</p>
                <p>Researchers who completed our 16-week program</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}