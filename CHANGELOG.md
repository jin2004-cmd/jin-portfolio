# Changelog

All notable changes to this portfolio hub are documented here.

## 2026-10-27 — v1.5.0

### Added

- **新增作品页《聚光灯效应》**（`spotlight.html`）。52 秒水墨卡点短片，
  用「眼睛 → 镜子 → 灯」三个意象把心理学概念讲成一次情绪反转：
  前 17 秒制造「被围观」的焦虑，**17.44 s 原曲 drop 处全屏反白、墨点炸开**——
  「没人在看。他们都在看自己。」
  - 页面规格沿用 `qiuzhao.html` / `c-loop.html`：返回链接 / kicker / 播放器 /
    四格事实条 / 四段技术点 / 关键帧网格 / 时间线表 / 与做内容的关系 /
    制作方式说明 / 页脚事实。
  - 关键帧 5 张 `shots/sp-01-look.jpg` ~ `sp-05-lamp.jpg` + 封面 `shots/spotlight.jpg`。
  - 一页式案例 PDF `Spotlight-OnePager.pdf`。
  - 成片 `media/spotlight-effect_1080p30.mp4`：H.264 CRF 25 / 12.3 MB
    （原片 31.5 MB 保留在项目源目录）。实测与原片 **SSIM 0.9831**，
    分辨率、帧率、时长一致，未裁切、未改帧率。

### Changed

- 首页卡片 **11 → 12**，视频作品 **3 → 4**；统计条与三处 meta description 同步。
- 「最近更新」一行改为 2026-10-27 并加入《聚光灯效应》。

### Note

- **成片是 full range（`yuvj420p`）**，压缩时显式指定 `-pix_fmt yuvj420p` 保留，
  不要套用 qiuzhao 那次的 `-pix_fmt yuv420p`——那会把它压成 limited range。
- 5 张关键帧已逐帧读图核对命名，本次名实相符（01 看 / 02 片名 / 03 drop /
  04 动作 / 05 开灯）；qiuzhao 那次错过两处，所以这次先核对再写文案。
- **画质定档为 CRF 25 而非 23**：抽帧对比墨爆帧（17.9 s）显示 CRF25 下墨迹边缘锐利、
  飞白保留、无振铃，而 CRF23 要 21 MB（+8.7 MB）。水墨片视觉容错高于纯文字片，按此定档。

### Verified

- 引用完整性：`index.html` 41 条、`spotlight.html` 9 条本地相对链接，缺失 0；标签配平 0 问题。
- fake-DOM 冒烟：卡片分类 video 4 / tool 5 / sop 3，与筛选栏宣称计数一致；
  初始态无卡片被隐藏；12 张时不出 `tailsolo`。
- 镜像总站 `展示集/项目作品总站.html` 已重新生成，引用缺失 0。

## 2026-10-26 — v1.4.0

### Added

- **新增作品页《秋招为什么这么难》**（`qiuzhao.html`）。81 秒纯代码科普短片，
  把「27 届秋招为什么这么难」拆成 **人 × 岗 × 时间** 的乘法，落到「结构性错配」。
  - 页面规格沿用 `c-loop.html`：返回链接 / kicker / 播放器 / 四格事实条 /
    四段技术点 / 关键帧网格 / 分镜表 / 与运营的关系 / 制作方式说明 / 页脚事实。
  - 关键帧 7 张 `shots/qz-01-hook.jpg` ~ `qz-07-action.jpg` + 封面 `shots/qiuzhao.jpg`。
  - 一页式案例 PDF `Qiuzhao-OnePager-A4.pdf`。
  - 成片 `media/qiuzhao-why-hard_1080p30.mp4`：H.264 CRF 25 / 12.9 MB
    （原片 58 MB 保留在项目源目录）。实测与原片 **SSIM 0.9887**，
    分辨率、帧率、时长一致，未裁切、未改帧率。

### Changed

