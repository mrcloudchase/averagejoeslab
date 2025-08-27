import type {ReactNode} from 'react';
import {useState, useEffect} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './papers.module.css';

// Reproduction status display - handle new raw Notion values
const getReproductionStatusDisplay = (rawStatus: string) => {
  const statusMap = {
    'Triaged': { label: 'Triaged', color: '#4299e1' },
    'In Progress': { label: 'In Progress', color: '#ed8936' },
    'Reproduced': { label: 'Reproduced', color: '#48bb78' },
    // Legacy values for backward compatibility
    'Not Started': { label: 'Not Started', color: '#718096' },
    'Completed': { label: 'Completed', color: '#48bb78' },
    'Failed': { label: 'Failed', color: '#f56565' },
    'Not Applicable': { label: 'Not Applicable', color: '#718096' }
  };
  
  return statusMap[rawStatus] || { label: rawStatus || 'Unknown', color: '#718096' };
};

const getPriorityColor = (priority: string) => {
  const colorMap = {
    'P0': '#f56565',
    'P1': '#ed8936', 
    'P2': '#ed8936',
    'P3': '#718096'
  };
  
  return colorMap[priority] || '#718096';
};

// Import external papers data from JSON file (auto-synced from Notion)
import externalPapersData from '../data/external-papers.json';

// Research area colors - handles raw Notion values with fallback
const getResearchAreaColor = (area: string) => {
  const colorMap = {
    'attention mechanisms': '#4299e1',
    'Attention Mechanisms': '#4299e1',
    'efficient training': '#48bb78',
    'Efficient Training': '#48bb78', 
    'rag systems': '#ed8936',
    'RAG Systems': '#ed8936',
    'multimodal': '#f56565',
    'Multimodal': '#f56565',
    'interpretability': '#9f7aea',
    'Interpretability': '#9f7aea',
    'optimization': '#38b2ac',
    'Optimization': '#38b2ac'
  };
  
  return colorMap[area] || '#718096'; // Default color
};

// Generate research areas dynamically from papers data
const generateResearchAreas = () => {
  const safeData = externalPapersData || [];
  const allAreas = new Set<string>();
  
  safeData.forEach(paper => {
    if (paper.researchArea && Array.isArray(paper.researchArea)) {
      paper.researchArea.forEach(area => {
        if (area && area.trim()) {
          allAreas.add(area.trim());
        }
      });
    }
  });

  return [
    { id: 'all', label: 'All Papers', color: '#718096' },
    ...Array.from(allAreas).sort().map((area: string) => ({
      id: area,
      label: area,
      color: getResearchAreaColor(area)
    }))
  ];
};

const RESEARCH_AREAS = generateResearchAreas();

