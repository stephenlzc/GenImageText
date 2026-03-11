# GenImageText - 完美文字叠加

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> ⚠️ **重要提示**：这不是图像生成器。它为您的 AI 工具生成的图像添加完美文字。

> 通过分离图像生成和文字渲染，解决 AI 生成图像中文字错乱的问题。

![GenImageText Hero](https://raw.githubusercontent.com/stephenlzc/GenImageText/main/assets/hero.png)

🌐 [English](README.md) | **简体中文** | [繁體中文](README.zh-TW.md) | [日本語](README.ja.md) | [한국어](README.ko.md)

---

## 本工具的功能

AI 生成的图像经常包含错乱或不完美的文字，特别是对于中文、日文、韩文（CJK）等非拉丁文字。**本工具通过以下方式解决这个问题**：

1. **本技能** 分离您的提示词 → 纯图像提示词 + 文字需求
2. **您的 AI 工具** 生成干净的基础图像（Midjourney、DALL-E、Stable Diffusion 等）
3. **本技能** 分析图像找出最佳文字放置区域
4. **本技能** 渲染完美的文字（使用专业排版）

---

## 支持的 AI 图像生成器

第 2 步（图像生成）可以使用以下**任意**工具：

| 工具 | 平台 | 最佳用途 |
|------|------|----------|
| **Midjourney** | Discord | 高质量艺术图片 |
| **DALL-E 3** | ChatGPT、OpenAI API | 易用，prompt 理解好 |
| **Stable Diffusion** | Local、Hugging Face、Replicate | 开源，可定制 |
| **Google Gemini/Imagen** | Google AI Studio、Gemini Pro | Google 生态集成 |
| **Adobe Firefly** | Adobe Creative Suite | 商业使用安全 |
| **Microsoft Bing Image Creator** | Bing、Microsoft Designer | 免费，DALL-E 3 驱动 |
| **Flux.1** | API、Local | 高质量开源模型 |
| **Leonardo.ai** | Web、App | 游戏资源，概念艺术 |
| **Ideogram** | Web | 图片中文字渲染 |
| **Playground AI** | Web | 免费层可用 |

**关键点**：本技能**不生成图像**。它只给上述工具生成的图像添加文字。

---

## 自然语言安装（适用于 AI Agent）

复制并粘贴以下提示词到您的 LLM Agent（Claude Code、Kimi Code、Cursor 等）：

```
在我的工作区安装 GenImageText 技能。
从以下地址克隆：https://github.com/stephenlzc/GenImageText
设置所有依赖项，并通过运行中文文本提取测试来验证安装。
```

---

## 安装

### 环境要求
- Python 3.8+
- Python 包：`pip install Pillow numpy`

### Git 克隆

```bash
git clone https://github.com/stephenlzc/GenImageText
cd GenImageText
```

---

## 使用方法

### 步骤 1：分离提示词（本技能）

```python
from scripts.prompt_separator import separate_prompt

result = separate_prompt("电影海报，标题写'星际穿越'")
# result['image_prompt']: 不含文字的纯视觉描述
# result['text_requirements']: 结构化文字数据
```

### 步骤 2：生成基础图像（您的 AI 工具）

> ⚠️ **此步骤使用您的 AI 图像生成器，不是本技能。**

使用 `image_prompt` 通过您喜欢的 AI 图像生成器生成图像：
- **Midjourney** - 基于 Discord 的生成
- **DALL-E 3**（ChatGPT Plus、OpenAI API）
- **Stable Diffusion** - 本地或云端
- **Google Gemini/Imagen**
- **Adobe Firefly**
- **Microsoft Bing Image Creator**（免费）
- **任何您喜欢的其他 AI 图像工具**

### 步骤 3：分析图像（本技能）

```python
from scripts.image_analyzer import analyze_image, get_text_placement_suggestions

analysis = analyze_image("base_image.png", text_requirements)
placements = get_text_placement_suggestions(analysis, text_requirements)
```

### 步骤 4：渲染文字（本技能）

```python
from scripts.text_renderer import render_text_on_image

output_path = render_text_on_image(
    image_path="base_image.png",
    output_path="final_image.png",
    placements=placements,
    user_choices={
        "font_style": "modern",
        "effects": ["shadow", "outline"]
    }
)
```

---

## 字体处理

字体按以下优先级加载：

1. **用户提供的字体路径**：如果指定了
2. **Skill 资源**：检查 `assets/fonts/` 目录
3. **系统字体**：搜索常见系统字体目录
4. **回退**：默认 PIL 字体

### 按语言推荐字体

#### 简体中文
| 字体文件 | 字体名称 | 风格 | 适用场景 |
|---------|---------|------|---------|
| `NotoSansCJKsc-Bold.otf` | 思源黑体 Bold | 现代 | 海报标题、科技风格、商务场景 |
| `NotoSerifCJKsc-Bold.otf` | 思源宋体 Bold | 传统 | 文化主题、书籍封面、正式文档 |

#### 繁體中文
| 字体文件 | 字体名称 | 风格 | 适用场景 |
|---------|---------|------|---------|
| `NotoSansCJKtc-Bold.otf` | 思源黑體 Bold | 现代 | 台灣/香港地區、商務文件 |

#### 韩文
| 字体文件 | 字体名称 | 风格 | 适用场景 |
|---------|---------|------|---------|
| `NotoSansCJKkr-Bold.otf` | 본고딕 Bold | 现代 | 한국어 포스터、現代적 디자인 |

#### 英文/拉丁
| 字体文件 | 字体名称 | 风格 | 适用场景 |
|---------|---------|------|---------|
| `Roboto-Bold.ttf` | Roboto Bold | 现代 | 科技海报、简洁设计 |
| `OpenSans-Bold.ttf` | Open Sans Bold | 人文 | 网页内容、通用场景 |

### 下载字体

您可以从 Google Fonts 或 Noto Fonts 手动下载字体并放入 `assets/fonts/` 目录：

- **Noto CJK 字体**：https://www.google.com/get/noto/
- **Roboto**：https://fonts.google.com/specimen/Roboto
- **Open Sans**：https://fonts.google.com/specimen/Open+Sans

所有字体均可免费商用，采用 SIL Open Font License 或 Apache License 2.0 许可。

---

## 项目结构

```
GenImageText/
├── scripts/                # Python 脚本
│   ├── prompt_separator.py
│   ├── image_analyzer.py
│   └── text_renderer.py
├── assets/fonts/           # 字体目录
└── references/             # 参考材料
```

---

## 授权

MIT © [stephenlzc](https://github.com/stephenlzc)

---

## 🌍 其他语言

- [English](README.md) - English Documentation
- [繁體中文](README.zh-TW.md) - 繁體中文文檔
- [日本語](README.ja.md) - 日本語ドキュメント
- [한국어](README.ko.md) - 한국어 문서
