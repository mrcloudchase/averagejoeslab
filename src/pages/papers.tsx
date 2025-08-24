import type {ReactNode} from 'react';
import {useState} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './papers.module.css';

// Focus area tags
const FOCUS_AREAS = [
  { id: 'all', label: 'All Papers', color: '#6c757d' },
  { id: 'optimization', label: 'Optimization', color: '#007bff' },
  { id: 'behavioral', label: 'Behavioral', color: '#28a745' },
  { id: 'interpretability', label: 'Interpretability', color: '#ffc107' },
  { id: 'security', label: 'Security', color: '#dc3545' }
];

// Paper status types
const PAPER_STATUS = {
  published: { label: 'Published', color: '#28a745' },
  inReview: { label: 'In Review', color: '#ffc107' },
  inProgress: { label: 'In Progress', color: '#007bff' },
  proposed: { label: 'Proposed', color: '#6c757d' }
};

// Sample papers data (replace with real data later)
const PAPERS_DATA = [
  {
    id: 1,
    title: 'Democratizing AI Research Methodologies: A Framework for Citizen Scientists',
    authors: ['Chase Dovey', 'Community Contributors'],
    abstract: 'This paper presents a comprehensive framework for enabling citizen scientists to conduct meaningful AI research outside traditional academic institutions. We propose accessible methodologies that maintain scientific rigor while removing institutional barriers.',
    tags: ['optimization', 'behavioral'],
    status: 'inProgress',
    date: '2024-12-15',
    arxivId: null,
    githubRepo: 'https://github.com/mrcloudchase/democratizing-ai-research',
    doi: null
  },
  {
    id: 2,
    title: 'Interpretable Machine Learning for Independent Researchers',
    authors: ['Average Joes Lab Community'],
    abstract: 'An exploration of interpretability techniques that can be implemented by researchers without access to large computational resources. We focus on practical methods for understanding model behavior in resource-constrained environments.',
    tags: ['interpretability', 'optimization'],
    status: 'proposed',
    date: '2024-11-20',
    arxivId: null,
    githubRepo: null,
    doi: null
  },
  {
    id: 3,
    title: 'Security Considerations in Open Research Environments',
    authors: ['Security Research Group'],
    abstract: 'This paper examines security challenges and best practices for conducting research in open, collaborative environments. We address data protection, intellectual property, and ethical considerations for citizen researchers.',
    tags: ['security', 'behavioral'],
    status: 'inReview',
    date: '2024-10-05',
    arxivId: null,
    githubRepo: 'https://github.com/mrcloudchase/open-research-security',
    doi: null
  },
  {
    id: 4,
    title: 'Behavioral Analysis of Collaborative Research Networks',
    authors: ['Network Analysis Team'],
    abstract: 'A comprehensive study of how researchers collaborate in decentralized, open research networks. We analyze communication patterns, knowledge sharing behaviors, and factors that contribute to successful research outcomes.',
    tags: ['behavioral', 'optimization'],
    status: 'published',
    date: '2024-09-12',
    arxivId: 'arXiv:2409.12345',
    githubRepo: 'https://github.com/mrcloudchase/collaborative-networks',
    doi: '10.1000/182'
  }
];

