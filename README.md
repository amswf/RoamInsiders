# TravelGoGuide

一个面向亚洲旅行的多语言静态内容网站，首页是路线、优惠、优惠券与预订指南组成的内容流。

## 主要能力

- 首页内容流与类型筛选
- 内容详情页底部悬浮行动按钮
- 每篇内容独立配置 Trip.com、Traveloka 或自定义跳转
- 简体中文、繁体中文、英语、印尼语、泰语、越南语、马来语、菲律宾语、高棉语、老挝语和缅甸语界面
- Sveltia CMS 静态内容后台
- GitHub Actions 自动发布到 GitHub Pages

## 本地运行

```bash
npm install
npm run dev
```

打开 `http://localhost:3000`。静态构建：

```bash
npm run build
npm start
```

内容保存在 `content/posts/`，网站设置保存在 `content/settings/site.json`。

## 部署

完整中文步骤见 [GITHUB_PAGES.md](./GITHUB_PAGES.md)。
