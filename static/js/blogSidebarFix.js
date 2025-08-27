/**
 * Blog Sidebar Active Post Color Fix
 * 
 * This script directly sets the color of the active blog post in the sidebar
 * to bypass CSS specificity issues with Docusaurus's generated classes.
 */

function fixBlogSidebarActivePost() {
  // Function to apply the active post styling
  function applyActivePostStyling() {
    // Find all elements with aria-current="page" in the blog sidebar area
    const sidebarSelectors = [
      '.theme-blog-sidebar [aria-current="page"]',
      '.blogSidebarDesktop_node_modules-\\@docusaurus-theme-classic-lib-theme-BlogSidebar-Desktop-styles-module [aria-current="page"]',
      '.blogSidebarContainer_node_modules-\\@docusaurus-theme-classic-lib-theme-BlogLayout-styles-module [aria-current="page"]',
      'aside [aria-current="page"]',
      '.col--3 [aria-current="page"]'
    ];

    let activeElement = null;
    
    // Try each selector until we find the active element
    for (const selector of sidebarSelectors) {
      try {
        activeElement = document.querySelector(selector);
        if (activeElement) break;
      } catch (e) {
        // Skip invalid selectors (CSS escaping issues)
        continue;
      }
    }

    // Fallback: find any aria-current="page" element and check if it's in a sidebar context
    if (!activeElement) {
      const allActiveElements = document.querySelectorAll('[aria-current="page"]');
      for (const element of allActiveElements) {
        const parent = element.closest('aside, .theme-blog-sidebar, .col--3');
        if (parent) {
          activeElement = element;
          break;
        }
      }
    }

    if (activeElement) {
      // Check if we're in dark mode
      const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
      
      if (isDarkMode) {
        // Apply light blue color for dark mode
        activeElement.style.setProperty('color', '#63b3ed', 'important');
        activeElement.style.setProperty('font-weight', '600', 'important');
        activeElement.style.setProperty('text-decoration', 'none', 'important');
        
        console.log('✅ Applied dark mode styling to active blog post:', activeElement.textContent?.trim());
      } else {
        // Apply appropriate color for light mode
        activeElement.style.setProperty('color', '#63b3ed', 'important');
        activeElement.style.setProperty('font-weight', '600', 'important');
        activeElement.style.setProperty('text-decoration', 'none', 'important');
        
        console.log('✅ Applied light mode styling to active blog post:', activeElement.textContent?.trim());
      }
    } else {
      console.log('ℹ️ No active blog post found in sidebar');
    }
  }

  // Apply styling immediately if DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyActivePostStyling);
  } else {
    applyActivePostStyling();
  }

  // Also apply when theme changes (light/dark mode toggle)
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && 
          mutation.attributeName === 'data-theme' && 
          mutation.target === document.documentElement) {
        // Theme changed, reapply styling
        setTimeout(applyActivePostStyling, 100);
      }
    });
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
  });

  // Reapply styling when navigating between blog posts (SPA navigation)
  let lastUrl = location.href;
  new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      // URL changed, reapply styling after a short delay
      setTimeout(applyActivePostStyling, 200);
    }
  }).observe(document, { subtree: true, childList: true });
}

// Initialize the fix
fixBlogSidebarActivePost();
