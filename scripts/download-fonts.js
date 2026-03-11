#!/usr/bin/env node
/**
 * Font download script
 * Downloads required fonts from Google Fonts or CDN
 * This keeps the npm package size small
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const FONTS_DIR = path.join(__dirname, '..', 'assets', 'fonts');

// Font definitions with detailed descriptions
const FONTS = {
  'NotoSansCJKsc-Bold.otf': {
    url: 'https://github.com/notofonts/noto-cjk/raw/main/Sans/OTF/SimplifiedChinese/NotoSansCJKsc-Bold.otf',
    name: '思源黑体 Bold (Source Han Sans)',
    language: '简体中文 (Simplified Chinese)',
    style: '现代 / Modern',
    useCase: '海报标题、科技风格、商务场景',
    description: 'Clean, professional sans-serif font for Simplified Chinese'
  },
  'NotoSerifCJKsc-Bold.otf': {
    url: 'https://github.com/notofonts/noto-cjk/raw/main/Serif/OTF/SimplifiedChinese/NotoSerifCJKsc-Bold.otf',
    name: '思源宋体 Bold (Source Han Serif)',
    language: '简体中文 (Simplified Chinese)',
    style: '传统 / Traditional',
    useCase: '文化主题、书籍封面、正式文档',
    description: 'Elegant serif font for traditional Chinese style'
  },
  'NotoSansCJKtc-Bold.otf': {
    url: 'https://github.com/notofonts/noto-cjk/raw/main/Sans/OTF/TraditionalChinese/NotoSansCJKtc-Bold.otf',
    name: '思源黑體 Bold (Source Han Sans TC)',
    language: '繁體中文 (Traditional Chinese)',
    style: '现代 / Modern',
    useCase: '台灣/香港地區、繁體海報、商務文件',
    description: 'Modern sans-serif font for Traditional Chinese (Taiwan/Hong Kong)'
  },
  'NotoSansCJKkr-Bold.otf': {
    url: 'https://github.com/notofonts/noto-cjk/raw/main/Sans/OTF/Korean/NotoSansCJKkr-Bold.otf',
    name: '본고딕 Bold (Noto Sans CJK KR)',
    language: '한국어 (Korean)',
    style: '现代 / Modern',
    useCase: '한국어 포스터、비즈니스 문서、현대적인 디자인',
    description: 'Modern Korean font optimized for Hangul script'
  },
  'Roboto-Bold.ttf': {
    url: 'https://github.com/googlefonts/roboto/raw/main/src/hinted/Roboto-Bold.ttf',
    name: 'Roboto Bold',
    language: 'English / Latin',
    style: '现代 / Modern',
    useCase: 'English titles, tech posters, clean designs',
    description: 'Google\'s signature font, perfect for modern English text'
  },
  'OpenSans-Bold.ttf': {
    url: 'https://github.com/googlefonts/opensans/raw/main/fonts/ttf/OpenSans-Bold.ttf',
    name: 'Open Sans Bold',
    language: 'English / Latin',
    style: '人文 / Humanist',
    useCase: 'Web content, UI design, versatile usage',
    description: 'Humanist sans-serif with excellent readability'
  }
};

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, { timeout: 30000 }, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        // Follow redirect
        file.close();
        fs.unlinkSync(dest);
        downloadFile(response.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      
      if (response.statusCode !== 200) {
        file.close();
        fs.unlinkSync(dest);
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }

      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlinkSync(dest);
      reject(err);
    });
  });
}

async function downloadFonts(fontNames = null) {
  // Ensure fonts directory exists
  if (!fs.existsSync(FONTS_DIR)) {
    fs.mkdirSync(FONTS_DIR, { recursive: true });
  }

  const fontsToDownload = fontNames || Object.keys(FONTS);
  const results = { success: [], failed: [] };

  console.log('📥 Downloading fonts...\n');

  for (const fontName of fontsToDownload) {
    const fontInfo = FONTS[fontName];
    if (!fontInfo) {
      console.log(`  ⚠️  Unknown font: ${fontName}`);
      results.failed.push(fontName);
      continue;
    }

    const destPath = path.join(FONTS_DIR, fontName);
    
    // Skip if already exists
    if (fs.existsSync(destPath)) {
      console.log(`  ✓ ${fontName} (already exists)`);
      results.success.push(fontName);
      continue;
    }

    process.stdout.write(`  ⏳ ${fontName}... `);
    
    try {
      await downloadFile(fontInfo.url, destPath);
      console.log('✓');
      results.success.push(fontName);
    } catch (err) {
      console.log(`✗ (${err.message})`);
      results.failed.push(fontName);
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log(`Downloaded: ${results.success.length}/${fontsToDownload.length}`);
  
  if (results.failed.length > 0) {
    console.log(`Failed: ${results.failed.length}`);
    console.log('  Note: Fonts are optional. System fonts will be used as fallback.');
  }
  
  return results;
}

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.includes('--list')) {
    console.log('┌─────────────────────────────────────────────────────────────────────────────┐');
    console.log('│                        Available Fonts 可用字体列表                          │');
    console.log('└─────────────────────────────────────────────────────────────────────────────┘\n');
    
    // Group fonts by language
    const groups = {
      '简体中文 (Simplified Chinese)': [],
      '繁體中文 (Traditional Chinese)': [],
      '한국어 (Korean)': [],
      'English / Latin': []
    };
    
    for (const [fileName, info] of Object.entries(FONTS)) {
      if (groups[info.language]) {
        groups[info.language].push({ fileName, ...info });
      }
    }
    
    for (const [lang, fonts] of Object.entries(groups)) {
      if (fonts.length === 0) continue;
      
      console.log(`\n📁 ${lang}`);
      console.log('─'.repeat(70));
      
      for (const font of fonts) {
        const exists = fs.existsSync(path.join(FONTS_DIR, font.fileName));
        const status = exists ? '✅ Installed' : '⬜ Not installed';
        
        console.log(`\n  ${status}  ${font.fileName}`);
        console.log(`      Name:     ${font.name}`);
        console.log(`      Style:    ${font.style}`);
        console.log(`      Use for:  ${font.useCase}`);
        console.log(`      Install:  pto download-fonts ${font.fileName}`);
      }
    }
    
    console.log('\n\n┌─────────────────────────────────────────────────────────────────────────────┐');
    console.log('│                              Quick Commands                                 │');
    console.log('├─────────────────────────────────────────────────────────────────────────────┤');
    console.log('│  pto download-fonts --all       Download all fonts                          │');
    console.log('│  pto download-fonts --list      Show this list                              │');
    console.log('│  pto download-fonts <name>      Download specific font                      │');
    console.log('└─────────────────────────────────────────────────────────────────────────────┘\n');
    
    process.exit(0);
  }
  
  if (args.includes('--all')) {
    downloadFonts().then(() => process.exit(0));
  } else if (args.length > 0) {
    downloadFonts(args).then(() => process.exit(0));
  } else {
    // Download minimal set by default
    downloadFonts(['NotoSansCJKsc-Bold.otf', 'Roboto-Bold.ttf']).then(() => process.exit(0));
  }
}

module.exports = { downloadFonts, FONTS };
