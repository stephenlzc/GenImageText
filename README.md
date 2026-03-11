# Perfect Text Overlay

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/perfect-text-overlay.svg)](https://www.npmjs.com/package/perfect-text-overlay)

> Fix imperfect AI-generated text in images by separating image generation and text overlay.

🌐 **English** | [简体中文](README.zh-CN.md) | [繁體中文](README.zh-TW.md) | [日本語](README.ja.md) | [한국어](README.ko.md)

---

## Overview

AI-generated images often contain garbled or imperfect text, especially for Chinese, Japanese, Korean (CJK) and other non-Latin scripts. This tool solves this problem by separating image generation and text rendering into two distinct steps:

1. **Generate a clean base image** without text
2. **Analyze optimal text placement zones**
3. **Render text** with professional typography and effects

---

## For AI Agents (Natural Language Installation)

Copy and paste this prompt to your LLM agent (Claude Code, Kimi Code, Cursor, etc.):

```
Install the perfect-text-overlay skill to my workspace. 
Clone from: https://github.com/stephenlzc/perfect-text-overlay
Set up all dependencies and verify the installation by running a test with Chinese text extraction.
```

---

## Quick Start

```bash
# Install
npm install -g perfect-text-overlay

# Check environment
pto check

# Download fonts (optional)
pto download-fonts --all

# Use it
pto separate "Generate a poster with 'Summer Sale' title"
```

---

## Installation

### Requirements
- Node.js 18+
- Python 3.8+
- Python packages: `pip install Pillow numpy`

### NPM
```bash
npm install -g perfect-text-overlay
```

### Git Clone
```bash
git clone https://github.com/stephenlzc/perfect-text-overlay
cd perfect-text-overlay
npm install
```

---

## CLI Usage

```bash
# Separate prompt
pto separate -p "Movie poster with 'Interstellar' title"

# Analyze image
pto analyze -i base.png -r '{"text_groups":[{"content":"Hello"}]}'

# Render text
pto render -i base.png -o final.png -p placements.json

# Complete workflow
pto workflow -p "Poster with 'Sale' title" -i base.png -o final.png

# Download fonts
pto download-fonts --list
pto download-fonts --all
```

---

## Node.js API

```javascript
const { separatePrompt, analyzeImage, renderTextOnImage } = require('perfect-text-overlay');

async function createPoster() {
  // 1. Separate
  const result = await separatePrompt('Poster with "Hello" title');
  
  // 2. Analyze (after generating image with result.image_prompt)
  const analysis = await analyzeImage('base.png', result.text_requirements);
  
  // 3. Render
  await renderTextOnImage('base.png', 'final.png', 
    analysis.placements, 
    { font_style: 'modern', effects: ['shadow'] }
  );
}
```

---

## Font Styles

### Available Fonts

Run `pto download-fonts --list` to see all available fonts with detailed information.

### Font Recommendations by Language

#### 简体中文 (Simplified Chinese)
| Font File | Font Name | Style | Best For |
|-----------|-----------|-------|----------|
| `NotoSansCJKsc-Bold.otf` | 思源黑体 Bold | Modern | Posters, tech style, business |
| `NotoSerifCJKsc-Bold.otf` | 思源宋体 Bold | Traditional | Cultural themes, formal documents |

#### 繁體中文 (Traditional Chinese)
| Font File | Font Name | Style | Best For |
|-----------|-----------|-------|----------|
| `NotoSansCJKtc-Bold.otf` | 思源黑體 Bold | Modern | Taiwan/Hong Kong, business docs |

#### 한국어 (Korean)
| Font File | Font Name | Style | Best For |
|-----------|-----------|-------|----------|
| `NotoSansCJKkr-Bold.otf` | 본고딕 Bold | Modern | Korean posters, modern design |

#### English / Latin
| Font File | Font Name | Style | Best For |
|-----------|-----------|-------|----------|
| `Roboto-Bold.ttf` | Roboto Bold | Modern | Tech posters, clean designs |
| `OpenSans-Bold.ttf` | Open Sans Bold | Humanist | Web content, versatile use |

### Download Fonts

```bash
# List all available fonts with details
pto download-fonts --list

# Download all fonts
pto download-fonts --all

# Download specific font
pto download-fonts NotoSansCJKsc-Bold.otf

# Download multiple fonts
pto download-fonts NotoSansCJKsc-Bold.otf Roboto-Bold.ttf
```

---

## Project Structure

```
perfect-text-overlay/
├── bin/cli.js              # CLI entry
├── lib/index.js            # Node.js API
├── scripts/                # Python scripts
│   ├── prompt_separator.py
│   ├── image_analyzer.py
│   └── text_renderer.py
├── assets/fonts/           # Fonts (downloaded on demand)
└── types/                  # TypeScript definitions
```

---

## Documentation

- [API Reference](API.md) - Detailed API documentation
- [Contributing](CONTRIBUTING.md) - Contribution guidelines
- [CHANGELOG](CHANGELOG.md) - Version history

---

## License

MIT © [stephenlzc](https://github.com/stephenlzc)

---

## 🌍 Languages

- [简体中文](README.zh-CN.md) - 简体中文文档
- [繁體中文](README.zh-TW.md) - 繁體中文文檔  
- [日本語](README.ja.md) - 日本語ドキュメント
- [한국어](README.ko.md) - 한국어 문서
