import type {MetadataRoute} from 'next';
import {origin} from './seo';
import {articles} from './stories';
export default function sitemap():MetadataRoute.Sitemap{return ['','/game-worlds','/blog','/contact',...articles.map(a=>'/journal/'+a.slug)].map(path=>({url:origin+path}))}