- 首页卡片 **10 → 11**，视频作品 **2 → 3**；统计条与三处 meta description 同步。
- 「最近更新」一行加入《秋招为什么这么难》。

### Note

- **关键帧文件名按实际画面核对后命名，不按猜测**：`qz-01` 是钩子「门，变窄了」、
  `qz-06` 才是论点「结构性错配」、`qz-07` 是行动建议（不是片尾）。
  初版命名曾把 01 叫 thesis、06 叫 concept，逐帧读图后已纠正。
- 页面文案的数字只写有出处或实测过的：四大行 7.76 → 7.15 → 6.40 万、
  国考 39,721 → 38,119 → 35,691 取自关键帧画面；110.651 BPM /
  `atempo = 542.243 / 500 = 1.084487` / 33 个卡点取自工程文档。
  片中「名额被预订 7/10」为**概念示意、非实际比例**，页面已注明。
- `preload="none"` 保留：12.9 MB 成片只在点播放时才下载，首页不受影响。

### Verified

- 引用完整性：`index.html` 37 条、`qiuzhao.html` 11 条本地相对链接，缺失 0；标签配平 0 问题。
- fake-DOM 冒烟：卡片分类 video 3 / tool 5 / sop 3，与筛选栏宣称计数一致；
  初始态无卡片被隐藏；11 张时不出 `tailsolo`。
- 镜像总站 `展示集/项目作品总站.html` 已按新首页重新生成，37 条引用缺失 0。

## 2026-10-26 — v1.3.0

### Reverted（回退 v1.2.0 的首屏与网格改版）

v1.2.0 把首屏改成「左文右图 split hero（一张 16:9 的《中国龙》V3 成片帧）」、
把作品网格从三等分改成两栏大图。**本人看完后否掉：视频作品集占位太大。**
现回退到 v1.1.1 的骨架：

- 首屏恢复为纯文字单栏（右上不再有任何图片 / 方框）
- 作品网格恢复 `repeat(3,1fr)` 三等分，缩略图高度 150px，
  视频作品集卡片不再占半屏

### Changed（在回退基础上保留的）

- **删掉首屏右上角的「一条内容走完的五站」方框**（`<aside class="chain">`）。
  这是本人 2026-10-26 截图红圈圈出来的元素，评价是「太难看了」。
  连同 `.chain*` CSS、五条 `.step` 的响应式规则、以及已无处可用的
  `[data-goto]` 点击跳转逻辑一并删除（那五个链接全在方框里）。
  「最近更新 · 2026-10-26」这行原本挂在方框底部，已挪回首屏左栏，不丢。
- **筛选栏加宽保留**（本人同一天提的「标题筛选栏太窄了」，不随回退一起撤）：
  `padding 4px 14px → 9px 24px`、`min-height 40px`、`gap 8px → 14px`、
  字号 `12.5px → 14px`；选中态从实心青底改为青描边 + 14% 淡底，
  与未选中态的权重差收窄。

### Note

`shots/hero-dragon.jpg` 是 v1.2.0 为首屏做的图，本次回退后已无引用，
文件保留在仓库内（`shots/ai-video.jpg` 仍是 `og:image`）。

### Verified

- 三轮审查脚本 `preflight_audit.py` 复跑：11 个页面 62 条本地相对链接，
  死链 0 / 大小写不一致 0 / 绝对路径泄漏 0；结构轮 0 问题；
  内容轮 10 / 5 / 4 / 35 各只有一个取值。
- 1440 宽截图确认：首屏右上角无方框、网格回到三列、视频作品集卡片与同行等宽。

## 2026-10-26 — v1.2.0

### Changed

- **首页首屏重做。** 原布局是「左右两栏 + 一个带边框的『一条内容走完的五站』方框」，
  方框视觉上又挤又孤立。现改为左文右图的 split hero：左侧文字列固定 470px，
  右侧是一张 16:9 的《中国龙》V3 成片帧（附准确图注），作为唯一视觉锚点。
