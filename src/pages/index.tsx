import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
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
              <Link
                className="button button--secondary button--lg"
                to="/about">
                Learn About Us
              </Link>
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
        <HomepageFeatures />
        
        {/* Call to Action Section */}
        <section className={styles.ctaSection}>
          <div className="container">
            <div className="text--center">
              <Heading as="h2" className="text-gradient">
                Ready to Start Your Research Journey?
              </Heading>
              <p style={{
                fontSize: '1.2rem',
                color: 'var(--ifm-color-content-secondary)',
                maxWidth: '600px',
                margin: '0 auto 2rem'
              }}>
                Join thousands of citizen researchers who are advancing human knowledge 
                outside traditional institutions.
              </p>
              <div className={styles.ctaButtons}>
                <Link
                  className="button button--primary button--lg"
                  to="https://discord.gg/averagejoeslab">
                  Join Discord Community
                </Link>
                <Link
                  className="button button--secondary button--lg"
                  to="/docs/intro">
                  View Research Path
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}