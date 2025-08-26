import type {ReactNode} from 'react';
import {useState, useEffect} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './papers.module.css';

// Paper status types
const PAPER_STATUS = {
  published: { label: 'Published', color: '#48bb78' },
  inReview: { label: 'In Review', color: '#ed8936' },
  inProgress: { label: 'In Progress', color: '#4299e1' },
  proposed: { label: 'Proposed', color: '#718096' }
};

// Import internal papers data from JSON file (auto-synced from Notion)
import papersData from '../data/internal-papers.json';

// Dynamic focus area colors (matches CSV schema focus areas)
const FOCUS_AREA_COLORS = {
  'optimization': '#4299e1',
  'behavioral': '#48bb78', 
  'interpretability': '#ed8936',
  'security': '#f56565',
  'interoperability': '#9f7aea',
  'sota': '#38b2ac', // State of the Art
  'behavior': '#48bb78', // Alias for behavioral
  'default': '#718096'
};

// Generate focus areas dynamically from papers data (CSV schema: focusAreas)
const generateFocusAreas = () => {
  const safeData = papersData || [];
  const allFocusAreas = new Set<string>();
  
  safeData.forEach(paper => {
    (paper.focusAreas || []).forEach(area => allFocusAreas.add(area));
  });

  return [
    { id: 'all', label: 'All Papers', color: '#718096' },
    ...Array.from(allFocusAreas).sort().map((area: string) => ({
      id: area,
      label: area.charAt(0).toUpperCase() + area.slice(1),
      color: FOCUS_AREA_COLORS[area] || FOCUS_AREA_COLORS.default
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
              <Heading as="h1" className="hero-title">
                Internal Research Papers
              </Heading>
              <p className="hero-subtitle">
                Original research papers and publications from the Average Joes Lab community, advancing knowledge through democratized science and citizen research
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function FilterTabs({ selectedFilters, onFilterChange }) {
  const handleFilterToggle = (filterId: string) => {
    if (filterId === 'all') {
      // Clear all filters when "All Papers" is clicked
      onFilterChange([]);
    } else {
      // Toggle the filter
      if (selectedFilters.includes(filterId)) {
        // Remove filter if already selected
        onFilterChange(selectedFilters.filter(f => f !== filterId));
      } else {
        // Add filter if not selected
        onFilterChange([...selectedFilters, filterId]);
      }
    }
  };

  return (
    <div className={styles.filterTabs}>
      {FOCUS_AREAS.map((area) => {
        const isSelected = area.id === 'all' 
          ? selectedFilters.length === 0 
          : selectedFilters.includes(area.id);
        
        return (
        <button
          key={area.id}
          className={clsx(
            styles.filterTab,
              isSelected && styles.filterTabActive
          )}
            onClick={() => handleFilterToggle(area.id)}
          style={{
            '--filter-color': area.color
          } as React.CSSProperties}
        >
          {area.label}
            {area.id !== 'all' && selectedFilters.includes(area.id) && (
              <span className={styles.filterCheckmark}> ✓</span>
            )}
        </button>
        );
      })}
    </div>
  );
}

function PaperCard({ paper }) {
  const status = PAPER_STATUS[paper.status] || PAPER_STATUS.proposed;
  
  // Get paper and code links with null safety (CSV schema fields)
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
            {paper.publicationDate ? new Date(paper.publicationDate).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            }) : 'Date not available'}
          </span>
        </div>
        <div className={styles.paperTags}>
          {(paper.focusAreas || []).map((area) => {
            const focusArea = FOCUS_AREAS.find(fa => fa.id === area);
            return (
              <span 
                key={area}
                className={styles.paperTag}
                style={{ backgroundColor: focusArea?.color || '#718096' }}
              >
                {focusArea?.label || area.charAt(0).toUpperCase() + area.slice(1)}
              </span>
            );
          })}
        </div>
      </div>
      
      {/* Paper content area - not clickable */}
      <div className={styles.paperContent}>
        <Heading as="h3" className={styles.paperTitle}>
          {paper.name || 'Untitled Paper'}
        </Heading>
        
        <div className={styles.paperAuthors}>
          {(paper.authors || []).length > 0 
            ? `By ${paper.authors.join(', ')}` 
            : 'Authors TBD'}
        </div>
        
        <p className={styles.paperAbstract}>
          {paper.abstract || 'No abstract available.'}
        </p>
        
        {paper.notes && (
          <p className={styles.paperAbstract}>
            <strong>Notes:</strong> {paper.notes}
          </p>
        )}
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
    { label: 'Proposed', value: safeData.filter(p => p?.status === 'proposed').length, icon: '💡' },
    { label: 'In Progress', value: safeData.filter(p => p?.status === 'inProgress').length, icon: '🔬' },
    { label: 'Published', value: safeData.filter(p => p?.status === 'published').length, icon: '✅' }
  ];

  return (
    <section className="section-stats">
      <div className="container">
        <div className="row">
          {stats.map((stat, idx) => (
            <div key={idx} className="col col--3">
              <div className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SubmitPaperIdeaForm() {
  useEffect(() => {
    // Load Typeform embed script
    const script = document.createElement('script');
    script.src = '//embed.typeform.com/next/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <section className="section-hero">
      <div className="container">
        <div className="row">
          <div className="col col--10 col--offset-1">
            <div className="cta-card">
              <Heading as="h2" style={{marginBottom: '1rem'}}>
                Submit a Novel Paper Idea
              </Heading>
              <p style={{marginBottom: '2rem', fontSize: '1.1rem'}}>
                Have an innovative research idea? Share it with the Average Joes Lab community! 
                We welcome novel concepts that advance open science and democratize research.
              </p>
              
              {/* Typeform Embed */}
              <div 
                data-tf-live="01K3KW7AJ1PZ6EPKVZ11NPJCA5"
                style={{ minHeight: '600px', width: '100%' }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Papers(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  // Multi-select filter logic: show papers that contain ALL selected focus areas
  const safeData = papersData || [];
  const filteredPapers = selectedFilters.length === 0 
    ? safeData 
    : safeData.filter(paper => {
        // Check if paper has all selected focus areas
        return selectedFilters.every(filter => 
          paper?.focusAreas?.includes(filter)
        );
      });

  return (
    <Layout
      title="Internal Research Papers"
      description="Original research papers and publications from the Average Joes Lab community, advancing knowledge through democratized science and citizen research.">
      <PapersHero />
      <main>
        <ResearchStats />
        
        <section className="section-hero">
          <div className="container">
            <div className="text--center margin-bottom--lg">
              <Heading as="h2" className="text-gradient">
                Browse Research by Focus Area
              </Heading>
              <p className="section-description">
                Select one or more focus areas to filter papers. Papers must match ALL selected areas.
              </p>
            </div>
            
            <FilterTabs 
              selectedFilters={selectedFilters} 
              onFilterChange={setSelectedFilters} 
            />
            
            <PapersGrid papers={filteredPapers} />
          </div>
        </section>
        
        <SubmitPaperIdeaForm />
      </main>
    </Layout>
  );
}
