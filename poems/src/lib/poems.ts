import { getCollection, type CollectionEntry } from 'astro:content';

export type Poem = CollectionEntry<'poems'>;
export type Category = 'ghazal' | 'kavita';

export const POET = {
  name: 'डॉ. प्रणव गौतम',
  affiliation: 'राजकीय आयुर्वेदिक महाविद्यालय एवं चिकित्सालय, बरेली',
};

/** The first non-empty line of a poem — used for list previews & meta. */
export function firstLine(body: string): string {
  for (const line of body.replace(/\r\n/g, '\n').split('\n')) {
    if (line.trim()) return line.trim();
  }
  return '';
}

/** First couplet/two lines — used in OG descriptions and featured blocks. */
export function opening(body: string, count = 2): string[] {
  const lines = body
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
  return lines.slice(0, count);
}

/** Newest first; ties broken alphabetically (Hindi collation). */
export function sortPoems(poems: Poem[]): Poem[] {
  return [...poems].sort((a, b) => {
    const da = a.data.date ? a.data.date.getTime() : 0;
    const db = b.data.date ? b.data.date.getTime() : 0;
    if (db !== da) return db - da;
    return a.data.title.localeCompare(b.data.title, 'hi');
  });
}

export async function getSortedPoems(category?: Category): Promise<Poem[]> {
  let poems = await getCollection('poems');
  if (category) poems = poems.filter((p) => p.data.category === category);
  return sortPoems(poems);
}
