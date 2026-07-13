# 部署到 GitHub Pages

这个版本是纯静态网站。内容保存在仓库的 `content/` 目录，`/admin/` 后台会把修改直接提交到 GitHub，随后 GitHub Actions 自动重新发布。

## 第一次部署

1. 确认 GitHub 仓库 `amswf/RoamInsiders` 已经创建。
2. 在本地项目目录执行（本项目已经配置为这个 SSH 地址）：

   ```bash
   git remote add origin git@github.com:amswf/RoamInsiders.git
   git push -u origin main
   ```

3. 打开 GitHub 仓库的 `Settings → Pages`。
4. 在 `Build and deployment` 的 `Source` 中选择 `GitHub Actions`。
5. 打开仓库的 `Actions` 页面，等待 `Deploy Roam Insider to GitHub Pages` 完成。
6. 部署地址是 `https://amswf.github.io/RoamInsiders/`。

如果仓库名是 `你的用户名.github.io`，网站会直接发布在根域名。

## 使用内容后台

1. 在 GitHub 打开 `Settings → Developer settings → Personal access tokens → Fine-grained tokens`。
2. 新建只允许访问此仓库的令牌，并授予 `Contents: Read and write` 权限。
3. 打开 `https://你的站点地址/admin/`。
4. 选择 GitHub Token 登录并粘贴令牌。
5. 新建或编辑内容，保存后后台会提交到 `main` 分支，Actions 自动重新发布。

令牌只保存在当前浏览器中，不要把令牌写进代码、配置文件或提交记录。

## 自定义域名

在 `Settings → Pages → Custom domain` 填入域名，并按 GitHub 提示配置 DNS。GitHub Pages 会自动提供 HTTPS。

## 日常发布

- 修改网站代码：推送到 `main` 分支。
- 修改内容：从 `/admin/` 保存。
- 两种方式都会触发同一个自动部署流程。
