import type {ReactNode} from 'react';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        {/* Mission Statement */}
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

        {/* Primary Learning Path - Single Prominent Section */}
        <div className="text--center">
          <div className="row">
            <div className="col col--8 col--offset-2">
              <div style={{
                background: 'var(--gradient-subtle)',
                border: '1px solid var(--ifm-color-emphasis-200)',
                borderRadius: 'var(--ifm-card-border-radius)',
                padding: '4rem 3rem',
                textAlign: 'center'
              }}>
                <Heading as="h2" className="text-gradient" style={{marginBottom: '1rem', fontSize: '2.5rem'}}>
                  🎓 Research Engineering Learning Path
                </Heading>
                <p style={{fontSize: '1.2rem', marginBottom: '1.5rem', color: 'var(--ifm-color-content-secondary)'}}>
                  Your 16-week journey from curious beginner to contributing researcher
                </p>
                <p style={{fontSize: '1.1rem', marginBottom: '3rem', color: 'var(--ifm-color-content-secondary)', maxWidth: '600px', margin: '0 auto 3rem auto'}}>
                  Our comprehensive program takes you from research foundations to community leadership. 
                  No PhD required - just curiosity and dedication.
                </p>
                <div style={{display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap'}}>
                  <Link 
                    to="/docs/intro" 
                    className="button button--primary button--lg"
                    style={{fontSize: '1.1rem', padding: '0.8rem 2rem'}}
                  >
                    Begin Learning Path →
                  </Link>
                  <Link 
                    to="/about" 
                    className="button button--secondary button--lg"
                    style={{fontSize: '1.1rem', padding: '0.8rem 2rem'}}
                  >
                    Learn About Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}