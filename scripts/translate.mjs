/**
 * Auto-translation script using Anthropic API (Claude)
 *
 * Usage:
 *   node scripts/translate.mjs <slug>
 *
 * Example:
 *   node scripts/translate.mjs my-new-article
 *
 * The script reads src/content/blog/ru/<slug>.md and translates it
 * into en, uk, de — saving the results alongside the original.
 *
 * Requires: ANTHROPIC_API_KEY in environment or .env file
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = path.join(__dirname, '../src/content/blog');

const LANGS = {
  en: 'English',
  uk: 'Ukrainian',
  de: 'German',
};

async function callClaude(prompt) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY not set. Add it to your environment or .env file.');
  }

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-opus-4-5',
      max_tokens: 8192,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!res.ok) throw new Error(`API error: ${res.status} ${await res.text()}`);
  const data = await res.json();
  return data.content[0].text;
}

async function translateArticle(slug) {
  const sourcePath = path.join(BLOG_DIR, 'ru', `${slug}.md`);

  if (!fs.existsSync(sourcePath)) {
    console.error(`❌ Source file not found: ${sourcePath}`);
    process.exit(1);
  }

  const source = fs.readFileSync(sourcePath, 'utf-8');
  console.log(`📄 Source: ${sourcePath}`);

  for (const [langCode, langName] of Object.entries(LANGS)) {
    const targetPath = path.join(BLOG_DIR, langCode, `${slug}.md`);

    if (fs.existsSync(targetPath)) {
      console.log(`⏭️  ${langCode.toUpperCase()} already exists, skipping.`);
      continue;
    }

    console.log(`🌐 Translating to ${langName}...`);

    const prompt = `You are a professional translator. Translate the following Markdown blog article from Russian to ${langName}.

Rules:
- Keep ALL Markdown formatting exactly (headings, bold, links, images, code, HTML tags, video tags, details/summary)
- Keep frontmatter structure (title, description, pubDate, tags, heroImage) — translate title and description to ${langName}, keep everything else identical
- Tags array: keep tags as-is (they are English labels)
- Keep "© Seal" and "© Тюлень" as "© Seal"
- Keep URLs, image paths, and all technical identifiers unchanged
- Translate naturally and professionally — not word-for-word
- The author writes in a casual, ironic style — preserve the tone

Article to translate:

${source}

Return ONLY the translated Markdown file content, nothing else.`;

    const translated = await callClaude(prompt);
    fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    fs.writeFileSync(targetPath, translated.trim(), 'utf-8');
    console.log(`✅ Saved: ${targetPath}`);
  }

  console.log('\n✨ Done! Review the files and commit when ready.');
}

const slug = process.argv[2];
if (!slug) {
  console.error('Usage: node scripts/translate.mjs <slug>');
  console.error('Example: node scripts/translate.mjs my-new-article');
  process.exit(1);
}

translateArticle(slug).catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
