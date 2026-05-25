# [AI-Chat-Export](https://ai.ssoggy.me)

Browser extension to share and export your [Claude](https://claude.ai) chats with one click.

[![Visit AI-Chat-Export](https://img.shields.io/badge/Visit-AI-Chat-Export-blue.svg?logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNEOTc3NTciIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1zaGFyZS0yIj48Y2lyY2xlIGN4PSIxOCIgY3k9IjUiIHI9IjMiLz48Y2lyY2xlIGN4PSI2IiBjeT0iMTIiIHI9IjMiLz48Y2lyY2xlIGN4PSIxOCIgY3k9IjE5IiByPSIzIi8+PGxpbmUgeDE9IjguNTkiIHgyPSIxNS40MiIgeTE9IjEzLjUxIiB5Mj0iMTcuNDkiLz48bGluZSB4MT0iMTUuNDEiIHgyPSI4LjU5IiB5MT0iNi41MSIgeTI9IjEwLjQ5Ii8+PC9zdmc+)](https://ai.ssoggy.me)

## Features

- One-click sharing of Claude AI conversations
- Instant URL generation
- Supports syntax highlighting for code and artifacts, including Mermaid and JSON
- Works directly with Claude's web interface

## How It Works

When you share a conversation, the extension stores the conversation in AI-Chat-Export's database, not Claude's. Each conversation gets a unique URL, similar to an unlisted YouTube video. The URL can be shared with anyone, but it won't show up in Google search results.
Shared conversations are served from AI-Chat-Export's database, not directly from Claude.

*Important: While the URL is private and not searchable, anyone with the URL can still view the conversation. Please avoid sharing sensitive or personal information.*

## How to Use

1. Open [Claude](https://claude.ai) in your browser
2. Start or continue a conversation with Claude
3. Click the **AI-Chat-Export** button in the top-right corner (next to Claude's native Share button, separated by a divider)
4. A menu appears with options:
   - **Share to AI-Chat-Export:** Uploads the conversation and copies the link to your clipboard as an alternative to Claude's native share option
   - **Export:** Downloads the conversation as HTML, Markdown, plain text, JSON, or Word (.docx)

## Tech Stack

- **Frontend**: React, TailwindCSS
- **Backend**: Cloudflare Workers
- **Database**: Cloudflare D1

## Installation

### Chrome

For development/debugging:

1. Clone this repository:

   ```bash
   git clone https://github.com/maaren/ai-chat-export.git
   ```

2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the `extension` folder from the cloned repository

### Firefox

For development/debugging:

1. Clone this repository:

   ```bash
   git clone https://github.com/maaren/ai-chat-export.git
   ```

2. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`
3. Click "Load Temporary Add-on..."
4. Select the `manifest.json` file inside the `extension` folder from the cloned repository

## Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest new features
- Submit pull requests

## Links

- [Website](https://ai.ssoggy.me)

---

## Star History

<!-- markdownlint-disable MD033 -->
<a href="https://www.star-history.com/?repos=maaren%2Fai-chat-export&type=date&legend=top-left">
 <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/image?repos=maaren/ai-chat-export&type=date&theme=dark&legend=top-left" />
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/image?repos=maaren/ai-chat-export&type=date&legend=top-left" />
    <img alt="Star History Chart" src="https://api.star-history.com/image?repos=maaren/ai-chat-export&type=date&legend=top-left" />
 </picture>
</a>
<!-- markdownlint-enable MD033 -->

Made with ☕ for the Claude community


NOTE: 
I didn't make the core of thi sproject, but the repo owner didn't want to merge my pull request that would fix the repo, so I guess use this fork now
about usage of ai: gemini helped me with parts of my version of ai-chat-export
