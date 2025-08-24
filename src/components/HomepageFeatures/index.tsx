import type {ReactNode} from 'react';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        {/* Hero Section - Learning Path + Discord */}
        <div className="text--center margin-bottom--xl">
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
                  <a 
                    href="https://discord.gg/averagejoeslab" 
                    className="button button--secondary button--lg"
                    style={{fontSize: '1.1rem', padding: '0.8rem 2rem'}}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Join Discord Community
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Statement Section */}
        <div className="text--center">
          <div className="row">
            <div className="col col--10 col--offset-1">
              <Heading as="h2" style={{marginBottom: '2rem', fontSize: '2rem', color: 'var(--ifm-color-content)'}}>
                Our Mission
              </Heading>
              <p style={{
                fontSize: '1.3rem',
                lineHeight: '1.6',
                color: 'var(--ifm-color-content)',
                fontWeight: '400',
                marginBottom: '2rem'
              }}>
                We believe enabling broader participation and open science is key to increase transparency 
                and reduce potential harms from emerging research technologies.
              </p>
              <p style={{
                fontSize: '1.1rem',
                lineHeight: '1.7',
                color: 'var(--ifm-color-content-secondary)',
                maxWidth: '800px',
                margin: '0 auto'
              }}>
                Join thousands of citizen researchers who are advancing human knowledge outside traditional institutions. 
                Together, we're democratizing research and making science accessible to everyone.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}