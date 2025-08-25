import type {ReactNode} from 'react';
import {useState} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './papers.module.css';

// Paper status types
const PAPER_STATUS = {
  published: { label: 'Published', color: '#28a745' },
  inReview: { label: 'In Review', color: '#ffc107' },
  inProgress: { label: 'In Progress', color: '#007bff' },
  proposed: { label: 'Proposed', color: '#6c757d' }
};

// Import internal papers data from JSON file (auto-synced from Notion)
import papersData from '../data/internal-papers.json';

// Dynamic focus area colors
const FOCUS_AREA_COLORS = {
  'optimization': '#007bff',
  'behavioral': '#28a745', 
  'interpretability': '#ffc107',
  'security': '#dc3545',
  'interoperability': '#6f42c1',
  'behavior': '#28a745', // Alias for behavioral
  'default': '#6c757d'
};

// Generate focus areas dynamically from papers data
const generateFocusAreas = () => {
  const safeData = papersData || [];
  const allTags = new Set();
  
  safeData.forEach(paper => {
    (paper.tags || []).forEach(tag => allTags.add(tag));
  });



  return [
    { id: 'all', label: 'All Papers', color: '#6c757d' },
    ...Array.from(allTags).sort().map(tag => ({
      id: tag,
      label: tag.charAt(0).toUpperCase() + tag.slice(1),
      color: FOCUS_AREA_COLORS[tag] || FOCUS_AREA_COLORS.default
    }))
  ];
};

const FOCUS_AREAS = generateFocusAreas();

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
  const status = PAPER_STATUS[paper.status] || PAPER_STATUS.proposed;
  
  // Get paper and code links with null safety
  const getPaperLink = () => {
    if (paper.arxivId && paper.arxivId.trim()) {
      return `https://arxiv.org/abs/${paper.arxivId.replace('arXiv:', '')}`;
    }
    if (paper.doi && paper.doi.trim()) {
      return `https://doi.org/${paper.doi}`;
    }
    return null;
  };

  const paperLink = getPaperLink();
  const codeLink = paper.githubRepo && paper.githubRepo.trim() ? paper.githubRepo : null;
  
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
            {paper.date ? new Date(paper.date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            }) : 'Date not available'}
          </span>
        </div>
        <div className={styles.paperTags}>
          {(paper.tags || []).map((tag) => {
            const focusArea = FOCUS_AREAS.find(area => area.id === tag);
            return (
              <span 
                key={tag}
                className={styles.paperTag}
                style={{ backgroundColor: focusArea?.color || '#6c757d' }}
              >
                {focusArea?.label || tag.charAt(0).toUpperCase() + tag.slice(1)}
              </span>
            );
          })}
        </div>
      </div>
      
      {/* Paper content area - not clickable */}
      <div className={styles.paperContent}>
        <Heading as="h3" className={styles.paperTitle}>
          {paper.title || 'Untitled Paper'}
        </Heading>
        
        <div className={styles.paperAuthors}>
          By {(paper.authors || []).join(', ') || 'Unknown Authors'}
        </div>
        
        <p className={styles.paperAbstract}>
          {paper.abstract || 'No abstract available.'}
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
        {!paperLink && !codeLink && (
          <span className={styles.noLinksMessage}>
            Links will be available when published
          </span>
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
  const safeData = papersData || [];
  const stats = [
    { label: 'Total Papers', value: safeData.length, icon: '📄' },
    { label: 'Published', value: safeData.filter(p => p?.status === 'published').length, icon: '✅' },
    { label: 'In Progress', value: safeData.filter(p => p?.status === 'inProgress').length, icon: '🔬' },
    { label: 'Focus Areas', value: Math.max(0, FOCUS_AREAS.length - 1), icon: '🎯' }
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
  const safeData = papersData || [];
  const filteredPapers = activeFilter === 'all' 
    ? safeData 
    : safeData.filter(paper => paper?.tags?.includes(activeFilter));

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
