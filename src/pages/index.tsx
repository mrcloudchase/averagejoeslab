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
            <Heading as="h1" className="hero-title hero-title--large">
              {siteConfig.title}
            </Heading>
            <p className="hero-subtitle hero-subtitle--homepage">{siteConfig.tagline}</p>
            <div className={styles.buttons}>
              <Link
                className="button button--primary button--lg"
                to="/docs/intro">
                Start Research Path
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
                <div className="stat-number">Open</div>
                <div className="stat-label stat-label--homepage">Research</div>
              </div>
              <div className={styles.statItem}>
                <div className="stat-number">100%</div>
                <div className="stat-label stat-label--homepage">Free Access</div>
              </div>
              <div className={styles.statItem}>
                <div className="stat-number">Global</div>
                <div className="stat-label stat-label--homepage">Community</div>
              </div>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.floatingElements}>
              <div className={styles.floatingElement}></div>
              <div className={styles.floatingElement}></div>
              <div className={styles.floatingElement}></div>
              <div className={styles.floatingElement}></div>
              <div className={styles.floatingElement}></div>
              <div className={styles.floatingElement}></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function FounderStory() {
  return (
    <section className={styles.founderSection}>
      <div className="container">
        <div className="row">
          <div className="col col--12">
            <div className="text--center margin-bottom--lg">
              <Heading as="h2" className="text-gradient">
                Our Story
              </Heading>
            </div>
            <div className={styles.founderContent}>
              <div className="row">
                <div className="col col--10 col--offset-1">
                  <div className={styles.founderCard}>
                    <div className={styles.founderText}>
                      <div className={styles.founderAttribution}>
                        <strong>Chase Dovey</strong>, Founder & Head Researcher
                      </div>
                      <p className={styles.founderDescription}>
                        I founded Average Joes Lab because I saw how traditional academic pathways often limit who gets to contribute to scientific discovery. 
                        My journey is a bit unconventional: I'm entirely self-taught, with a deep love for learning that led me to explore computer science, 
                        physics, and beyond, all on my own. I never worked in academia, but I've always believed that curiosity and a passion for knowledge 
                        are more important than formal credentials.
                      </p>
                      <p className={styles.founderDescription}>
                        Average Joes Lab was born out of this belief and the desire to create a space where anyone, regardless of their background, 
                        can engage in meaningful research. We aim to break down the barriers that have traditionally kept brilliant minds out of the 
                        conversation and instead foster a community that values intellectual curiosity and scientific rigor above all else.
                      </p>
                      <p className={styles.founderDescription}>
                        Our mission is simple: to empower ordinary people to do extraordinary things in the world of science. We provide the tools, 
                        resources, and community support needed to explore new ideas, validate them through rigorous methods, and ultimately contribute 
                        to the advancement of human knowledge. That's the driving force behind Average Joes Lab, and I'm excited to see what we can achieve together.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MissionValues() {
  const values = [
    {
      title: 'Accessibility First',
      description: 'Research should be accessible to anyone with curiosity and dedication, regardless of their educational background or institutional affiliation.'
    },
    {
      title: 'Open by Default',
      description: 'All our research, methodologies, and findings are open-source and freely available to the global community.'
    },
    {
      title: 'Merit-Based',
      description: 'We evaluate ideas and contributions based on their quality and potential impact, not on the credentials of their authors.'
    },
    {
      title: 'Collaborative Spirit',
      description: 'The best research happens when diverse minds work together, bringing different perspectives and experiences to complex problems.'
    }
  ];

  return (
    <section className={styles.valuesSection} id="mission">
      <div className="container">
        <div className="text--center margin-bottom--xl">
          <Heading as="h2" className="text-gradient">
            Our Mission & Values
          </Heading>
          <p className={styles.missionStatement}>
            We believe that groundbreaking research can and should be conducted by ordinary citizens - 
            the "average joes" of the world. Research has become increasingly gatekept by institutions, 
            creating barriers that prevent brilliant minds from contributing to human knowledge.
          </p>
        </div>
        <div className="row">
          {values.map((value, idx) => (
            <div key={idx} className="col col--6 margin-bottom--lg">
              <div className={styles.valueCard}>
                <Heading as="h3" className={styles.valueTitle}>
                  {value.title}
                </Heading>
                <p className={styles.valueDescription}>
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhatWeDo() {
  const initiatives = [
    {
      title: 'Open Research Platform',
      items: [
        'Citizen-led research projects in AI, ML, and emerging technologies',
        'Collaborative research environment where anyone can contribute',
        'Open-source methodology with transparent processes and findings',
        'Community-driven peer review that values merit over credentials'
      ]
    },
    {
      title: 'Research Areas',
      items: [
        'Artificial Intelligence & Machine Learning',
        'Emerging Technologies',
        'Open Science Methodologies',
        'Democratized Research Tools',
        'Citizen Science Initiatives'
      ]
    },
    {
      title: 'Community Support',
      items: [
        'Research mentorship from experienced practitioners',
        'Collaborative project matching to connect researchers',
        'Resource sharing including datasets, tools, and methodologies',
        'Publication support for independent researchers'
      ]
    }
  ];

  return (
    <section className={styles.whatWeDoSection}>
      <div className="container">
        <div className="text--center margin-bottom--xl">
          <Heading as="h2" className="text-gradient">
            What We Do
          </Heading>
        </div>
        <div className="row">
          {initiatives.map((initiative, idx) => (
            <div key={idx} className="col col--4 margin-bottom--lg">
              <div className={styles.initiativeCard}>
                <Heading as="h3" className={styles.initiativeTitle}>
                  {initiative.title}
                </Heading>
                <ul className={styles.initiativeList}>
                  {initiative.items.map((item, itemIdx) => (
                    <li key={itemIdx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CommunitySection() {
  return (
    <section className={styles.communitySection}>
      <div className="container">
        <div className="text--center margin-bottom--xl">
          <Heading as="h2" className="text-gradient">
            Join Our Community
          </Heading>
          <p className={styles.communityDescription}>
            Average Joes Lab is a community of independent researchers, career changers, students, 
            professionals, and curious minds who want to contribute to human knowledge.
          </p>
        </div>
        <div className="row">
          <div className="col col--8 col--offset-2">
            <div className="cta-card">
              <Heading as="h3" style={{marginBottom: '1.5rem'}}>
                Ready to Start Your Research Journey?
              </Heading>
              <p style={{marginBottom: '2rem', fontSize: '1.1rem'}}>
                Whether you're an experienced researcher or just getting started, 
                there's a place for you in our community.
              </p>
              <div className="cta-buttons">
                <Link
                  className="button button--primary button--lg"
                  to="/docs/intro">
                  Start Learning Path
                </Link>
                <a
                  className="button button--secondary button--lg"
                  href="https://discord.gg/averagejoeslab"
                  target="_blank"
                  rel="noopener noreferrer">
                  Join Discord
                </a>
                <Link
                  className="button button--outline button--lg"
                  to="/internal-papers">
                  Browse Research
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
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
        <FounderStory />
        <MissionValues />
        <WhatWeDo />
        <CommunitySection />
      </main>
    </Layout>
  );
}