function PapersHero() {
  return (
    <header className={clsx('hero', styles.papersHero)}>
      <div className="container">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <div className="text--center">
              <Heading as="h1" className={styles.heroTitle}>
                Research Papers & Publications
              </Heading>
              <p className={styles.heroSubtitle}>
                Open access research from the Average Joes Lab community, advancing knowledge through democratized science
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function FilterTabs({ activeFilter, onFilterChange }) {
  return (
    <div className={styles.filterTabs}>
      {FOCUS_AREAS.map((area) => (
        <button
          key={area.id}
          className={clsx(
            styles.filterTab,
            activeFilter === area.id && styles.filterTabActive
          )}
          onClick={() => onFilterChange(area.id)}
          style={{
            '--filter-color': area.color
          } as React.CSSProperties}
        >
          {area.label}
        </button>
      ))}
    </div>
  );
}

function PaperCard({ paper }) {
  const status = PAPER_STATUS[paper.status];
  
  // Get paper and code links
  const getPaperLink = () => {
    if (paper.arxivId) {
      return `https://arxiv.org/abs/${paper.arxivId.replace('arXiv:', '')}`;
    }
    if (paper.doi) {
      return `https://doi.org/${paper.doi}`;
    }
    return null;
  };

  const paperLink = getPaperLink();
  const codeLink = paper.githubRepo;
  
  return (
    <div className={styles.paperCard}>
      <div className={styles.paperHeader}>
        <div className={styles.paperMeta}>
          <span 
            className={styles.statusBadge}
            style={{ backgroundColor: status.color }}
          >
            {status.label}
          </span>
          <span className={styles.paperDate}>
            {new Date(paper.date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </span>
        </div>
        <div className={styles.paperTags}>
          {paper.tags.map((tag) => {
            const focusArea = FOCUS_AREAS.find(area => area.id === tag);
            return (
              <span 
                key={tag}
                className={styles.paperTag}
                style={{ backgroundColor: focusArea?.color || '#6c757d' }}
              >
                {focusArea?.label || tag}
              </span>
            );
          })}
        </div>
      </div>
      
      {/* Paper content area - not clickable */}
      <div className={styles.paperContent}>
        <Heading as="h3" className={styles.paperTitle}>
          {paper.title}
        </Heading>
        
        <div className={styles.paperAuthors}>
          By {paper.authors.join(', ')}
        </div>
        
        <p className={styles.paperAbstract}>
          {paper.abstract}
        </p>
      </div>
      
      {/* Action buttons - only View Paper and View Code */}
      <div className={styles.paperActions}>
        {paperLink && (
          <a 
            href={paperLink}
            className="button button--primary button--sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Paper
          </a>
        )}
        {codeLink && (
          <a 
            href={codeLink}
            className="button button--secondary button--sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Code
          </a>
        )}
      </div>
    </div>
  );
}

function PapersGrid({ papers }) {
  if (papers.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyStateIcon}>📄</div>
        <Heading as="h3">No papers found</Heading>
        <p>No papers match the selected filter. Try selecting a different focus area.</p>
      </div>
    );
  }

  return (
    <div className={styles.papersGrid}>
      {papers.map((paper) => (
        <PaperCard key={paper.id} paper={paper} />
      ))}
    </div>
  );
}

function ResearchStats() {
  const stats = [
    { label: 'Total Papers', value: PAPERS_DATA.length, icon: '📄' },
    { label: 'Published', value: PAPERS_DATA.filter(p => p.status === 'published').length, icon: '✅' },
    { label: 'In Progress', value: PAPERS_DATA.filter(p => p.status === 'inProgress').length, icon: '🔬' },
    { label: 'Focus Areas', value: FOCUS_AREAS.length - 1, icon: '🎯' }
  ];

  return (
    <section className={styles.statsSection}>
      <div className="container">
        <div className="row">
          {stats.map((stat, idx) => (
            <div key={idx} className="col col--3">
              <div className={styles.statCard}>
                <div className={styles.statIcon}>{stat.icon}</div>
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SubmitResearchCTA() {
  return (
    <section className={styles.ctaSection}>
      <div className="container">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <div className={styles.ctaCard}>
              <Heading as="h2" style={{marginBottom: '1rem'}}>
                Submit Your Research
              </Heading>
              <p style={{marginBottom: '2rem', fontSize: '1.1rem'}}>
                Ready to contribute to open science? Join our community of citizen researchers 
                and help democratize knowledge through collaborative research.
              </p>
              <div className={styles.ctaButtons}>
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
                <Link
                  className="button button--outline button--lg"
                  to="/">
                  Our Mission
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Papers(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  const [activeFilter, setActiveFilter] = useState('all');

  // Filter papers based on active filter
  const filteredPapers = activeFilter === 'all' 
    ? PAPERS_DATA 
    : PAPERS_DATA.filter(paper => paper.tags.includes(activeFilter));

  return (
    <Layout
      title="Research Papers"
      description="Open access research papers and publications from the Average Joes Lab community, advancing knowledge through democratized science.">
      <PapersHero />
      <main>
        <ResearchStats />
        
        <section className={styles.papersSection}>
          <div className="container">
            <div className="text--center margin-bottom--lg">
              <Heading as="h2" className="text-gradient">
                Browse Research by Focus Area
              </Heading>
              <p className={styles.sectionDescription}>
                Filter our research papers by focus area to find work relevant to your interests
              </p>
            </div>
            
            <FilterTabs 
              activeFilter={activeFilter} 
              onFilterChange={setActiveFilter} 
            />
            
            <PapersGrid papers={filteredPapers} />
          </div>
        </section>
        
        <SubmitResearchCTA />
      </main>
    </Layout>
  );
}
