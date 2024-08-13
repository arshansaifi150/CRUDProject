import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser/src/fxp';

function Sitemap() {
  const [sitemapData, setSitemapData] = useState(null);

  useEffect(() => {
    async function fetchSitemap() {
      try {
        const response = await axios.get('http://localhost:4000/sitemap.xml', {
          responseType: 'text'
        });
        console.log(response)
        const parser = new XMLParser();
        const result = parser.parse(response.data);
        
        if (result.urlset && result.urlset.url) {
          setSitemapData(Array.isArray(result.urlset.url) ? result.urlset.url : [result.urlset.url]);
        } else {
          console.error('Unexpected XML structure');
        }
      } catch (error) {
        console.error('Error fetching or parsing sitemap:', error);
      }
    }

    fetchSitemap();
  }, []);

  if (!sitemapData) {
    return <div>Loading sitemap...</div>;
  }

  return (
    <div>
      <h1>Sitemap</h1>
      <ul>
        {sitemapData.map((url, index) => (
          <li key={index}>
            <a href={url.loc}>{url.loc}</a>
            {url.lastmod && <p>Last modified: {url.lastmod}</p>}
            {url.changefreq && <p>Change frequency: {url.changefreq}</p>}
            {url.priority && <p>Priority: {url.priority}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sitemap;