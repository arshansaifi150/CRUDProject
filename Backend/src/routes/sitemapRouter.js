import express from 'express';
import { SitemapStream, streamToPromise } from 'sitemap';
import { createGzip } from 'zlib';
import Post from '../models/Post.js'
import {Property} from '../models/models.js'

const router = express.Router();

let sitemap;

router.get('/', async (req, res) => {
  res.header('Content-Type', 'application/xml');
  res.header('Content-Encoding', 'gzip');

  // If we have a cached sitemap, send it
  if (sitemap) {
    res.send(sitemap);
    return;
  }

  try {
    const smStream = new SitemapStream({ hostname: 'http://localhost:5173' });
    const pipeline = smStream.pipe(createGzip());

    // Add static pages
    smStream.write({ url: '/', changefreq: 'daily', priority: 1.0 });
    smStream.write({ url: '/about', changefreq: 'monthly', priority: 0.8 });
    smStream.write({ url: '/contact', changefreq: 'monthly', priority: 0.8 });
    smStream.write({ url: '/careers', changefreq: 'weekly', priority: 0.7 });
    smStream.write({ url: '/properties', changefreq: 'daily', priority: 0.9 });
    smStream.write({ url: '/blog', changefreq: 'daily', priority: 0.9 });
    
    
    smStream.write({ url: '/schedule-visit', changefreq: 'monthly', priority: 0.7 });
    smStream.write({ url: '/enquiry', changefreq: 'monthly', priority: 0.7 });

    // Add dynamic pages
    const properties = await Property.find({}, 'title');
    properties.forEach((property) => {
      smStream.write({ url: `/properties/${property.title}`, changefreq: 'weekly', priority: 0.8 });
    });

    const posts = await Post.find({}, 'slug');
    posts.forEach((post) => {
      smStream.write({ url: `/blog/${post.slug}`, changefreq: 'weekly', priority: 0.7 });
    });

    smStream.end();

    // Cache the response
    sitemap = await streamToPromise(pipeline);

    // Stream the response
    pipeline.pipe(res).on('error', (e) => {throw e;});
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
});

export default router;