# VitePress 站点构建失败排查与 GitHub Actions 自动化部署实践

## 背景

本站基于 [Nolebase](https://github.com/nolebase/nolebase-template) 模板构建，使用 VitePress 作为静态站点生成器，Obsidian 作为日常笔记编辑工具。原先部署在 Netlify 上，近期计划迁移至自有服务器（1Panel 管理），并通过 GitHub Actions 实现自动化构建与部署。

在这个过程中，遇到了从构建失败到部署失败的一系列问题。本文完整记录了排查与解决的全过程。

---

## 第一阶段：Netlify 构建失败 — 图片引用断链

### 问题现象

Netlify 构建日志报错：

```
RollupError: Could not resolve "./chinas_cybersecurity_incident_reporting_workflow.png"
from "笔记/网络安全/global_cybersecurity_incident_management_strategic_evolution_china_eu_us.md"
```

构建在 `vitepress build` 的 Rollup 打包阶段失败，退出码为 2。

### 排查过程

通过 Python 脚本扫描项目中所有 Markdown 文件的图片引用，检查引用的本地图片文件是否实际存在：

```python
# 核心逻辑：遍历所有 .md 文件，正则匹配 ![alt](path)，
# 跳过 http/https/data: 开头的外部链接，
# 对本地路径做 URL 解码后检查文件是否存在
```

扫描结果发现 7 处断引用，分布在 2 个文件中：

- `笔记/网络安全/global_cybersecurity_incident_management_strategic_evolution_china_eu_us.md` — 3 处（未注释的图片引用，**导致构建失败**）
- `笔记/原创文章/社会科学/筛选驱动的知识与认知螺旋上升：统一理论框架（精修版）.md` — 4 处（已用 HTML 注释包裹，不影响构建）

### 解决方案

将 3 处未注释的断引用用 HTML 注释包裹：

```markdown
<!-- 修改前 -->
![中国网络安全事件报告流程图](chinas_cybersecurity_incident_reporting_workflow.png)

<!-- 修改后 -->
<!-- ![中国网络安全事件报告流程图](chinas_cybersecurity_incident_reporting_workflow.png) -->
<!-- 图片暂时不可用，已注释 -->
```

### 经验总结

- Obsidian 中编辑笔记时引用的图片如果未同步到仓库，会导致 VitePress 构建失败
- VitePress 使用 Rollup 打包，对本地资源引用做严格解析，找不到文件直接报错
- 建议在 CI 中加入构建前的断链检查脚本，提前拦截此类问题

---

## 第二阶段：SSR 渲染失败 — 文件名中的 `%` 字符

### 问题现象

修复图片引用后，构建进入了 SSR（服务端渲染）阶段，但随即出现大量重复错误：

```
URIError: URI malformed
    at decodeURI (<anonymous>)
    at normalize (app.js)
    at isActive (app.js)
    at hasActiveLink (app.js)
```

同一段错误堆栈在日志中重复出现数十次，日志长达上千行。

### 排查过程

错误发生在 VitePress 的 `hasActiveLink` 函数中，该函数在 SSR 渲染每个页面时都会遍历侧边栏所有链接并调用 `decodeURI`。如果某个链接路径中包含无效的 percent-encoding 序列，`decodeURI` 就会抛出 `URIError`。

搜索项目中文件名包含 `%` 字符的文件：

```
笔记/医疗健康/20年重磅研究：每天1小时，痴呆症风险直降25%！普通人这样做更易坚持.md
```

文件名中的 `25%！` — 半角 `%` 后跟中文 `！`，不构成合法的 percent-encoding 序列（如 `%20`、`%E4` 等），导致 `decodeURI` 解析失败。

由于侧边栏会在每个页面渲染时遍历所有链接，一个坏文件名会导致错误在每个页面都触发一次，所以日志中看到了大量重复的堆栈信息。

### 解决方案

将文件名中的半角 `%` 替换为全角 `％`：

```bash
mv "...25%！..." "...25％！..."
```

### 经验总结

- VitePress 会将文件路径作为 URL 处理，文件名中的 `%` 会被当作 percent-encoding 的起始字符
- 使用 Obsidian 写笔记时，文件名中应避免 `%`、`#`、`?` 等 URL 特殊字符
- 一个文件名问题可能在日志中产生成百上千行重复错误，不要被日志量吓到，需要识别出根本原因只有一个

---

## 第三阶段：GitHub Actions 部署 — 从方案选择到逐步排障

### 部署方案选型

项目是纯静态站点（VitePress 构建产物为 HTML/CSS/JS），在 1Panel 管理的自有服务器上部署有三种方案：

1. **GitHub Actions 构建 + 推送到服务器**（推荐）— 构建在 GitHub 免费 runner 上完成，不消耗服务器资源
2. **1Panel Node.js 运行环境** — 在服务器上构建，需要服务器有足够内存
3. **Docker 容器** — 多阶段构建，Nginx 托管静态文件

选择方案一，因为构建在 GitHub 完成，服务器只需托管静态文件。GitHub Actions 对公开仓库完全免费，私有仓库每月 2000 分钟免费额度，个人笔记项目绑绑有余。

### 问题一：ssh-deploy action 版本不存在

```yaml
# 错误：v5 不存在
uses: easingthemes/ssh-deploy@v5

# 修复：改为 v4
uses: easingthemes/ssh-deploy@v4
```

**教训**：使用第三方 Action 前应确认其最新版本号。

### 问题二：YAML 缩进错误

编辑 workflow 文件时不慎破坏了缩进：

```yaml
# 错误：uses 没有正确缩进
      - name: 部署到服务器
uses: easingthemes/ssh-deploy@v4

# 修复：保持 8 空格缩进
      - name: 部署到服务器
        uses: easingthemes/ssh-deploy@v4
```

**教训**：YAML 对缩进极其敏感，编辑后应检查格式。

### 问题三：SSH 密钥认证失败 (`error in libcrypto`)

```
Load key "deploy_key_...": error in libcrypto
Permission denied (publickey,gssapi-keyex,gssapi-with-mic,password)
```

`easingthemes/ssh-deploy` action 在处理 SSH 私钥时出现 `error in libcrypto`，即使：
- 密钥在服务器本地测试完全正常（`ssh -i ~/.ssh/github_deploy pansin@localhost "echo ok"` 输出 `ok`）
- 多次重新生成密钥（ed25519、RSA 4096）并重新粘贴到 GitHub Secrets

**根因**：该 action 内部写入密钥文件的方式可能破坏了密钥格式。

**解决方案**：放弃使用该 action，改为手动配置 SSH 密钥和部署命令：

```yaml
- name: 配置 SSH 密钥
  run: |
    mkdir -p ~/.ssh
    echo "${{ secrets.SSH_PRIVATE_KEY }}" > ~/.ssh/deploy_key
    chmod 600 ~/.ssh/deploy_key
    ssh-keyscan -p 22 ${{ secrets.REMOTE_HOST }} >> ~/.ssh/known_hosts

- name: 部署到服务器
  run: |
    scp -P 22 -i ~/.ssh/deploy_key -r .vitepress/dist/* \
      user@host:/deploy/path/

- name: 清理密钥
  if: always()
  run: rm -f ~/.ssh/deploy_key
```

**教训**：第三方 Action 是黑盒，遇到诡异问题时不如直接用原生命令，可控性更强。

### 问题四：服务器未安装 rsync

```
bash: rsync: command not found
```

最初部署命令使用了 `rsync`，但服务器上未安装。

**解决方案**：改用 `scp` 部署。虽然 `scp` 不支持增量同步，但对于静态站点的体量完全够用。

### 问题五：部署目录权限不足

```
rm: cannot remove '***/404.html': Permission denied
```

SSH 连接成功了，但用于部署的用户对目标目录没有写权限。

**解决方案**：在服务器上修改目录所有权：

```bash
sudo chown -R pansin:pansin /path/to/deploy/dir/
```

**教训**：配置部署路径时要确认目标用户对该目录有读写权限。

---

## 最终 Workflow 配置

```yaml
name: 构建并部署到自有服务器

on:
  push:
    branches: ['main']
  workflow_dispatch:

concurrency:
  group: ${{ github.ref }}
  cancel-in-progress: true

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - uses: actions/setup-node@v4
        with:
          node-version: 20.x

      - uses: pnpm/action-setup@v4
        with:
          run_install: false
          version: 9

      - name: 配置 pnpm 缓存
        uses: actions/cache@v4
        with:
          path: $(pnpm store path --silent)
          key: ${{ runner.os }}-pnpm-store-${{ hashFiles('**/pnpm-lock.yaml') }}

      - run: pnpm install --frozen-lockfile
      - run: pnpm docs:build

      - name: 配置 SSH 密钥
        run: |
          mkdir -p ~/.ssh
          echo "${{ secrets.SSH_PRIVATE_KEY }}" > ~/.ssh/deploy_key
          chmod 600 ~/.ssh/deploy_key
          ssh-keyscan -p ${{ secrets.REMOTE_PORT }} ${{ secrets.REMOTE_HOST }} >> ~/.ssh/known_hosts

      - name: 部署到服务器
        run: |
          SSH_CMD="ssh -p ${{ secrets.REMOTE_PORT }} -i ~/.ssh/deploy_key -o StrictHostKeyChecking=no"
          $SSH_CMD ${{ secrets.REMOTE_USER }}@${{ secrets.REMOTE_HOST }} "rm -rf ${{ secrets.DEPLOY_PATH }}/*"
          scp -P ${{ secrets.REMOTE_PORT }} -i ~/.ssh/deploy_key -o StrictHostKeyChecking=no \
            -r .vitepress/dist/* ${{ secrets.REMOTE_USER }}@${{ secrets.REMOTE_HOST }}:${{ secrets.DEPLOY_PATH }}/

      - name: 清理密钥
        if: always()
        run: rm -f ~/.ssh/deploy_key
```

需要配置的 GitHub Secrets：

- `SSH_PRIVATE_KEY` — 服务器 SSH 私钥
- `REMOTE_HOST` — 服务器地址
- `REMOTE_USER` — SSH 用户名
- `REMOTE_PORT` — SSH 端口
- `DEPLOY_PATH` — 服务器上的静态站点目录

---

## 总结

整个排查过程涉及三个层面的问题：

| 层面 | 问题 | 根因 |
| :--- | :--- | :--- |
| **内容层** | Rollup 打包失败 | Markdown 中引用了不存在的图片 |
| **内容层** | SSR 渲染失败 | 文件名含 `%` 导致 URI 解析错误 |
| **部署层** | SSH 认证失败 | 第三方 Action 密钥处理异常 |
| **部署层** | rsync 不可用 | 服务器未安装 rsync |
| **部署层** | 权限不足 | 部署目录未授权给部署用户 |

核心收获：

1. **Obsidian + VitePress 的文件名规范很重要** — 避免使用 `%`、`#`、`?` 等 URL 特殊字符
2. **CI 构建日志要抓关键错误** — 上千行重复堆栈可能只有一个根因
3. **第三方 GitHub Action 并非总是最优解** — 遇到黑盒问题时，原生 shell 命令更可控
4. **部署前要验证全链路** — 密钥认证、工具可用性、目录权限缺一不可
