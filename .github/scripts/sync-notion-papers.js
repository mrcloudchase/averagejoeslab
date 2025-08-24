const { Client } = require('@notionhq/client');
const fs = require('fs');
const path = require('path');

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

// Focus area mapping
const FOCUS_AREA_MAPPING = {
  'optimization': 'optimization',
  'behavioral': 'behavioral', 
  'interpretability': 'interpretability',
  'security': 'security'
};

// Status mapping
const STATUS_MAPPING = {
  'Published': 'published',
  'In Review': 'inReview',
  'In Progress': 'inProgress', 
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
      
      // Extract title
      const title = properties.Title?.title?.[0]?.plain_text || 'Untitled Paper';
      
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
      
      // Extract GitHub repo
      const githubRepo = properties['GitHub Repo']?.url || null;
      
      // Extract focus areas
      const focusAreasNotion = properties['Focus Areas']?.multi_select || [];
      const tags = focusAreasNotion
        .map(area => FOCUS_AREA_MAPPING[area.name.toLowerCase()])
        .filter(Boolean);
      
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

    // Write papers to JSON file
    const outputPath = path.join(dataDir, 'papers.json');
    fs.writeFileSync(outputPath, JSON.stringify(papers, null, 2));
    
    console.log(`✅ Successfully synced ${papers.length} papers to ${outputPath}`);
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
