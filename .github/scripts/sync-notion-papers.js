const { Client } = require('@notionhq/client');
const fs = require('fs');
const path = require('path');

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

// No more manual mappings - extract raw data from Notion

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
      
      // Extract Focus Areas - use raw Notion values
      let focusAreas = [];
      if (properties['Focus Areas']?.rich_text?.[0]?.plain_text) {
        const focusAreasText = properties['Focus Areas'].rich_text[0].plain_text;
        focusAreas = focusAreasText
          .split(',')
          .map(area => area.trim())
          .filter(Boolean);
      }
      // Try multi-select format as fallback
      else if (properties['Focus Areas']?.multi_select) {
        focusAreas = properties['Focus Areas'].multi_select
          .map(area => area.name)
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
      
      // Extract Status - use raw Notion value
      const status = properties.Status?.status?.name || 
                    properties.Status?.select?.name || null;
      
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

// Extract raw values from external papers - no mappings

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
      
      // Status column removed from database - no longer extracted
      
      // Extract research area (CSV: Research_Area - multi-select field with values like "Attention Mechanisms", "Efficient Training", etc.)
      let researchArea = [];
      if (properties.Research_Area?.multi_select) {
        // Multi-select field - store as array with raw values
        researchArea = properties.Research_Area.multi_select
          .map(area => area.name)
          .filter(Boolean);
      } else if (properties['Research_Area']?.multi_select) {
        // Fallback with bracket notation
        researchArea = properties['Research_Area'].multi_select
          .map(area => area.name)
          .filter(Boolean);
      } else if (properties.Research_Area?.select?.name) {
        // Fallback to select field - convert to array
        researchArea = [properties.Research_Area.select.name];
      } else if (properties.Research_Area?.rich_text?.[0]?.plain_text) {
        // Fallback to rich text - convert to array
        researchArea = [properties.Research_Area.rich_text[0].plain_text];
      }
      
      // Extract reproduction status - use raw Notion value
      // Fixed: Notion uses 'status' field type, not 'select'
      const reproductionStatus = properties.Reproduction_Status?.status?.name || 
                                 properties['Reproduction_Status']?.status?.name || null;
      
      // Extract priority - use raw Notion value
      const priority = properties.Priority?.select?.name || null;
      
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
