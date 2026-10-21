# Changelog

All notable changes to this portfolio hub are documented here.

## 2026-10-21 — v1.0.4

### Added

- **社交预览标签（og / twitter）补到 7 个页面。** 此前整站只有 `ai-video-portfolio.html`
  带 og 标签，其余 7 个页面（含入口 `index.html`）一个都没有。把链接发到微信、飞书、
  Slack、Twitter 时，这些页面转出来是一块没有标题、没有描述、没有图的空白卡片。
  现在补上 `og:type` / `og:title` / `og:description` / `og:url` / `og:image` 与对应的
  twitter 字段，并给每个页面写了各自的 `description` 和 `twitter:card`。
  封面图直接复用仓库已有的 `shots/*.jpg`，不引入新资源。

### Verified in this pass

- 改动方式为**字节级插入**：只在 `</title>` 之后追加一段 meta，文件其余部分
  与改动前逐字节一致（9 个文件全部做了「删掉插入块后是否等于原文件」的校验）。
- 每个 `og:image` / `og:url` 都用 HTTP 请求实测过，返回 200。
- GitHub Pages 状态 `built`。

### Note

- **此前记录的「`ai-video-portfolio.html` 的 `og:image` 是畸形 base64 拼接」已经不成立。**
  本次实查远程 `main`，该文件的 `og:image` 是正确的
  `https://jin2004-cmd.github.io/ai-video-portfolio/assets/dragon-v3.jpg`。该问题在
  2026-10-19 那轮已修复，这条记录留在这里是为了避免以后再当作未修项反复处理。
- 仓库已有 `README.md` 与 `LICENSE`（早期记录中的「缺 README / 无 LICENSE」同样已不成立）。

## 2026-10-19 — v1.0.3

### Fixed

- **v1.0.2 removed a number that was actually correct.** Re-reading `data/compliance_rules.json`
  in `ecom-script-agent` directly: `banned_words` holds **4 rules** (`ads_absolute` / `medical_cure`
  / `medical_absolute` / `common_exaggeration`) and `auto_fix` holds **27 replacement entries**.
  So the original card text — "4 大类违禁词校验 + 27 条自动替换" — was right, and `27` appears
  **twice in this project with two different meanings**: 27 auto-replacements and 27 unit tests.
  Both are real. The v1.0.2 edit had treated one meaning as evidence that the other was fabricated.
  The card now reads: "4 条违禁词规则（通用 2 + 医疗 2）+ 27 条可修复表述自动替换表 +
  医疗合规提示语；19 条真实爆款脚本库，27 个单元测试覆盖".

## 2026-10-19 — v1.0.2

### Fixed

- **A number on the hub page did not survive a click-through (later corrected — see v1.0.3).**
  The ecom-script-agent card claimed "4 大类违禁词校验 + **27 条自动替换**". This entry assumed
  `27` referred only to the unit-test count and rewrote the card accordingly. That assumption was
  wrong: the repository does contain 27 auto-replacement entries. The correction is recorded in
  v1.0.3 above rather than being silently reverted, so the reasoning stays auditable.

### Verified in this pass

- 19 original scripts (6 pain / 6 reverse / 7 scenario) — counted from
  `data/original_scripts/*.json` in `ecom-script-agent`.
- 27 unit tests — counted `def test_` across the four files in `技术源码/tests/`.

## 2026-10-19 — v1.0.1

### Added

- `README.md` — what the hub contains, how to use it offline, the privacy note, and the
  two-layer LLM output quality gate shared by TalkCal / DayPilot / ecom-script-agent.
- `LICENSE` (MIT) — the repository previously shipped no license at all.
- `CHANGELOG.md` (this file).

### Fixed

- **`og:image` was a malformed concatenation.** The meta tag read
  `https://jin2004-cmd.github.io/ai-video-portfolio/data:image/jpeg;base64,/9j/4AAQ…` —
  a URL glued onto a base64 payload, which is not a resolvable address. Any share of the
  link in WeChat / Feishu / DingTalk rendered a broken preview thumbnail.
  It now points at a real asset: `https://jin2004-cmd.github.io/ai-video-portfolio/assets/dragon-v3.jpg`.
  Removing the inlined base64 also shrank `ai-video-portfolio.html` from 2,187,330 to 1,974,635 bytes.

### Not changed

- No new works were added. No work page was rewritten. This release is documentation and
  one bug fix only.

## 2026-10-18 — v1.0.0 (first baseline)

### Added

- The hub itself: `index.html` as a single entry, six self-contained work pages
  (`ai-video-portfolio`, `hou-storyboard`, `daypilot`, `ecom-script-agent`, `offeragent`,
  `ad-compliance`), the full TalkCal application, and seven `shots/*.jpg` thumbnails.

### Enabled

- GitHub Pages served from `main` `/` on 2026-10-19. Before that the site returned 404 because
  Pages had never been switched on; the files were already present.

### Known gaps

- Video assets are hosted off-repo to keep the bundle small, so the video pages need a network
  connection to play; offline they show poster frames and captions only.
- The `*.workers.dev` mirrors linked as "在线版（免翻墙）" could not be verified from the author's
  work network — its DNS resolves `*.workers.dev` to Meta-owned IP space, which indicates
  local DNS interception rather than a broken site. Status from a normal network: unconfirmed.
