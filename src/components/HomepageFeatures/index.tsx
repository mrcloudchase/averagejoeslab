import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
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
  const content = (
    <div className="research-feature-card">
      <div className="text--center">
        <span className="research-feature-icon">{icon}</span>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3" className="text-gradient">{title}</Heading>
        <p>{description}</p>
        {link && (
          <a 
            href={link} 
            className="button button--primary button--sm"
            style={{marginTop: '1rem'}}
            {...(link.startsWith('http') && {
              target: '_blank',
              rel: 'noopener noreferrer'
            })}
          >
            {link.startsWith('http') ? 'Join Community →' : 
             link === '/docs/intro' ? 'Start Research Path →' :
             link === '/about' ? 'Learn About Us →' : 'Learn More →'}
          </a>
        )}
      </div>
    </div>
  );

  return (
    <div className={clsx('col col--4')}>
      {content}
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="text--center margin-bottom--xl">
          <Heading as="h2" className="text-gradient">
            🚀 Research Without Boundaries
          </Heading>
          <p className="hero__subtitle" style={{color: 'var(--ifm-color-content-secondary)'}}>
            Democratizing research for citizen scientists and independent researchers
          </p>
        </div>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
        
        {/* Mission Section */}
        <div className="margin-top--xl">
          <div className="row">
            <div className="col col--12">
              <div className="text--center bg-gradient-subtle" style={{
                padding: '3rem 2rem',
                borderRadius: 'var(--ifm-card-border-radius)',
                border: '1px solid rgba(44, 62, 80, 0.2)'
              }}>
                <Heading as="h2" className="text-gradient">
                  🎯 Our Mission
                </Heading>
                <p style={{
                  fontSize: '1.2rem',
                  maxWidth: '800px',
                  margin: '0 auto',
                  color: 'var(--ifm-color-content-secondary)',
                  lineHeight: '1.6'
                }}>
                  Average Joes Lab exists to democratize research and pull it out of the exclusive hands 
                  of traditional academia and corporations. We believe that groundbreaking research can 
                  and should be conducted by ordinary citizens - the "average joes" of the world.
                </p>
                <div className="margin-top--lg">
                  <a 
                    href="/about" 
                    className="button button--secondary button--lg"
                    style={{marginRight: '1rem'}}
                  >
                    Learn About Us
                  </a>
                  <a 
                    href="https://discord.gg/averagejoeslab" 
                    className="button button--primary button--lg"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Join Our Community
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Research Areas */}
        <div className="margin-top--xl">
          <div className="text--center margin-bottom--lg">
            <Heading as="h2" className="text-gradient">
              🔍 Research Areas
            </Heading>
          </div>
          <div className="row">
            <div className="col col--3">
              <div className="text--center">
                <div style={{fontSize: '2.5rem', marginBottom: '1rem'}}>🤖</div>
                <h4>AI & Machine Learning</h4>
                <p>Cutting-edge research in artificial intelligence and machine learning</p>
              </div>
            </div>
            <div className="col col--3">
              <div className="text--center">
                <div style={{fontSize: '2.5rem', marginBottom: '1rem'}}>🔬</div>
                <h4>Research Methods</h4>
                <p>Developing new methodologies for democratized research</p>
              </div>
            </div>
            <div className="col col--3">
              <div className="text--center">
                <div style={{fontSize: '2.5rem', marginBottom: '1rem'}}>🌐</div>
                <h4>Emerging Tech</h4>
                <p>Exploring the frontiers of technology and innovation</p>
              </div>
            </div>
            <div className="col col--3">
              <div className="text--center">
                <div style={{fontSize: '2.5rem', marginBottom: '1rem'}}>🏛️</div>
                <h4>Open Science</h4>
                <p>Advancing open access and collaborative research practices</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}