- **作品区从「一张平网格」改成三个带编号的分区**：01 成片 / 02 可试用工具 / 03 过程文档。
  每区有编号、标题、一句定位，解决「一个个项目孤零零摆着」的问题。
  筛选栏与分区并存：筛选时按分区显示/隐藏，收尾不落单逻辑改为按分区各自计算。
- **筛选栏加宽。** 按钮内边距 4px 14px → 9px 24px，加 min-height 40px，
  间距 8px → 14px，字号 12.5px → 14px。选中态从实心青底改为青描边 + 14% 淡底，
  与未选中态权重差距收窄。
- **作品网格从三等分改为两栏大图。** `minmax(430px,1fr)` + 缩略图 16:9，
  收尾不落单：三栏居中、两栏把最后一张拉成 21:9 横幅；resize 120ms 防抖重算。
- 统计条从胶囊群改为细信息条；CTA 改为「看作品 ↓」+「发邮件」。
- 10 张卡片的描述统一到约两行长度，避免各区节奏对不上。

### Fixed

- **首屏配图带黑边。** 旧图是按 2560 宽裁切、而源视频实际是 1920×1080，
  crop 宽度超出源宽导致 ffmpeg 补黑边（1600×900 里有 207 行纯黑）。
  改为先检测内容行区间（顶 73 / 底 1005，源片自带上下各 70px 黑边），
  再按内容区取 16:9 窗口，成品 1600×900 无暗行，mean 106.5。
- **图注张冠李戴。** hero 图注原写「《中国龙》V3 · 程序化影像，480 帧确定性渲染」——
  「480 帧确定性渲染」是 C-Loop 的参数（16.000s × 30fps = 480 帧），不是《中国龙》的。
  已改为「《中国龙》V3 · Remotion 程序化生成 · 120 秒 · 2K 母版」，
  出处为 `ai-video-portfolio.html` 的规格条（120秒 / 2K 母版 2560×1440 / 3次迭代）。

### Verified

- 三轮审查脚本（`static-site-deploy-verify` v1.1.0 `preflight_audit.py`）复跑：
  11 个页面 66 条本地相对链接，死链 0 / 大小写不一致 0 / 绝对路径泄漏 0；
  结构轮 0 问题；内容轮 10 / 5 / 4 / 35 各只有一个取值。
- 1440 / 820 / 700 / 560 四档宽度截图确认：窄屏首屏转为上下堆叠（图在上、文在下），
  分区标题不错位，筛选栏换行正常，无横向溢出。
- `#video` / `#sop` / `#tool` 深链分别截图确认只显示对应分区。

## 2026-10-26 — v1.1.1

### Fixed

- **全站 12 个视频 + 3 个「在线版」按钮指向 `*.workers.dev`，国内直连全部超时。**
  实测：`talkcal / daypilot / ai-video-portfolio.jinjiaxin2004.workers.dev` 三个子域
  在境内 DNS 被污染（解析到 173.255.213.90 / 31.13.96.195 / 67.228.235.91 等无关 IP），
  不挂代理 SYN 超时。受影响的是 `ai-video-portfolio.html` 里 **12 条成片**
  （《中国龙》《候》《悟空》千川素材与剪辑练习）——面试官点开一个都播不了。
  已全部换成 `jin2004-cmd.github.io/ai-video-portfolio/assets/...`，
  实测 184–698 ms 全部 200。
- **`TalkCal/index.html` 的「国内镜像」是死链。** `gh-proxy.com` 只代理 raw/release，
  不代理 `*.github.io` 子域，该链接返回 404。改为直接链 `jin2004-cmd.github.io/talkcal/`。
- **`ai-video-portfolio.html` 的 JSON-LD 英文名 `Jin Jiaxin` → `Jackson Jin`。**
  Jackson Jin 是 2026-10-16 起确定的统一口径，旧名已作废。
- 9 个 `target="_blank"` 外链补 `rel="noopener"`。

### Verified

三轮审查全部复跑通过：

