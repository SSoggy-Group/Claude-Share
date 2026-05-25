import { ChatGPTParser } from './parsers/chatgpt.js';
import { GeminiParser } from './parsers/gemini.js';
import { ClaudeParser } from './parsers/claude.js';
import { QwenParser } from './parsers/qwen.js';
import { PerplexityParser } from './parsers/perplexity.js';
import { DeepSeekParser } from './parsers/deepseek.js';
import { MetaParser } from './parsers/meta.js';
import { MistralParser } from './parsers/mistral.js';
import { GoogleSearchAIParser } from './parsers/google_search_ai.js';

const parsers = [
  new ChatGPTParser(),
  new GeminiParser(),
  new ClaudeParser(),
  new QwenParser(),
  new PerplexityParser(),
  new DeepSeekParser(),
  new MetaParser(),
  new MistralParser(),
  new GoogleSearchAIParser(),
];

let activeParser = null;

function detectParser() {
  const currentUrl = window.location.href;
  activeParser = parsers.find((p) => p.isAvailable(currentUrl));
}

detectParser();

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getMessages') {
    if (!activeParser) {
      sendResponse({ error: 'No parser available for this site.' });
      return true;
    }

    (async () => {
      try {
        const conversation = await activeParser.parse({ full: true });
        
        function getPlatformSource() {
            const hostname = window.location.hostname;
            if (hostname.includes('claude.ai')) return 'claude';
            if (hostname.includes('chatgpt.com')) return 'chatgpt';
            if (hostname.includes('deepseek.com')) return 'deepseek';
            if (hostname.includes('mistral.ai')) return 'mistral';
            if (hostname.includes('gemini.google.com')) return 'gemini';
            if (hostname.includes('qwenlm.ai')) return 'qwen';
            if (hostname.includes('meta.ai')) return 'meta';
            if (hostname.includes('perplexity.ai')) return 'perplexity';
            if (hostname.includes('google.com')) return 'google';
            return 'claude';
        }
        const platformSource = getPlatformSource();

        const mappedContent = conversation.messages.map(msg => {
            const roleLower = msg.role ? msg.role.toLowerCase() : '';
            const source = (roleLower === 'user' || roleLower === 'human') ? 'user' : platformSource;
            let message = msg.content || '';
            let thinking = msg.thinking || '';

            // Auto-extract <think> tags (common in DeepSeek)
            const thinkMatch = message.match(/<think>([\s\S]*?)<\/think>/i);
            if (thinkMatch) {
                thinking = thinkMatch[1].trim();
                message = message.replace(/<think>([\s\S]*?)<\/think>/i, '').trim();
            }

            return {
                source,
                message,
                ...(thinking && { thinking })
            };
        });

        sendResponse({ 
            messages: {
                title: conversation.title || 'Conversation',
                content: mappedContent
            }
        });
      } catch (e) {
        console.error('AI Export Error:', e);
        sendResponse({ error: e.message || String(e) });
      }
    })();
    return true; // Keep channel open
  }
});
