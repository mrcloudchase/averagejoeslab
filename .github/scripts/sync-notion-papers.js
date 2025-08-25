const { Client } = require('@notionhq/client');
const fs = require('fs');
const path = require('path');

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

// Dynamic focus area colors (fallback colors for consistency)
const FOCUS_AREA_COLORS = {
  'optimization': '#007bff',
  'behavioral': '#28a745', 
  'interpretability': '#ffc107',
  'security': '#dc3545',
  'interoperability': '#6f42c1',
  'behavior': '#28a745', // Alias for behavioral
  'default': '#6c757d'
};

// Status mapping
const STATUS_MAPPING = {
  'Published': 'published',
  'In Review': 'inReview',
  'In Progress': 'inProgress',
  'In progress': 'inProgress', // Handle lowercase variant
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
      
      // Extract title (handle both 'Name' and 'Title' properties)
      const title = properties.Name?.title?.[0]?.plain_text || 
                   properties.Title?.title?.[0]?.plain_text || 'Untitled Paper';
      
      // Extract authors (handle empty authors)
      const authorsText = properties.Authors?.rich_text?.[0]?.plain_text || '';
      const authors = authorsText ? authorsText.split(',').map(author => author.trim()).filter(Boolean) : [];
      
      // Extract abstract
      const abstract = properties.Abstract?.rich_text?.[0]?.plain_text || '';
      
      // Extract status (Notion uses 'status' field, not 'select')
      const statusNotion = properties.Status?.status?.name || 'proposed';
      const status = STATUS_MAPPING[statusNotion] || 'proposed';
      
      // Extract arXiv ID
      const arxivId = properties['arXiv ID']?.rich_text?.[0]?.plain_text || null;
      
      // Extract DOI
      const doi = properties.DOI?.rich_text?.[0]?.plain_text || null;
      
      // Extract GitHub repo (handle both URL and rich text formats)
      const githubRepo = properties['GitHub Repo']?.url || 
                        properties['GitHub Repo']?.rich_text?.[0]?.plain_text || null;
      
      // Extract focus areas (handle multiple formats and new Focus Area column)
      let tags = [];
      
      // Handle Focus Areas from CSV format (comma-separated in rich text)
      if (properties['Focus Areas']?.rich_text?.[0]?.plain_text) {
        const focusAreasText = properties['Focus Areas'].rich_text[0].plain_text;
        tags = focusAreasText
          .split(',')
          .map(area => area.trim().toLowerCase())
          .filter(Boolean);
      }
      // Try multi-select format
      else if (properties['Focus Areas']?.multi_select) {
        tags = properties['Focus Areas'].multi_select
          .map(area => area.name.toLowerCase())
          .filter(Boolean);
      }
      // Try new "Focus Area" column (single select or rich text)
      else if (properties['Focus Area']?.select?.name) {
        const focusAreaText = properties['Focus Area'].select.name;
        tags = focusAreaText
          .split(',')
          .map(area => area.trim().toLowerCase())
          .filter(Boolean);
      } else if (properties['Focus Area']?.rich_text?.[0]?.plain_text) {
        const focusAreaText = properties['Focus Area'].rich_text[0].plain_text;
        tags = focusAreaText
          .split(',')
          .map(area => area.trim().toLowerCase())
          .filter(Boolean);
      }
      
      // Extract publication date
      const publicationDate = properties['Publication Date']?.date?.start || 
        new Date().toISOString().split('T')[0];

      return {
        id: index + 1,
        title,
        authors,
        abstract,
        tags,
        status,
        date: publicationDate,
        arxivId,
        githubRepo,
        doi
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

// External papers status mapping
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
      
      // Extract title
      const title = properties.Title?.title?.[0]?.plain_text || 'Untitled Paper';
      
      // Extract DOI
      const doi = properties.DOI?.rich_text?.[0]?.plain_text || null;
      
      // Extract arXiv ID
      const arxivId = properties.arXiv_ID?.rich_text?.[0]?.plain_text || null;
      
      // Extract authors
      const authorsText = properties.Authors?.rich_text?.[0]?.plain_text || '';
      const authors = authorsText ? authorsText.split(',').map(author => author.trim()).filter(Boolean) : [];
      
      // Extract journal/venue
      const journal = properties.Journal?.rich_text?.[0]?.plain_text || '';
      
      // Extract publication year
      const publicationYear = properties.Publication_Year?.number || new Date().getFullYear();
      
      // Extract status
      const statusNotion = properties.Status?.select?.name || 'inbox';
      const status = EXTERNAL_STATUS_MAPPING[statusNotion] || 'inbox';
      
      // Extract research area
      const researchArea = properties.Research_Area?.rich_text?.[0]?.plain_text || '';
      
      // Extract reproduction status
      const reproductionStatusNotion = properties.Reproduction_Status?.select?.name || 'notStarted';
      const reproductionStatus = REPRODUCTION_STATUS_MAPPING[reproductionStatusNotion] || 'notStarted';
      
      // Extract priority
      const priority = properties.Priority?.select?.name || 'P3';
      
      // Extract URLs
      const abstractUrl = properties.Abstract_URL?.url || null;
      const pdfUrl = properties.PDF_URL?.url || null;
      const repository = properties.Repository?.url || null;
      
      // Extract attribution text
      const attributionText = properties.Attribution_Text?.rich_text?.[0]?.plain_text || '';
      
      // Extract notes
      const notes = properties.Notes?.rich_text?.[0]?.plain_text || '';

      return {
        id: index + 1,
        title,
        doi,
        arxivId,
        authors,
        journal,
        publicationYear,
        status,
        researchArea,
        reproductionStatus,
        priority,
        abstractUrl,
        pdfUrl,
        repository,
        attributionText,
        notes
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
