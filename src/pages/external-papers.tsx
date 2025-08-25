import type {ReactNode} from 'react';
import {useState} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './papers.module.css';

// External paper status types
const EXTERNAL_STATUS = {
  inbox: { label: 'Inbox', color: '#6c757d' },
  triaged: { label: 'Triaged', color: '#007bff' },
  archive: { label: 'Archive', color: '#dc3545' },
  inProgress: { label: 'In Progress', color: '#ffc107' }
};

// Reproduction status types
const REPRODUCTION_STATUS = {
  notStarted: { label: 'Not Started', color: '#6c757d' },
  inProgress: { label: 'In Progress', color: '#007bff' },
  completed: { label: 'Completed', color: '#28a745' },
  failed: { label: 'Failed', color: '#dc3545' },
  notApplicable: { label: 'Not Applicable', color: '#6c757d' }
};

// Priority colors
const PRIORITY_COLORS = {
  'P0': '#dc3545',
  'P1': '#fd7e14', 
  'P2': '#ffc107',
  'P3': '#6c757d'
};

// Import external papers data from JSON file (auto-synced from Notion)
import externalPapersData from '../data/external-papers.json';

// Generate research areas dynamically from papers data
const generateResearchAreas = () => {
  const safeData = externalPapersData || [];
  const allAreas = new Set();
  
  safeData.forEach(paper => {
    if (paper.researchArea && paper.researchArea.trim()) {
      allAreas.add(paper.researchArea.trim());
    }
  });

  return [
    { id: 'all', label: 'All Papers', color: '#6c757d' },
    ...Array.from(allAreas).sort().map(area => ({
      id: area,
      label: area,
      color: '#007bff'
    }))
  ];
};

const RESEARCH_AREAS = generateResearchAreas();

