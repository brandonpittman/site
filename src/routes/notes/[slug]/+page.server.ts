import { error } from '@sveltejs/kit';
import matter, { type Input } from 'gray-matter';
import { marked } from 'marked';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import bash from 'highlight.js/lib/languages/bash';
import json from 'highlight.js/lib/languages/json';
import markdown from 'highlight.js/lib/languages/markdown';

// Register languages
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('html', xml);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('css', css);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('sh', bash);
hljs.registerLanguage('json', json);
hljs.registerLanguage('markdown', markdown);

// Configure marked with highlight.js
marked.use({
	renderer: {
		code(code, lang) {
			const language = lang && hljs.getLanguage(lang) ? lang : 'plaintext';
			try {
				const highlighted = hljs.highlight(code, { language }).value;
				return `<pre><code class="hljs language-${language}">${highlighted}</code></pre>`;
			} catch {
				// Fallback to unhighlighted code
				return `<pre><code>${code}</code></pre>`;
			}
		}
	}
});

// Load all posts at module scope
const noteModules = import.meta.glob('/content/notes/*.md', {
	eager: true,
	query: '?raw',
	import: 'default'
});

export async function load({ params }) {
	const path = `/content/notes/${params.slug}.md`;
	const content = noteModules[path];

	if (!content) error(404, 'Post not found');

	const { data, content: markdown } = matter(content as Input);

	return {
		slug: params.slug,
		meta: data,
		content: marked(markdown)
	};
}
