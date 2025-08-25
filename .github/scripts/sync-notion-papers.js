const { Client } = require('@notionhq/client');
const fs = require('fs');
const path = require('path');

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

// Dynamic focus area colors (matches CSV schema focus areas)
const FOCUS_AREA_COLORS = {
  'optimization': '#007bff',
  'behavioral': '#28a745', 
  'interpretability': '#ffc107',
  'security': '#dc3545',
  'interoperability': '#6f42c1',
  'sota': '#17a2b8', // State of the Art
  'behavior': '#28a745', // Alias for behavioral
  'default': '#6c757d'
};

// Status mapping (matches CSV schema exactly)
const STATUS_MAPPING = {
  'Published': 'published',
  'In Review': 'inReview', 
  'In Progress': 'inProgress',
  'In progress': 'inProgress', // Handle lowercase variant from CSV
  'Proposed': 'proposed'
};

async function syncInternalPapersFromNotion() {
  try {
    console.log('🔄 Fetching internal papers from Notion database...');
    
    const response = await notion.databases.query({
      database_id: process.env.NOTION_INTERNAL_PAPERS_DB_ID,
      sorts: [
        {
          property: 'Publication Date',
          direction: 'descending'
        }
      ]
    });

    console.log(`📄 Found ${response.results.length} papers in Notion`);

    const papers = response.results.map((page, index) => {
      const properties = page.properties;
      
      // Extract title from 'Name' property (matches CSV schema exactly)
      const title = properties.Name?.title?.[0]?.plain_text || 'Untitled Paper';
      
      // Extract authors (CSV format: comma-separated string)
      // Try multiple field types: rich_text, title, or multi_select
      let authorsText = '';
      if (properties.Authors?.rich_text?.[0]?.plain_text) {
        authorsText = properties.Authors.rich_text[0].plain_text;
      } else if (properties.Authors?.title?.[0]?.plain_text) {
        authorsText = properties.Authors.title[0].plain_text;
      } else if (properties.Authors?.multi_select) {
        authorsText = properties.Authors.multi_select.map(author => author.name).join(', ');
      }
      
      const authors = authorsText ? authorsText.split(',').map(author => author.trim()).filter(Boolean) : [];
      
      // Extract abstract (matches CSV schema)
      const abstract = properties.Abstract?.rich_text?.[0]?.plain_text || '';
      
      // Extract DOI (matches CSV schema)
      const doi = properties.DOI?.rich_text?.[0]?.plain_text || null;
      
      // Extract Focus Areas (CSV format: comma-separated string like "Behavioral, Security")
      let focusAreas = [];
      if (properties['Focus Areas']?.rich_text?.[0]?.plain_text) {
        const focusAreasText = properties['Focus Areas'].rich_text[0].plain_text;
        focusAreas = focusAreasText
          .split(',')
          .map(area => area.trim().toLowerCase())
          .filter(Boolean);
      }
      // Try multi-select format as fallback
      else if (properties['Focus Areas']?.multi_select) {
        focusAreas = properties['Focus Areas'].multi_select
          .map(area => area.name.toLowerCase())
          .filter(Boolean);
      }
      
      // Extract GitHub Repo (matches CSV schema exactly)
      const githubRepo = properties['GitHub Repo']?.url || 
                        properties['GitHub Repo']?.rich_text?.[0]?.plain_text || null;
      
      // Extract Notes (matches CSV schema)
      const notes = properties.Notes?.rich_text?.[0]?.plain_text || '';
      
      // Extract Publication Date (CSV format: "July 15, 2025" or "August 30, 2024")
      let publicationDate;
      if (properties['Publication Date']?.date?.start) {
        publicationDate = properties['Publication Date'].date.start;
      } else {
        publicationDate = new Date().toISOString().split('T')[0];
      }
      
      // Extract Status (CSV values: "Proposed", "In progress", "Published")
      const statusNotion = properties.Status?.status?.name || 
                          properties.Status?.select?.name || 'Proposed';
      const status = STATUS_MAPPING[statusNotion] || 'proposed';
      
      // Extract arXiv ID (CSV format: "arXiv:2409.12345" or empty)
      const arxivId = properties['arXiv ID']?.rich_text?.[0]?.plain_text || null;

      return {
        id: index + 1,
        name: title,                    // CSV: Name
        abstract: abstract,             // CSV: Abstract  
        authors: authors,               // CSV: Authors
        doi: doi,                       // CSV: DOI
        focusAreas: focusAreas,         // CSV: Focus Areas
        githubRepo: githubRepo,         // CSV: GitHub Repo
        notes: notes,                   // CSV: Notes
        publicationDate: publicationDate, // CSV: Publication Date
        status: status,                 // CSV: Status
        arxivId: arxivId               // CSV: arXiv ID
      };
    });

    // Ensure data directory exists
    const dataDir = path.join(process.cwd(), 'src', 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Write internal papers to JSON file
    const papersOutputPath = path.join(dataDir, 'internal-papers.json');
    fs.writeFileSync(papersOutputPath, JSON.stringify(papers, null, 2));
    
    console.log(`✅ Successfully synced ${papers.length} internal papers to ${papersOutputPath}`);
    console.log('📊 Internal paper breakdown:');
    
    // Log summary
    const statusCounts = papers.reduce((acc, paper) => {
      acc[paper.status] = (acc[paper.status] || 0) + 1;
      return acc;
    }, {});
    
    Object.entries(statusCounts).forEach(([status, count]) => {
      console.log(`   ${status}: ${count} papers`);
    });

    return papers.length;
  } catch (error) {
    console.error('❌ Error syncing internal papers from Notion:', error);
    throw error;
  }
}

// External papers status mapping (matches CSV schema exactly)
const EXTERNAL_STATUS_MAPPING = {
  'Inbox': 'inbox',
  'Triaged': 'triaged', 
  'Archive': 'archive',
  'In Progress': 'inProgress'
};

// External papers reproduction status mapping
const REPRODUCTION_STATUS_MAPPING = {
  'Not Started': 'notStarted',
  'In Progress': 'inProgress',
  'Completed': 'completed',
  'Failed': 'failed',
  'Not Applicable': 'notApplicable'
};

async function syncExternalPapersFromNotion() {
  try {
    console.log('🔄 Fetching external papers from Notion database...');
    
    const response = await notion.databases.query({
      database_id: process.env.NOTION_EXTERNAL_PAPERS_DB_ID,
      sorts: [
        {
          property: 'Publication_Year',
          direction: 'descending'
        }
      ]
    });

    console.log(`📄 Found ${response.results.length} external papers in Notion`);

    const externalPapers = response.results.map((page, index) => {
      const properties = page.properties;
      
      // Extract title (CSV: Title)
      const title = properties.Title?.title?.[0]?.plain_text || 'Untitled Paper';
      
      // Extract DOI (CSV: DOI)
      const doi = properties.DOI?.rich_text?.[0]?.plain_text || null;
      
      // Extract arXiv ID (CSV: arXiv_ID) - handle both formats
      const arxivId = properties.arXiv_ID?.rich_text?.[0]?.plain_text || 
                     properties['arXiv_ID']?.rich_text?.[0]?.plain_text || null;
      
      // Extract authors (CSV: Authors) - comma-separated string
      const authorsText = properties.Authors?.rich_text?.[0]?.plain_text || '';
      const authors = authorsText ? authorsText.split(',').map(author => author.trim()).filter(Boolean) : [];
      
      // Extract journal/venue (CSV: Journal)
      const journal = properties.Journal?.rich_text?.[0]?.plain_text || '';
      
      // Extract publication year (CSV: Publication_Year)
      const publicationYear = properties.Publication_Year?.number || 
                             properties['Publication_Year']?.number || new Date().getFullYear();
      
      // Extract status (CSV: Status - values: "Inbox", "Triaged", "Archive", "In Progress")
      const statusNotion = properties.Status?.select?.name || 'Inbox';
      const status = EXTERNAL_STATUS_MAPPING[statusNotion] || 'inbox';
      
      // Extract research area (CSV: Research_Area - values: "Attention Mechanisms", "Efficient Training", etc.)
      const researchArea = properties.Research_Area?.rich_text?.[0]?.plain_text || 
                          properties['Research_Area']?.rich_text?.[0]?.plain_text || '';
      
      // Extract reproduction status (CSV: Reproduction_Status - values: "Not Started", "In Progress", etc.)
      const reproductionStatusNotion = properties.Reproduction_Status?.select?.name || 
                                      properties['Reproduction_Status']?.select?.name || 'Not Started';
      const reproductionStatus = REPRODUCTION_STATUS_MAPPING[reproductionStatusNotion] || 'notStarted';
      
      // Extract priority (CSV: Priority - values: "P0", "P1", "P2", "P3")
      const priority = properties.Priority?.select?.name || 'P3';
      
      // Extract URLs (CSV: Abstract_URL, PDF_URL, Repository)
      const abstractUrl = properties.Abstract_URL?.url || 
                         properties['Abstract_URL']?.url || null;
      const pdfUrl = properties.PDF_URL?.url || 
                    properties['PDF_URL']?.url || null;
      const repository = properties.Repository?.url || null;
      
      // Extract attribution text (CSV: Attribution_Text)
      const attributionText = properties.Attribution_Text?.rich_text?.[0]?.plain_text || 
                             properties['Attribution_Text']?.rich_text?.[0]?.plain_text || '';
      
      // Extract notes (CSV: Notes)
      const notes = properties.Notes?.rich_text?.[0]?.plain_text || '';

      return {
        id: index + 1,
        title: title,                    // CSV: Title
        doi: doi,                        // CSV: DOI
        arxivId: arxivId,               // CSV: arXiv_ID
        authors: authors,                // CSV: Authors
        journal: journal,                // CSV: Journal
        publicationYear: publicationYear, // CSV: Publication_Year
        status: status,                  // CSV: Status
        researchArea: researchArea,      // CSV: Research_Area
        reproductionStatus: reproductionStatus, // CSV: Reproduction_Status
        priority: priority,              // CSV: Priority
        abstractUrl: abstractUrl,        // CSV: Abstract_URL
        pdfUrl: pdfUrl,                 // CSV: PDF_URL
        repository: repository,          // CSV: Repository
        attributionText: attributionText, // CSV: Attribution_Text
        notes: notes                     // CSV: Notes
      };
    });

    // Ensure data directory exists
    const dataDir = path.join(process.cwd(), 'src', 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Write external papers to JSON file
    const externalPapersOutputPath = path.join(dataDir, 'external-papers.json');
    fs.writeFileSync(externalPapersOutputPath, JSON.stringify(externalPapers, null, 2));
    
    console.log(`✅ Successfully synced ${externalPapers.length} external papers to ${externalPapersOutputPath}`);
    console.log('📊 External paper breakdown:');
    
    // Log summary
    const statusCounts = externalPapers.reduce((acc, paper) => {
      acc[paper.status] = (acc[paper.status] || 0) + 1;
      return acc;
    }, {});
    
    Object.entries(statusCounts).forEach(([status, count]) => {
      console.log(`   ${status}: ${count} papers`);
    });

    return externalPapers.length;
  } catch (error) {
    console.error('❌ Error syncing external papers from Notion:', error);
    throw error;
  }
}

// Main sync function
async function syncAllPapers() {
  try {
    console.log('🚀 Starting sync of all papers databases...');
    
    const internalCount = await syncInternalPapersFromNotion();
    const externalCount = await syncExternalPapersFromNotion();
    
    console.log(`🎉 Sync completed! Internal: ${internalCount}, External: ${externalCount}`);
  } catch (error) {
    console.error('❌ Error syncing papers:', error);
    process.exit(1);
  }
}

// Run the sync
syncAllPapers();