1. **链接轮**：11 个页面 65 条本地相对链接，死链 0；大小写敏感性 0（Pages 跑在 Linux 上，
   Windows 本地不区分大小写，这类 bug 只在线上炸）；本地绝对路径泄漏 0；
   18 条外链**直连（绕过本机代理）实测全 200**。
2. **结构轮**：11 个页面标签配平、重复 id、锚点目标、`data-goto` 目标、
   图片 alt、`<title>`、viewport、内联脚本语法，全部 0 问题。
3. **内容轮**：10 / 5 / 4 / 35 / 27 / 19 / 4 / 15 各只有一个取值；
   英文名两处均为 Jackson Jin；镜像总站与入口页归一化后逐行一致（仅少 meta 块）。

### Note

`offeragent.html` 里出现的 `82%` 是表单示例文案（"过审率约58%→82%，方法被团队沿用"），
不是业绩声明；`undefined` / `NaN` / `xxx` 的命中全部来自 JS 代码与 base64 poster，非占位残留。

## 2026-10-26 — v1.1.0

### Added

- **三个新作品页**：`c-loop.html`（C-Loop Night Test 单片页，内嵌 4.8 MB 分发压缩版成片 + 一页式 PDF）、
  `sop-subtitle.html`（字幕规范 SOP）、`sop-storyboard.html`（分镜脚本规范 SOP）。入口页卡片 7 → 10。
- **入口页重做**：首屏左右两栏，右侧「一条内容走完的五站」（选题 → 脚本 → 制作 → 发布 → 沉淀），
  每站挂真实证据、可点跳到对应卡片并高亮。
- **栏目筛选**：全部 10 / 视频作品 2 / SOP·过程文档 3 / 可试用工具 5；支持 `#video` `#sop` `#tool` 深链，
  键盘 1–4 切换，筛选条吸顶。三列下只剩一张时自动居中。
- `shots/ai-video.jpg`：入口页「AI 视频作品集」封面换成《中国龙》6.5 s 帧。原封面是本页自身截图，
  暗到接近全黑，等于没有封面。

### Changed

- `og:image` / `twitter:image`：`shots/video-portfolio.jpg` → `shots/ai-video.jpg`。旧图偏暗，
  发到微信、飞书里预览是一块黑。
- 统计条「4 个可直接试用的工具」→ **5 个**。实际是 TalkCal、电商爆款脚本 Agent、DayPilot、
  广告合规审查工具、OfferAgent 五个，此前少数一个。

### Fixed

- **「电商爆款脚本生成 Agent」测试数量 27 → 35。** v1.0.5 的记录里写了要改成 35，
  但 `index.html` 实际没改到。本轮实查源仓库 `技术源码/tests/`：
  test_compliance 5 + test_exporters 5 + test_generator 9 + test_llm 8 + test_templates 8 = **35**。
  同段「27 条可修复表述自动替换表」保持 27 —— 两个 27 含义不同，不合并。

### Note

- 两份实习期 PDF（《千川爆款复刻方法论》《千川素材生产流程规范》）**未上传本仓库**，
  入口页对应位置改成「PDF 版随打包件单独提供」。理由：那是实习公司内部的投放 SOP，
  公开托管和私下发给面试官性质不同。要公开时补一条 commit 即可。

## 2026-10-22 — v1.0.5

### Fixed

- **过时的测试数量。** 作品表里「电商爆款脚本生成 Agent」一行写的是
  「27 个单元测试覆盖」。实际是 **35**（2026-10-21 补 `test_llm.py` 的 8 个之后）。
  ecom 仓库自己的 README 当时已同步，但**本仓库这处遗漏了**。
  同行的「27 条可修复表述自动替换表」保持不变——那 27 是 `auto_fix` 的替换规则条数，
  与测试个数无关。

### Note

这已经是第二次因为「改了源头数字没回头改所有引用处」而漏改。
第一次是把 27 写进本仓库 README，第二次是只改了源仓库没改镜像站和用户主页。
**同一条规则：任何可数事实变更后，grep 全部对外文案。**

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
