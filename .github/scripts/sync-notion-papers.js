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

async function syncPapersFromNotion() {
  try {
    console.log('🔄 Fetching papers from Notion database...');
    
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
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
      
      // Extract authors
      const authorsText = properties.Authors?.rich_text?.[0]?.plain_text || '';
      const authors = authorsText.split(',').map(author => author.trim()).filter(Boolean);
      
      // Extract abstract
      const abstract = properties.Abstract?.rich_text?.[0]?.plain_text || '';
      
      // Extract status
      const statusNotion = properties.Status?.select?.name || 'proposed';
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
      
      // First try the new "Focus Area" column (single select or rich text)
      if (properties['Focus Area']?.select?.name) {
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
      // Fallback to old "Focus Areas" column for backward compatibility
      else if (properties['Focus Areas']?.multi_select) {
        tags = properties['Focus Areas'].multi_select
          .map(area => area.name.toLowerCase())
          .filter(Boolean);
      } else if (properties['Focus Areas']?.rich_text?.[0]?.plain_text) {
        const focusAreasText = properties['Focus Areas'].rich_text[0].plain_text;
        tags = focusAreasText
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

    // Generate dynamic focus areas from papers data
    const allTags = new Set();
    papers.forEach(paper => {
      paper.tags.forEach(tag => allTags.add(tag));
    });

    const focusAreas = [
      { id: 'all', label: 'All Papers', color: '#6c757d' },
      ...Array.from(allTags).sort().map(tag => ({
        id: tag,
        label: tag.charAt(0).toUpperCase() + tag.slice(1),
        color: FOCUS_AREA_COLORS[tag] || FOCUS_AREA_COLORS.default
      }))
    ];

    // Ensure data directory exists
    const dataDir = path.join(process.cwd(), 'src', 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Write papers to JSON file
    const papersOutputPath = path.join(dataDir, 'papers.json');
    fs.writeFileSync(papersOutputPath, JSON.stringify(papers, null, 2));

    // Write focus areas to JSON file
    const focusAreasOutputPath = path.join(dataDir, 'focus-areas.json');
    fs.writeFileSync(focusAreasOutputPath, JSON.stringify(focusAreas, null, 2));
    
    console.log(`✅ Successfully synced ${papers.length} papers to ${papersOutputPath}`);
    console.log(`✅ Generated ${focusAreas.length} focus areas to ${focusAreasOutputPath}`);
    console.log('📊 Paper breakdown:');
    
    // Log summary
    const statusCounts = papers.reduce((acc, paper) => {
      acc[paper.status] = (acc[paper.status] || 0) + 1;
      return acc;
    }, {});
    
    Object.entries(statusCounts).forEach(([status, count]) => {
      console.log(`   ${status}: ${count} papers`);
    });

  } catch (error) {
    console.error('❌ Error syncing papers from Notion:', error);
    process.exit(1);
  }
}

// Run the sync
syncPapersFromNotion();
