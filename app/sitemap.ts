import type {MetadataRoute} from 'next';
import {origin} from './seo';
import {articles} from './stories';

const updated = new Date('2026-09-26');

export default function sitemap(): MetadataRoute.Sitemap {
 const pages: {path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']}[] = [
  {path: '', priority: 1, changeFrequency: 'weekly'},
  {path: '/game-worlds', priority: 0.9, changeFrequency: 'weekly'},
  {path: '/blog', priority: 0.9, changeFrequency: 'weekly'},
  {path: '/faq', priority: 0.8, changeFrequency: 'weekly'},
  {path: '/about', priority: 0.6, changeFrequency: 'monthly'},
  {path: '/contact', priority: 0.5, changeFrequency: 'monthly'},
 ];
 return [
  ...pages.map(page => ({
   url: origin + page.path,
   lastModified: updated,
   changeFrequency: page.changeFrequency,
   priority: page.priority,
  })),
  ...articles.map(article => ({
   url: origin + '/journal/' + article.slug,
   lastModified: new Date(article.reviewedAt || '2026-09-21'),
   changeFrequency: 'monthly' as const,
   priority: article.slug.startsWith('juwa777') ? 0.8 : 0.7,
  })),
 ];
}