function ExternalPapersHero() {
  return (
    <header className={clsx('hero', styles.papersHero)}>
      <div className="container">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <div className="text--center">
              <Heading as="h1" className="hero-title">
                External Papers & Reproductions
              </Heading>
              <p className="hero-subtitle">
                Tracking, reviewing, and reproducing important research papers from the broader scientific community. 
                Our commitment to validating and building upon existing research.
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
      {RESEARCH_AREAS.map((area) => {
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

function ExternalPaperCard({ paper }) {
  const reproductionStatus = getReproductionStatusDisplay(paper.reproductionStatus);
  const priorityColor = getPriorityColor(paper.priority);
  
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
          <span className={styles.paperDate}>
            {paper.publicationYear || 'Unknown Year'}
          </span>
        </div>
        <div className={styles.paperTags}>
          <span 
            className={styles.paperTag}
            style={{ backgroundColor: reproductionStatus.color }}
          >
            Reproduction: {reproductionStatus.label}
          </span>
          <span 
            className={styles.paperTag}
            style={{ backgroundColor: priorityColor }}
          >
            {paper.priority || 'Unknown'}
          </span>
          {paper.researchArea && Array.isArray(paper.researchArea) && paper.researchArea.length > 0 && (
            paper.researchArea.map((area, index) => (
              <span 
                key={index}
                className={styles.paperTag}
                style={{ backgroundColor: getResearchAreaColor(area) }}
              >
                {area}
              </span>
            ))
          )}
        </div>
      </div>
      
      {/* Paper content area - not clickable */}
      <div className={styles.paperContent}>
        <Heading as="h3" className={styles.paperTitle}>
          {paper.title || 'Untitled Paper'}
        </Heading>
        
        <div className={styles.paperAuthors}>
          {(paper.authors || []).length > 0 
            ? `By ${paper.authors.join(', ')}` 
            : 'Authors TBD'}
        </div>
        
        {paper.journal && (
          <div className={styles.paperVenue}>
            Published in: <strong>{paper.journal}</strong>
          </div>
        )}
        
        {paper.attributionText && (
          <p className={styles.paperAbstract}>
            <strong>Citation:</strong> {paper.attributionText}
          </p>
        )}
        
        {paper.notes && (
          <p className={styles.paperAbstract}>
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
  
  // Case-insensitive reproduction status filtering
  const getReproductionStatusCount = (targetStatus: string) => {
    return safeData.filter(p => 
      p?.reproductionStatus?.toLowerCase() === targetStatus.toLowerCase()
    ).length;
  };
  
  // Count papers with null/undefined reproduction status
  const unknownCount = safeData.filter(p => !p?.reproductionStatus).length;
  
  const stats = [
    { label: 'Total Papers', value: safeData.length, icon: '📄' },
    { label: 'Triaged', value: getReproductionStatusCount('Triaged'), icon: '🔍' },
    { label: 'In Progress', value: getReproductionStatusCount('In Progress'), icon: '🔬' },
    { label: 'Reproduced', value: getReproductionStatusCount('Reproduced'), icon: '✅' },
    ...(unknownCount > 0 ? [{ label: 'Unknown Status', value: unknownCount, icon: '❓' }] : [])
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

function SubmitExternalPaperForm() {
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
                Suggest Papers for Reproduction
              </Heading>
              <p style={{marginBottom: '2rem', fontSize: '1.1rem'}}>
                Found an interesting paper that should be reproduced? Help us validate and build upon 
                existing research by suggesting papers for our reproduction pipeline.
              </p>
              
              {/* Typeform Embed */}
              <div 
                data-tf-live="01K3KYXX0T6VWNG0C3DJB44DWF"
                style={{ minHeight: '600px', width: '100%' }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Sorting options for external papers
const EXTERNAL_SORT_OPTIONS = [
  { id: 'year-desc', label: 'Year (Newest First)', field: 'publicationYear', order: 'desc' },
  { id: 'year-asc', label: 'Year (Oldest First)', field: 'publicationYear', order: 'asc' },
  { id: 'title-asc', label: 'Title (A-Z)', field: 'title', order: 'asc' },
  { id: 'title-desc', label: 'Title (Z-A)', field: 'title', order: 'desc' }
];

// Sorting function for external papers
const sortExternalPapers = (papers: any[], sortOption: string) => {
  const option = EXTERNAL_SORT_OPTIONS.find(opt => opt.id === sortOption);
  if (!option) return papers;

  return [...papers].sort((a, b) => {
    let aValue, bValue;

    if (option.field === 'publicationYear') {
      // Handle year sorting with null safety
      aValue = a.publicationYear || 0;
      bValue = b.publicationYear || 0;
    } else if (option.field === 'title') {
      // Handle title sorting with null safety
      aValue = (a.title || '').toLowerCase();
      bValue = (b.title || '').toLowerCase();
    }

    if (option.order === 'desc') {
      return bValue > aValue ? 1 : bValue < aValue ? -1 : 0;
    } else {
      return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
    }
  });
};

function ExternalSortDropdown({ selectedSort, onSortChange }) {
  return (
    <div className={styles.sortDropdown}>
      <label htmlFor="external-sort-select" className={styles.sortLabel}>
        Sort by:
      </label>
      <select
        id="external-sort-select"
        value={selectedSort}
        onChange={(e) => onSortChange(e.target.value)}
        className={styles.sortSelect}
      >
        {EXTERNAL_SORT_OPTIONS.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function ExternalPapers(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState<string>('year-desc');

  // Filter papers based on selected filters (multi-select with AND logic)
  const safeData = externalPapersData || [];
  const filteredPapers = selectedFilters.length === 0 
    ? safeData 
    : safeData.filter(paper => 
        paper?.researchArea && 
        Array.isArray(paper.researchArea) &&
        selectedFilters.every(filter => paper.researchArea.includes(filter))
      );

  // Apply sorting to filtered papers
  const sortedAndFilteredPapers = sortExternalPapers(filteredPapers, selectedSort);

  return (
    <Layout
      title="External Papers & Reproductions"
      description="External research papers tracked, reviewed, and reproduced by the Average Joes Lab community. Our commitment to validating existing research.">
      <ExternalPapersHero />
      <main>
        <ExternalResearchStats />
        
        <section className="section-hero">
          <div className="container">
            <div className="text--center margin-bottom--lg">
              <Heading as="h2" className="text-gradient">
                Browse Papers by Research Area
              </Heading>
              <p className="section-description">
                Select one or more research areas to filter papers. Papers must match ALL selected areas.
              </p>
            </div>
            
            <FilterTabs 
              selectedFilters={selectedFilters} 
              onFilterChange={setSelectedFilters} 
            />
            
            <div className={styles.controlsRow}>
              <ExternalSortDropdown 
                selectedSort={selectedSort}
                onSortChange={setSelectedSort}
              />
            </div>
            
            <ExternalPapersGrid papers={sortedAndFilteredPapers} />
          </div>
        </section>
        
        <SubmitExternalPaperForm />
      </main>
    </Layout>
  );
}