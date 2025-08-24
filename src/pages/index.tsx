import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <Heading as="h1" className={styles.heroTitle}>
              {siteConfig.title}
            </Heading>
            <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
            <div className={styles.buttons}>
              <Link
                className="button button--primary button--lg"
                to="/docs/intro">
                Start Research Path 🔬
              </Link>
              <a
                className="button button--secondary button--lg"
                href="https://discord.gg/averagejoeslab"
                target="_blank"
                rel="noopener noreferrer">
                Join Community
              </a>
            </div>
            <div className={styles.heroStats}>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>Open</div>
                <div className={styles.statLabel}>Research</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>100%</div>
                <div className={styles.statLabel}>Free Access</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>Global</div>
                <div className={styles.statLabel}>Community</div>
              </div>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.floatingElements}>
              <div className={styles.floatingElement}>🔬</div>
              <div className={styles.floatingElement}>🤖</div>
              <div className={styles.floatingElement}>📊</div>
              <div className={styles.floatingElement}>🌐</div>
              <div className={styles.floatingElement}>🧠</div>
              <div className={styles.floatingElement}>⚡</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - Democratizing Research`}
      description="Open research laboratory for citizen researchers. Democratizing research and pulling it out of traditional academia.">
      <HomepageHeader />
      <main>
        {/* Mission Statement Section */}
        <section className={styles.missionSection}>
          <div className="container">
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
      </main>
    </Layout>
  );
}