function ExternalPapersHero() {
  return (
    <section className={styles.heroSection}>
      <div className="container">
        <div className="row">
          <div className="col col--8 col--offset-2 text--center">
            <Heading as="h1" className={styles.heroTitle}>
              External Papers & Reproductions
            </Heading>
            <p className={styles.heroSubtitle}>
              Tracking, reviewing, and reproducing important research papers from the broader scientific community. 
              Our commitment to validating and building upon existing research.
            </p>
            <div className={styles.heroButtons}>
              <Link
                className="button button--primary button--lg"
                to="/papers">
                View Our Research
              </Link>
              <a
                className="button button--secondary button--lg"
                href="https://discord.gg/averagejoeslab"
                target="_blank"
                rel="noopener noreferrer">
                Join Community
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FilterTabs({ activeFilter, onFilterChange }) {
  return (
    <div className={styles.filterTabs}>
      {RESEARCH_AREAS.map((area) => (
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

function ExternalPaperCard({ paper }) {
  const status = EXTERNAL_STATUS[paper.status] || EXTERNAL_STATUS.inbox;
  const reproductionStatus = REPRODUCTION_STATUS[paper.reproductionStatus] || REPRODUCTION_STATUS.notStarted;
  const priorityColor = PRIORITY_COLORS[paper.priority] || PRIORITY_COLORS.P3;
  
  // Get paper links with null safety
  const getPaperLink = () => {
    if (paper.abstractUrl && paper.abstractUrl.trim()) {
      return paper.abstractUrl;
    }
    if (paper.arxivId && paper.arxivId.trim() && paper.arxivId !== '0') {
      return `https://arxiv.org/abs/${paper.arxivId}`;
    }
    if (paper.doi && paper.doi.trim()) {
      return `https://doi.org/${paper.doi}`;
    }
    return null;
  };

  const paperLink = getPaperLink();
  const pdfLink = paper.pdfUrl && paper.pdfUrl.trim() ? paper.pdfUrl : null;
  const codeLink = paper.repository && paper.repository.trim() ? paper.repository : null;
  
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
          <span 
            className={styles.statusBadge}
            style={{ backgroundColor: reproductionStatus.color }}
          >
            Reproduction: {reproductionStatus.label}
          </span>
          <span 
            className={styles.statusBadge}
            style={{ backgroundColor: priorityColor }}
          >
            {paper.priority || 'P3'}
          </span>
        </div>
        <div className={styles.paperYear}>
          {paper.publicationYear || 'Unknown Year'}
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
        
        {paper.journal && (
          <div className={styles.paperVenue}>
            Published in: <strong>{paper.journal}</strong>
          </div>
        )}
        
        {paper.researchArea && (
          <div className={styles.paperArea}>
            Research Area: <strong>{paper.researchArea}</strong>
          </div>
        )}
        
        {paper.attributionText && (
          <div className={styles.paperCitation}>
            <strong>Citation:</strong> {paper.attributionText}
          </div>
        )}
        
        {paper.notes && (
          <p className={styles.paperNotes}>
            <strong>Notes:</strong> {paper.notes}
          </p>
        )}
      </div>
      
      {/* Action buttons - only View Paper, PDF, and Code */}
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
        {pdfLink && (
          <a 
            href={pdfLink}
            className="button button--secondary button--sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            PDF
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
        {!paperLink && !pdfLink && !codeLink && (
          <span className={styles.noLinksMessage}>
            Links will be available when processed
          </span>
        )}
      </div>
    </div>
  );
}

function ExternalPapersGrid({ papers }) {
  if (papers.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyStateIcon}>📄</div>
        <Heading as="h3">No papers found</Heading>
        <p>No papers match the selected filter. Try selecting a different research area.</p>
      </div>
    );
  }

  return (
    <div className={styles.papersGrid}>
      {papers.map((paper) => (
        <ExternalPaperCard key={paper.id} paper={paper} />
      ))}
    </div>
  );
}

function ExternalResearchStats() {
  const safeData = externalPapersData || [];
  const stats = [
    { label: 'Total Papers', value: safeData.length, icon: '📄' },
    { label: 'Triaged', value: safeData.filter(p => p?.status === 'triaged').length, icon: '🔍' },
    { label: 'In Progress', value: safeData.filter(p => p?.reproductionStatus === 'inProgress').length, icon: '🔬' },
    { label: 'Completed', value: safeData.filter(p => p?.reproductionStatus === 'completed').length, icon: '✅' }
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

function ContributeExternalCTA() {
  return (
    <section className={styles.ctaSection}>
      <div className="container">
        <div className="row">
          <div className="col col--8 col--offset-2 text--center">
            <Heading as="h2" className="text-gradient">
              Suggest Papers for Review
            </Heading>
            <p className={styles.ctaDescription}>
              Found an interesting paper that should be on our radar? Help us build our external papers database 
              by suggesting papers for review and reproduction.
            </p>
            <div className={styles.ctaButtons}>
              <a
                className="button button--primary button--lg"
                href="https://discord.gg/averagejoeslab"
                target="_blank"
                rel="noopener noreferrer">
                Suggest Papers
              </a>
              <Link
                className="button button--secondary button--lg"
                to="/papers">
                View Our Research
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ExternalPapers(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  const [activeFilter, setActiveFilter] = useState('all');

  // Filter papers based on active filter
  const safeData = externalPapersData || [];
  const filteredPapers = activeFilter === 'all' 
    ? safeData 
    : safeData.filter(paper => paper?.researchArea === activeFilter);

  return (
    <Layout
      title="External Papers & Reproductions"
      description="External research papers tracked, reviewed, and reproduced by the Average Joes Lab community. Our commitment to validating existing research.">
      <ExternalPapersHero />
      <main>
        <ExternalResearchStats />
        
        <section className={styles.papersSection}>
          <div className="container">
            <div className="text--center margin-bottom--lg">
              <Heading as="h2" className="text-gradient">
                Browse Papers by Research Area
              </Heading>
              <p className={styles.sectionDescription}>
                Filter external papers by research area to find work relevant to your interests
              </p>
            </div>
            
            <FilterTabs 
              activeFilter={activeFilter} 
              onFilterChange={setActiveFilter} 
            />
            
            <ExternalPapersGrid papers={filteredPapers} />
          </div>
        </section>
        
        <ContributeExternalCTA />
      </main>
    </Layout>
  );
}
