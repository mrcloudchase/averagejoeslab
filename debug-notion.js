const { Client } = require('@notionhq/client');

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

async function debugNotionConnection() {
  try {
    console.log('🔍 Debugging Notion connection...');
    console.log('Token exists:', !!process.env.NOTION_TOKEN);
    console.log('Internal DB ID exists:', !!process.env.NOTION_INTERNAL_PAPERS_DB_ID);
    console.log('External DB ID exists:', !!process.env.NOTION_EXTERNAL_PAPERS_DB_ID);
    
    // Test basic connection
    console.log('\n🔄 Testing Notion API connection...');
    const user = await notion.users.me();
    console.log('✅ Connected as:', user.name || user.id);
    
    // Test internal database access
    console.log('\n🔄 Testing internal database access...');
    try {
      const internalResponse = await notion.databases.retrieve({
        database_id: process.env.NOTION_INTERNAL_PAPERS_DB_ID,
      });
      console.log('✅ Internal database accessible:', internalResponse.title?.[0]?.plain_text || 'Untitled');
      
      // Test query
      const queryResponse = await notion.databases.query({
        database_id: process.env.NOTION_INTERNAL_PAPERS_DB_ID,
        page_size: 1
      });
      console.log('📄 Internal database has', queryResponse.results.length, 'pages (showing first 1)');
      if (queryResponse.results.length > 0) {
        console.log('🔍 Internal database properties:', Object.keys(queryResponse.results[0].properties));
      }
      
    } catch (error) {
      console.log('❌ Internal database error:', error.message);
    }
    
    // Test external database access
    console.log('\n🔄 Testing external database access...');
    try {
      const externalResponse = await notion.databases.retrieve({
        database_id: process.env.NOTION_EXTERNAL_PAPERS_DB_ID,
      });
      console.log('✅ External database accessible:', externalResponse.title?.[0]?.plain_text || 'Untitled');
      
      // Test query
      const queryResponse = await notion.databases.query({
        database_id: process.env.NOTION_EXTERNAL_PAPERS_DB_ID,
        page_size: 1
      });
      console.log('📄 External database has', queryResponse.results.length, 'pages (showing first 1)');
      if (queryResponse.results.length > 0) {
        console.log('🔍 External database properties:', Object.keys(queryResponse.results[0].properties));
      }
      
    } catch (error) {
      console.log('❌ External database error:', error.message);
    }
    
  } catch (error) {
    console.log('❌ Connection failed:', error.message);
  }
}

debugNotionConnection();
