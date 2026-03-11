# Perfect Text Overlay - パーフェクトテキストオーバーレイ

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/perfect-text-overlay.svg)](https://www.npmjs.com/package/perfect-text-overlay)

> 画像生成とテキストレンダリングを分離することで、AI生成画像の文字化け問題を解決します。

🌐 [English](README.md) | [简体中文](README.zh-CN.md) | [繁體中文](README.zh-TW.md) | **日本語** | [한국어](README.ko.md)

---

## クイックスタート

```bash
# インストール
npm install -g perfect-text-overlay

# 環境チェック
pto check

# フォントダウンロード（オプション）
pto download-fonts --all

# 使用
pto separate "タイトル'こんにちは世界'のポスターを作成"
```

## 機能概要

AIが生成した画像には、特に中国語・日本語・韓国語（CJK）などの非ラテン文字で、文字が化けたり不完全になったりする問題がよくあります。本ツールは以下のステップでこの問題を解決します：

1. **分離** プロンプト → 画像専用プロンプト + テキスト要件
2. **生成** クリーンなベース画像（お好みのAIツール使用）
3. **分析** 画像から最適なテキスト配置領域を特定
4. **レンダリング** 完璧なテキスト（プロフェッショナルなタイポグラフィ使用）

## インストール

### 要件
- Node.js 18+
- Python 3.8+
- Pythonパッケージ：`pip install Pillow numpy`

### NPMインストール（推奨）
```bash
npm install -g perfect-text-overlay
```

### Gitクローン
```bash
git clone https://github.com/stephenlzc/perfect-text-overlay
cd perfect-text-overlay
npm install
```

## CLI使用方法

```bash
# プロンプトを分離
pto separate -p "映画ポスター、タイトルは'インターステラー'"

# 画像を分析
pto analyze -i base.png -r '{"text_groups":[{"content":"こんにちは"}]}'

# テキストをレンダリング
pto render -i base.png -o final.png -p placements.json

# 完全なワークフロー
pto workflow -p "ポスター、タイトル'セール'" -i base.png -o final.png

# フォントをダウンロード
pto download-fonts --list
pto download-fonts --all
```

## Node.js API

```javascript
const { separatePrompt, analyzeImage, renderTextOnImage } = require('perfect-text-overlay');

async function createPoster() {
  // 1. プロンプトを分離
  const result = await separatePrompt('ポスター、タイトル"こんにちは"');
  
  // 2. 画像を分析（result.image_promptで画像生成後）
  const analysis = await analyzeImage('base.png', result.text_requirements);
  
  // 3. テキストをレンダリング
  await renderTextOnImage('base.png', 'final.png', 
    analysis.placements, 
    { font_style: 'modern', effects: ['shadow'] }
  );
}
```

## フォントスタイル

### 利用可能なフォント

`pto download-fonts --list` を実行すると、詳細情報付きで利用可能なフォントが表示されます。

### 言語別フォント推奨

#### 簡体字中国語
| フォントファイル | フォント名 | スタイル | 用途 |
|-----------------|-----------|---------|------|
| `NotoSansCJKsc-Bold.otf` | 源ノ角ゴシック Bold | モダン | ポスター、テックスタイル、ビジネス |
| `NotoSerifCJKsc-Bold.otf` | 源ノ明朝 Bold | 伝統 | 文化テーマ、書籍表紙、正式文書 |

#### 繁体字中国語
| フォントファイル | フォント名 | スタイル | 用途 |
|-----------------|-----------|---------|------|
| `NotoSansCJKtc-Bold.otf` | 源ノ角ゴシック TC Bold | モダン | 台湾/香港、ビジネス文書 |

#### 韓国語
| フォントファイル | フォント名 | スタイル | 用途 |
|-----------------|-----------|---------|------|
| `NotoSansCJKkr-Bold.otf` | 本ゴシック Bold | モダン | 韓国語ポスター、モダンデザイン |

#### 英語/ラテン
| フォントファイル | フォント名 | スタイル | 用途 |
|-----------------|-----------|---------|------|
| `Roboto-Bold.ttf` | Roboto Bold | モダン | テックポスター、クリーンなデザイン |
| `OpenSans-Bold.ttf` | Open Sans Bold | ヒューマニスト | Webコンテンツ、多目的使用 |

### フォントのダウンロード

```bash
# すべての利用可能なフォントを表示
pto download-fonts --list

# すべてのフォントをダウンロード
pto download-fonts --all

# 特定のフォントをダウンロード
pto download-fonts Roboto-Bold.ttf

# 複数のフォントをダウンロード
pto download-fonts Roboto-Bold.ttf OpenSans-Bold.ttf
```

## プロジェクト構造

```
perfect-text-overlay/
├── bin/cli.js              # CLIエントリ
├── lib/index.js            # Node.js API
├── scripts/                # Pythonスクリプト
│   ├── prompt_separator.py
│   ├── image_analyzer.py
│   └── text_renderer.py
├── assets/fonts/           # フォント（オンデマンドダウンロード）
└── types/                  # TypeScript定義
```

## ドキュメント

- [API Reference](API.md) - 詳細APIドキュメント
- [Contributing](CONTRIBUTING.md) - 貢献ガイド
- [CHANGELOG](CHANGELOG.md) - バージョン履歴

## ライセンス

MIT © [stephenlzc](https://github.com/stephenlzc)

---

## 🌍 他の言語

- [English](README.md) - English Documentation
- [简体中文](README.zh-CN.md) - 简体中文文档
- [繁體中文](README.zh-TW.md) - 繁體中文文檔
- [한국어](README.ko.md) - 한국어 문서
